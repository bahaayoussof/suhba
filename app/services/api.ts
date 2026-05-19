import axios from "axios";
import type { MajlisCardProps, WorldCardProps } from "../../types";

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
    const res = await api.get<any[]>("/spaces");
    return res.data.map((session) => {
      let mappedStatus = "upcoming";
      const status = session.status;
      const scheduledAt = session.scheduledAt;

      if (status === "current" || status === "upcoming" || status === "past") {
        mappedStatus = status;
      } else if (status === "ACTIVE") {
        if (scheduledAt) {
          const scheduledTime = new Date(scheduledAt).getTime();
          const now = Date.now();
          if (scheduledTime > now) {
            mappedStatus = "upcoming";
          } else {
            mappedStatus = "current";
          }
        } else {
          mappedStatus = "current";
        }
      } else if (status === "ENDED" || status === "INACTIVE") {
        mappedStatus = "past";
      }

      return {
        ...session,
        status: mappedStatus,
        totalPlaces: session.totalPlaces ?? session.maxUsers ?? 50,
        currentAttendees: session.currentAttendees ?? 0,
      };
    });
  } catch (error) {
    console.warn("Failed to fetch real data from spaces.", error);
    return [];
  }
}
