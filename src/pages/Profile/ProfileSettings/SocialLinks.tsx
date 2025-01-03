import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Music2, Globe, Instagram, Twitter } from 'lucide-react';
import { FormField } from '../../../components/submit/FormField';

interface SocialLink {
  id: string;
  label: string;
  icon: typeof Music2;
  placeholder: string;
  prefix: string;
}

const socialLinks: SocialLink[] = [
  {
    id: 'spotify',
    label: 'Spotify Profile',
    icon: Music2,
    placeholder: 'spotify:user:username',
    prefix: 'https://open.spotify.com/'
  },
  {
    id: 'soundcloud',
    label: 'SoundCloud',
    icon: Globe,
    placeholder: 'your-username',
    prefix: 'https://soundcloud.com/'
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: Instagram,
    placeholder: 'your.username',
    prefix: 'https://instagram.com/'
  },
  {
    id: 'twitter',
    label: 'Twitter',
    icon: Twitter,
    placeholder: 'username',
    prefix: 'https://twitter.com/'
  }
];

export function SocialLinks() {
  const [links, setLinks] = useState({
    spotify: '',
    soundcloud: '',
    instagram: '',
    twitter: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save functionality
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {socialLinks.map(({ id, label, icon: Icon, placeholder, prefix }) => (
          <div key={id} className="space-y-2">
            <FormField
              label={label}
              type="text"
              value={links[id as keyof typeof links]}
              onChange={(e) => setLinks({ ...links, [id]: e.target.value })}
              icon={Icon}
              placeholder={placeholder}
            />
            {links[id as keyof typeof links] && (
              <p className="text-sm text-gray-500">
                {prefix}{links[id as keyof typeof links]}
              </p>
            )}
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Social Links
      </motion.button>
    </form>
  );
}