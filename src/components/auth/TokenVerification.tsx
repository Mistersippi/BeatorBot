import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { syncUserProfile } from '../../lib/supabase/auth/operations';
import toast from 'react-hot-toast';

interface TokenVerificationProps {
  email: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function TokenVerification({ email, onSuccess, onCancel }: TokenVerificationProps) {
  const [token, setToken] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'signup'
      });

      if (error) throw error;

      if (data.user) {
        await syncUserProfile(data.user);
        toast.success('Email verified successfully!');
        onSuccess();
      }
    } catch (err) {
      console.error('Verification error:', err);
      toast.error('Invalid verification code. Please try again.');
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
      });

      if (error) throw error;
      toast.success('Verification code resent!');
    } catch (err) {
      console.error('Error resending code:', err);
      toast.error('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
          <Mail className="w-8 h-8 text-purple-600" />
        </div>
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
            value={token}
            onChange={(e) => setToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter 6-digit code"
            maxLength={6}
            pattern="[0-9]{6}"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isVerifying || token.length !== 6}
          className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify Email'
          )}
        </motion.button>
      </form>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <button
          onClick={handleResend}
          disabled={isResending}
          className="text-sm text-purple-600 hover:text-purple-700 flex items-center"
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
          onClick={onCancel}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Try different email
        </button>
      </div>
    </div>
  );
}