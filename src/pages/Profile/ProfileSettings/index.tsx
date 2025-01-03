import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { BasicInfo } from './BasicInfo';
import { PrivacySettings } from './PrivacySettings';
import { NotificationSettings } from './NotificationSettings';
import { SocialLinks } from './SocialLinks';
import { AdminLink } from '../../../components/admin/AdminLink';

export function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'social', label: 'Social Links' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-semibold">Profile Settings</h2>
          </div>
          <AdminLink />
        </div>
      </div>

      <div className="border-b border-gray-100">
        <div className="flex overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'basic' && <BasicInfo />}
        {activeTab === 'privacy' && <PrivacySettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'social' && <SocialLinks />}
      </div>
    </div>
  );
}