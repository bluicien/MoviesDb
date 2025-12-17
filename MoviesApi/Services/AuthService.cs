using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
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
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _config;

    public AuthService(ILogger<AuthService> logger, IConfiguration config, ApplicationDbContext context)
    {
      _logger = logger;
      _config = config;
      _context = context;
    }

    public async Task<ResponseTokenDTO> LoginUser(IdentityUser user)
    {
      var accessToken = GenerateJwt(user);

      RefreshToken refreshToken = await CreateRefreshToken(user.Id);
      
      return new ResponseTokenDTO { AccessToken = accessToken, RefreshToken = refreshToken };
    }

    public Task LogoutUser(IdentityUser user)
    {
      throw new NotImplementedException();
    }

    public Task RegisterUser(IdentityUser user)
    {
      throw new NotImplementedException();
    }

    private string GenerateJwt(IdentityUser user)
    {
      var claims = new[] { new Claim("sub", user.Id) };

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