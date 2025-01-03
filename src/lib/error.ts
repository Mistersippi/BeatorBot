import { getSupabaseClient } from './supabase/client';

export async function logError(message: string, error: unknown) {
  console.error(message, error);

  try {
    const supabase = await getSupabaseClient();
    const { data: userData } = await supabase.auth.getUser();
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', userData.user?.id)
      .single();

    await supabase.from('error_logs').insert({
      user_id: user?.id,
      error_type: 'submission_error',
      error_message: message,
      stack_trace: error instanceof Error ? error.stack : String(error),
      severity: 'error'
    });
  } catch (logError) {
    // Fail silently but log to console
    console.error('Failed to log error:', logError);
  }
}