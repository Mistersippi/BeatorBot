import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

interface ResultsHeaderProps {
  score: number;
  total: number;
  percentage: number;
  genre: string;
}

export function ResultsHeader({ score, total, percentage, genre }: ResultsHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
        <Award className="w-10 h-10 text-purple-600" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Challenge Complete!</h1>
      <p className="text-xl text-gray-600 mb-2">
        You scored {score} out of {total} ({percentage}%)
      </p>
      <p className="text-gray-500">Genre: {genre}</p>
    </motion.div>
  );
}