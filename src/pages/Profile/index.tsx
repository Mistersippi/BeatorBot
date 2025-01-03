import { ProfileHeader } from './ProfileHeader';
import { ProfileSettings } from './ProfileSettings';
import { GameStats } from './GameStats';
import { FeaturedTracks } from './FeaturedTracks';
import { RoleManager } from '../../components/admin/RoleManager';
import { useAuth } from '../../components/auth/AuthContext';

export function Profile() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-24 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <ProfileHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ProfileSettings />
            <FeaturedTracks />
          </div>
          <div className="space-y-8">
            <GameStats />
            {isAdmin && (
              <RoleManager 
                userId={user.id}
                currentRole={user.role}
                onRoleChange={() => {
                  // Refresh user data after role change
                  window.location.reload();
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}