using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;
using MoviesApi.DTO;
using MoviesApi.Services.Interfaces;
using MoviesApi.Utilities;

namespace MoviesApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AuthController : Controller
  {
    private readonly ILogger<AuthController> _logger;
    private readonly IAuthService _authService;
    private readonly IWebHostEnvironment _env;
    private readonly string _refreshToken = "RefreshToken";

    public AuthController(ILogger<AuthController> logger, IAuthService authService, IWebHostEnvironment env)
    {
      _logger = logger;
      _authService = authService;
      _env = env;
    }
    

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserCredentialsDTO userCreds)
    {
      if (string.IsNullOrEmpty(userCreds.UserName) || string.IsNullOrEmpty(userCreds.Password))
      {
        return BadRequest("Username and Password is required.");
      }

      var (tokens, errors) = await _authService.RegisterUser(userCreds);
      if (errors != null)
      {
        return BadRequest( new { errors });
      }

      if (tokens == null) return BadRequest("User registered, but automatic login failed.");

      CookieHelper.SetCookie(Response, _refreshToken, tokens.RefreshToken.Token, tokens.RefreshToken.ExpiryDate, _env.IsDevelopment());
      
      return Created("/api/auth/me", new { tokens.AccessToken });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserCredentialsDTO userCreds)
    {
      ResponseTokenDTO? tokens = await _authService.LoginUser(userCreds);
      if (tokens == null) return BadRequest();

      CookieHelper.SetCookie(Response, _refreshToken, tokens.RefreshToken.Token, tokens.RefreshToken.ExpiryDate, _env.IsDevelopment());
      
      return Ok(new { tokens.AccessToken });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
      string? refreshToken = Request.Cookies[_refreshToken];
      if (refreshToken == null) return Ok();

      await _authService.LogoutUser(refreshToken);
      Response.Cookies.Delete(_refreshToken);

      return Ok();
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
      string? refreshToken = Request.Cookies[_refreshToken];
      if (string.IsNullOrEmpty(refreshToken)) return BadRequest();

      ResponseTokenDTO? tokens = await _authService.RefreshAccessToken(refreshToken);
      if (tokens == null) return Unauthorized();

      CookieHelper.SetCookie(Response, _refreshToken, tokens.RefreshToken.Token, tokens.RefreshToken.ExpiryDate, _env.IsDevelopment());

      return Ok(new { tokens.AccessToken });
    }
  }
}