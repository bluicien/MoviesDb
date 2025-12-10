using Microsoft.AspNetCore.Mvc;
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
      catch (Exception ex)
      {
        _logger.LogError(ex, "Failed to retrieve all movies from MoveService");
        return Problem();
      }
    }
  }
}