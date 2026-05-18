export interface MajlisCardProps {
  id: string;
  title: string;
  description: string;
  currentAttendees: number;
  totalPlaces: number;
  status?: "current" | "upcoming" | "past";
  className?: string;
}

export interface WorldCardProps {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  coverImage: string;
}
