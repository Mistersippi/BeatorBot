import { motion, useAnimation } from 'framer-motion';
import { RiRobot2Fill, RiHeadphoneFill, RiMusicFill } from 'react-icons/ri';
import { TbBrain, TbPiano, TbMusic, TbGuitarPick, TbMusicHeart } from 'react-icons/tb';
import { GiTrumpet, GiDrumKit, GiGuitar, GiViolin, GiMicrophone } from 'react-icons/gi';
import { useEffect, useState } from 'react';

interface FloatingIconProps {
  Icon: any;
  initialX: number;
  initialY: number;
  color?: string;
  exploding?: boolean;
}

const FloatingIcon = ({ Icon, initialX, initialY, color = '#ffffff', exploding = false }: FloatingIconProps) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [hasExploded, setHasExploded] = useState(false);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle explosion and return animation when prop changes
  useEffect(() => {
    if (exploding && !hasExploded) {
      setHasExploded(true);
      // Calculate direction from center
      const dx = initialX - window.innerWidth / 2;
      const dy = initialY - window.innerHeight / 2;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const normalizedDx = dx / (distance || 1);
      const normalizedDy = dy / (distance || 1);
      
      // Explosive animation
      controls.start({
        x: initialX + normalizedDx * window.innerWidth,
        y: initialY + normalizedDy * window.innerHeight,
        rotate: Math.random() * 1080 - 540,
        scale: 0,
        opacity: 0,
        transition: {
          duration: 0.8,
          ease: "easeOut"
        }
      });
    } else if (!exploding && hasExploded) {
      setHasExploded(false);
      // Return animation
      controls.start({
        x: initialX,
        y: initialY,
        rotate: 0,
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: "backOut"
        }
      });
    }
  }, [exploding, hasExploded, controls, initialX, initialY]);

  useEffect(() => {
    let animationFrameId: number;
    
    const animate = () => {
      const baseX = initialX;
      const baseY = initialY;

      // Define the center content boundaries
      const centerBoundary = {
        left: window.innerWidth * 0.3,
        right: window.innerWidth * 0.3,
        top: window.innerHeight * 0.2,
        bottom: window.innerHeight * 0.5
      };

      // Calculate repulsion from text content area
      let textRepelX = 0;
      let textRepelY = 0;
      const repelStrength = 75;
      const boundaryPadding = 25;

      const currentX = baseX + Math.sin(Date.now() / 1000 + initialX) * 20;
      const currentY = baseY + Math.cos(Date.now() / 1000 + initialY) * 20;

      // Check if icon is too close to center content and apply repulsion
      if (currentX > centerBoundary.left - boundaryPadding && currentX < centerBoundary.right + boundaryPadding &&
          currentY > centerBoundary.top - boundaryPadding && currentY < centerBoundary.bottom + boundaryPadding) {
        
        // Calculate distance to nearest boundary
        const distToLeft = Math.abs(currentX - centerBoundary.left);
        const distToRight = Math.abs(currentX - centerBoundary.right);
        const distToTop = Math.abs(currentY - centerBoundary.top);
        const distToBottom = Math.abs(currentY - centerBoundary.bottom);
        
        // Find closest boundary and apply repulsion
        const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
        if (minDist === distToLeft) textRepelX = -repelStrength;
        if (minDist === distToRight) textRepelX = repelStrength;
        if (minDist === distToTop) textRepelY = -repelStrength;
        if (minDist === distToBottom) textRepelY = repelStrength;
      }

      // Calculate mouse repulsion
      const dx = mousePosition.x - baseX;
      const dy = mousePosition.y - baseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const mouseRepelStrength = Math.min(200, 4000 / (distance + 1));
      const repelX = dx !== 0 ? (-dx / distance) * mouseRepelStrength : 0;
      const repelY = dy !== 0 ? (-dy / distance) * mouseRepelStrength : 0;

      const time = Date.now() / 1000;
      const wobbleX = Math.sin(time + initialX) * 20;
      const wobbleY = Math.cos(time + initialY) * 20;

      controls.start({
        x: baseX + repelX + textRepelX + wobbleX,
        y: baseY + repelY + textRepelY + wobbleY,
        rotate: Math.sin(time) * 30,
        transition: { duration: 0, type: "spring", stiffness: 100, damping: 5 }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [initialX, initialY, controls, mousePosition]);

  return (
    <motion.div
      animate={controls}
      initial={{ x: initialX, y: initialY }}
      whileHover={{ 
        scale: 1.8,
        rotate: 360,
        filter: 'brightness(1.4)',
        transition: { duration: 0.8 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ 
        position: 'absolute',
        color: isHovered ? '#FFD700' : color,
        cursor: 'pointer',
        fontSize: '2.5rem',
        filter: `drop-shadow(0 0 15px ${color}60)`,
        transition: 'color 0.3s ease',
        zIndex: 5
      }}
    >
      <Icon />
    </motion.div>
  );
};

const PlayButton = ({ onExplode }: { onExplode: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonControls = useAnimation();
  const shockwaveControls = useAnimation();

  const handleClick = async () => {
    // Start explosion and animations
    onExplode();
    
    // Button animation
    buttonControls.start({
      scale: [1, 1.2, 0.8],
      rotate: [0, 15, -15, 0],
      transition: { duration: 0.8, ease: "easeInOut" }
    });

    // Shockwave effect
    shockwaveControls.start({
      scale: [1, 25],
      opacity: [0.5, 0],
      transition: { duration: 1.2, ease: "easeOut" }
    });

    // Wait a bit for the explosion to start
    await new Promise(resolve => setTimeout(resolve, 300));

    // Enhanced scroll effect with easing
    const genreSection = document.getElementById('genre-section');
    if (genreSection) {
      const start = window.pageYOffset;
      const end = genreSection.offsetTop;
      const duration = 1200; // 1.2 seconds
      const startTime = performance.now();

      function easeOutExpo(t: number): number {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      }

      function scrollAnimation(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeProgress = easeOutExpo(progress);
        const currentPosition = start + (end - start) * easeProgress;

        window.scrollTo(0, currentPosition);

        if (progress < 1) {
          requestAnimationFrame(scrollAnimation);
        }
      }

      requestAnimationFrame(scrollAnimation);
    }
  };

  return (
    <div className="relative">
      <motion.div
        className="absolute left-1/2 top-1/2 w-20 h-20 -ml-10 -mt-10 rounded-full bg-white"
        initial={{ scale: 0, opacity: 0 }}
        animate={shockwaveControls}
        style={{ zIndex: 1 }}
      />
      <motion.button
        className="relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-bold text-lg
                   shadow-lg hover:shadow-2xl transform"
        animate={buttonControls}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        style={{ zIndex: 2 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl opacity-0"
          animate={{ opacity: isHovered ? 0.2 : 0 }}
        />
        <motion.div className="flex items-center space-x-2">
          <span>Play BeatorBot Challenge</span>
          <motion.span
            animate={{ y: isHovered ? 5 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block transform rotate-90"
          >
            →
          </motion.span>
        </motion.div>
      </motion.button>
    </div>
  );
};

export const HeroSection = () => {
  const [isExploding, setIsExploding] = useState(false);
  const contentControls = useAnimation();
  
  const handleExplode = () => {
    setIsExploding(true);
    
    // Scroll to genre selection after animation
    setTimeout(() => {
      const genreSection = document.getElementById('genre-selection');
      if (genreSection) {
        genreSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 800); // Match this with the animation duration
  };
  
  useEffect(() => {
    if (isExploding) {
      // Fade out
      contentControls.start({
        opacity: 0,
        y: -50,
        transition: { duration: 0.8, ease: "easeOut" }
      }).then(() => {
        // Bring back after delay
        setTimeout(() => {
          setIsExploding(false);
          contentControls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
          });
        }, 2000);
      });
    }
  }, [isExploding, contentControls]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      {generateIconConfigs().map((config, index) => (
        <FloatingIcon
          key={index}
          Icon={config.Icon}
          initialX={config.x}
          initialY={config.y}
          color={config.color}
          exploding={isExploding}
        />
      ))}
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4 md:px-8 space-y-8">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={contentControls}
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          <h1 className="text-6xl md:text-7xl font-bold tracking-wider">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Beat Or Bot
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white max-w-2xl mx-auto">
            Can you distinguish AI-generated music from human compositions?
          </h2>
          <p className="text-xl text-gray-200 font-medium">
            Challenge yourself in this musical battle of human intuition versus artificial intelligence
          </p>
          <p className="text-lg text-gray-300">
            No signup required - Start playing instantly, completely free!
          </p>
          <div className="mt-8">
            <PlayButton onExplode={handleExplode} />
          </div>
          <p className="text-base text-gray-300 mt-4 font-medium">
            Join thousands of music enthusiasts testing their skills
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const generateIconConfigs = () => {
  const icons = [RiRobot2Fill, TbPiano, GiGuitar, TbMusic, RiMusicFill, GiTrumpet, 
                GiDrumKit, TbGuitarPick, TbMusicHeart, RiHeadphoneFill, GiViolin,
                GiMicrophone, TbBrain];
  const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#96CEB4', '#355C7D', '#C06C84',
                 '#F67280', '#F8B195', '#6C5B7B', '#45B7D1', '#FFEEAD'];
  
  const configs = [];
  const numIcons = 80;
  
  // Define safe zones (areas where icons can appear)
  const safeZones = [
    { x: 0, y: 0, width: window.innerWidth * 0.3, height: window.innerHeight }, // Left column
    { x: window.innerWidth * 0.7, y: 0, width: window.innerWidth * 0.3, height: window.innerHeight }, // Right column
    { x: window.innerWidth * 0.3, y: 0, width: window.innerWidth * 0.4, height: window.innerHeight * 0.2 }, // Top middle
    { x: window.innerWidth * 0.3, y: window.innerHeight * 0.8, width: window.innerWidth * 0.4, height: window.innerHeight * 0.2 }, // Bottom middle
  ];
  
  for (let i = 0; i < numIcons; i++) {
    const Icon = icons[Math.floor(Math.random() * icons.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Select a random safe zone
    const safeZone = safeZones[Math.floor(Math.random() * safeZones.length)];
    
    // Generate position within the safe zone
    const x = safeZone.x + (Math.random() * safeZone.width);
    const y = safeZone.y + (Math.random() * safeZone.height);
    
    configs.push({ Icon, x, y, color });
  }
  
  return configs;
};