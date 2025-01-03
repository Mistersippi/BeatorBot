import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GlassCard } from './GlassCard';

export function NewsletterForm() {
  return (
    <GlassCard className="max-w-xl mx-auto overflow-hidden">
      <div className="p-8">
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-6 py-4 bg-white/5 rounded-xl border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
          />
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-lg group"
          >
            <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </div>
        <p className="text-sm text-white/70 text-center mt-4">
          Join 50,000+ AI enthusiasts. No spam, unsubscribe anytime.
        </p>
      </div>
    </GlassCard>
  );
}