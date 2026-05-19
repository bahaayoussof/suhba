import { useQuery } from "@tanstack/react-query";
import { getWorlds, getSessions } from "../services/api";

export function useWorldsQuery() {
  return useQuery({
    queryKey: ["worlds"],
    queryFn: getWorlds,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useSessionsQuery() {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: getSessions,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
