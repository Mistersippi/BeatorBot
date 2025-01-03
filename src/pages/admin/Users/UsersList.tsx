import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users as UsersIcon } from 'lucide-react';
import { supabase } from '../../../lib/supabase/client';
import { UserCard } from './UserCard';
import type { UserFilter, SortOption } from './types';
import type { Database } from '../../../lib/database.types';

type User = Database['public']['Tables']['users']['Row'];

interface UsersListProps {
  filter: UserFilter;
  sort: SortOption;
  search: string;
}

export function UsersList({ filter, sort, search }: UsersListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        let query = supabase
          .from('users')
          .select('*');

        // Apply filter
        if (filter !== 'all') {
          query = query.eq('account_status', filter);
        }

        // Apply search
        if (search) {
          query = query.or(`username.ilike.%${search}%,email.ilike.%${search}%`);
        }

        // Apply sort
        switch (sort) {
          case 'recent':
            query = query.order('created_at', { ascending: false });
            break;
          case 'oldest':
            query = query.order('created_at', { ascending: true });
            break;
          case 'username':
            query = query.order('username', { ascending: true });
            break;
          case 'email':
            query = query.order('email', { ascending: true });
            break;
        }

        const { data, error: fetchError } = await query;
        if (fetchError) throw fetchError;
        setUsers(data || []);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch users'));
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [filter, sort, search]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gray-100 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-white rounded-xl">
        <p className="text-red-500">Failed to load users. Please try again.</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl">
        <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
        <p className="text-gray-500">
          {search 
            ? 'Try adjusting your search criteria'
            : 'Users will appear here once they sign up'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {users.map((user) => (
          <motion.div
            key={user.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <UserCard user={user} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}