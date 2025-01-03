import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface NewsletterFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function NewsletterFeature({ icon: Icon, title, description }: NewsletterFeatureProps) {
  return (
    <GlassCard className="h-full">
      <div className="p-6">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
          className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-purple-400/20 to-purple-600/20 flex items-center justify-center"
        >
          <Icon className="w-6 h-6 text-purple-300" />
        </motion.div>
        <h4 className="font-medium text-white text-lg mb-2">{title}</h4>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
    </GlassCard>
  );
}