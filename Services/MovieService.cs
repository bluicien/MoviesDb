using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MoviesApi.Data;
using MoviesApi.Exceptions.Movies;
using MoviesApi.Models;
using MoviesApi.Services.Interfaces;
using MoviesApi.Extensions;

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

    public async Task AddMovie(Movie movie)
    {
      try
      {
        _context.Movies.Add(movie);
        var affectedRows = await _context.SaveChangesAsync();

        if (affectedRows <= 0)
        {
          throw new MovieException(MovieErrorType.CreateFailed, "Failed to create new movie entry");
        }
      }
      catch (Exception ex) // catches SqlException, MovieException, etc.
      {
        if (_logger.IsEnabled(LogLevel.Error))
        {
          _logger.LogError(ex, "Failed to create new movie '{MovieTitle}'", movie.Title);
        }

        throw new MovieException(MovieErrorType.CreateFailed, $"Failed to create new movie '{movie.Title}'", ex);
      }
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
      catch (SqlException ex)
      {
        _logger.LogError(ex, "Failed to retrieve movies.");
        throw new MovieException(MovieErrorType.NotFound, "Failed to retrieve movies.", ex);
      }
    }

    public async Task<IEnumerable<Movie>> GetMovieByCategory(string category)
    {
      try
      {
        return await _context.Movies.Where(m => m.Category.Contains(category)).ToListAsync();
      }
      catch (SqlException ex)
      {
        if (_logger.IsEnabled(LogLevel.Error))
        {
          _logger.LogError(ex, "Failed to retrieve movies of category {category}", category);
        }
        throw new MovieException(MovieErrorType.NotFound, $"Failed to retrieve movies of category {category}", ex);
      }
    }

    public async Task<Movie?> GetMovieById(Guid id)
    {
      try
      {
        return await _context.Movies.FirstOrDefaultAsync(m => m.Id == id);
      }
      catch (SqlException ex)
      {
        if (_logger.IsEnabled(LogLevel.Error))
        {
          _logger.LogError(ex, "Failed to retrieve movie of ID: {MovieId}", id);
        }
        throw new MovieException(MovieErrorType.UpdateFailed, $"Failed to retrieve movie of ID: {id}", ex);
      }
    }

    public async Task<IEnumerable<Movie>> GetMovieByName(string movieTitle)
    {
      try
      {
        return await _context.Movies.Where(m => m.Title == movieTitle).ToListAsync();
      }
      catch (SqlException ex)
      {
        if (_logger.IsEnabled(LogLevel.Error))
        {
          _logger.LogError(ex, "Failed to retrieve movies of Title: {movieTitle}", movieTitle);
        }
        throw new MovieException(MovieErrorType.NotFound, $"Failed to retrieve movies of Title: {movieTitle}", ex);
      }
    }

    public async Task<IEnumerable<Movie>> GetMovieByYear(int year)
    {
      try
      {
        return await _context.Movies.Where(m => m.Year == year).ToListAsync();
      }
      catch (SqlException ex)
      {
        if (_logger.IsEnabled(LogLevel.Error))
        {
          _logger.LogError(ex, "Failed to retrieve movies in Year: {year}", year);
        }
        throw new MovieException(MovieErrorType.NotFound, $"Failed to retrieve movies in Year: {year}", ex);
      }
    }

    public async Task<IEnumerable<Movie>> GetMovieByYear(int startYear, int endYear)
    {
      try
      {
        return await _context.Movies.Where(m => m.Year >= startYear && m.Year <= endYear).ToListAsync();
      }
      catch (SqlException ex)
      {
        if (_logger.IsEnabled(LogLevel.Error))
        {
          _logger.LogError(ex, "Failed to retrieve movies in year range {startYear} to {endYear}", [startYear, endYear]);
        }
        throw new MovieException(MovieErrorType.NotFound, $"Failed to retrieve movies in year range {startYear} to {endYear}", ex);
      }
    }

    public async Task<IEnumerable<Movie>> GetMoviesByQueries(
      string? movieTitle, 
      int? year, 
      int? endYear, 
      List<string>? category,
      List<string>? genre
    )
    {
      try
      {
        var results = await _context.Movies
          .WhereIf(!string.IsNullOrWhiteSpace(movieTitle), m => m.Title.Contains(movieTitle!))
          .WhereIf(year.HasValue && !endYear.HasValue, m => m.Year == year!.Value)
          .WhereIf(endYear.HasValue && year.HasValue, m => m.Year <= endYear!.Value && m.Year >= year!.Value)
          .WhereIf(category?.Count > 0, m => category!.Contains(m.Category))
          .WhereIf(genre?.Count > 0, m => genre!.Contains(m.Genre))
          .ToListAsync();
        return results;
      }
      catch (SqlException ex)
      {
        if (_logger.IsEnabled(LogLevel.Error))
        {
          _logger.LogError(ex, "Failed to retrieve query results");
        }
        throw new MovieException(MovieErrorType.NotFound, "Failed to retrieve query results", ex);
      }
    }

    public async Task UpdateMovie(Movie movie)
    {
      try
      {
        _context.Movies.Update(movie);
        await _context.SaveChangesAsync();
      }
      catch (SqlException ex)
      {
        if (_logger.IsEnabled(LogLevel.Error))
        {
          _logger.LogError(ex, "Failed to update movie ID: {MovieId}", movie.Id);
        }
        throw new MovieException(MovieErrorType.UpdateFailed, $"Failed to update movie ID: ${movie.Id}", ex);
      }
    }
  }
}