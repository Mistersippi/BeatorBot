import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { FormField } from '../../../components/form/FormField';
import { useAuth } from '../../../components/auth/AuthContext';
import { supabase } from '../../../lib/supabase/client';
import toast from 'react-hot-toast';
import type { Profile } from '../types';

export function BasicInfo() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<Partial<Profile>>({
    username: '',
    email: '',
    bio: '',
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', user!.id)
        .single();

      if (error) throw error;

      setInfo({
        username: data.username,
        email: data.email,
        bio: data.bio || '',
      });
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate username if it changed
      if (info.username !== user?.username) {
        const { data: existingUser, error: checkError } = await supabase
          .from('users')
          .select('username')
          .eq('username', info.username)
          .neq('auth_id', user!.id)
          .single();

        if (existingUser) {
          throw new Error('Username already taken');
        }
      }

      const { error: updateError } = await supabase
        .from('users')
        .update({
          username: info.username,
          bio: info.bio || null,
        })
        .eq('auth_id', user!.id);

      if (updateError) throw updateError;

      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Username"
        type="text"
        value={info.username}
        onChange={(e) => setInfo({ ...info, username: e.target.value })}
        required
        disabled={loading}
      />

      <FormField
        label="Email"
        type="email"
        value={info.email}
        disabled={true}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bio
        </label>
        <textarea
          value={info.bio || ''}
          onChange={(e) => setInfo({ ...info, bio: e.target.value })}
          rows={4}
          className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent p-3"
          placeholder="Tell us about yourself..."
          disabled={loading}
        />
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed`}
        whileTap={{ scale: 0.98 }}
      >
        <Save className="w-4 h-4" />
        {loading ? 'Saving...' : 'Save Changes'}
      </motion.button>
    </form>
  );
}