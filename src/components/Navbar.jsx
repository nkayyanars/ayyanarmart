import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';
import LanguageToggle from './LanguageToggle';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const { totals } = useCart();
  const { t } = useLanguage();
  const { unreadCount } = useNotification();

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/dashboard">NammaCart</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmain">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navmain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {['dashboard', 'products', 'cart', 'billing', 'settings'].map((item) => (
              <li className="nav-item" key={item}>
                <NavLink className="nav-link" to={`/${item}`}>{t[item]}</NavLink>
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center gap-3 text-white">
            <span className="badge bg-info">{currentUser?.role}</span>
            <Link to="/notifications" className="text-white text-decoration-none">🔔 {unreadCount}</Link>
            <span className="badge bg-warning text-dark">{t.cart}: {totals.totalItems}</span>
            <LanguageToggle />
            <button className="btn btn-outline-light btn-sm" onClick={logout}>{t.logout}</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
