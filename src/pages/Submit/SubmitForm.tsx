import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Image as ImageIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { syncUserProfile } from '../../lib/supabase/auth/operations';
import * as z from 'zod';
import { useAuth } from '../../components/auth/AuthContext';
import { FileInput } from './components/FileInput';
import { AdvancedTags } from './components/AdvancedTags';
import { uploadAudioTrack, uploadTrackArtwork } from '../../lib/supabase/storage';
import { supabase } from '../../lib/supabase/client';
import { DEFAULT_TRACK_IMAGE, GENRES, SUBGENRES } from '../../lib/constants';
import { AUDIO_BUCKET, IMAGE_BUCKET } from '../../lib/supabase/storage';
import { SubmissionSuccess } from './SubmissionSuccess';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB for audio
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB for images

const submitFormSchema = z.object({
  title: z.string().min(1, 'Track title is required'),
  artistName: z.string().min(1, 'Artist name is required'),
  isAiGenerated: z.boolean(),
  genre: z.enum(GENRES, {
    required_error: "Please select a genre",
    invalid_type_error: "Please select a valid genre"
  }),
  subgenre: z.string().min(1, 'Please select a subgenre'),
  description: z.string().optional(),
  audioTrack: z.custom<File>((v) => v instanceof File, 'Audio track is required'),
  coverImage: z.custom<File>((v) => v instanceof File).optional(),
  spotifyUrl: z.string().url().optional().or(z.literal('')),
  appleMusicUrl: z.string().url().optional().or(z.literal('')),
  artistWebsite: z.string().url().optional().or(z.literal('')),
  moodTags: z.array(z.string()),
  activityTags: z.array(z.string()),
  timeOfDay: z.string(),
  energyLevel: z.string(),
  weatherVibe: z.string(),
  hasRights: z.boolean().refine((val) => val === true, {
    message: 'You must confirm that you have the rights to submit this track'
  }),
});

type SubmitFormData = z.infer<typeof submitFormSchema>;

type AdvancedTagsData = {
  moodTags: string[];
  activityTags: string[];
  timeOfDay: string;
  energyLevel: string;
  weatherVibe: string;
};

