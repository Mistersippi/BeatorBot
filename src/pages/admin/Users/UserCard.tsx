import { motion } from 'framer-motion';
import { Mail, Calendar, Shield } from 'lucide-react';
import { RoleManager } from '../../../components/admin/RoleManager';
import type { Database } from '../../../lib/database.types';

type User = Database['public']['Tables']['users']['Row'];

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <img
          src={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
          alt={user.username || 'User avatar'}
          className="w-16 h-16 rounded-full"
        />

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg">{user.username || 'Anonymous'}</h3>
              <div className="flex items-center gap-2 text-gray-500">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-purple-600" />
              <span className="font-medium capitalize">{user.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Calendar className="w-4 h-4" />
            <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
          </div>

          <RoleManager
            userId={user.id}
            currentRole={user.role}
            onRoleChange={() => {
              // Refresh will happen automatically through subscription
            }}
          />
        </div>
      </div>
    </div>
  );
}