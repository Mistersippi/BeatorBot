import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase/client';
import { verifyEmailWithToken, resendVerificationEmail } from '../../../lib/supabase/auth/verification';
import { VerifyingState } from './components/VerifyingState';
import { ErrorState } from './components/ErrorState';
import toast from 'react-hot-toast';

export function VerifyEmail() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [email, setEmail] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const getEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setEmail(user.email);
      }
    };
    getEmail();
  }, []);

  const handleVerify = async () => {
    if (!code || code.length !== 6 || !email) {
      setError('Please enter the 6-digit verification code');
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const result = await verifyEmailWithToken(code, email);
      
      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success('Email verified successfully!');
      navigate('/profile/settings');
    } catch (err) {
      console.error('Verification error:', err);
      setError(err instanceof Error ? err.message : 'Failed to verify email');
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) return;
    
    setIsResending(true);
    try {
      const result = await resendVerificationEmail(email);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      toast.success('Verification code resent!');
    } catch (err) {
      console.error('Error resending code:', err);
      toast.error('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!email) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Verify Your Email</h1>
        <p className="text-center text-gray-600 mb-6">
          We've sent a verification code to {email}
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Verification Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                if (value.length <= 6) {
                  setCode(value);
                }
              }}
              maxLength={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-center text-2xl tracking-wider"
              placeholder="000000"
            />
          </div>
          <button
            onClick={handleVerify}
            disabled={isVerifying || code.length !== 6}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isVerifying ? <VerifyingState /> : 'Verify Email'}
          </button>
          <button
            onClick={handleResendCode}
            disabled={isResending}
            className="w-full text-center text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
          >
            {isResending ? 'Sending...' : 'Resend Code'}
          </button>
        </div>
      </div>
    </div>
  );
}