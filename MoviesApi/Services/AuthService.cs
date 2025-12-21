using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MoviesApi.Data;
using MoviesApi.DTO;
using MoviesApi.Models;
using MoviesApi.Services.Interfaces;

namespace MoviesApi.Services
{
  public class AuthService : IAuthService
  {
    private readonly ILogger<AuthService> _logger;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _config;

    public AuthService(ILogger<AuthService> logger, IConfiguration config, ApplicationDbContext context, UserManager<IdentityUser> userManager)
    {
      _logger = logger;
      _config = config;
      _context = context;
      _userManager = userManager;
    }

    public async Task<ResponseTokenDTO> LoginUser(IdentityUser user)
    {
      var accessToken = GenerateJwt(user);

      RefreshToken refreshToken = await CreateRefreshToken(user.Id);
      
      return new ResponseTokenDTO { AccessToken = accessToken, RefreshToken = refreshToken };
    }

    public async Task LogoutUser(string tokenId)
    {
      RefreshToken? refreshToken = await _context.RefreshTokens.FirstOrDefaultAsync(t => t.Token == tokenId);
      
      if (refreshToken == null) return;
      if (refreshToken.RevokedAt != null) return;

      refreshToken.RevokedAt = DateTime.UtcNow;
      await _context.SaveChangesAsync();

      return;
    }

    public async Task<(ResponseTokenDTO? Tokens, IEnumerable<string>? Errors)> RegisterUser(UserCredentialsDTO userCreds)
    {
      var user = new IdentityUser 
      { 
        UserName = userCreds.UserName.Trim(), 
        Email = userCreds.Email?.Trim() 
      };
      IdentityResult result = await _userManager.CreateAsync(user, userCreds.Password);
      if (!result.Succeeded)
      {
        return (null, result.Errors.Select(e => e.Description));
      }

      ResponseTokenDTO tokens = await LoginUser(user);
      
      return (tokens, null);
    }

    public async Task<ResponseTokenDTO?> RefreshAccessToken(string refreshToken)
    {
      RefreshToken? token = await _context.RefreshTokens
        .Include(t => t.User)
        .FirstOrDefaultAsync(t => t.Token == refreshToken && t.RevokedAt == null && t.ExpiryDate > DateTime.UtcNow);

      if (token == null || token.User == null) return null;

      RefreshToken newToken = await RotateRefreshToken(token);

      return new ResponseTokenDTO { AccessToken = GenerateJwt(token.User), RefreshToken = newToken };
    }

    private async Task<RefreshToken> RotateRefreshToken(RefreshToken token)
    {
      using var tx = await _context.Database.BeginTransactionAsync();
      token.RevokedAt = DateTime.UtcNow;
      RefreshToken newToken = await CreateRefreshToken(token.UserId);
      await _context.SaveChangesAsync();
      tx.Commit();

      return newToken;
    }

    private string GenerateJwt(IdentityUser user)
    {
      var claims = new[] 
      { 
        new Claim(JwtRegisteredClaimNames.Sub, user.Id),
        new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
        new Claim("username", user.UserName ?? "")
      };

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

      var token = new JwtSecurityToken(
          issuer: _config["Jwt:Issuer"],
          audience: _config["Jwt:Audience"],
          claims: claims,
          expires: DateTime.UtcNow.AddMinutes(30), // short-lived
          signingCredentials: creds
      );

      return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private async Task<RefreshToken> CreateRefreshToken(string userId)
    {
      var refreshToken = Guid.NewGuid().ToString();
      var tokenEntity = new RefreshToken
      {
        Token = refreshToken,
        UserId = userId,
        ExpiryDate = DateTime.UtcNow.AddDays(7)
      };

      _context.RefreshTokens.Add(tokenEntity);
      await _context.SaveChangesAsync();

      return tokenEntity;
    }
  }
}