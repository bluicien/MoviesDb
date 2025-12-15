using Microsoft.AspNetCore.Mvc;
using MoviesApi.Exceptions.Movies;
using MoviesApi.Models;
using MoviesApi.Services.Interfaces;

namespace MoviesApi.Controllers
{
  [ApiController]
  [Route("api/movies")]
  public class MoviesController : Controller
  {
    private readonly ILogger<MoviesController> _logger;
    private readonly IMovieService _movieService;

    public MoviesController(ILogger<MoviesController> logger , IMovieService movieService)
    {
      _movieService = movieService;
      _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> AllMovies()
    {
      try
      {
        var movie = await _movieService.GetAllMovies();
        return Ok(movie);
      }
      catch (MovieException ex) when (ex.ErrorType == MovieErrorType.NotFound)
      {
        _logger.LogError(ex, "Failed to retrieve all movies from MoveService");
        return Problem();
      }
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetMovieById(Guid id)
    {
      try
      {
        Movie? movie = await _movieService.GetMovieById(id);
        if (movie == null)
        {
          return NotFound();
        }

        return Ok(movie);
      }
      catch (MovieException ex) when (ex.ErrorType == MovieErrorType.NotFound)
      {
        if (_logger.IsEnabled(LogLevel.Error))
        {
          _logger.LogError(ex, "Failed to retrieve movie ID {MovieId} from MoveService", id);
        }
        return NotFound();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An unexpected error has occurred in GetMovieById Controller");
        return Problem();
      }
    }

    [HttpGet("q")]
    public async Task<IActionResult> QueryMovies(
      [FromQuery] string? movieTitle, 
      [FromQuery] int? year, 
      [FromQuery] int? endYear,
      [FromQuery] List<string>? category,
      [FromQuery] List<string>? genre
    )
    {
      try
      {
        IEnumerable<Movie> movies = await _movieService.GetMoviesByQueries(movieTitle, year, endYear, category, genre);
        if (!movies.Any())
        {
          return NotFound();
        }

        return Ok(movies);
      }
      catch (MovieException ex) when (ex.ErrorType == MovieErrorType.NotFound)
      {
        if (_logger.IsEnabled(LogLevel.Error))
        {
          _logger.LogError(ex, "Failed to retrieve movies from query");
        }
        return NotFound();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An unexpected error has occurred in QueryMovies Controller");
        return Problem();
      }
    }
  }
}