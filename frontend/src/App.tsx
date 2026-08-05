import './index.css'
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import AddApplication from './pages/AddApplication'
import Settings from './pages/Settings'
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import AuthCallback from './pages/auth/AuthCallback';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store/authStore';

export default function AppRoutes() {
  const initAuth = useAuthStore((s) => s.initAuth);

  // Fetch the current user once on app mount to hydrate the auth store.
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/addapplication" element={<AddApplication />} />
        <Route path="/addapplication/:id" element={<AddApplication />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}