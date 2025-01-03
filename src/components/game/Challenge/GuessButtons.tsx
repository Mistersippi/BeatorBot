import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';

interface GuessButtonsProps {
  onGuess: (isAIGuess: boolean) => void;
  disabled?: boolean;
}

export function GuessButtons({ onGuess, disabled = false }: GuessButtonsProps) {
  return (
    <div className="flex justify-center gap-4 mt-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onGuess(false)}
        disabled={disabled}
        className="flex-1 max-w-xs flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <User className="w-5 h-5" />
        Real Artist
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onGuess(true)}
        disabled={disabled}
        className="flex-1 max-w-xs flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Bot className="w-5 h-5" />
        AI Generated
      </motion.button>
    </div>
  );
}