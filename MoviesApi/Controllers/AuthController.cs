using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MoviesApi.DTO;
using MoviesApi.Services.Interfaces;
using MoviesApi.Utilities;

namespace MoviesApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AuthController : Controller
  {
    private readonly UserManager<IdentityUser> _userManager;
    private readonly ILogger<AuthController> _logger;
    private readonly IAuthService _authService;
    private readonly IWebHostEnvironment _env;

    public AuthController(ILogger<AuthController> logger, IAuthService authService, UserManager<IdentityUser> userManager, IWebHostEnvironment env)
    {
      _logger = logger;
      _authService = authService;
      _userManager = userManager;
      _env = env;
    }
    

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserCredentialsDTO userCreds)
    {
      var user = new IdentityUser { UserName = userCreds.UserName };
      var result = await _userManager.CreateAsync(user, userCreds.Password);
      if (result.Succeeded) return Ok("User registered");

      return BadRequest(result.Errors);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserCredentialsDTO userCreds)
    {
      var user = await _userManager.FindByNameAsync(userCreds.UserName);
      if (user == null || !await _userManager.CheckPasswordAsync(user, userCreds.Password))
        return Unauthorized();

      ResponseTokenDTO tokens = await _authService.LoginUser(user);

      string _refreshToken = "RefreshToken";
      CookieHelper.SetCookie(Response, _refreshToken, tokens.RefreshToken.Token, tokens.RefreshToken.ExpiryDate, _env.IsDevelopment());
      
      return Ok(new { tokens.AccessToken });
    }
  }
}