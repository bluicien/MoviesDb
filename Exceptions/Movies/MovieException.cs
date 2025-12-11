namespace MoviesApi.Exceptions.Movies
{
  public enum MovieErrorType
  {
      NotFound,
      UpdateFailed,
      CreateFailed,
      ValidationFailed,
  }

  public class MovieException : Exception
  {
      public MovieErrorType ErrorType { get; }
      public MovieException(MovieErrorType type, string message, Exception? innerException) : base(message, innerException)
      {
          ErrorType = type;
      }
      public MovieException(MovieErrorType type, string message) : base(message)
      {
          ErrorType = type;
      }
  }
}