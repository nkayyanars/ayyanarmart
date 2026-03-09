import Footer from '../components/Footer';
import NotificationPanel from '../components/NotificationPanel';
import SummaryCards from '../components/SummaryCards';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import AdminPage from './AdminPage';
import Products from './Products';

function Dashboard() {
  const { currentUser } = useAuth();
  const { totals } = useCart();
  const { products, lowStockProducts } = useProducts();

  return (
    <div className="container py-3">
      <div className="p-3 mb-3 bg-light rounded-3 shadow-sm">
        <h3>Welcome, {currentUser.username}</h3>
        <p className="mb-0">Role-based supermarket POS dashboard for mini store operations.</p>
      </div>
      <SummaryCards totals={totals} productCount={products.length} lowStock={lowStockProducts.length} />
      <div className="row g-3 mt-1">
        <div className="col-lg-8">
          <Products />
          {currentUser.role === 'admin' && <div className="mt-3"><AdminPage /></div>}
        </div>
        <div className="col-lg-4"><NotificationPanel /></div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
