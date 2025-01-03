import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

interface StartButtonProps {
  isVisible: boolean;
  onClick: () => void;
}

export function StartButton({ isVisible, onClick }: StartButtonProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="flex justify-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Challenge
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}