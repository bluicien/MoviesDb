using MoviesApi.Models;

namespace MoviesApi.Middleware
{
  public class RefreshTokenCookieMiddleware
  {
    private readonly RequestDelegate _next;
    private readonly IWebHostEnvironment _env;

    public RefreshTokenCookieMiddleware(RequestDelegate next, IWebHostEnvironment env)
    {
      _next = next;
      _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
      await _next(context); // Run on response

      string _refreshToken = "RefreshToken";
      if (context.Items.TryGetValue(_refreshToken, out var tokenObj) && tokenObj is RefreshToken refreshToken)
      {
        var cookieOptions = new CookieOptions
        {
          HttpOnly = true,
          Secure = !_env.IsDevelopment(),
          SameSite = _env.IsDevelopment() ? SameSiteMode.Lax : SameSiteMode.Strict,
          Expires = refreshToken.ExpiryDate
        };

        context.Response.Cookies.Append(_refreshToken, refreshToken.Token, cookieOptions);
      }
    }
  }
}