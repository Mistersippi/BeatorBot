import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CTAButton } from './CTAButton';
import { RobotGuitarist } from '../RobotGuitarist';

export function CTASection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
      
      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-950/80 via-fuchsia-950/70 to-pink-950/80 shadow-2xl">
          {/* Inner Background Effects */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.25),transparent)]" />
          
          {/* Robot Guitarist */}
          <RobotGuitarist inView={inView} />

          <div className="relative px-6 py-20 sm:py-24 sm:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-fuchsia-100 to-purple-200 mb-6">
                Ready to Test Your Skills?
              </h2>
              <p className="text-lg sm:text-xl text-purple-100/90 max-w-2xl mx-auto mb-10">
                Join our community of music creators and see if you can spot the difference between human and AI-generated tracks.
              </p>
              
              <CTAButton>Start Playing Now</CTAButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}