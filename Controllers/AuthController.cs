using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace MoviesApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AuthController : Controller
  {
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IConfiguration _config;

    public AuthController(IConfiguration config, UserManager<IdentityUser> userManager)
    {
      _userManager = userManager;
      _config = config;
    }
    

    [HttpPost("register")]
    public async Task<IActionResult> Register(string username, string password)
    {
      var user = new IdentityUser { UserName = username };
      var result = await _userManager.CreateAsync(user, password);
      if (result.Succeeded) return Ok("User registered");
      return BadRequest(result.Errors);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(string username, string password)
    {
      var user = await _userManager.FindByNameAsync(username);
      if (user != null && await _userManager.CheckPasswordAsync(user, password))
      {
        var claims = new[] { new System.Security.Claims.Claim("sub", user.Id)};
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
          issuer: _config["Jwt:Issuer"],
          audience: _config["Jwt:Audience"],
          claims: claims,
          expires: DateTime.UtcNow.AddHours(1),
          signingCredentials: creds
        );

        return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });;
      }

      return Unauthorized();
    }
  }
}