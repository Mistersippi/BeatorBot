import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

interface RobotGuitaristProps {
  inView: boolean;
}

export function RobotGuitarist({ inView }: RobotGuitaristProps) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (inView) {
      // Delay the start of animation by 5 seconds
      setTimeout(() => {
        controls.start('visible');
      }, 5000);
    }
  }, [inView, controls]);

  return (
    <motion.div
      className="absolute left-0 bottom-0 w-48 h-72"
      variants={{
        hidden: { x: '-100%', opacity: 0 },
        visible: {
          x: '15%',
          opacity: 1,
          transition: {
            duration: 3, // Slower entrance
            ease: "easeInOut",
            when: "beforeChildren",
          }
        }
      }}
      initial="hidden"
      animate={controls}
    >
      {/* Robot Body Container */}
      <div className="relative w-full h-full">
        {/* Head */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-20" // Skinnier head
          animate={{
            rotateZ: [-2, 2, -2],
            y: [-1, 0, -1]
          }}
          transition={{
            duration: 3, // Slower head movement
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Face */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-300 to-slate-400 rounded-2xl shadow-lg">
            {/* Eyes */}
            <div className="absolute top-8 left-0 w-full flex justify-center space-x-4">
              <motion.div 
                className="w-3 h-4 rounded-full bg-cyan-400 relative"
                animate={{
                  scaleY: [1, 0.3, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute inset-0 bg-white rounded-full scale-50" />
              </motion.div>
              <motion.div 
                className="w-3 h-4 rounded-full bg-cyan-400 relative"
                animate={{
                  scaleY: [1, 0.3, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                  delay: 0.1
                }}
              >
                <div className="absolute inset-0 bg-white rounded-full scale-50" />
              </motion.div>
            </div>
            {/* Mouth */}
            <motion.div 
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-2 bg-slate-600 rounded-lg"
              animate={{
                scaleX: [1, 1.2, 1],
                scaleY: [1, 1.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          {/* Hair */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6">
            <div className="absolute inset-x-0 top-0 h-full bg-purple-600 rounded-t-2xl" />
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 w-3 h-4 bg-purple-600"
                style={{ left: `${i * 25}%` }}
                animate={{
                  y: [-1, 1, -1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Torso */}
        <motion.div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-20 h-32 bg-gradient-to-b from-purple-500 to-purple-700 rounded-xl" // Skinnier torso
          animate={{
            rotateZ: [-1, 1, -1],
            y: [-1, 1, -1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* T-Shirt Design */}
          <div className="absolute inset-x-4 top-4 bottom-4 bg-purple-600/50 rounded-lg">
            <div className="absolute inset-x-2 top-2 h-[2px] bg-white/30" />
            <div className="absolute inset-x-2 top-4 h-[2px] bg-white/30" />
          </div>

          {/* Guitar */}
          <motion.div
            className="absolute -right-20 top-6 w-40 h-20" // Wider guitar area
            animate={{
              rotateZ: [-3, 0, -3], // Subtle guitar movement
              y: [-1, 1, -1]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Guitar Body */}
            <div className="absolute right-0 w-28 h-20 bg-gradient-to-br from-[#D35400] via-[#E67E22] to-[#CC6600] rounded-xl transform -rotate-12 shadow-lg">
              {/* Guitar Details */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 rounded-full shadow-inner">
                {/* Inner Sound Hole */}
                <div className="absolute inset-1 rounded-full bg-black/60" />
              </div>
              {/* Bridge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-2 bg-[#8B4513] rounded-sm" />
              {/* Strings */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 h-full w-[0.5px] bg-white/80"
                  style={{ left: `${25 + i * 10}%` }}
                  animate={{
                    scaleY: [1, 1.01, 1],
                  }}
                  transition={{
                    duration: 0.15,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                />
              ))}
              {/* Fret Markers */}
              <div className="absolute top-6 left-4 w-1 h-1 rounded-full bg-white/30" />
              <div className="absolute top-10 left-4 w-1 h-1 rounded-full bg-white/30" />
            </div>
            {/* Guitar Neck */}
            <div className="absolute left-0 top-8 w-24 h-4 bg-gradient-to-r from-[#8B4513] to-[#654321] rounded-l-sm shadow-md">
              {/* Frets */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 w-[1px] h-full bg-[#DEB887]/40"
                  style={{ left: `${i * 16 + 4}px` }}
                />
              ))}
            </div>
          </motion.div>

          {/* Arms */}
          <motion.div
            className="absolute -left-6 top-4 w-6 h-20" // Skinnier arms
            animate={{
              rotateZ: [25, 35, 25] // Strumming motion
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Upper Arm */}
            <div className="absolute inset-x-0 top-0 h-10 bg-purple-500 rounded-lg" />
            {/* Lower Arm */}
            <motion.div
              className="absolute inset-x-0 top-8 h-12 bg-slate-300 rounded-lg origin-top"
              animate={{
                rotateZ: [-5, 5, -5]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.1
              }}
            >
              {/* Hand and Fingers */}
              <div className="absolute -bottom-1 -right-2 w-4 h-3 bg-slate-300 rounded-lg transform rotate-45">
                {/* Fingers */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-2 bg-slate-300 rounded-full"
                    style={{ 
                      left: `${i * 5}px`,
                      top: '-4px',
                      transformOrigin: 'bottom'
                    }}
                    animate={{
                      rotateZ: [-10, 10, -10]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute -right-6 top-4 w-6 h-20" // Skinnier arms
            animate={{
              rotateZ: [-35, -25, -35] // Fretting motion
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Upper Arm */}
            <div className="absolute inset-x-0 top-0 h-10 bg-purple-500 rounded-lg" />
            {/* Lower Arm */}
            <motion.div
              className="absolute inset-x-0 top-8 h-12 bg-slate-300 rounded-lg origin-top"
              animate={{
                rotateZ: [5, -5, 5]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.1
              }}
            >
              {/* Hand and Fingers */}
              <div className="absolute -bottom-1 -left-2 w-4 h-3 bg-slate-300 rounded-lg transform -rotate-45">
                {/* Fingers */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-2 bg-slate-300 rounded-full"
                    style={{ 
                      right: `${i * 5}px`,
                      top: '-4px',
                      transformOrigin: 'bottom'
                    }}
                    animate={{
                      rotateZ: [5, -5, 5]
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Musical Notes */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute -top-8 right-0 text-2xl text-purple-300"
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: [-20 * (i + 1), -40 * (i + 1)],
                x: [10 * (i + 1), 20 * (i + 1)]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut"
              }}
            >
              ♪
            </motion.div>
          ))}
        </motion.div>

        {/* Legs */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20" // Skinnier legs
          animate={{
            y: [-1, 0, -1]
          }}
          transition={{
            duration: 3, // Slower walking
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Left Leg */}
          <motion.div
            className="absolute left-1 w-6 h-20" // Skinnier leg
            animate={{
              rotateZ: [-3, 3, -3] // Smaller leg movement
            }}
            transition={{
              duration: 3, // Slower walking
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Upper Leg */}
            <div className="absolute inset-x-0 top-0 h-10 bg-purple-600 rounded-lg" />
            {/* Lower Leg */}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-slate-300 rounded-lg" />
            {/* Foot */}
            <div className="absolute -bottom-1 inset-x-0 h-2 bg-slate-400 rounded-lg" />
          </motion.div>

          {/* Right Leg */}
          <motion.div
            className="absolute right-1 w-6 h-20" // Skinnier leg
            animate={{
              rotateZ: [3, -3, 3] // Smaller leg movement
            }}
            transition={{
              duration: 3, // Slower walking
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          >
            {/* Upper Leg */}
            <div className="absolute inset-x-0 top-0 h-10 bg-purple-600 rounded-lg" />
            {/* Lower Leg */}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-slate-300 rounded-lg" />
            {/* Foot */}
            <div className="absolute -bottom-1 inset-x-0 h-2 bg-slate-400 rounded-lg" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
