import type { MoviesList } from './schemas';
import { useQuery } from "@tanstack/react-query";
import { fetchMoviesList } from "./api";

export function useGetMoviesList() {
  return useQuery<MoviesList>({
    queryKey: ["movies"],
    queryFn: fetchMoviesList,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
}
