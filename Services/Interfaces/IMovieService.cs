using MoviesApi.Models;

namespace MoviesApi.Services.Interfaces
{
  public interface IMovieService
  {
    Task<IEnumerable<Movie>> GetAllMovies();
    Task<Movie?> GetMovieById(Guid id);
    Task<IEnumerable<Movie>> GetMovieByName(string movieTitle);
    Task<IEnumerable<Movie>> GetMovieByYear(int year);
    Task<IEnumerable<Movie>> GetMovieByYear(int startYear, int endYear);
    Task<IEnumerable<Movie>> GetMovieByCategory(string category);
    Task<IEnumerable<Movie>> GetMoviesByQueries(string? movieTitle, int? year, int? endYear, List<string>? category, List<string>? genre);
    Task AddMovie(Movie movie);
    Task UpdateMovie(Movie movie);
  }
}