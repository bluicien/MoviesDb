import { useQuery } from "@tanstack/react-query";
import { api } from "../../libs/api";

async function fetchMovies() {
  const res = await api.get("/api/movies");
  return res.data;
}

export function useMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });  
}