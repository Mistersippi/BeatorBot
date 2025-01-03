import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyEmailWithToken } from '../../lib/supabase/auth/verification';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';

export function AuthVerify() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token_hash = searchParams.get('token_hash');
        const email = searchParams.get('email');

        if (!token_hash || !email) {
          throw new Error('Invalid verification link');
        }

        const { error } = await verifyEmailWithToken(token_hash, email);
        if (error) throw error;

        toast.success('Email verified successfully!');
        navigate('/profile/settings');
      } catch (err) {
        console.error('Verification failed:', err);
        toast.error('Verification failed. Please try again.');
        navigate('/');
      }
    };

    verifyEmail();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg">
        <Loader className="w-8 h-8 animate-spin text-purple-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying your email...</h2>
        <p className="text-gray-600">Please wait a moment</p>
      </div>
    </div>
  );
}