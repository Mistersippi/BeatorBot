import { Play, Users, CheckCircle, Share2 } from 'lucide-react';

interface AnalyticsStatsProps {
  stats: {
    plays: number;
    uniquePlays: number;
    correctGuesses: number;
    incorrectGuesses: number;
    averageListenTime: number;
    shares: number;
  };
}

export function AnalyticsStats({ stats }: AnalyticsStatsProps) {
  const metrics = [
    {
      icon: Play,
      label: 'Total Plays',
      value: stats.plays.toLocaleString(),
      color: 'text-blue-500'
    },
    {
      icon: Users,
      label: 'Unique Listeners',
      value: stats.uniquePlays.toLocaleString(),
      color: 'text-purple-500'
    },
    {
      icon: CheckCircle,
      label: 'Correct Guesses',
      value: `${Math.round((stats.correctGuesses / (stats.correctGuesses + stats.incorrectGuesses)) * 100)}%`,
      color: 'text-green-500'
    },
    {
      icon: Share2,
      label: 'Shares',
      value: stats.shares.toLocaleString(),
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-opacity-10 ${color} bg-current`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="font-semibold">{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}