import { motion } from 'framer-motion';
import { Shield, Users, Star, Settings } from 'lucide-react';

interface RolesListProps {
  selectedRole: string | null;
  onRoleSelect: (roleId: string) => void;
}

export function RolesList({ selectedRole, onRoleSelect }: RolesListProps) {
  // Placeholder roles - will be replaced with real data
  const roles = [
    {
      id: 'admin',
      name: 'Administrator',
      icon: Shield,
      description: 'Full system access',
      userCount: 1,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      id: 'moderator',
      name: 'Moderator',
      icon: Star,
      description: 'Content management and moderation',
      userCount: 0,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 'user',
      name: 'User',
      icon: Users,
      description: 'Standard user access',
      userCount: 0,
      color: 'text-green-600 bg-green-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">User Roles</h2>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700"
          >
            Add Role
          </motion.button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <motion.button
              key={role.id}
              whileHover={{ backgroundColor: 'rgb(249, 250, 251)' }}
              onClick={() => onRoleSelect(role.id)}
              className={`w-full p-4 text-left transition-colors ${
                selectedRole === role.id ? 'bg-purple-50' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${role.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{role.name}</h3>
                  <p className="text-sm text-gray-500">{role.description}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {role.userCount} users
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}