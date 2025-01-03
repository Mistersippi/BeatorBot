import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface PermissionMatrixProps {
  selectedRole: string | null;
}

export function PermissionMatrix({ selectedRole }: PermissionMatrixProps) {
  if (!selectedRole) return null;

  const permissions = [
    {
      category: 'Content Management',
      items: [
        { name: 'View submissions', granted: true },
        { name: 'Approve submissions', granted: selectedRole !== 'user' },
        { name: 'Delete submissions', granted: selectedRole === 'admin' }
      ]
    },
    {
      category: 'User Management',
      items: [
        { name: 'View users', granted: selectedRole !== 'user' },
        { name: 'Modify users', granted: selectedRole === 'admin' },
        { name: 'Delete users', granted: selectedRole === 'admin' }
      ]
    },
    {
      category: 'System Settings',
      items: [
        { name: 'View settings', granted: selectedRole === 'admin' },
        { name: 'Modify settings', granted: selectedRole === 'admin' },
        { name: 'Access logs', granted: selectedRole === 'admin' }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="font-semibold">Permissions</h2>
      </div>

      <div className="divide-y divide-gray-100">
        {permissions.map((category) => (
          <div key={category.category} className="p-4">
            <h3 className="font-medium mb-4">{category.category}</h3>
            <div className="space-y-2">
              {category.items.map((permission) => (
                <div
                  key={permission.name}
                  className="flex items-center justify-between py-2 px-4 rounded-lg bg-gray-50"
                >
                  <span className="text-sm">{permission.name}</span>
                  {permission.granted ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <X className="w-5 h-5 text-red-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}