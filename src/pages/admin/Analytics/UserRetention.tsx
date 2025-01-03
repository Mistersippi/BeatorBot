import { Users } from 'lucide-react';

export function UserRetention() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold">User Retention</h3>
      </div>

      <div className="h-64 flex items-center justify-center text-gray-500">
        Retention data will appear here when the app is live
      </div>
    </div>
  );
}