import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';
import { AuthModal } from './AuthModal';

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

  // Optional debug logs to see when this component mounts/unmounts
  useEffect(() => {
    console.log('SignInForm mounted');
    return () => {
      console.log('SignInForm unmounted');
    };
  }, []);

  // Cleanup (reset states) if form is closed or unmounted
  useEffect(() => {
    if (!showSignIn) {
      setLoading(false);
      setError('');
      setEmail('');
      setPassword('');
    }
  }, [showSignIn]);

  // Handler for form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (loading) {
      console.log('Already loading, ignoring extra submit');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Starting sign in process...');
      console.log(`AuthContext signIn called with email: ${email}`);

      await signIn(email, password);

      console.log('Sign in successful. About to close modal and navigate to /profile');
      toast.success('Successfully signed in!');

      // Immediately close the modal and navigate
      setShowSignIn(false);
      setLoading(false);
      navigate('/profile');

    } catch (err: any) {
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

  // Handler for closing the modal (e.g. X button, background click)
  const handleClose = () => {
    console.log('handleClose called - user canceled sign in');
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

        {/* Email Field */}
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
              required
              placeholder="Enter your email"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300
                         rounded-lg focus:ring-2 focus:ring-purple-600
                         focus:border-transparent disabled:bg-gray-100
                         disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Password Field */}
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
              required
              placeholder="Enter your password"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300
                         rounded-lg focus:ring-2 focus:ring-purple-600
                         focus:border-transparent disabled:bg-gray-100
                         disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full bg-purple-600 text-white py-2 px-4
                     rounded-lg hover:bg-purple-700 focus:outline-none
                     focus:ring-2 focus:ring-purple-600 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center"
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

        {/* Switch to Sign Up */}
        <p className="text-sm text-gray-600 text-center">
          Don&apos;t have an account?{' '}
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
