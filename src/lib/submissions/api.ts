import { supabase } from '../supabase/client';
import { SubmissionFormData } from './types';
import { logError } from '../error';

export async function submitTrack(formData: SubmissionFormData) {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;
    if (!user) throw new Error('Not authenticated');

    // First get or create user profile
    const { data: userData, error: userError } = await supabase
      .from('users')
      .upsert({
        auth_id: user.id,
        email: user.email!,
        username: user.user_metadata.username || user.email!.split('@')[0]
      }, {
        onConflict: 'auth_id',
        returning: true
      })
      .select('id')
      .single();

    if (userError) throw userError;
    if (!userData) throw new Error('Failed to get or create user profile');

    // Submit track with initial pending status
    const { data, error: submitError } = await supabase
      .from('submissions')
      .insert({
        user_id: userData.id,
        title: formData.trackTitle,
        artist_name: formData.artistName,
        genre: formData.genre,
        audio_url: formData.audioUrl,
        image_url: formData.imageUrl || null,
        is_ai_generated: formData.isAiGenerated,
        status: 'pending', // Explicitly set status to pending
        metadata: {
          spotify_url: formData.spotifyUrl,
          apple_music_url: formData.appleMusicUrl,
          contact_email: formData.contactEmail
        },
        mood_tags: formData.moodTags || [],
        activity_tags: formData.activityTags || [],
        time_tags: formData.timeTags || [],
        energy_level: formData.energyLevel || null,
        weather_tags: formData.weatherTags || [],
        bpm: formData.bpm || null
      })
      .select()
      .single();

    if (submitError) throw submitError;
    return { data, error: null };
  } catch (error) {
    logError('Submission failed', error);
    return { data: null, error };
  }
}