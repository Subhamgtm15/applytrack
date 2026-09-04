import './index.css'
import { lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import AuthCallback from './pages/auth/AuthCallback';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store/authStore';

// Dashboard is the first authenticated page, so it stays eager. Secondary routes are
// code-split so their JS is excluded from the initial bundle and loaded on demand.
const Applications = lazy(() => import('./pages/Applications'));
const AddApplication = lazy(() => import('./pages/AddApplication'));
const Settings = lazy(() => import('./pages/Settings'));

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