import { motion } from 'framer-motion';
import { Save } from 'lucide-react';

export function SecuritySettings() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h3 className="font-medium mb-4">Authentication</h3>
        <div className="space-y-4">
          <label className="flex items-start">
            <input
              type="checkbox"
              defaultChecked
              className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-600">
              Require email verification for new accounts
            </span>
          </label>

          <label className="flex items-start">
            <input
              type="checkbox"
              className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-600">
              Enable two-factor authentication
            </span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Password Requirements</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Password Length
            </label>
            <input
              type="number"
              defaultValue={8}
              min={6}
              className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <label className="flex items-start">
            <input
              type="checkbox"
              defaultChecked
              className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-600">
              Require at least one uppercase letter
            </span>
          </label>

          <label className="flex items-start">
            <input
              type="checkbox"
              defaultChecked
              className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-600">
              Require at least one number
            </span>
          </label>
        </div>
      </div>

      <div className="pt-4">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Security Settings
        </motion.button>
      </div>
    </div>
  );
}