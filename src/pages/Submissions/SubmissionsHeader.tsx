import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

export function SubmissionsHeader() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6"
      >
        <Music className="w-8 h-8 text-purple-600" />
      </motion.div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-bold mb-2"
      >
        My Submissions
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-gray-600"
      >
        Track and manage your music submissions
      </motion.p>
    </div>
  );
}