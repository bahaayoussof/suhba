import axios from "axios";
import type { MajlisCardProps, WorldCardProps } from "../../types/types";
import { mockSessions, mockWorlds } from "../../constants";

const BASE_URL = import.meta.env.VITE_API_BASEURL;

const api = axios.create({
  baseURL: BASE_URL,
});

export async function getWorlds(): Promise<WorldCardProps[]> {
  try {
    const res = await api.get<WorldCardProps[]>("/environments");
    return res.data;
  } catch (error) {
    console.warn("Failed to fetch real data from environments.", error);
    return new Promise(resolve => setTimeout(() => resolve(mockWorlds), 1000));
    // return [];
  }
}

export async function getSessions(): Promise<MajlisCardProps[]> {
  try {
    const res = await api.get<MajlisCardProps[]>("/spaces");
    return res.data;
  } catch (error) {
    console.warn("Failed to fetch real data from spaces.", error);
    return new Promise(resolve => setTimeout(() => resolve(mockSessions), 1000));
    // return [];
  }
}
