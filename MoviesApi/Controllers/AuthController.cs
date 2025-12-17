using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MoviesApi.DTO;
using MoviesApi.Services.Interfaces;

namespace MoviesApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AuthController : Controller
  {
    private readonly UserManager<IdentityUser> _userManager;
    private readonly ILogger<AuthController> _logger;
    private readonly IAuthService _authService;

    public AuthController(ILogger<AuthController> logger, IAuthService authService, UserManager<IdentityUser> userManager)
    {
      _logger = logger;
      _authService = authService;
      _userManager = userManager;
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
      if (user == null || !await _userManager.CheckPasswordAsync(user, userCreds.Password))
        return Unauthorized();

      ResponseTokenDTO tokens = await _authService.LoginUser(user);

      string _refreshToken = "RefreshToken";
      HttpContext.Items[_refreshToken] = tokens.RefreshToken;

      return Ok(new { tokens.AccessToken });
    }
  }
  
  public class UserCredentials
  {
    public string UserName { get; set;} = string.Empty;
    public string Password { get; set;} = string.Empty;
  }
}