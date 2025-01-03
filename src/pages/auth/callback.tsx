import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase/client';
import { Loader } from 'lucide-react';

export function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');

        console.log('Auth callback params:', { token_hash, type });

        if (!token_hash) {
          throw new Error('No token hash found in URL');
        }

        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: type as 'signup' | 'recovery' | 'invite' | 'email'
        });

        if (error) throw error;

        // Successful verification
        navigate('/profile/settings');
      } catch (error) {
        console.error('Error in auth callback:', error);
        navigate('/auth/verify?error=' + encodeURIComponent(error.message));
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-white">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg">
        <Loader className="w-8 h-8 animate-spin text-purple-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying your email...</h2>
        <p className="text-gray-600">Please wait a moment</p>
      </div>
    </div>
  );
}
