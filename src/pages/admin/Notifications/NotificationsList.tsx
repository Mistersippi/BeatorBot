import { motion } from 'framer-motion';
import { Bell, Calendar, Users, Trash2 } from 'lucide-react';

interface NotificationsListProps {
  filter: 'all' | 'sent' | 'scheduled' | 'draft';
}

export function NotificationsList({ filter }: NotificationsListProps) {
  // Placeholder notifications - will be replaced with real data
  const notifications = [];

  return (
    <div className="space-y-4">
      {notifications.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center">
          <Bell className="w-8 h-8 text-gray-400 mx-auto mb-4" />
          <h3 className="font-medium text-gray-900 mb-1">No notifications yet</h3>
          <p className="text-gray-500">
            Notifications will appear here when you create them
          </p>
        </div>
      ) : (
        notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            {/* Notification content will go here */}
          </motion.div>
        ))
      )}
    </div>
  );
}