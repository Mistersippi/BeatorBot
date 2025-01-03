import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function AdminLink() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  if (!isAdmin) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to="/admin"
        className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
      >
        <LayoutDashboard className="w-4 h-4 mr-2" />
        Admin Dashboard
      </Link>
    </motion.div>
  );
}