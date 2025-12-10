using MoviesApi.Models;

namespace MoviesApi.Services.Interfaces
{
  public interface IMovieService
  {
    Task<IEnumerable<Movie>> GetAllMovies();
    Task<Movie> GetMovieById(Guid id);
    Task<Movie> GetMovieByName(string movieName);
    Task<Movie> GetMovieByYear(int year);
    Task<Movie> GetMovieByCategory(string category);
    Task AddMovie(Movie movie);
    Task UpdateMovie(Movie movie);
  }
}