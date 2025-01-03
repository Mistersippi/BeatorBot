import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Share2, RefreshCw, Trophy, Home } from 'lucide-react';
import { ResultsActionsProps } from './types';

interface ResultsActionsProps {
  score: number;
  total: number;
  genre: string;
  onShare: () => void;
  onPlayAgain: () => void;
}

export function ResultsActions({ score, total, genre, onShare, onPlayAgain }: ResultsActionsProps) {
  const navigate = useNavigate();

  const actions = [
    {
      icon: RefreshCw,
      label: 'Play Again',
      onClick: onPlayAgain,
      primary: true,
      color: 'bg-purple-600 hover:bg-purple-700 text-white'
    },
    {
      icon: Share2,
      label: 'Share Results',
      onClick: onShare,
      primary: false,
      color: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'
    },
    {
      icon: Trophy,
      label: 'Leaderboard',
      onClick: () => navigate('/leaderboard', { 
        state: { 
          genre: genre,
          timeframe: 'weekly'
        } 
      }),
      primary: false,
      color: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'
    },
    {
      icon: Home,
      label: 'Home',
      onClick: () => navigate('/'),
      primary: false,
      color: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          onClick={action.onClick}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`
            flex items-center justify-center space-x-2 px-4 py-3 
            rounded-xl shadow-sm transition-colors duration-200
            ${action.color}
            ${action.primary ? 'col-span-2 md:col-span-1' : ''}
          `}
        >
          <action.icon className="w-5 h-5" />
          <span className="font-medium">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
}