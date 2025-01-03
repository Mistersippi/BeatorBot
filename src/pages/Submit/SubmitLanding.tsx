import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import { useAuth } from '../../components/auth/AuthContext';

export function SubmitLanding() {
  const { setShowSignUp } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-32 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-8"
        >
          <Music className="w-10 h-10 text-purple-600" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Submit Your Music
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 mb-12"
        >
          Share your music with our community and let listeners discover your talent.
        </motion.p>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSignUp(true)}
          className="px-8 py-4 bg-purple-600 text-white rounded-xl text-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Sign Up to Submit Music
        </motion.button>
      </div>
    </div>
  );
}