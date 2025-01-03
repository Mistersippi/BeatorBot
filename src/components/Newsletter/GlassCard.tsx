import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity rounded-3xl" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}