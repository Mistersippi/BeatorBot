import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { GameTrack, AudioPlayerState } from './types';

interface AudioPlayerProps {
  track: GameTrack;
}

export function AudioPlayer({ track }: AudioPlayerProps) {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    isMuted: false,
    currentTime: 0,
    duration: track.duration,
    volume: 1
  });

  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset state when track changes
    setState(prev => ({
      ...prev,
      isPlaying: false,
      currentTime: 0,
      duration: track.duration
    }));

    // Set up audio event listeners
    const handlePlay = () => setState(prev => ({ ...prev, isPlaying: true }));
    const handlePause = () => setState(prev => ({ ...prev, isPlaying: false }));
    const handleTimeUpdate = () => setState(prev => ({ ...prev, currentTime: audio.currentTime }));
    const handleDurationChange = () => setState(prev => ({ ...prev, duration: audio.duration }));
    const handleVolumeChange = () => setState(prev => ({ ...prev, volume: audio.volume }));
    const handleEnded = () => setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
    const handleError = (e: ErrorEvent) => {
      console.error('Audio error:', e);
      setError('Failed to load audio. Please try again.');
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('volumechange', handleVolumeChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('volumechange', handleVolumeChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [track]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (state.isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.error('Playback error:', err);
        setError('Failed to play audio. Please try again.');
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !state.isMuted;
    setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setState(prev => ({ ...prev, currentTime: time }));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const volume = parseFloat(e.target.value);
    audioRef.current.volume = volume;
    setState(prev => ({ ...prev, volume }));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <audio
        ref={audioRef}
        src={track.audio_url}
        preload="auto"
        onError={() => setError('Failed to load audio')}
      />

      {error && (
        <div className="flex items-center space-x-2 text-red-600 mb-4">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="flex items-center space-x-6">
        <button
          onClick={togglePlay}
          className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          disabled={!!error}
        >
          {state.isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={state.duration}
            value={state.currentTime}
            onChange={handleSeek}
            className="w-full"
            disabled={!!error}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>{formatTime(state.currentTime)}</span>
            <span>{formatTime(state.duration)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMute}
            className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
            disabled={!!error}
          >
            {state.isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={state.volume}
            onChange={handleVolumeChange}
            className="w-20"
            disabled={!!error}
          />
        </div>
      </div>
    </div>
  );
}