import { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';
import type { Database } from '../database.types';

type Submission = Database['public']['Tables']['submissions']['Row'];

export function useSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let subscription: ReturnType<typeof supabase.channel> | null = null;

    async function fetchSubmissions() {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;
        if (!user) throw new Error('Not authenticated');

        const { data: userData } = await supabase
          .from('users')
          .select('id')
          .eq('auth_id', user.id)
          .single();

        if (!userData) throw new Error('User profile not found');

        // Initial fetch
        const { data, error: submissionsError } = await supabase
          .from('submissions')
          .select('*')
          .eq('user_id', userData.id)
          .order('created_at', { ascending: false });

        if (submissionsError) throw submissionsError;
        setSubmissions(data || []);

        // Set up real-time subscription
        subscription = supabase
          .channel('submissions_changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'submissions',
              filter: `user_id=eq.${userData.id}`
            },
            (payload) => {
              if (payload.eventType === 'INSERT') {
                setSubmissions(prev => [payload.new as Submission, ...prev]);
              } else if (payload.eventType === 'UPDATE') {
                setSubmissions(prev => 
                  prev.map(sub => 
                    sub.id === payload.new.id ? payload.new as Submission : sub
                  )
                );
              } else if (payload.eventType === 'DELETE') {
                setSubmissions(prev => 
                  prev.filter(sub => sub.id !== payload.old.id)
                );
              }
            }
          )
          .subscribe();

      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch submissions'));
      } finally {
        setLoading(false);
      }
    }

    fetchSubmissions();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return { submissions, loading, error };
}