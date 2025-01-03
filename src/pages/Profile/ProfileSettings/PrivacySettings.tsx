import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, Lock, Users, Shield } from 'lucide-react';

interface PrivacyOption {
  id: 'profile' | 'submissions' | 'stats';
  label: string;
  description: string;
  icon: typeof Eye;
  options: {
    value: 'public' | 'private' | 'friends';
    label: string;
    description: string;
  }[];
}

const privacyOptions: PrivacyOption[] = [
  {
    id: 'profile',
    label: 'Profile Visibility',
    description: 'Control who can see your profile information',
    icon: Eye,
    options: [
      { value: 'public', label: 'Public', description: 'Anyone can view your profile' },
      { value: 'friends', label: 'Friends Only', description: 'Only your friends can view your profile' },
      { value: 'private', label: 'Private', description: 'Only you can view your profile' }
    ]
  },
  {
    id: 'submissions',
    label: 'Submission Privacy',
    description: 'Control who can see your music submissions',
    icon: Lock,
    options: [
      { value: 'public', label: 'Public', description: 'Your submissions appear in public challenges' },
      { value: 'friends', label: 'Friends Only', description: 'Only friends can see your submissions' },
      { value: 'private', label: 'Private', description: 'Your submissions are private' }
    ]
  },
  {
    id: 'stats',
    label: 'Game Stats Privacy',
    description: 'Control who can see your game statistics',
    icon: Shield,
    options: [
      { value: 'public', label: 'Public', description: 'Your stats appear on public leaderboards' },
      { value: 'friends', label: 'Friends Only', description: 'Only friends can see your stats' },
      { value: 'private', label: 'Private', description: 'Your stats are private' }
    ]
  }
];

export function PrivacySettings() {
  const [settings, setSettings] = useState({
    profile: 'public',
    submissions: 'public',
    stats: 'public'
  } as Record<string, 'public' | 'private' | 'friends'>);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save functionality
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        {privacyOptions.map(({ id, label, description, icon: Icon, options }) => (
          <div key={id} className="space-y-3">
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-purple-600" />
              <h3 className="font-medium">{label}</h3>
            </div>
            <p className="text-sm text-gray-600">{description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {options.map(option => (
                <label
                  key={option.value}
                  className={`
                    relative flex flex-col p-4 rounded-xl cursor-pointer
                    ${settings[id] === option.value 
                      ? 'bg-purple-50 border-2 border-purple-600' 
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'}
                  `}
                >
                  <input
                    type="radio"
                    name={id}
                    value={option.value}
                    checked={settings[id] === option.value}
                    onChange={(e) => setSettings({ ...settings, [id]: e.target.value })}
                    className="sr-only"
                  />
                  <span className="font-medium mb-1">{option.label}</span>
                  <span className="text-sm text-gray-600">{option.description}</span>
                </label>
              ))}
            </div>
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
        Save Privacy Settings
      </motion.button>
    </form>
  );
}