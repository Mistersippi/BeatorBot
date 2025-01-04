import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader } from 'lucide-react';
import { useAuth } from './AuthContext';
import { AuthModal } from './AuthModal';
import toast from 'react-hot-toast';

interface SignInFormProps {
  showSignIn: boolean;
  setShowSignIn: (show: boolean) => void;
  switchToSignUp: () => void;
}

export function SignInForm({ showSignIn, setShowSignIn, switchToSignUp }: SignInFormProps) {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setError('');

    try {
      console.log('Starting sign in process...');
      await signIn(email, password);
      console.log('Sign in successful');
      
      toast.success('Successfully signed in!');
      
      // Add a small delay before closing modal and navigating
      setTimeout(() => {
        setLoading(false);  // Clear loading state
        setShowSignIn(false);  // Close the modal
        navigate('/profile');  // Navigate to profile
      }, 1000);

    } catch (err) {
      console.error('Sign in error:', err);
      let errorMessage = 'Failed to sign in. Please try again.';
      
      if (err instanceof Error) {
        if (err.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password';
        } else if (err.message.includes('Email not confirmed')) {
          errorMessage = 'Please verify your email address before signing in';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      setLoading(false);
      setError('');
    };
  }, []);

  // Handle modal close
  const handleClose = () => {
    setShowSignIn(false);
    setLoading(false);
    setError('');
    setEmail('');
    setPassword('');
  };

  return (
    <AuthModal 
      isOpen={showSignIn} 
      onClose={handleClose}
      title="Sign In"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>

        <p className="text-sm text-gray-600 text-center">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={switchToSignUp}
            className="text-purple-600 hover:text-purple-700 font-medium"
            disabled={loading}
          >
            Sign Up
          </button>
        </p>
      </form>
    </AuthModal>
  );
}