import type { User } from '@supabase/supabase-js';
import { supabase } from '../client';

export async function setupAuthListener(callback: (user: User | null) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (!session?.user) {
        callback(null);
        return;
      }

      try {
        // Get user profile with role
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('id, username, role')
          .eq('auth_id', session.user.id)
          .single();

        if (profileError) throw profileError;

        console.log('Auth state changed with profile:', profile); // Debug log

        // Return user with profile data
        callback({
          ...session.user,
          id: profile.id,
          username: profile.username,
          role: profile.role,
          user_metadata: {
            ...session.user.user_metadata,
            role: profile.role
          }
        });
      } catch (error) {
        console.error('Failed to sync user profile:', error);
        callback(session.user);
      }
    }
  );

  return subscription;
}