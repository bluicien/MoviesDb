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
    public async Task<IActionResult> Register(UserCredentials userCreds)
    {
      var user = new IdentityUser { UserName = userCreds.UserName };
      var result = await _userManager.CreateAsync(user, userCreds.Password);
      if (result.Succeeded) return Ok("User registered");
      return BadRequest(result.Errors);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserCredentials userCreds)
    {
      var user = await _userManager.FindByNameAsync(userCreds.UserName);
      if (user != null && await _userManager.CheckPasswordAsync(user, userCreds.Password))
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

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        // Store JWT in secure token
        Response.Cookies.Append("AuthToken", jwt, new CookieOptions
        {
          HttpOnly = true,
          Secure = false,
          SameSite = SameSiteMode.Strict,
          Expires = DateTime.UtcNow.AddHours(1),
          IsEssential = true
        });

        return Ok("Logged in successfully");
      }

      return Unauthorized();
    }
  }
  
  public class UserCredentials
  {
    public string UserName { get; set;} = string.Empty;
    public string Password { get; set;} = string.Empty;
  }
}