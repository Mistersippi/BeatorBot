import { motion } from 'framer-motion';
import { Music, CheckCircle, Users, Award } from 'lucide-react';
import type { Database } from '../../lib/database.types';

type Submission = Database['public']['Tables']['submissions']['Row'];

interface SubmissionStatsProps {
  submissions: Submission[];
}

export function SubmissionStats({ submissions }: SubmissionStatsProps) {
  const totalSubmissions = submissions.length;
  const approvedSubmissions = submissions.filter(s => s.status === 'approved').length;
  const approvalRate = totalSubmissions > 0 
    ? Math.round((approvedSubmissions / totalSubmissions) * 100) 
    : 0;

  const stats = [
    {
      icon: Music,
      label: 'Total Submissions',
      value: totalSubmissions,
      color: 'text-purple-500'
    },
    {
      icon: CheckCircle,
      label: 'Approval Rate',
      value: `${approvalRate}%`,
      color: 'text-green-500'
    },
    {
      icon: Users,
      label: 'Pending Review',
      value: submissions.filter(s => s.status === 'pending').length,
      color: 'text-blue-500'
    },
    {
      icon: Award,
      label: 'Approved',
      value: approvedSubmissions,
      color: 'text-yellow-500'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Submission Stats</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <motion.div
            key={label}
            whileHover={{ y: -2 }}
            className="p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-opacity-10 ${color} bg-current`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-semibold">{value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}