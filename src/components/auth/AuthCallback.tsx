import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase/client';
import { syncUserProfile } from '../../lib/supabase/auth';

export function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Get the token and email from the URL query parameters
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const type = params.get('type');
        const email = params.get('email');

        // Log parameters for debugging
        console.log('Auth Callback Parameters:', {
          token,
          type,
          email,
          fullUrl: window.location.href
        });

        if (!token || !email) {
          console.error('Missing token or email in URL');
          navigate('/?error=Invalid verification link');
          return;
        }

        // Verify the email with the token
        const { error: verifyError } = await supabase.auth.verifyOtp({
          token,
          type: type as 'signup' | 'email' | 'recovery' | 'invite',  // Use the type from URL
          email: email
        });

        // Log verification error if it exists
        if (verifyError) {
          console.error('Verification error details:', {
            error: verifyError,
            message: verifyError.message,
            status: verifyError.status
          });
          navigate('/?error=Failed to verify email');
          return;
        }

        // Get the user after verification
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error('Error getting user:', userError);
          navigate('/?error=Unable to get user profile');
          return;
        }

        // Create/update user profile
        const { error: profileError } = await syncUserProfile(user);

        if (profileError) {
          console.error('Error creating profile:', profileError);
          navigate('/?message=Email verified successfully&warning=Profile update failed');
          return;
        }

        navigate('/?message=Email verified successfully');
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/?error=Verification failed');
      }
    };

    handleEmailConfirmation();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Verifying your email...</p>
      </div>
    </div>
  );
}
