import { useParams } from "react-router"
import { useGetMovie } from "../../../features/movies/useGetMovie";
import LoadingSpinner from "../../../components/LoadingSpinner";
import MovieDetails from "../../../features/movies/components/MovieDetails";

function Movie() {
  const params = useParams();

  const { data, isLoading, error } = useGetMovie(params.id!);
  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;

  return <MovieDetails movie={data!} />
}

export default Movie
