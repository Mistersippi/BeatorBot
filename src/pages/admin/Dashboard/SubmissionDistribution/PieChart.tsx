import { motion } from 'framer-motion';

interface PieChartProps {
  data: {
    aiCount: number;
    humanCount: number;
  };
}

export function PieChart({ data }: PieChartProps) {
  const total = data.aiCount + data.humanCount;
  const aiPercentage = Math.round((data.aiCount / total) * 100) || 0;
  const humanPercentage = Math.round((data.humanCount / total) * 100) || 0;

  // Calculate the stroke-dasharray values for the pie segments
  const circumference = 2 * Math.PI * 40; // radius = 40
  const aiDash = (data.aiCount / total) * circumference;
  const humanDash = (data.humanCount / total) * circumference;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="50%"
          cy="50%"
          r="40"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="12"
        />
        
        {/* AI segment */}
        <motion.circle
          cx="50%"
          cy="50%"
          r="40"
          fill="none"
          stroke="#9333EA"
          strokeWidth="12"
          strokeDasharray={`${aiDash} ${circumference}`}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        
        {/* Human segment */}
        <motion.circle
          cx="50%"
          cy="50%"
          r="40"
          fill="none"
          stroke="#22C55E"
          strokeWidth="12"
          strokeDasharray={`${humanDash} ${circumference}`}
          strokeDashoffset={-aiDash}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: -aiDash }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold">{total}</p>
          <p className="text-sm text-gray-500">Total</p>
        </div>
      </div>
    </div>
  );
}