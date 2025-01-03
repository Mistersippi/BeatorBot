import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Trophy, Users, Award, Sparkles, Music2, Rocket, Gift, Zap, Bot, Brush, Heart, Star, Coins, LucideIcon } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { useAuth } from '../../components/auth/AuthContext';
import { Logo } from '../../components/Logo';
import './cta-effects.css';

type Feature = {
  icon: LucideIcon;
  title:
    | 'AI-Powered Creation'
    | 'Independent Artists'
    | 'Creative Freedom'
    | 'Vibrant Community'
    | 'Support Artists'
    | 'Featured Creations'
    | 'Early Access'
    | 'Exclusive Content'
    | 'Special Events'
    | 'Premium Features'
    | 'Token Rewards'
    | 'Community Perks'
    | 'Achievement System'
    | 'Fair Compensation'
    | 'Weekly Highlights'
    | 'Always Free';
  description: string;
  category: 'Innovation' | 'Community' | 'Rewards' | 'Benefits';
};

const features: Feature[] = [
  // AI & Music Innovation
  {
    icon: Bot,
    title: 'AI-Powered Creation',
    description: 'Experience the future of music with our state-of-the-art AI collaboration tools',
    category: 'Innovation'
  },
  {
    icon: Music2,
    title: 'Independent Artists',
    description: 'Connect with talented independent artists and be part of their creative journey',
    category: 'Innovation'
  },
  {
    icon: Brush,
    title: 'Creative Freedom',
    description: 'Blend AI capabilities with human creativity to produce unique musical experiences',
    category: 'Innovation'
  },
  // Community & Collaboration
  {
    icon: Users,
    title: 'Vibrant Community',
    description: 'Join a community of artists, AI creators, and music lovers shaping the future of music',
    category: 'Community'
  },
  {
    icon: Heart,
    title: 'Support Artists',
    description: 'Directly support independent artists while enjoying AI-enhanced creations',
    category: 'Community'
  },
  {
    icon: Star,
    title: 'Featured Creations',
    description: 'Get your AI-enhanced tracks featured and recognized by the community',
    category: 'Community'
  },
  {
    icon: Coins,
    title: 'Fair Compensation',
    description: 'Artists and AI creators earn rewards for their contributions and collaborations',
    category: 'Rewards'
  },
  {
    icon: Trophy,
    title: 'Weekly Highlights',
    description: 'Top collaborations between artists and AI creators featured weekly',
    category: 'Rewards'
  },
  {
    icon: Award,
    title: 'Achievement System',
    description: 'Earn recognition for quality contributions and community engagement',
    category: 'Rewards'
  },
  // Platform Benefits
  {
    icon: Gift,
    title: 'Always Free',
    description: 'Core features free forever - support artists through optional purchases',
    category: 'Benefits'
  },
  {
    icon: Rocket,
    title: 'Early Access',
    description: 'Be first to try new AI features and collaboration tools',
    category: 'Benefits'
  }
];

