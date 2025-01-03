import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export function NewsletterHeader() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="inline-flex items-center justify-center space-x-3 mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
          <div className="relative bg-white/10 backdrop-blur-xl px-8 py-4 rounded-2xl border border-white/20">
            <Mail className="w-8 h-8 text-purple-300 animate-pulse" />
          </div>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
          Join Aideations
        </h2>
      </motion.div>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed"
      >
        One of the most comprehensive semi-daily newsletters in the world of AI,
        sharing the latest news, tutorials, research, trends and more.
      </motion.p>
    </motion.div>
  );
}