using Microsoft.EntityFrameworkCore;
using MoviesApi.Data;
using MoviesApi.Models;
using MoviesApi.Services.Interfaces;

namespace MoviesApi.Services
{
  public class MovieService : IMovieService
  {
    private readonly ApplicationDbContext _context;
    private readonly ILogger<MovieService> _logger;

    public MovieService(ApplicationDbContext context, ILogger<MovieService> logger)
    {
      _context = context;
      _logger = logger;
    }

    public Task AddMovie(Movie movie)
    {
      throw new NotImplementedException();
    }

    public async Task<IEnumerable<Movie>> GetAllMovies()
    {
      try
      {
        return await _context.Movies
          .OrderBy(m => m.Title)
          .Take(50)
          .ToListAsync();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Failed to retrieve movies data.");
        throw new Exception(ex.ToString());
      }
    }

    public Task<Movie> GetMovieByCategory(string category)
    {
      throw new NotImplementedException();
    }

    public Task<Movie> GetMovieById(Guid id)
    {
      throw new NotImplementedException();
    }

    public Task<Movie> GetMovieByName(string movieName)
    {
      throw new NotImplementedException();
    }

    public Task<Movie> GetMovieByYear(int year)
    {
      throw new NotImplementedException();
    }

    public Task UpdateMovie(Movie movie)
    {
      throw new NotImplementedException();
    }
  }
}