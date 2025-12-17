using MoviesApi.Models;

namespace MoviesApi.DTO
{
  public class ResponseTokenDTO
  {
    public string AccessToken { get; set; } = string.Empty;
    public required RefreshToken RefreshToken { get; set; }
  }
}