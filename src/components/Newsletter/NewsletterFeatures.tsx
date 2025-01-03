import { motion } from 'framer-motion';
import { Video, BookOpen, Sparkles, Bell, Zap, Star, Rocket, Crown } from 'lucide-react';

const features = [
  {
    icon: Video,
    secondaryIcon: Star,
    title: 'Behind the Scenes Access',
    description: 'Watch how we built Beat or Bot using AI tools',
    gradient: 'from-blue-500/20 to-purple-600/20',
    iconGradient: 'from-blue-400 to-purple-500'
  },
  {
    icon: BookOpen,
    secondaryIcon: Rocket,
    title: 'Exclusive Tutorials',
    description: 'Step-by-step guides on using AI tools',
    gradient: 'from-purple-500/20 to-pink-600/20',
    iconGradient: 'from-purple-400 to-pink-500'
  },
  {
    icon: Sparkles,
    secondaryIcon: Zap,
    title: 'Latest AI Trends',
    description: 'Stay ahead with cutting-edge AI developments',
    gradient: 'from-pink-500/20 to-orange-600/20',
    iconGradient: 'from-pink-400 to-orange-500'
  },
  {
    icon: Bell,
    secondaryIcon: Crown,
    title: 'Early Access',
    description: 'Be first to try new features and tools',
    gradient: 'from-orange-500/20 to-yellow-600/20',
    iconGradient: 'from-orange-400 to-yellow-500'
  }
];

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.48, 0.15, 0.25, 0.96]
    }
  }),
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  }
};

const iconVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.1,
    rotate: [0, -10, 10, -5, 5, 0],
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse' as const
    }
  }
};

export function NewsletterFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const SecondaryIcon = feature.secondaryIcon;
        return (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            variants={cardVariants}
            className="group relative"
          >
            <div 
              className={`absolute inset-0 ${feature.gradient} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
            />
            <div className="relative flex items-start space-x-4 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 overflow-hidden">
              <div className="flex-shrink-0 relative">
                <motion.div
                  variants={iconVariants}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.iconGradient} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-white/10 rounded-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <SecondaryIcon className="w-3 h-3 text-white" />
                  </motion.div>
                </motion.div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-300 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
              <motion.div
                className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/5 to-white/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}