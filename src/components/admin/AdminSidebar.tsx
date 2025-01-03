import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, LayoutDashboard, Music2, Users, BarChart2, 
  Bell, Settings, ShieldCheck 
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Track Management', href: '/admin/tracks', icon: Music2 },
  { name: 'User Management', href: '/admin/users', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
  { name: 'Notifications', href: '/admin/notifications', icon: Bell },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'Access Control', href: '/admin/access', icon: ShieldCheck }
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const location = useLocation();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-600 bg-opacity-75 lg:hidden z-40"
              onClick={onClose}
            />

            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed inset-y-0 left-0 flex flex-col w-80 bg-white border-r border-gray-200 pt-5 pb-4 z-50"
            >
              <div className="flex items-center justify-between px-4">
                <Link to="/admin" className="flex items-center">
                  <Music2 className="w-8 h-8 text-purple-600" />
                  <span className="ml-2 text-xl font-bold">Admin Dashboard</span>
                </Link>
                <button
                  onClick={onClose}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="mt-8 flex-1 px-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`
                        flex items-center px-4 py-2 text-sm font-medium rounded-lg
                        ${isActive
                          ? 'bg-purple-50 text-purple-600'
                          : 'text-gray-600 hover:bg-gray-50'
                        }
                      `}
                    >
                      <item.icon className={`
                        w-5 h-5 mr-3
                        ${isActive ? 'text-purple-600' : 'text-gray-400'}
                      `} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-80 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200 pt-5">
          <div className="flex items-center justify-between px-4">
            <Link to="/admin" className="flex items-center">
              <Music2 className="w-8 h-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold">Admin Dashboard</span>
            </Link>
          </div>

          <nav className="mt-8 flex-1 px-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-4 py-2 text-sm font-medium rounded-lg
                    ${isActive
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <item.icon className={`
                    w-5 h-5 mr-3
                    ${isActive ? 'text-purple-600' : 'text-gray-400'}
                  `} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}