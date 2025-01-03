import { motion } from 'framer-motion';

export function NewsletterBackground() {
  return (
    <>
      {/* Main gradient */}
      <div className="absolute inset-0 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-purple-900 via-purple-800 to-indigo-900" />
      
      {/* Mesh gradient */}
      <div className="absolute inset-0 bg-[url('/mesh.png')] opacity-30 mix-blend-overlay" />
      
      {/* Animated circles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-overlay"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{
            duration: 10,
            delay: i * 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            width: `${300 + i * 100}px`,
            height: `${300 + i * 100}px`,
            left: `${20 + i * 15}%`,
            top: `${20 + i * 10}%`,
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)'
          }}
        />
      ))}
    </>
  );
}