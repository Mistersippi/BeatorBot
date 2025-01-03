import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Headphones, Brain, Trophy, Music, Bot, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: Headphones,
    title: 'Listen & Discover',
    description: 'Immerse yourself in a curated playlist of tracks, where AI masterpieces blend seamlessly with human artistry',
    details: [
      'High-quality audio samples',
      'Diverse musical styles',
      'Cutting-edge AI generation'
    ]
  },
  {
    icon: Brain,
    title: 'Trust Your Instinct',
    description: 'Put your musical intuition to the test. Can you spot the subtle differences between AI and human creativity?',
    details: [
      'No time pressure',
      'Trust your ear',
      'Learn as you play'
    ]
  },
  {
    icon: Trophy,
    title: 'Rise & Compete',
    description: 'Join a global community of music enthusiasts and see how your ear for AI measures up on our leaderboards',
    details: [
      'Global rankings',
      'Daily challenges',
      'Share your results'
    ]
  }
];

export function HowItWorksSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.section 
      ref={ref} 
      className="py-24 px-4 bg-gradient-to-br from-purple-900 to-purple-800 text-white relative overflow-hidden"
      initial={{ 
        perspective: 1000,
        rotateX: 10,
        opacity: 0,
        y: 100
      }}
      animate={inView ? {
        rotateX: 0,
        opacity: 1,
        y: 0
      } : {}}
      transition={{
        duration: 1,
        ease: "easeOut"
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.1 } : {}}
          transition={{ duration: 1 }}
          className="absolute top-20 left-10"
        >
          <Music className="w-24 h-24 text-purple-300/20" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-20 right-10"
        >
          <Bot className="w-24 h-24 text-purple-300/20" />
        </motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -right-6"
            >
              <Sparkles className="w-8 h-8 text-purple-400" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-4">Your Journey Begins Here</h2>
          </div>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            Challenge your musical perception in an exciting journey where AI and human creativity converge. 
            Are your ears sharp enough to tell the difference?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-purple-200 mb-4">{step.description}</p>
                  
                  {/* Feature list with fade-in effect */}
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <motion.li
                        key={detailIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: index * 0.1 + detailIndex * 0.1 }}
                        className="text-sm text-purple-300 flex items-center justify-center space-x-2"
                      >
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-purple-800 transform translate-x-1/2">
                    <div className="absolute right-0 w-2 h-2 bg-purple-400 rounded-full transform -translate-y-1/2 animate-pulse" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-purple-200 text-lg mb-6">
            Ready to put your musical intuition to the test?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-purple-700 px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-shadow"
          >
            Start The Challenge
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}