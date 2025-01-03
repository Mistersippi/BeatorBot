import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { motion, useAnimation } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FiArrowRight } from 'react-icons/fi';
import { 
  RiRobot2Fill, 
  RiBrainFill, 
  RiMusicFill, 
  RiAiGenerate,
  RiHeadphoneFill,
  RiVolumeUpFill,
  RiRadioFill,
  RiMicFill,
  RiSoundModuleFill
} from 'react-icons/ri';
import { 
  GiGuitar, 
  GiGrandPiano, 
  GiDrumKit, 
  GiViolin, 
  GiSaxophone,
  GiMusicalNotes
} from 'react-icons/gi';
import './Newsletter.css';

const FloatingIcon = ({ 
  Icon, 
  initialX, 
  initialY, 
  size = "text-3xl",
  color = "text-purple-300/30",
  blur = "blur-[0.5px]",
  animationDuration = 3
}: { 
  Icon: any, 
  initialX: number, 
  initialY: number,
  size?: string,
  color?: string,
  blur?: string,
  animationDuration?: number
}) => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({
      x: [initialX, initialX + Math.random() * 100 - 50],
      y: [initialY, initialY + Math.random() * 100 - 50],
      rotate: [0, Math.random() * 360],
      scale: [1, 1.1, 1],
      transition: {
        duration: animationDuration + Math.random() * 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    });
  }, [initialX, initialY, animationDuration]);

  return (
    <motion.div
      animate={controls}
      className={`${size} ${color} filter ${blur} absolute`}
      style={{ x: initialX, y: initialY }}
    >
      <Icon />
    </motion.div>
  );
};

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Thanks for subscribing!');
        setEmail('');
      } else {
        toast.error(data.message || 'Failed to subscribe');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-purple-900 to-black min-h-screen">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      <div className="absolute inset-0 w-full h-full">
        {/* Left floating icons */}
        <FloatingIcon Icon={RiRobot2Fill} initialX={window.innerWidth * 0.1} initialY={window.innerHeight * 0.1} color="text-blue-500/40" size="text-4xl" />
        <FloatingIcon Icon={GiMusicalNotes} initialX={window.innerWidth * 0.15} initialY={window.innerHeight * 0.3} color="text-purple-600/50" size="text-5xl" />
        <FloatingIcon Icon={RiBrainFill} initialX={window.innerWidth * 0.08} initialY={window.innerHeight * 0.5} color="text-pink-500/40" size="text-3xl" />
        <FloatingIcon Icon={GiGuitar} initialX={window.innerWidth * 0.2} initialY={window.innerHeight * 0.7} color="text-indigo-600/50" size="text-4xl" />
        <FloatingIcon Icon={RiAiGenerate} initialX={window.innerWidth * 0.05} initialY={window.innerHeight * 0.9} color="text-violet-500/45" size="text-3xl" />
        
        {/* Center floating icons */}
        <FloatingIcon Icon={GiGrandPiano} initialX={window.innerWidth * 0.4} initialY={window.innerHeight * 0.15} color="text-indigo-500/60" size="text-5xl" />
        <FloatingIcon Icon={RiHeadphoneFill} initialX={window.innerWidth * 0.5} initialY={window.innerHeight * 0.35} color="text-blue-600/50" size="text-4xl" />
        <FloatingIcon Icon={GiMusicalNotes} initialX={window.innerWidth * 0.45} initialY={window.innerHeight * 0.55} color="text-purple-500/55" size="text-5xl" />
        <FloatingIcon Icon={RiMusicFill} initialX={window.innerWidth * 0.55} initialY={window.innerHeight * 0.75} color="text-pink-600/50" size="text-4xl" />
        <FloatingIcon Icon={GiDrumKit} initialX={window.innerWidth * 0.38} initialY={window.innerHeight * 0.85} color="text-indigo-500/60" size="text-5xl" />
        <FloatingIcon Icon={RiSoundModuleFill} initialX={window.innerWidth * 0.48} initialY={window.innerHeight * 0.95} color="text-blue-400/30" size="text-4xl" />
        
        {/* Right floating icons */}
        <FloatingIcon Icon={GiViolin} initialX={window.innerWidth * 0.8} initialY={window.innerHeight * 0.2} color="text-purple-400/30" size="text-5xl" />
        <FloatingIcon Icon={RiVolumeUpFill} initialX={window.innerWidth * 0.85} initialY={window.innerHeight * 0.4} color="text-pink-400/25" size="text-4xl" />
        <FloatingIcon Icon={GiSaxophone} initialX={window.innerWidth * 0.75} initialY={window.innerHeight * 0.6} color="text-indigo-400/35" size="text-5xl" />
        <FloatingIcon Icon={RiMicFill} initialX={window.innerWidth * 0.9} initialY={window.innerHeight * 0.8} color="text-violet-400/25" size="text-4xl" />
        <FloatingIcon Icon={RiRadioFill} initialX={window.innerWidth * 0.7} initialY={window.innerHeight * 0.95} color="text-cyan-400/20" size="text-5xl" animationDuration={5} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center backdrop-blur-sm bg-black/30 rounded-2xl p-8 border border-white/10">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center space-x-3 mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
              <div className="relative bg-purple-500/10 backdrop-blur-xl px-8 py-4 rounded-2xl border border-purple-500/20 transform hover:scale-105 transition-transform duration-300">
                <Mail className="w-8 h-8 text-purple-300 animate-pulse" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
              Join Aideations
            </h2>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              One of the most comprehensive semi-daily newsletters in the world of AI,
              sharing the latest news, tutorials, research, trends and more.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mb-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-2">Behind the Scenes Access</h3>
              <p className="text-purple-200">Watch how we built Beat or Bot using AI tools</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-2">Exclusive Tutorials</h3>
              <p className="text-purple-200">Step-by-step guides on using AI tools</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-2">Latest AI Trends</h3>
              <p className="text-purple-200">Stay ahead with cutting-edge AI developments</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-2">Early Access</h3>
              <p className="text-purple-200">Be first to try new features and tools</p>
            </motion.div>
          </div>

          <motion.form
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="mt-10 sm:flex sm:justify-center"
          >
            <div className="min-w-0 flex-1 max-w-xl mx-auto w-full relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="block w-full rounded-xl border-0 px-6 py-4 bg-white/5 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 border border-white/10"
              />
              <div className="mt-3 sm:mt-0 sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto p-2 rounded-lg bg-white text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span className="flex items-center justify-center">
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Subscribing...
                      </span>
                    ) : (
                      <FiArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.form>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-sm text-white/70 text-center"
          >
            Join 50,000+ AI enthusiasts. No spam, unsubscribe anytime.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
