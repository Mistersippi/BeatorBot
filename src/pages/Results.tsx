import { useLocation, useNavigate } from 'react-router-dom';
import { ResultsHeader } from '../components/game/Results/ResultsHeader';
import { ResultsBreakdown } from '../components/game/Results/ResultsBreakdown';
import { ResultsActions } from '../components/game/Results/ResultsActions';
import { ResultsStats } from '../components/game/Results/ResultsStats';
import { Leaderboard } from '../components/game/Results/Leaderboard';
import { mockLeaderboardData } from '../components/game/Results/mockLeaderboardData';
import type { Track } from '../components/game/Challenge/types';

interface ResultsState {
  tracks: Track[];
  answers: boolean[];
  score: number;
  genre: string;
}

export function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultsState;

  if (!state) {
    navigate('/');
    return null;
  }

  const { tracks, answers, score, genre } = state;
  const percentage = Math.round((score / tracks.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-24 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ResultsHeader score={score} total={tracks.length} percentage={percentage} genre={genre} />
            <ResultsStats answers={answers} tracks={tracks} />
            <ResultsBreakdown tracks={tracks} answers={answers} />
            <ResultsActions score={score} total={tracks.length} genre={genre} />
          </div>
          
          <div>
            <Leaderboard
              entries={mockLeaderboardData}
              currentUserId="2" // This would come from auth context in a real app
              hasMore={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}