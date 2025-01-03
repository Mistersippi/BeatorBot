import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

interface ShareOptionsProps {
  onShare: (platform: 'facebook' | 'twitter' | 'linkedin') => void;
}

export function ShareOptions({ onShare }: ShareOptionsProps) {
  const platforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2] hover:bg-[#0C63D4]',
      onClick: () => onShare('facebook')
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      color: 'bg-black hover:bg-gray-900',
      onClick: () => onShare('twitter')
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-[#0A66C2] hover:bg-[#084D93]',
      onClick: () => onShare('linkedin')
    }
  ];

  return (
    <div className="space-y-3">
      {platforms.map((platform) => {
        const Icon = platform.icon;
        return (
          <motion.button
            key={platform.name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={platform.onClick}
            className={`w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-xl text-white transition-colors ${platform.color}`}
          >
            <Icon className="w-5 h-5" />
            <span>Share on {platform.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
}