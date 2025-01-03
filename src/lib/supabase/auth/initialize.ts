import { supabase } from '../client';
import { verifyAdminRole } from './roles';

export async function initializeAuth() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    if (!user) return null;

    // Get user profile with role
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, username, role')
      .eq('auth_id', user.id)
      .single();

    if (profileError) {
      console.error('Failed to fetch user profile:', profileError);
      return null;
    }

    // Double-check admin role
    const isAdmin = await verifyAdminRole(user.id);
    console.log('Auth initialized:', { 
      profile,
      isAdmin,
      metadata: user.user_metadata 
    });

    // Return user with verified role
    return {
      ...user,
      id: profile.id,
      username: profile.username,
      role: isAdmin ? 'admin' : profile.role,
      user_metadata: {
        ...user.user_metadata,
        role: isAdmin ? 'admin' : profile.role
      }
    };
  } catch (error) {
    console.error('Auth initialization failed:', error);
    return null;
  }
}