export interface Track {
  id: string;
  created_at: string;
  title: string;
  artist_name: string;
  genre: string;
  subgenre: string;
  is_ai_generated: boolean;
  description?: string;
  audio_url: string;
  image_url: string;
  spotify_url?: string;
  apple_music_url?: string;
  artist_website?: string;
  mood_tags: string[];
  activity_tags: string[];
  time_of_day: string;
  energy_level: string;
  weather_vibe: string;
}
