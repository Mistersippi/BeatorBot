import { motion } from 'framer-motion';

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function CTAButton({ children, onClick }: CTAButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}