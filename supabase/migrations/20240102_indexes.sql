-- Profiles indexes
CREATE INDEX profiles_username_trgm_idx ON public.profiles USING GIN (username gin_trgm_ops);
CREATE INDEX profiles_account_type_idx ON public.profiles (account_type);
CREATE INDEX profiles_account_status_idx ON public.profiles (account_status);

-- Submissions indexes
CREATE INDEX submissions_user_id_idx ON public.submissions (user_id);
CREATE INDEX submissions_genre_idx ON public.submissions (genre);
CREATE INDEX submissions_status_idx ON public.submissions (status);
CREATE INDEX submissions_created_at_idx ON public.submissions (created_at DESC);
CREATE INDEX submissions_mood_tags_idx ON public.submissions USING GIN (mood_tags);
CREATE INDEX submissions_activity_tags_idx ON public.submissions USING GIN (activity_tags);
CREATE INDEX submissions_time_of_day_idx ON public.submissions USING GIN (time_of_day);
CREATE INDEX submissions_weather_vibe_idx ON public.submissions USING GIN (weather_vibe);

-- Game results indexes
CREATE INDEX game_results_user_id_idx ON public.game_results (user_id);
CREATE INDEX game_results_genre_idx ON public.game_results (genre);
CREATE INDEX game_results_created_at_idx ON public.game_results (created_at DESC);
CREATE INDEX game_results_score_idx ON public.game_results (score DESC);

-- Playlists indexes
CREATE INDEX playlists_user_id_idx ON public.playlists (user_id);
CREATE INDEX playlists_is_public_idx ON public.playlists (is_public);
CREATE INDEX playlists_created_at_idx ON public.playlists (created_at DESC);

-- Playlist tracks indexes
CREATE INDEX playlist_tracks_track_id_idx ON public.playlist_tracks (track_id);
CREATE INDEX playlist_tracks_added_at_idx ON public.playlist_tracks (added_at DESC);

-- Follows indexes
CREATE INDEX follows_following_id_idx ON public.follows (following_id);
CREATE INDEX follows_created_at_idx ON public.follows (created_at DESC);

-- Likes indexes
CREATE INDEX likes_track_id_idx ON public.likes (track_id);
CREATE INDEX likes_created_at_idx ON public.likes (created_at DESC);

-- Comments indexes
CREATE INDEX comments_track_id_idx ON public.comments (track_id);
CREATE INDEX comments_user_id_idx ON public.comments (user_id);
CREATE INDEX comments_created_at_idx ON public.comments (created_at DESC);
