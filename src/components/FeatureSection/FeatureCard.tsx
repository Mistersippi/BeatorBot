import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import './styles.css';

interface FeatureCardProps {
  icon: LucideIcon;
  title: 'AI-Powered Creation' | 'Independent Artists' | 'Creative Freedom' | 'Vibrant Community' | 
         'Support Artists' | 'Featured Creations' | 'Early Access' | 'Exclusive Content' | 
         'Special Events' | 'Premium Features' | 'Token Rewards' | 'Community Perks' |
         'Achievement System' | 'Fair Compensation' | 'Weekly Highlights' | 'Always Free';
  description: string;
  category?: 'Innovation' | 'Community' | 'Rewards' | 'Benefits';
}

export function FeatureCard({ icon: Icon, title, description, category }: FeatureCardProps) {
  // Define unique icon colors
  const iconColors: Record<FeatureCardProps['title'], string> = {
    'AI-Powered Creation': 'text-blue-500',
    'Independent Artists': 'text-emerald-500',
    'Creative Freedom': 'text-amber-500',
    'Vibrant Community': 'text-rose-500',
    'Support Artists': 'text-indigo-500',
    'Featured Creations': 'text-cyan-500',
    'Early Access': 'text-violet-500',
    'Exclusive Content': 'text-pink-500',
    'Special Events': 'text-orange-500',
    'Premium Features': 'text-teal-500',
    'Token Rewards': 'text-fuchsia-500',
    'Community Perks': 'text-lime-500',
    'Achievement System': 'text-purple-500',
    'Fair Compensation': 'text-purple-500',
    'Weekly Highlights': 'text-purple-500',
    'Always Free': 'text-purple-500'
  } as const;

  // Category-specific colors for tags
  const categoryColors = {
    Innovation: {
      tag: "bg-blue-500 text-white border-blue-400"
    },
    Community: {
      tag: "bg-emerald-500 text-white border-emerald-400"
    },
    Rewards: {
      tag: "bg-amber-500 text-white border-amber-400"
    },
    Benefits: {
      tag: "bg-fuchsia-500 text-white border-fuchsia-400"
    }
  } as const;

  const colors = category ? categoryColors[category] : {
    tag: "bg-purple-500 text-white border-purple-400"
  };

  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
      whileHover={{
        y: -10,
        transition: {
          duration: 0.2,
          ease: "easeOut"
        }
      }}
      className="relative flex flex-col p-6 bg-[#FFFAF0] rounded-xl shadow-lg 
                 hover:shadow-2xl transition-all duration-300 feature-card
                 hover:bg-[#FFF8E7] group"
    >
      {/* Glow effect container */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-300/0 via-purple-300/0 to-purple-300/0 
                    group-hover:from-purple-300/20 group-hover:via-purple-300/20 group-hover:to-purple-300/20 
                    transition-all duration-300 -z-10 blur-xl"></div>

      {category && (
        <span className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${colors.tag}`}>
          {category}
        </span>
      )}
      
      <div className="flex items-center mb-4">
        <div className={`relative p-2 rounded-lg ${iconColors[title] || 'text-purple-500'} 
                        transition-transform duration-700 group-hover:rotate-[360deg]`}>
          <Icon className="w-6 h-6 relative z-10" />
          {/* Sparkle effects */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
            <div className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full animate-sparkle-1"></div>
            <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-sparkle-2"></div>
            <div className="absolute bottom-1 left-2 w-1 h-1 bg-white rounded-full animate-sparkle-3"></div>
            <div className="absolute bottom-0 right-0 w-1 h-1 bg-white rounded-full animate-sparkle-4"></div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2 text-purple-700 group-hover:text-purple-800 
                     transition-colors duration-300">{title}</h3>
      <p className="text-purple-600/80 group-hover:text-purple-700/90 
                    transition-colors duration-300">{description}</p>
    </motion.div>
  );
}