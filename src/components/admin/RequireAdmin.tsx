import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

interface RequireAdminProps {
  children: React.ReactNode;
}

export function RequireAdmin({ children }: RequireAdminProps) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check if user has admin account type
  const isAdmin = user?.account_type === 'admin';
  if (!isAdmin) {
    console.log('Access denied: User is not an admin', { account_type: user?.account_type });
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}