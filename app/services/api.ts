import axios from "axios";
import type { MajlisCardProps, WorldCardProps } from "../../types/types";
import { mockSessions, mockWorlds } from "../../constants";

const isServer = typeof window === "undefined";

const api = axios.create({
  baseURL: isServer ? "https://suhba-backend-dev.tazkiah.me/api/v1" : "/api/v1",
});

export async function getWorlds(): Promise<WorldCardProps[]> {
  try {
    const res = await api.get<WorldCardProps[]>("/environments");
    return res.data;
  } catch (error) {
    console.warn("Failed to fetch real data from environments.", error);
    // return new Promise(resolve => setTimeout(() => resolve(mockWorlds), 1000));
    return [];
  }
}

export async function getSessions(): Promise<MajlisCardProps[]> {
  try {
    const res = await api.get<MajlisCardProps[]>("/spaces");
    return res.data;
  } catch (error) {
    console.warn("Failed to fetch real data from spaces.", error);
    // return new Promise(resolve => setTimeout(() => resolve(mockSessions), 1000));
    return [];
  }
}
