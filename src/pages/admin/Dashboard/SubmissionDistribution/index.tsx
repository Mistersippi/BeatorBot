import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { supabase } from '../../../../lib/supabase/client';
import { PieChart } from './PieChart';

interface DistributionData {
  aiCount: number;
  humanCount: number;
}

export function SubmissionDistribution() {
  const [data, setData] = useState<DistributionData>({ aiCount: 0, humanCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDistributionData() {
      try {
        const { data: aiSubmissions, error: aiError } = await supabase
          .from('submissions')
          .select('id', { count: 'exact', head: true })
          .eq('is_ai_generated', true);

        const { data: humanSubmissions, error: humanError } = await supabase
          .from('submissions')
          .select('id', { count: 'exact', head: true })
          .eq('is_ai_generated', false);

        if (aiError) throw aiError;
        if (humanError) throw humanError;

        setData({
          aiCount: aiSubmissions?.length || 0,
          humanCount: humanSubmissions?.length || 0
        });
      } catch (error) {
        console.error('Error fetching submission distribution:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDistributionData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="h-64 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const total = data.aiCount + data.humanCount;
  const aiPercentage = Math.round((data.aiCount / total) * 100) || 0;
  const humanPercentage = Math.round((data.humanCount / total) * 100) || 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold mb-6">Submission Distribution</h3>
      
      <PieChart data={data} />

      <div className="grid grid-cols-2 gap-4 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 rounded-xl bg-purple-50"
        >
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-5 h-5 text-purple-600" />
            <span className="font-medium">AI Generated</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">{aiPercentage}%</p>
          <p className="text-sm text-purple-600">{data.aiCount} submissions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 rounded-xl bg-green-50"
        >
          <div className="flex items-center gap-2 mb-2">
            <User className="w-5 h-5 text-green-600" />
            <span className="font-medium">Human Created</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{humanPercentage}%</p>
          <p className="text-sm text-green-600">{data.humanCount} submissions</p>
        </motion.div>
      </div>
    </div>
  );
}