import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Bell, MessageSquare, Mail, Trophy, Music } from 'lucide-react';

interface NotificationOption {
  id: string;
  label: string;
  description: string;
  icon: typeof Bell;
}

const notificationOptions: NotificationOption[] = [
  {
    id: 'challenges',
    label: 'New Challenges',
    description: 'Get notified when new music challenges are available',
    icon: Trophy
  },
  {
    id: 'comments',
    label: 'Comments & Reactions',
    description: 'Receive updates when someone interacts with your submissions',
    icon: MessageSquare
  },
  {
    id: 'submissions',
    label: 'Submission Updates',
    description: 'Stay informed about the status of your track submissions',
    icon: Music
  },
  {
    id: 'newsletter',
    label: 'Aideations Newsletter',
    description: 'Receive our semi-daily newsletter with AI news and updates',
    icon: Mail
  }
];

export function NotificationSettings() {
  const [preferences, setPreferences] = useState({
    challenges: true,
    comments: true,
    submissions: true,
    newsletter: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save functionality
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {notificationOptions.map(({ id, label, description, icon: Icon }) => (
          <div
            key={id}
            className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex-shrink-0 mt-1">
              <Icon className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label htmlFor={id} className="font-medium cursor-pointer">
                  {label}
                </label>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    id={id}
                    checked={preferences[id as keyof typeof preferences]}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        [id]: e.target.checked
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{description}</p>
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
        Save Preferences
      </motion.button>
    </form>
  );
}