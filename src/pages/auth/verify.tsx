import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase/client';
import { verifyOtp } from '../../lib/supabase/auth/operations';
import toast from 'react-hot-toast';
import { Mail } from 'lucide-react';

export function VerifyEmail() {
  const [verifying, setVerifying] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleVerification = async () => {
      try {
        // Log all URL parameters for debugging
        console.log('URL parameters:', Object.fromEntries(searchParams.entries()));

        // Get token_hash and type from URL
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type') as 'signup' | 'recovery' | 'invite' | 'email';

        if (!token_hash || !type) {
          console.error('Missing parameters:', { token_hash, type });
          throw new Error('Missing verification parameters');
        }

        // Attempt verification with token
        const { data, error } = await verifyOtp(token_hash, type);
        
        if (error) {
          console.error('Verification failed:', error);
          throw error;
        }

        // Double check if verification was successful
        const { data: { user } } = await supabase.auth.getUser();
        console.log('User after verification:', user);
        
        if (user?.email_verified) {
          toast.success('Email verified successfully!');
          setVerifying(false);
          navigate('/profile/settings');
          return;
        }

        // If we get here, something went wrong
        throw new Error('Verification status check failed');

      } catch (err) {
        console.error('Verification error:', err);
        setVerifying(false);
        toast.error('Verification failed. Please try again.');
      }
    };

    handleVerification();
  }, [navigate, searchParams]);

  if (verifying) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600">Verifying your email...</p>
              <p className="mt-2 text-sm text-gray-500">This may take a few moments</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Verification Failed
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              We couldn't verify your email. Please try again or check your email for a new verification link.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
