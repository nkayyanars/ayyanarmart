import { useState } from 'react';
import Receipt from '../components/Receipt';
import { useCart } from '../context/CartContext';

function BillingPage() {
  const { checkout, cartItems } = useCart();
  const [order, setOrder] = useState(null);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5>Billing</h5>
        <p className="text-muted">Cart items ready for billing: {cartItems.length}</p>
        <button className="btn btn-success me-2" onClick={() => setOrder(checkout())} disabled={!cartItems.length}>Generate Bill</button>
        <button className="btn btn-outline-dark" onClick={() => window.print()} disabled={!order}>Print Receipt</button>
      </div>
      {order && <div className="p-3"><Receipt order={order} /></div>}
    </div>
  );
}

export default BillingPage;
