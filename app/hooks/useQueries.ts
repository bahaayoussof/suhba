import { useQuery } from "@tanstack/react-query";
import { getWorlds, getSessions } from "../services/api";

export function useWorldsQuery() {
  return useQuery({
    queryKey: ["worlds"],
    queryFn: getWorlds,
  });
}

export function useSessionsQuery() {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: getSessions,
  });
}
