import { motion } from 'framer-motion';
import { Music, Brain } from 'lucide-react';

interface SharePreviewProps {
  score: number;
  total: number;
  genre: string;
  isGenerating: boolean;
}

export function SharePreview({ score, total, genre, isGenerating }: SharePreviewProps) {
  const percentage = Math.round((score / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 text-white mb-6 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent)]" />
      
      <div className="relative">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Music className="w-8 h-8" />
          <h3 className="text-2xl font-bold">Beat or Bot</h3>
          <Brain className="w-8 h-8" />
        </div>

        <div className="text-center mb-6">
          <p className="text-4xl font-bold mb-2">{percentage}%</p>
          <p className="text-xl opacity-90">
            {score} out of {total} correct
          </p>
          <p className="text-sm opacity-75 mt-2">Genre: {genre}</p>
        </div>

        <p className="text-center text-sm opacity-90">
          Think you can beat my score? Try the challenge!
        </p>
      </div>

      {isGenerating && (
        <div className="absolute inset-0 bg-purple-900/50 backdrop-blur-sm flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
        </div>
      )}
    </motion.div>
  );
}