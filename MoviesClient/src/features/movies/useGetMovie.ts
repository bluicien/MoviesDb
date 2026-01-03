import { useQuery } from "@tanstack/react-query";
import type { Movie } from "./schemas";
import { fetchMovie } from "./api";

export function useGetMovie(movieId: string) {
  return useQuery<Movie>({
    queryKey: ["movies", movieId],
    queryFn: ({ queryKey }) => fetchMovie(queryKey[1] as string)
  });
}
