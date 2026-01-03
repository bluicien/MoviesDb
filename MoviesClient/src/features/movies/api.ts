import { api } from "../../libs/api"
import { handleErrors } from "../../libs/helpers";
import { MovieSchema, MoviesListSchema, type Movie, type MoviesList } from "./schemas";

export async function fetchMoviesList(): Promise<MoviesList> {
  try {
    const res = await api.get("/api/movies");
    return MoviesListSchema.parse(res.data);
  } catch (err) {
    handleErrors(err, "Failed to fetch movies.");
  }
}

export async function  fetchMovie(movieId: string): Promise<Movie> {
  try {
    const res = await api.get(`/api/movies/${movieId}`);
    return MovieSchema.parse(res.data);
  } catch (err) {
    handleErrors(err, "Failed to fetch movies.");
  }
}
