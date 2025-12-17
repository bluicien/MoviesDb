namespace MoviesApi.Utilities
{
  public static class CookieHelper
  {
    public static void SetCookie<T>(HttpResponse response, string key, T value, DateTime? expires = null, bool isDev = false)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = !isDev,
            SameSite = isDev ? SameSiteMode.Lax : SameSiteMode.Strict,
            Expires = expires
        };

        // Convert value to string (could be token, DTO property, etc.)
        string cookieValue = value?.ToString() ?? string.Empty;

        response.Cookies.Append(key, cookieValue, cookieOptions);
    }
  }
}