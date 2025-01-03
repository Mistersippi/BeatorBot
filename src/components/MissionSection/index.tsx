import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { LucideIcon } from 'lucide-react';
import {
  Music2,
  Sparkles,
  Heart,
  Rocket,
  Lightbulb,
  Users,
  Code
} from 'lucide-react';
import { PillarCard } from './PillarCard';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Pillar {
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
}

const pillars: Pillar[] = [
  {
    title: 'For Traditional Artists',
    subtitle: 'Empowering Human Creativity',
    description: 'Enhance your creative process with AI assistance while maintaining full artistic control.',
    features: [
      {
        icon: Music2,
        title: 'Creative Control',
        description: 'Maintain complete artistic control over your music.'
      },
      {
        icon: Heart,
        title: 'Fair Ecosystem',
        description: 'Equal opportunities and fair compensation for all creators.'
      },
      {
        icon: Sparkles,
        title: 'Innovation Hub',
        description: 'Pushing the boundaries of what\'s possible in music creation.'
      }
    ]
  },
  {
    title: 'For AI Creators',
    subtitle: 'Advancing AI Music Generation',
    description: 'Build and deploy sophisticated AI models in a collaborative environment.',
    features: [
      {
        icon: Code,
        title: 'Model Integration',
        description: 'Seamlessly integrate your AI models into our platform.'
      },
      {
        icon: Users,
        title: 'Community Driven',
        description: 'Connect with other AI creators and share knowledge.'
      },
      {
        icon: Lightbulb,
        title: 'Innovation Support',
        description: 'Access resources and tools to develop cutting-edge solutions.'
      }
    ]
  },
  {
    title: 'For Music Enthusiasts',
    subtitle: 'Discover & Support',
    description: 'Experience the future of music creation and support your favorite artists.',
    features: [
      {
        icon: Sparkles,
        title: 'Unique Content',
        description: 'Access exclusive AI-enhanced music and collaborations.'
      },
      {
        icon: Heart,
        title: 'Direct Support',
        description: 'Support creators directly and engage with the community.'
      },
      {
        icon: Music2,
        title: 'Music Discovery',
        description: 'Discover innovative music at the intersection of AI and human creativity.'
      }
    ]
  }
];

export function MissionSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/mesh.png')] opacity-20 mix-blend-overlay" />
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-overlay"
            style={{
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? 'rgba(167, 139, 250, 0.3)' : 'rgba(139, 92, 246, 0.3)'
              } 0%, transparent 60%)`,
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-6 py-2 border border-purple-500/30">
              <Sparkles className="w-5 h-5 text-purple-300" />
              <span className="text-purple-200 font-medium">Our Vision for the Future</span>
            </div>
          </motion.div>
          <h2 className="text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400">
            Revolutionizing the Music Industry
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            We're building more than just a platform - we're creating a future where artists and AI creators
            thrive together, earning fairly from their creativity and innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Connecting lines between pillars */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent hidden lg:block" />
          
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Pillar connector dots */}
              {index < pillars.length - 1 && (
                <div className="absolute right-0 top-1/2 w-3 h-3 rounded-full bg-purple-500/30 transform translate-x-1/2 -translate-y-1/2 hidden lg:block" />
              )}
              <PillarCard {...pillar} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-purple-500/30 hover:bg-white/20 transition-colors cursor-pointer">
            <Rocket className="w-5 h-5 text-purple-300" />
            <span className="text-purple-200 font-medium">Launching Soon - Join the Waitlist!</span>
          </div>
        </motion.div>
      </div>

      {/* Audio wave transition */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 overflow-hidden">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <svg
            className="w-full h-32 fill-purple-950"
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
          >
            {/* Multiple audio wave paths with different animations */}
            {[...Array(5)].map((_, index) => (
              <motion.path
                key={index}
                d="M0 100 Q 150 50, 300 100 T 600 100 T 900 100 T 1200 100 V 200 H 0 Z"
                className={`fill-purple-950 origin-center`}
                style={{
                  opacity: 1 - index * 0.15,
                }}
                animate={{
                  d: [
                    "M0 100 Q 150 50, 300 100 T 600 100 T 900 100 T 1200 100 V 200 H 0 Z",
                    "M0 100 Q 150 150, 300 100 T 600 100 T 900 100 T 1200 100 V 200 H 0 Z",
                    "M0 100 Q 150 50, 300 100 T 600 100 T 900 100 T 1200 100 V 200 H 0 Z"
                  ]
                }}
                transition={{
                  duration: 2 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
              />
            ))}

            {/* Small frequency bars */}
            {[...Array(40)].map((_, index) => (
              <motion.rect
                key={`bar-${index}`}
                x={index * 30}
                y={90}
                width="4"
                height="20"
                className="fill-purple-950/80"
                animate={{
                  height: [20, 40 + Math.random() * 40, 20],
                  y: [90, 80 - Math.random() * 20, 90]
                }}
                transition={{
                  duration: 1 + Math.random(),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1
                }}
              />
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Gradient overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-purple-900/50 to-purple-950" />

      {/* Audio frequency dots */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute bottom-0 w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${(i / 20) * 100}%`,
            }}
            animate={{
              height: [1, 20 + Math.random() * 20, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 1 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-purple-950" />
    </section>
  );
}
