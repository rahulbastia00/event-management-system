export interface Event {
  id: number;
  title: string;
  description: string;
  date: string; // Assuming format "YYYY-MM-DD"
  time: string; // Assuming format "HH:MM:SS"
  image_url: string | null;
  owner_id: number;
}