import { useState } from 'react';
import { RolesList } from './RolesList';
import { PermissionMatrix } from './PermissionMatrix';
import { RoleEditor } from './RoleEditor';
import { AccessStats } from './AccessStats';

export function Access() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Access Control</h1>
        <p className="text-gray-600">Manage user roles and permissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <RolesList onRoleSelect={setSelectedRole} selectedRole={selectedRole} />
          <PermissionMatrix selectedRole={selectedRole} />
        </div>
        <div className="space-y-6">
          <AccessStats />
          {selectedRole && <RoleEditor roleId={selectedRole} />}
        </div>
      </div>
    </div>
  );
}