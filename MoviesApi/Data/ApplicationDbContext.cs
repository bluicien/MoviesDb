using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MoviesApi.Models;

namespace MoviesApi.Data
{
  public class ApplicationDbContext : IdentityDbContext<IdentityUser>
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<Movie> Movies { get; set; }
    public DbSet<RefreshToken> RefreshTokens{ get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      // Explicitly configure relationship (optional but clearer)
      builder.Entity<RefreshToken>()
        .HasOne(rt => rt.User)
        .WithMany() // IdentityUser doesn’t have a collection of tokens
        .HasForeignKey(rt => rt.UserId);
    }
  }
}