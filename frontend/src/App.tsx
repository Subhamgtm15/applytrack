import './index.css'
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import AddApplication from './pages/AddApplication'
import Settings from './pages/Settings'
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/addapplication" element={<AddApplication />} />
        <Route path="/addapplication/:id" element={<AddApplication />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}