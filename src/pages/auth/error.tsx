export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
        <p className="text-gray-600 mb-4">
          There was a problem verifying your email. This could be because:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>The verification link has expired</li>
          <li>The link has already been used</li>
          <li>The verification token is invalid</li>
        </ul>
        <div className="flex justify-center">
          <button
            onClick={() => window.location.href = '/'}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
