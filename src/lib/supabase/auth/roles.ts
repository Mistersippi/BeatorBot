import { supabase } from '../client';

/**
 * Verify if a user has admin role by checking both the users table
 * and the auth metadata
 */
export async function verifyAdminRole(userId: string): Promise<boolean> {
  try {
    // Check users table
    const { data: profile, error } = await supabase
      .from('users')
      .select('role')
      .eq('auth_id', userId)
      .single();

    if (error) {
      console.error('Error verifying admin role:', error);
      return false;
    }

    // Check auth metadata
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) {
      console.error('Error getting auth user:', authError);
      return false;
    }

    // User is admin if either the profile or metadata indicates admin role
    return profile?.role === 'admin' || user?.user_metadata?.role === 'admin';
  } catch (error) {
    console.error('Failed to verify admin role:', error);
    return false;
  }
}

/**
 * Update user role in both users table and auth metadata
 */
export async function updateUserRole(userId: string, role: string): Promise<void> {
  try {
    // Update users table
    const { error: updateError } = await supabase
      .from('users')
      .update({ role })
      .eq('auth_id', userId);

    if (updateError) throw updateError;

    // Update auth metadata
    const { error: metadataError } = await supabase.auth.updateUser({
      data: { role }
    });

    if (metadataError) throw metadataError;
  } catch (error) {
    console.error('Failed to update user role:', error);
    throw error;
  }
}