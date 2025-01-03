import { motion } from 'framer-motion';

export function LeaderboardSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-xl p-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-16">
              <div className="h-6 w-8 bg-gray-200 rounded animate-pulse" />
            </div>
            
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            
            <div className="text-right">
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}