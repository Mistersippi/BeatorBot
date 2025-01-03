import { supabase } from './supabase';

export async function signUpWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/verify`,
        data: {
          email: email,
        }
      },
    });

    if (error) throw error;

    // Return success with verification email sent status
    return { 
      data, 
      error: null,
      verificationEmailSent: true 
    };
  } catch (error) {
    console.error('Error signing up:', error);
    return { 
      data: null, 
      error,
      verificationEmailSent: false 
    };
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error signing in:', error);
    return { data: null, error };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error signing out:', error);
    return { error };
  }
}

export async function updateUsername(userId: string, username: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ username })
      .eq('auth_id', userId);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating username:', error);
    return { data: null, error };
  }
}
