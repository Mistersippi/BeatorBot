import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface PillarCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
}

export function PillarCard({ title, subtitle, description, features }: PillarCardProps) {
  // Icon colors for each feature
  const iconColors = [
    'from-pink-500 to-purple-500',
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-indigo-500'
  ];

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 h-full border border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-lg hover:shadow-purple-500/10">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-purple-300 text-sm font-medium mb-3">{subtitle}</p>
        <p className="text-purple-200 text-sm">{description}</p>
      </div>

      <div className="space-y-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              className="flex items-start space-x-4 group"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex-shrink-0">
                <motion.div 
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${iconColors[index]} p-0.5 transform-gpu`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-full h-full bg-purple-900/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, 0, -10, 0],
                      }}
                      transition={{ 
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
              <div className="transform transition-transform duration-200 group-hover:translate-x-1">
                <h4 className="text-white font-medium mb-1 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-purple-200 text-sm group-hover:text-purple-100 transition-colors">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
