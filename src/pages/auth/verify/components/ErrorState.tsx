import { AlertCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { resendVerificationEmail } from '../../../../lib/supabase/auth/verification';
import toast from 'react-hot-toast';

interface ErrorStateProps {
  error: string;
  email: string;
}

export function ErrorState({ error, email }: ErrorStateProps) {
  const navigate = useNavigate();

  const handleResend = async () => {
    try {
      const { error: resendError } = await resendVerificationEmail(email);
      if (resendError) throw resendError;
      
      toast.success('New verification email sent! Please check your inbox.');
    } catch (err) {
      toast.error('Failed to send verification email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Verification Failed
        </h3>
        <p className="text-gray-600 mb-6">{error}</p>
        
        {email && (
          <button
            onClick={handleResend}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 mb-4"
          >
            <RefreshCw className="w-4 h-4" />
            Resend Verification Email
          </button>
        )}
        
        <button
          onClick={() => navigate('/')}
          className="text-purple-600 hover:text-purple-700"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}