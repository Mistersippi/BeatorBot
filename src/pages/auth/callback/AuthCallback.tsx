import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../../lib/supabase/client';
import { syncUserProfile } from '../../../lib/supabase/auth/operations';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';

export function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get token_hash and type from URL
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type') || 'signup';

        console.log('Verification attempt with:', { token_hash, type });

        if (!token_hash) {
          throw new Error('Missing verification token');
        }

        // Verify the OTP token
        const { data, error: verifyError } = await supabase.auth.verifyOtp({
          token_hash,
          type: type as 'signup' | 'recovery' | 'invite' | 'email',
        });

        if (verifyError) {
          console.error('Verification error:', verifyError);
          throw verifyError;
        }

        console.log('Verification successful:', data);

        // Get the user after verification
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          throw userError || new Error('No user found after verification');
        }

        // Sync user profile
        const { error: syncError } = await syncUserProfile(user);
        if (syncError) throw syncError;

        // Show success message and redirect
        toast.success('Email verified successfully!');
        navigate('/profile/settings');
      } catch (err) {
        console.error('Auth callback failed:', err);
        setError(err instanceof Error ? err.message : 'Verification failed');
        toast.error('Verification failed. Please try again.');
        
        // Redirect to home after delay
        setTimeout(() => navigate('/'), 3000);
      }
    };

    handleCallback();
  }, [navigate, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <h3 className="text-xl font-bold text-red-600 mb-4">Verification Failed</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <Loader className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Verifying your email...</h3>
        <p className="text-gray-600">Please wait a moment</p>
      </div>
    </div>
  );
}