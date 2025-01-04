import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

interface RequireAdminProps {
  children: React.ReactNode;
}

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check if user has admin role in any of the possible locations
  const isAdmin = user?.role === 'admin' || 
                 user?.user_metadata?.role === 'admin' || 
                 user?.account_type === 'admin';

  if (!isAdmin) {
    console.log('Access denied: User is not an admin', { user });
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}