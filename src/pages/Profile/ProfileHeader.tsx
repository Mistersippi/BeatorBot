import { motion } from 'framer-motion';
import { Camera, Edit } from 'lucide-react';
import { useAuth } from '../../components/auth/AuthContext';

export function ProfileHeader() {
  const { user } = useAuth();

  return (
    <div className="relative">
      {/* Banner */}
      <div className="h-48 bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl overflow-hidden relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="absolute top-4 right-4 p-2 bg-black/20 rounded-full text-white hover:bg-black/30"
        >
          <Camera className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 -mt-12 px-6">
        <div className="relative">
          <img
            src={user?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
            alt={user?.username}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700"
          >
            <Camera className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <h1 className="text-2xl font-bold">{user?.username}</h1>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-1 text-gray-400 hover:text-purple-600"
            >
              <Edit className="w-4 h-4" />
            </motion.button>
          </div>
          <p className="text-gray-600 mt-1">{user?.email}</p>
        </div>
      </div>
    </div>
  );
}