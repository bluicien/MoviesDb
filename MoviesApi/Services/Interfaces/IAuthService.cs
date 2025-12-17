using Microsoft.AspNetCore.Identity;
using MoviesApi.DTO;

namespace MoviesApi.Services.Interfaces
{
  public interface IAuthService
  {
    Task<ResponseTokenDTO> LoginUser(IdentityUser user);
    Task LogoutUser(IdentityUser user);
    Task RegisterUser(IdentityUser user);
  }
}