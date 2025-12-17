using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace MoviesApi.Models
{
  public class RefreshToken
  {
    [Key]
    public string Token { get; set; } = string.Empty;
    public DateTime ExpiryDate { get; set; }
    public string UserId { get; set; } = string.Empty;
    public IdentityUser? User { get; set; }
  }
}