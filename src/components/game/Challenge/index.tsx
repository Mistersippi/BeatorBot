import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../../components/auth/AuthContext';
import { supabase } from '../../../lib/supabase/client';
import { GameTrack, GameState, ProgressStats, Answer, GameResult } from './types';
import { AudioPlayer } from './AudioPlayer';
import { ProgressTracker } from './ProgressTracker';
import { GuessButtons } from './GuessButtons';

const TOTAL_TRACKS = 5;
const TIME_LIMIT = 30; // seconds per track

export function Challenge() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const genre = location.state?.genre;

  const [gameState, setGameState] = useState<GameState>({
    currentTrack: 0,
    score: 0,
    totalTracks: TOTAL_TRACKS,
    answers: [],
    startTime: new Date().toISOString()
  });

  const [tracks, setTracks] = useState<GameTrack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!genre || !user) {
      navigate('/');
      return;
    }

    const fetchTracks = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch random tracks for the selected genre
        const { data, error } = await supabase
          .from('submissions')
          .select('*')
          .eq('genre', genre)
          .eq('status', 'approved')
          .order('RANDOM()')
          .limit(TOTAL_TRACKS);

        if (error) throw error;
        if (!data || data.length < TOTAL_TRACKS) {
          throw new Error('Not enough tracks available for this genre');
        }

        // Add duration property to match GameTrack type
        const tracksWithDuration = data.map(track => ({
          ...track,
          duration: 180 // Default duration, should be fetched from audio metadata
        }));

        setTracks(tracksWithDuration);
      } catch (err: any) {
        console.error('Error fetching tracks:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, [genre, navigate, user]);

  const handleGuess = async (guess: boolean) => {
    if (!user) return;

    const currentTrack = tracks[gameState.currentTrack];
    const isCorrect = guess === currentTrack.is_ai_generated;
    
    const answer: Answer = {
      trackId: currentTrack.id,
      guess,
      isCorrect,
      timeSpent: TIME_LIMIT // Should be calculated from actual time spent
    };

    const newAnswers = [...gameState.answers, answer];
    const newScore = gameState.score + (isCorrect ? 1 : 0);

    setGameState(prev => ({
      ...prev,
      currentTrack: prev.currentTrack + 1,
      score: newScore,
      answers: newAnswers,
      endTime: prev.currentTrack + 1 === TOTAL_TRACKS ? new Date().toISOString() : undefined
    }));

    if (gameState.currentTrack + 1 === TOTAL_TRACKS) {
      // Game complete, save results
      const result: GameResult = {
        userId: user.id,
        genre,
        score: newScore,
        totalTracks: TOTAL_TRACKS,
        answers: newAnswers,
        startTime: gameState.startTime,
        endTime: new Date().toISOString(),
        metadata: {
          averageTime: newAnswers.reduce((acc, curr) => acc + curr.timeSpent, 0) / TOTAL_TRACKS,
          streakCount: calculateStreak(newAnswers),
          genreAccuracy: { [genre]: newScore / TOTAL_TRACKS }
        }
      };

      try {
        const { error } = await supabase
          .from('game_results')
          .insert([result]);

        if (error) throw error;

        // Navigate to results page
        navigate('/results', { state: { result } });
      } catch (err: any) {
        console.error('Error saving game results:', err);
        setError('Failed to save game results');
      }
    }
  };

  const calculateStreak = (answers: Answer[]): number => {
    let maxStreak = 0;
    let currentStreak = 0;
    
    for (const answer of answers) {
      if (answer.isCorrect) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }
    
    return maxStreak;
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentTrack = tracks[gameState.currentTrack];
  const isGameComplete = gameState.currentTrack === TOTAL_TRACKS;

  const stats: ProgressStats = {
    correct: gameState.score,
    total: gameState.totalTracks,
    percentage: Math.round((gameState.score / Math.max(1, gameState.answers.length)) * 100),
    averageTime: gameState.answers.reduce((acc, curr) => acc + curr.timeSpent, 0) / Math.max(1, gameState.answers.length)
  };

  if (isGameComplete) {
    return null; // Results page navigation is handled in handleGuess
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <ProgressTracker stats={stats} />
        
        <motion.div
          key={currentTrack.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-8"
        >
          <AudioPlayer track={currentTrack} />
          <GuessButtons
            onGuess={handleGuess}
            disabled={isLoading}
            timeLimit={TIME_LIMIT}
          />
        </motion.div>
      </div>
    </div>
  );
}