import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Guitar, Piano, Radio, 
  Music, Mic, Drum, Podcast
} from 'lucide-react';

const genres = [
  {
    icon: Radio,
    title: 'EDM',
    description: 'Electronic Dance Music, House & Techno'
  },
  {
    icon: Guitar,
    title: 'Country',
    description: 'Modern & Traditional Country Music'
  },
  {
    icon: Piano,
    title: 'Classical',
    description: 'Orchestral & Chamber Music'
  },
  {
    icon: Music,
    title: 'Jazz',
    description: 'Swing, Bebop & Modern Jazz'
  },
  {
    icon: Mic,
    title: 'Pop',
    description: 'Contemporary Pop & Chart Hits'
  },
  {
    icon: Guitar,
    title: 'Rock',
    description: 'Classic & Modern Rock'
  },
  {
    icon: Drum,
    title: 'Hip Hop',
    description: 'Rap & Urban Music'
  },
  {
    icon: Podcast,
    title: 'Ambient',
    description: 'Atmospheric & Environmental'
  }
];

export const GenreSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="genre-section" 
      ref={ref} 
      className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 py-20 px-4 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,0,255,0.1),rgba(0,0,0,0))]" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto space-y-12"
      >
        <div className="text-center space-y-4">
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Ready to Play?
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Choose a genre and start identifying AI-generated music
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {genres.map((genre) => (
            <motion.div
              key={genre.title}
              variants={itemVariants}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300">
                    <genre.icon size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{genre.title}</h3>
                  <p className="text-gray-300 text-sm">{genre.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}