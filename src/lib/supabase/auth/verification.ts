import { AuthError } from '@supabase/supabase-js';
import { supabase } from '../client';
import { syncUserProfile } from './operations';

export interface VerificationResult {
  success: boolean;
  error?: string;
  email?: string;
  isVerified?: boolean;
}

/**
 * Check if the current user's email is verified
 */
export async function checkEmailVerification(): Promise<VerificationResult> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    
    if (!user) {
      throw new Error('No user found');
    }

    return {
      success: true,
      isVerified: user.email_verified,
      email: user.email
    };
  } catch (error) {
    console.error('Error checking verification status:', error);
    return {
      success: false,
      isVerified: false,
      error: error instanceof AuthError ? error.message : 'Failed to check verification status'
    };
  }
}

/**
 * Verify email with OTP token
 */
export async function verifyEmailWithToken(token: string, email: string): Promise<VerificationResult> {
  try {
    console.log('Starting email verification:', { token, email });

    const { data, error } = await supabase.auth.verifyOtp({
      token,
      type: 'signup',
      email
    });

    if (error) {
      console.error('Verification error:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }

    if (!data.user) {
      return { 
        success: false, 
        error: 'Verification failed - no user found' 
      };
    }

    // Sync user profile after successful verification
    await syncUserProfile(data.user);

    return { 
      success: true,
      email: data.user.email 
    };
  } catch (err) {
    console.error('Unexpected error during verification:', err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'An unexpected error occurred' 
    };
  }
}

/**
 * Resend verification email to the user
 */
export async function resendVerificationEmail(email: string): Promise<VerificationResult> {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email
    });

    if (error) throw error;

    return {
      success: true,
      email
    };
  } catch (error) {
    console.error('Error resending verification email:', error);
    return {
      success: false,
      error: error instanceof AuthError ? error.message : 'Failed to resend verification email'
    };
  }
}