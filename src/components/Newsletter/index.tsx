import { motion } from 'framer-motion';
import { Mail, Video, BookOpen, Sparkles, Bell } from 'lucide-react';
import { NewsletterBackground } from './NewsletterBackground';
import { NewsletterForm } from './NewsletterForm';
import { NewsletterFeature } from './NewsletterFeature';

const features = [
  {
    icon: Video,
    title: 'Behind the Scenes Access',
    description: 'Watch how we built Beat or Bot using AI tools'
  },
  {
    icon: BookOpen,
    title: 'Exclusive Tutorials',
    description: 'Step-by-step guides on using AI tools'
  },
  {
    icon: Sparkles,
    title: 'Latest AI Trends',
    description: 'Stay ahead with cutting-edge AI developments'
  },
  {
    icon: Bell,
    title: 'Early Access',
    description: 'Be first to try new features and tools'
  }
];

export function Newsletter() {
  return (
    <section className="relative py-32 overflow-hidden">
      <NewsletterBackground />
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-400/30 blur-xl rounded-full" />
              <Mail className="relative w-12 h-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white mb-6">
            Join Aideations
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            One of the most comprehensive semi-daily newsletters in the world of AI,
            sharing the latest news, tutorials, research, trends and more.
          </p>
        </motion.div>

        <NewsletterForm />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {features.map((feature, index) => (
            <NewsletterFeature key={index} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}