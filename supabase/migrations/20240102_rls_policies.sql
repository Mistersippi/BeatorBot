-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = auth_id)
WITH CHECK (auth.uid() = auth_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = auth_id);

-- Submissions policies
CREATE POLICY "Approved submissions are viewable by everyone"
ON public.submissions FOR SELECT
USING (status = 'approved' OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own submissions"
ON public.submissions FOR INSERT
WITH CHECK (auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE id = user_id
));

CREATE POLICY "Users can update their own submissions"
ON public.submissions FOR UPDATE
USING (auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE id = user_id
))
WITH CHECK (auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE id = user_id
));

CREATE POLICY "Admins can update any submission"
ON public.submissions FOR UPDATE
USING (auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE account_type = 'admin'
))
WITH CHECK (auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE account_type = 'admin'
));

-- Game results policies
CREATE POLICY "Users can view their own game results"
ON public.game_results FOR SELECT
USING (auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE id = user_id
));

CREATE POLICY "Users can insert their own game results"
ON public.game_results FOR INSERT
WITH CHECK (auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE id = user_id
));

-- Playlists policies
CREATE POLICY "Public playlists are viewable by everyone"
ON public.playlists FOR SELECT
USING (is_public OR auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE id = user_id
));

CREATE POLICY "Users can insert their own playlists"
ON public.playlists FOR INSERT
WITH CHECK (auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE id = user_id
));

CREATE POLICY "Users can update their own playlists"
ON public.playlists FOR UPDATE
USING (auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE id = user_id
))
WITH CHECK (auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE id = user_id
));

-- Playlist tracks policies
CREATE POLICY "Users can view tracks in public playlists"
ON public.playlist_tracks FOR SELECT
USING (
    playlist_id IN (
        SELECT id FROM public.playlists WHERE is_public
    ) OR auth.uid() IN (
        SELECT auth_id FROM public.profiles p
        JOIN public.playlists pl ON p.id = pl.user_id
        WHERE pl.id = playlist_id
    )
);

CREATE POLICY "Users can add tracks to their playlists"
ON public.playlist_tracks FOR INSERT
WITH CHECK (auth.uid() IN (
    SELECT auth_id FROM public.profiles p
    JOIN public.playlists pl ON p.id = pl.user_id
    WHERE pl.id = playlist_id
));

CREATE POLICY "Users can remove tracks from their playlists"
ON public.playlist_tracks FOR DELETE
USING (auth.uid() IN (
    SELECT auth_id FROM public.profiles p
    JOIN public.playlists pl ON p.id = pl.user_id
    WHERE pl.id = playlist_id
));

-- Follows policies
CREATE POLICY "Anyone can view follows"
ON public.follows FOR SELECT
USING (true);

CREATE POLICY "Users can manage their follows"
ON public.follows FOR INSERT
WITH CHECK (auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE id = follower_id
));

CREATE POLICY "Users can unfollow"
ON public.follows FOR DELETE
USING (auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE id = follower_id
));

-- Likes policies
CREATE POLICY "Anyone can view likes"
ON public.likes FOR SELECT
USING (true);

CREATE POLICY "Users can manage their likes"
ON public.likes FOR INSERT
WITH CHECK (auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE id = user_id
));

CREATE POLICY "Users can unlike"
ON public.likes FOR DELETE
USING (auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE id = user_id
));

-- Comments policies
CREATE POLICY "Anyone can view comments"
ON public.comments FOR SELECT
USING (true);

CREATE POLICY "Users can insert comments"
ON public.comments FOR INSERT
WITH CHECK (auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE id = user_id
));

CREATE POLICY "Users can update their own comments"
ON public.comments FOR UPDATE
USING (auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE id = user_id
))
WITH CHECK (auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE id = user_id
));

CREATE POLICY "Users can delete their own comments"
ON public.comments FOR DELETE
USING (auth.uid() IN (
    SELECT auth_id FROM public.profiles WHERE id = user_id
));
