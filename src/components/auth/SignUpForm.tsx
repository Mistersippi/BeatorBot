import { useState } from 'react';
import { AuthModal } from './AuthModal';
import { VerificationForm } from './VerificationForm';
import { supabase } from '../../lib/supabase/client';
import toast from 'react-hot-toast';

interface SignUpFormProps {
  showSignUp: boolean;
  setShowSignUp: (show: boolean) => void;
  switchToSignIn: () => void;
}

export function SignUpForm({ showSignUp, setShowSignUp, switchToSignIn }: SignUpFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!termsAccepted) {
        throw new Error('You must accept the terms and conditions');
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            email,
            newsletter
          }
        }
      });

      if (signUpError) throw signUpError;

      setShowVerification(true);
      toast.success('Please check your email for the verification code!');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign up');
      toast.error(err instanceof Error ? err.message : 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthModal
      isOpen={showSignUp}
      onClose={() => setShowSignUp(false)}
      title={showVerification ? "Verify Your Email" : "Create an Account"}
    >
      {showVerification ? (
        <VerificationForm
          email={email}
          onClose={() => setShowSignUp(false)}
          onBack={() => setShowVerification(false)}
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="newsletter"
              name="newsletter"
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-900">
              Subscribe to our newsletter
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I accept the terms and conditions
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
            >
              {isLoading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>

          <div className="text-sm text-center">
            <button
              type="button"
              onClick={switchToSignIn}
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Already have an account? Sign in
            </button>
          </div>
        </form>
      )}
    </AuthModal>
  );
}