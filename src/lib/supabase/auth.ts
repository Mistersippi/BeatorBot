import type { User } from '@supabase/supabase-js';
import { supabase } from './client';

export async function syncUserProfile(user: User) {
  if (!user?.id) {
    console.error('No user ID provided to syncUserProfile');
    return { error: new Error('No user ID provided') };
  }

  try {
    const userData = {
      auth_id: user.id,
      email: user.email || '',
      username: user.user_metadata?.username || user.email?.split('@')[0] || user.id,
      updated_at: new Date().toISOString()
    };

    console.log('Syncing user profile:', userData);

    const { error } = await supabase
      .from('users')
      .upsert(userData, {
        onConflict: 'auth_id'
      })
      .single();

    if (error) {
      console.error('Error syncing user profile:', error);
      return { error };
    }

    console.log('User profile synced successfully');
    return { error: null };
  } catch (error) {
    console.error('Unexpected error in syncUserProfile:', error);
    return { error };
  }
}

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

export async function setupAuthListener(callback: (user: User | null) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      console.log('Auth state change:', event);
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

    return !data;
  } catch (error) {
    console.error('Username availability check failed:', error);
    return false;
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    console.log('Attempting sign in for:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('Sign in error:', error);
      throw error;
    }

    console.log('Sign in successful:', data.user?.id);

    if (data.user) {
      console.log('Syncing user profile after sign in');
      const { error: syncError } = await syncUserProfile(data.user);
      if (syncError) {
        console.error('Error syncing profile after sign in:', syncError);
      }
    }

    return { data, error: null };
  } catch (error) {
    console.error('Sign in process failed:', error);
    throw error;
  }
}

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

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) throw sessionError;

    if (data.user && session) {
      await syncUserProfile(data.user);
    }

    return { data, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

export async function signOut() {
  localStorage.removeItem('supabase.auth.token');
  localStorage.removeItem('supabase.auth.expires_at');
  localStorage.removeItem('supabase.auth.refresh_token');
  
  await supabase.auth.signOut();
  
  return { error: null };
}