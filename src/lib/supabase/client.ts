import { createClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const siteUrl = import.meta.env.PROD 
  ? 'https://www.beatorbot.com'
  : import.meta.env.VITE_SITE_URL || 'http://localhost:3000';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: window.localStorage,
    redirectTo: `${siteUrl}/auth/callback`,
    debug: true
  }
});

supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', {
    event,
    userId: session?.user?.id,
    email: session?.user?.email,
    timestamp: new Date().toISOString()
  });
  
  if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
    window.localStorage.setItem('supabase.auth.event', JSON.stringify({
      event,
      timestamp: new Date().toISOString()
    }));
  }
});

export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    console.log('Supabase connection healthy:', !!data.session);
    return true;
  } catch (err) {
    console.error('Failed to check Supabase connection:', err);
    return false;
  }
}

export const getSupabaseClient = () => supabase;