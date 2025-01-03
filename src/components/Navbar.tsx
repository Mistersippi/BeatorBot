import { Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuth } from './auth/AuthContext';
import { UserMenu } from './auth/UserMenu';

export function Navbar() {
  const { isAuthenticated, setShowSignIn, setShowSignUp } = useAuth();

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link 
                to="/submit" 
                className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
              >
                <Music className="w-4 h-4 mr-2" />
                Submit Music
              </Link>
            ) : (
              <button
                onClick={() => setShowSignIn(true)}
                className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
              >
                <Music className="w-4 h-4 mr-2" />
                Submit Music
              </button>
            )}

            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSignIn(true)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSignUp(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Sign Up
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}