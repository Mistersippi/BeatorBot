import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Loader, RefreshCw } from 'lucide-react';
import { verifyEmailWithToken } from '../../lib/supabase/auth/verification/index';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface VerificationFormProps {
  email: string;
  onClose: () => void;
  onBack: () => void;
}

export function VerificationForm({ email, onClose, onBack }: VerificationFormProps) {
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length !== 6) return;

    setIsVerifying(true);
    try {
      const result = await verifyEmailWithToken(verificationCode, email);
      
      if (!result.success) {
        throw new Error(result.error || 'Verification failed');
      }

      // Update auth context with verified user
      if (result.user) {
        setUser(result.user);
      }
      
      // Show success message and redirect
      toast.success('Email verified successfully!');
      onClose();
      navigate('/profile/settings');
    } catch (err) {
      console.error('Verification error:', err);
      toast.error(err instanceof Error ? err.message : 'Invalid verification code');
      setVerificationCode(''); // Clear invalid code
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
      toast.success('New verification code sent! Please check your email.');
    } catch (err) {
      console.error('Resend error:', err);
      toast.error('Failed to send new code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
        <p className="text-gray-600">
          We've sent a verification code to:
        </p>
        <p className="font-semibold text-lg mt-2 mb-4">{email}</p>
      </div>

      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Verification Code
          </label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter 6-digit code"
            maxLength={6}
            pattern="[0-9]{6}"
            required
            disabled={isVerifying}
            autoComplete="one-time-code"
          />
        </div>

        <button
          type="submit"
          disabled={isVerifying || verificationCode.length !== 6}
          className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isVerifying ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify Email'
          )}
        </button>
      </form>

      <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
        <button
          onClick={handleResend}
          disabled={isResending}
          className="text-sm text-purple-600 hover:text-purple-700 flex items-center disabled:opacity-50"
        >
          {isResending ? (
            <>
              <Loader className="w-4 h-4 mr-1 animate-spin" />
              Resending...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-1" />
              Resend Code
            </>
          )}
        </button>
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Try different email
        </button>
      </div>
    </div>
  );
}