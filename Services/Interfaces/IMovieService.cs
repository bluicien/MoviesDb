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
    Task AddMovie(Movie movie);
    Task UpdateMovie(Movie movie);
  }
}