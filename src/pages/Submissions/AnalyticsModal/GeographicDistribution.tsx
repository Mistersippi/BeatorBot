import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

interface GeographicDistributionProps {
  countries: { [key: string]: number };
}

export function GeographicDistribution({ countries }: GeographicDistributionProps) {
  const totalPlays = Object.values(countries).reduce((sum, plays) => sum + plays, 0);
  const sortedCountries = Object.entries(countries)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold">Geographic Distribution</h3>
      </div>

      <div className="space-y-4">
        {sortedCountries.map(([country, plays], index) => {
          const percentage = (plays / totalPlays) * 100;
          return (
            <motion.div
              key={country}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{country}</span>
                <span className="text-sm text-gray-500">{plays.toLocaleString()} plays</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-purple-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}