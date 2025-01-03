import { supabase } from './supabase';

export async function testSupabaseConnection() {
  try {
    const { error } = await supabase.from('users').select('count').single();
    if (error) throw error;
    console.log('Successfully connected to Supabase!');
    return true;
  } catch (error) {
    console.error('Failed to connect to Supabase:', error);
    return false;
  }
}
