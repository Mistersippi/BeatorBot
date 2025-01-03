import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, Globe } from 'lucide-react';

const mockData = {
  weeklyPlays: 2345,
  weeklyGrowth: '+15%',
  topCountries: ['United States', 'United Kingdom', 'Canada']
};

export function AnalyticsOverview() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Analytics Overview</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart2 className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-500">Weekly Plays</p>
              <p className="font-semibold">{mockData.weeklyPlays.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">{mockData.weeklyGrowth}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-purple-600" />
            <h3 className="font-medium">Top Countries</h3>
          </div>
          <div className="space-y-2">
            {mockData.topCountries.map((country, index) => (
              <motion.div
                key={country}
                whileHover={{ x: 2 }}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <span className="text-sm">{country}</span>
                <span className="text-sm text-gray-500">#{index + 1}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}