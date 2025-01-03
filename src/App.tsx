import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import { Navbar } from './components/Navbar';
import { RequireAuth } from './components/auth/RequireAuth';
import { RequireAdmin } from './components/admin/RequireAdmin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AuthModals } from './components/auth/AuthModals';
import { Toaster } from 'react-hot-toast';

// Lazy loaded components
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Challenge = lazy(() => import('./components/game/Challenge').then(module => ({ default: module.Challenge })));
const Results = lazy(() => import('./pages/Results').then(module => ({ default: module.Results })));
const Submit = lazy(() => import('./pages/Submit/index').then(module => ({ default: module.default })));
const Profile = lazy(() => import('./pages/Profile').then(module => ({ default: module.Profile })));
const ProfileSettings = lazy(() => import('./pages/Profile/ProfileSettings').then(module => ({ default: module.ProfileSettings })));
const Submissions = lazy(() => import('./pages/Submissions').then(module => ({ default: module.Submissions })));
const AuthCallback = lazy(() => import('./pages/auth/callback').then(module => ({ default: module.AuthCallback })));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard').then(module => ({ default: module.Dashboard })));
const AdminTracks = lazy(() => import('./pages/admin/Tracks').then(module => ({ default: module.Tracks })));
const AdminUsers = lazy(() => import('./pages/admin/Users/Users').then(module => ({ default: module.Users })));
const AdminAnalytics = lazy(() => import('./pages/admin/Analytics').then(module => ({ default: module.Analytics })));
const AdminNotifications = lazy(() => import('./pages/admin/Notifications').then(module => ({ default: module.Notifications })));
const AdminSettings = lazy(() => import('./pages/admin/Settings').then(module => ({ default: module.Settings })));
const AdminAccess = lazy(() => import('./pages/admin/Access').then(module => ({ default: module.Access })));

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
          <Navbar />
          <AuthModals />
          <Toaster position="top-center" />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/challenge" element={<Challenge />} />
              <Route path="/results" element={<Results />} />
              
              {/* Auth Routes */}
              <Route path="/auth/callback" element={<AuthCallback />} />
              
              {/* Protected Routes */}
              <Route element={<RequireAuth><Outlet /></RequireAuth>}>
                <Route path="/submit" element={<Submit />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/settings" element={<ProfileSettings />} />
                <Route path="/submissions" element={<Submissions />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<RequireAdmin><Outlet /></RequireAdmin>}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="tracks" element={<AdminTracks />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="notifications" element={<AdminNotifications />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="access" element={<AdminAccess />} />
                </Route>
              </Route>

              {/* Catch-all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </AuthProvider>
    </Router>
  );
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );
}