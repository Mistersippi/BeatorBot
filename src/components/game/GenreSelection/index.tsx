import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Genre } from './types';
import { genres } from './genreData';
import { GenreCard } from './GenreCard';
import { StartButton } from './StartButton';

export function GenreSelection() {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenre(genre);
  };

  const handleStartChallenge = () => {
    if (selectedGenre) {
      navigate('/challenge', { state: { genre: selectedGenre } });
    }
  };

  return (
    <section 
      ref={ref}
      id="genre-selection" 
      className="py-24 px-4 -mt-12 relative overflow-hidden bg-purple-950"
    >
      {/* Audio Wave Animation */}
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 100"
        >
          {[...Array(5)].map((_, i) => (
            <motion.path
              key={i}
              d={`M 0 ${50 + i * 10} 
                 Q 150 ${20 + Math.random() * 60}, 
                   300 ${50 + i * 10} 
                 T 600 ${50 + i * 10}
                 T 900 ${50 + i * 10}
                 T 1200 ${50 + i * 10}`}
              fill="none"
              stroke={`rgba(147, 51, 234, ${0.3 - i * 0.05})`}
              strokeWidth={3 - i * 0.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 1,
                d: `M 0 ${50 + i * 10} 
                   Q 150 ${80 - Math.random() * 60}, 
                     300 ${50 + i * 10} 
                   T 600 ${50 + i * 10}
                   T 900 ${50 + i * 10}
                   T 1200 ${50 + i * 10}`
              }}
              transition={{
                duration: 2 + i,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </svg>
      </div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[url(&quot;data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E&quot;)] opacity-10" />
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      
      <div className="max-w-6xl mx-auto relative pt-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Genre
          </h2>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            Select a musical genre to begin your creative journey. Each genre offers unique challenges and opportunities.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {genres.map((genre, index) => (
            <motion.div
              key={genre.id}
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <GenreCard
                genre={genre}
                isSelected={selectedGenre?.id === genre.id}
                onSelect={() => handleGenreSelect(genre)}
              />
            </motion.div>
          ))}
        </motion.div>

        {selectedGenre && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-12 text-center"
          >
            <StartButton onClick={handleStartChallenge} isVisible={true} />
          </motion.div>
        )}
      </div>
    </section>
  );
}