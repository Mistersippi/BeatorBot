import type { User } from '@supabase/supabase-js';
import { supabase } from './client';

/**
 * Create or update user profile
 */
export async function syncUserProfile(user: User) {
  if (!user?.id) {
    console.error('No user ID provided to syncUserProfile');
    return { error: new Error('No user ID provided') };
  }

  try {
    // Prepare user data with required fields
    const userData = {
      auth_id: user.id, // This is the UUID from auth.users
      email: user.email || '',
      username: user.user_metadata?.username || user.email?.split('@')[0] || user.id,
      updated_at: new Date().toISOString()
    };

    console.log('Syncing user profile:', {
      auth_id: userData.auth_id,
      email: userData.email,
      username: userData.username
    });

    // Use upsert with onConflict option
    const { error } = await supabase
      .from('users')
      .upsert(userData, {
        onConflict: 'auth_id'
      });

    if (error) {
      console.error('Error syncing user profile:', error);
      return { error };
    }

    return { error: null };
  } catch (error) {
    console.error('Unexpected error in syncUserProfile:', error);
    return { error };
  }
}

/**
 * Initialize auth and fetch current user
 */
export async function initializeAuth(): Promise<User | null> {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Session error:', sessionError);
      return null;
    }

    if (session?.user) {
      await syncUserProfile(session.user);
    }

    return session?.user || null;
  } catch (error) {
    console.error('Auth initialization failed:', error);
    return null;
  }
}

/**
 * Set up auth state change listener
 */
export async function setupAuthListener(callback: (user: User | null) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        if (session?.user) {
          await syncUserProfile(session.user);
        }
      }
      callback(session?.user ?? null);
    }
  );

  return subscription;
}

/**
 * Check if username is available (optional utility)
 */
export async function checkUsernameAvailability(username: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .ilike('username', username)
      .maybeSingle();

    if (error) {
      console.error('Username availability check failed:', error);
      return false;
    }

    // if data is null, no user found => username is available
    return !data;
  } catch (error) {
    console.error('Username availability check failed:', error);
    return false;
  }
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;

    // If sign in successful, ensure user record exists
    if (data.user) {
      await syncUserProfile(data.user);
    }

    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

/**
 * Sign up with email and password
 */
export async function signUpWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          email,
        }
      }
    });

    if (error) throw error;

    // Get the session immediately after signup
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) throw sessionError;

    // If sign up successful and we have a session, create the user record
    if (data.user && session) {
      await syncUserProfile(data.user);
    }

    return data;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  // First clear any session data
  localStorage.removeItem('supabase.auth.token');
  localStorage.removeItem('supabase.auth.expires_at');
  localStorage.removeItem('supabase.auth.refresh_token');
  
  // Sign out and invalidate the session
  await supabase.auth.signOut();
  
  return { error: null };
}