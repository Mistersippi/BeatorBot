import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

export function AdminNav() {
  const { user } = useAuth();
  const isAdmin = user?.user_metadata?.role === 'admin';

  if (!isAdmin) return null;

  return (
    <Link
      to="/admin"
      className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
    >
      <LayoutDashboard className="w-4 h-4" />
      Admin Dashboard
    </Link>
  );
}