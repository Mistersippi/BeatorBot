import { User } from '@supabase/supabase-js';
import { supabase } from '../client';

export async function syncUserProfile(user: User) {
  try {
    if (!user.email) {
      throw new Error('User email is required');
    }

    console.log('Starting profile sync for user:', user.id);

    // First try to find existing user
    const { data: existingUser, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', user.id)
      .single();

    if (findError && findError.code !== 'PGRST116') { // PGRST116 means not found
      console.error('Error finding user:', findError);
      throw findError;
    }

    const userData = {
      auth_id: user.id,
      email: user.email,
      username: user.user_metadata.username || user.email.split('@')[0],
      has_set_username: !!existingUser?.username,
      account_status: 'active',
      account_type: 'user',
      metadata: {}
    };

    if (existingUser) {
      // Update existing user
      console.log('Updating existing user:', existingUser.id);
      const { error: updateError } = await supabase
        .from('users')
        .update(userData)
        .eq('auth_id', user.id);

      if (updateError) {
        console.error('Error updating user:', updateError);
        throw updateError;
      }
    } else {
      // Insert new user
      console.log('Creating new user profile');
      const { error: insertError } = await supabase
        .from('users')
        .insert([userData]);

      if (insertError) {
        console.error('Error creating user:', insertError);
        throw insertError;
      }
    }

    console.log('Profile sync completed successfully');
    return { error: null };
  } catch (error) {
    console.error('Profile sync failed:', error);
    return { error };
  }
}