export function SubmitForm() {
  const { user, setShowSignIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If not authenticated, show sign in modal
    if (!user) {
      setShowSignIn(true);
      return;
    }

    // Verify user profile exists
    const checkUserProfile = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error || !data) {
        console.error('Error fetching user profile:', error);
        // Try to sync profile
        const { error: syncError } = await syncUserProfile(user);
        if (syncError) {
          console.error('Error syncing user profile:', syncError);
          setSubmitError('Unable to verify user profile. Please try signing out and back in.');
        }
      }
    };

    checkUserProfile();
  }, [user, setShowSignIn]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<SubmitFormData>({
    resolver: zodResolver(submitFormSchema),
    defaultValues: {
      moodTags: [],
      activityTags: [],
      timeOfDay: '',
      energyLevel: '',
      weatherVibe: '',
      hasRights: false,
      isAiGenerated: false,
      spotifyUrl: '',
      appleMusicUrl: '',
      artistWebsite: '',
      genre: undefined,
      subgenre: '',
    }
  });

  const selectedGenre = watch('genre');

  // Reset subgenre when genre changes
  useEffect(() => {
    if (selectedGenre) {
      setValue('subgenre', '');
    }
  }, [selectedGenre, setValue]);

  const onSubmit = async (data: SubmitFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Upload audio track
      const { url: audioUrl, path: audioPath } = await uploadAudioTrack(data.audioTrack);

      // Upload cover image if provided
      let imageUrl: string | null = null;
      let imagePath: string | null = null;
      if (data.coverImage) {
        const imageResult = await uploadTrackArtwork(data.coverImage);
        imageUrl = imageResult.url;
        imagePath = imageResult.path;
      }

      // Get user ID
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('User not found');

      // Create submission
      const submission: Database['public']['Tables']['submissions']['Insert'] = {
        user_id: user.id,
        title: data.title,
        artist_name: data.artistName,
        genre: data.genre,
        subgenre: data.subgenre,
        description: data.description || null,
        audio_url: audioUrl,
        image_url: imageUrl,
        is_ai_generated: data.isAiGenerated,
        spotify_url: data.spotifyUrl || null,
        apple_music_url: data.appleMusicUrl || null,
        artist_website: data.artistWebsite || null,
        mood_tags: data.moodTags,
        activity_tags: data.activityTags,
        time_of_day: data.timeOfDay,
        energy_level: data.energyLevel,
        weather_vibe: data.weatherVibe,
        status: 'pending',
        metadata: {
          audio_path: audioPath,
          image_path: imagePath,
          submission_date: new Date().toISOString()
        }
      };

      const { error: submitError } = await supabase
        .from('submissions')
        .insert([submission]);

      if (submitError) {
        // If submission fails, clean up uploaded files
        if (audioPath) {
          await supabase.storage.from(AUDIO_BUCKET).remove([audioPath]);
        }
        if (imagePath) {
          await supabase.storage.from(IMAGE_BUCKET).remove([imagePath]);
        }
        throw submitError;
      }

      setShowSuccess(true);
    } catch (error: any) {
      console.error('Submission error:', error);
      setSubmitError(error.message || 'Failed to submit track');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Your Track</h1>
            <p className="text-gray-600">Share your music with our community</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    {...register('isAiGenerated')}
                    className="mt-1 h-5 w-5 rounded border-yellow-400 text-yellow-600 focus:ring-yellow-500"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-yellow-800">AI-Generated Track</span>
                    <span className="text-sm text-yellow-700">
                      Check this box if your track was created using AI tools like Stable Audio, Suno, or other AI music generators.
                      This information is used for gameplay mechanics.
                    </span>
                  </div>
                </label>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Track Title *"
                  {...register('title')}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  required
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Artist Name *"
                  {...register('artistName')}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  required
                />
                {errors.artistName && (
                  <p className="text-sm text-red-500 mt-1">{errors.artistName.message}</p>
                )}
              </div>

              <div>
                <textarea
                  placeholder="Description (optional)"
                  {...register('description')}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white h-24 resize-none"
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <select
                  {...register('genre')}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                >
                  <option value="">Select Genre *</option>
                  {GENRES.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                {errors.genre && (
                  <p className="text-sm text-red-500 mt-1">{errors.genre.message}</p>
                )}
              </div>

              {selectedGenre && (
                <div>
                  <select
                    {...register('subgenre')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Subgenre *</option>
                    {SUBGENRES[selectedGenre].map((subgenre) => (
                      <option key={subgenre} value={subgenre}>
                        {subgenre}
                      </option>
                    ))}
                  </select>
                  {errors.subgenre && (
                    <p className="text-sm text-red-500 mt-1">{errors.subgenre.message}</p>
                  )}
                </div>
              )}
              <FileInput
                label="Audio Track"
                icon={Music}
                accept="audio/mpeg,.mp3"
                maxSize={MAX_FILE_SIZE}
                onChange={(file) => {
                  if (file) {
                    setValue('audioTrack', file, { shouldValidate: true });
                  }
                }}
                required={true}
                helperText="Upload your MP3 track (max 50MB). High-quality audio recommended for best streaming experience."
              />
              {errors.audioTrack && (
                <p className="text-sm text-red-500">{errors.audioTrack.message}</p>
              )}

              <FileInput
                label="Cover Image"
                icon={ImageIcon}
                accept="image/jpeg,.jpg,.jpeg"
                maxSize={MAX_IMAGE_SIZE}
                onChange={(file) => setValue('coverImage', file || undefined, { shouldValidate: true })}
                required={false}
                helperText="Optional: Upload track artwork (JPG/JPEG, max 5MB). If not provided, we'll use our default logo."
                recommendedDimensions="500x500"
              />
              {errors.coverImage && (
                <p className="text-sm text-red-500">{errors.coverImage.message}</p>
              )}

              <div className="space-y-6 bg-purple-50 p-6 rounded-xl">
                <div className="mb-4">
                  <h3 className="font-medium text-purple-900">Artist Links</h3>
                  <p className="text-sm text-purple-800 mt-1">
                    Adding your music platform links helps listeners discover more of your music! 
                    We'll display these links alongside your track, making it easy for users to 
                    follow you on their preferred platforms.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <input
                      type="url"
                      placeholder="Spotify Artist URL (optional)"
                      {...register('spotifyUrl')}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    />
                    {errors.spotifyUrl && (
                      <p className="text-sm text-red-500 mt-1">Please enter a valid URL</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="url"
                      placeholder="Apple Music Artist URL (optional)"
                      {...register('appleMusicUrl')}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    />
                    {errors.appleMusicUrl && (
                      <p className="text-sm text-red-500 mt-1">Please enter a valid URL</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="url"
                      placeholder="Artist Website (optional)"
                      {...register('artistWebsite')}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    />
                    {errors.artistWebsite && (
                      <p className="text-sm text-red-500 mt-1">Please enter a valid URL</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Advanced Tagging Section */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-900">Advanced Tagging</span>
                  {showAdvanced ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {showAdvanced && (
                  <div className="p-4 space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg mb-4">
                      <p className="text-sm text-purple-900">
                        Adding detailed tags helps your music reach the right audience! Our recommendation engine uses these tags to:
                        <ul className="list-disc ml-5 mt-2 space-y-1">
                          <li>Match your tracks with listeners' moods and activities</li>
                          <li>Include your music in curated playlists</li>
                          <li>Suggest your tracks at the perfect time of day</li>
                          <li>Boost discovery through contextual recommendations</li>
                        </ul>
                      </p>
                    </div>

                    <AdvancedTags
                      data={{
                        moodTags: watch('moodTags') || [],
                        activityTags: watch('activityTags') || [],
                        timeOfDay: watch('timeOfDay') || '',
                        energyLevel: watch('energyLevel') || '',
                        weatherVibe: watch('weatherVibe') || '',
                      } satisfies AdvancedTagsData}
                      onChange={(data: AdvancedTagsData) => {
                        Object.entries(data).forEach(([key, value]) => {
                          setValue(key as keyof SubmitFormData, value);
                        });
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Upload Status */}
              <div id="uploadStatus" className="text-sm text-purple-600 text-center"></div>

              {/* Rights Confirmation */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    {...register('hasRights')}
                    className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm">
                    I confirm that I have the full rights to submit this track and agree to the{' '}
                    <a href="/terms" className="text-purple-600 hover:text-purple-700 underline">
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="/privacy" className="text-purple-600 hover:text-purple-700 underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.hasRights && (
                  <p className="text-sm text-red-500 mt-2">{errors.hasRights.message}</p>
                )}
              </div>

              {submitError && (
                <p className="text-sm text-red-500 text-center">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full py-3 px-4 rounded-lg text-white font-medium
                  ${isSubmitting 
                    ? 'bg-purple-400 cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-700'}
                  transition-colors duration-200
                `}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Track'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <SubmissionSuccess onClose={() => {
            setShowSuccess(false);
            navigate('/submissions');
          }} />
        </div>
      )}
    </>
  );
}