export function FeatureSection() {
  const { setShowSignUp } = useAuth();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleCTAClick = () => {
    // Show signup modal
    setShowSignUp(true);
    
    // Scroll to GenreSelection with a sparkling effect
    const genreSection = document.getElementById('genre-selection');
    if (genreSection) {
      // Create sparkle elements
      const sparkleCount = 20;
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.pointerEvents = 'none';
      container.style.zIndex = '9999';
      document.body.appendChild(container);

      for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'cta-sparkle';
        sparkle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
        `;
        container.appendChild(sparkle);

        // Random position around the button
        const angle = (i / sparkleCount) * Math.PI * 2;
        const radius = 50;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        // Animate each sparkle
        sparkle.animate([
          { 
            transform: `translate(${x}px, ${y}px) scale(0)`,
            opacity: 0
          },
          {
            transform: `translate(${x * 2}px, ${y * 2}px) scale(1)`,
            opacity: 1
          },
          {
            transform: `translate(${x * 3}px, ${y * 3}px) scale(0)`,
            opacity: 0
          }
        ], {
          duration: 1000,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards'
        });
      }

      // Smooth scroll after a small delay
      setTimeout(() => {
        genreSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Remove sparkle container after animation
        setTimeout(() => {
          container.remove();
        }, 1000);
      }, 100);
    }
  };

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-purple-300 via-purple-600 to-purple-900 min-h-screen">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.08] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_50%)]" />
      
      {/* Sparkles Effect */}
      {[...Array(35)].map((_, i) => {
        // Calculate positions that heavily favor the sides
        const randomPosition = () => {
          const rand = Math.random();
          // Create three zones: left (0-35%), center (35-65%), right (65-100%)
          if (rand < 0.7) { // 70% chance for sides
            // Left side (0-35%) or right side (65-100%)
            return rand < 0.35 ? 
              Math.random() * 35 : // Left side
              65 + (Math.random() * 35); // Right side
          } else {
            // Center zone with very limited spread
            return 45 + (Math.random() * 10); // Narrow center zone
          }
        };

        // Randomize starting vertical position with more spread
        const startY = Math.random() * -70; // Start higher above viewport
        
        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              top: `${startY}vh`,
              left: `${randomPosition()}%`,
              scale: 0,
              color: '#1a0044' // Very dark purple
            }}
            animate={{ 
              top: '120vh',
              scale: [0, 1, 0],
              rotate: 360,
              color: [
                '#1a0044', // Start very dark (top)
                '#2D1B69', // Dark purple (upper middle)
                '#9333EA', // Medium purple (middle)
                '#D8B4FE', // Light purple (lower middle)
                '#F3E8FF'  // Very light purple (bottom)
              ]
            }}
            transition={{
              duration: Math.random() * 8 + 10, // 10-18 seconds
              repeat: Infinity,
              delay: Math.random() * 10, // More spread out initial delays
              ease: "linear"
            }}
            style={{
              filter: "blur(0.5px)",
              opacity: 0.85
            }}
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
        );
      })}
      
      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 55%)",
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Falling particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: `rgba(147, 51, 234, ${Math.random() * 0.3 + 0.1})`,
            filter: 'blur(1px)',
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}%`,
          }}
          animate={{
            y: ['0vh', '100vh'],
            x: [
              `${Math.random() * 20 - 10}px`,
              `${Math.random() * 20 - 10}px`,
              `${Math.random() * 20 - 10}px`
            ],
            scale: [
              Math.random() * 0.5 + 0.5,
              Math.random() * 0.5 + 0.5,
              Math.random() * 0.5 + 0.5
            ],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.5, 1],
            delay: -Math.random() * 20
          }}
        />
      ))}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Logo size="large" className="text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
          >
            Why Join Beat or Bot for Free?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-purple-900 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]"
          >
            Explore the perfect blend of AI technology and human creativity
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="mb-16 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          {/* First 8 cards in 4x2 grid */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-2"
          >
            {features.slice(0, 8).map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                category={feature.category}
              />
            ))}
          </motion.div>

          {/* Last 3 cards centered */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.4
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-[75%] mx-auto"
          >
            {features.slice(8).map((feature, index) => (
              <FeatureCard
                key={index + 8}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                category={feature.category}
              />
            ))}
          </motion.div>
        </div>

        {/* Sign Up CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-12 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-800/40 via-fuchsia-700/30 to-pink-800/40 max-w-4xl mx-auto shadow-xl backdrop-blur-sm"
        >
          {/* CTA Background Effects */}
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:32px_32px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 via-fuchsia-400/5 to-pink-400/5 animate-pulse" />
          
          {/* Noise Texture */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.15] mix-blend-overlay" />
          
          {/* Subtle Glass Effect */}
          <div className="absolute inset-0 bg-white/[0.01] backdrop-blur-[1px]" />
          
          {/* Dot Pattern */}
          <div className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
              opacity: 0.03
            }} 
          />
          
          {/* Top Highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="relative px-6 py-12 sm:px-12 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                Join the Musical Revolution
              </h3>
              <p className="text-lg text-white font-medium mb-8 max-w-xl mx-auto leading-relaxed drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
                Be part of a community where AI and independent artists collaborate to create
                something truly unique.
              </p>
              
              {/* Sign Up Button */}
              <motion.button
                onClick={handleCTAClick}
                className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-xl 
                         bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-2xl 
                         transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(168,85,247,0.3)] 
                         focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2 text-lg">
                  <span>Join The Community</span>
                  <Zap className="w-5 h-5 animate-pulse" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
              
              {/* Social Proof */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-900/30 backdrop-blur-sm">
                  <Users className="w-4 h-4 text-purple-300" />
                  <span className="text-purple-200 font-medium">Growing Community</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-900/30 backdrop-blur-sm">
                  <Music2 className="w-4 h-4 text-purple-300" />
                  <span className="text-purple-200 font-medium">Independent Artists</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-900/30 backdrop-blur-sm">
                  <Bot className="w-4 h-4 text-purple-300" />
                  <span className="text-purple-200 font-medium">AI Innovation</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
          animate={{
            y: ["0vh", "100vh"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `-5%`,
          }}
        />
      ))}
    </section>
  );
}