import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import AnalyticsPage from './pages/AnalyticsPage';
import BillingPage from './pages/BillingPage';
import CartPage from './pages/CartPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotificationsPage from './pages/NotificationsPage';
import Products from './pages/Products';
import SettingsPage from './pages/SettingsPage';

function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container py-3">{children}</main>
    </>
  );
}

function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={currentUser ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><AppLayout><Products /></AppLayout></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute><AppLayout><CartPage /></AppLayout></ProtectedRoute>} />
      <Route path="/billing" element={<ProtectedRoute><AppLayout><BillingPage /></AppLayout></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><AppLayout><SettingsPage /></AppLayout></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute role="admin"><AppLayout><NotificationsPage /></AppLayout></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute role="admin"><AppLayout><AnalyticsPage /></AppLayout></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
