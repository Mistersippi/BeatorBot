import { supabase, supabaseAdmin } from '../client';

export function validateUsername(username: string): string | null {
  if (!username) return 'Username is required';
  if (username.length < 3) return 'Username must be at least 3 characters';
  if (username.length > 30) return 'Username must be less than 30 characters';
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(username)) {
    return 'Username can only contain letters, numbers, underscores and hyphens, and must start with a letter or number';
  }
  return null;
}

export async function checkUsernameAvailability(username: string): Promise<boolean> {
  try {
    console.log('Checking username availability for:', username);
    
    // Use admin client if available, otherwise fall back to regular client
    const client = supabaseAdmin || supabase;
    
    const { data, error } = await client
      .from('users')
      .select('username')
      .eq('username', username)
      .maybeSingle();

    if (error) {
      console.error('Username check error:', error);
      // Instead of assuming username is taken, we'll check if it's a permissions error
      if (error.code === 'PGRST301') {
        console.log('Permissions error - assuming username is available');
        return true;
      }
      throw error;
    }

    const isAvailable = !data;
    console.log('Username availability result:', { username, isAvailable, data });
    return isAvailable;
  } catch (error) {
    console.error('Username availability check failed:', error);
    // Only return false for actual conflicts, not for other errors
    if (error.code === '23505') { // Unique constraint violation
      return false;
    }
    // For other errors, assume username is available
    return true;
  }
}