import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cartItems, changeQty, removeItem, totals } = useCart();
  return (
    <div className="row g-3">
      <div className="col-lg-8">
        <div className="card shadow-sm"><div className="card-body">
          <h5>Cart Items</h5>
          {!cartItems.length && <p className="text-muted">Your cart is empty.</p>}
          {cartItems.map((item) => <CartItem key={item.id} item={item} onQty={changeQty} onRemove={removeItem} />)}
        </div></div>
      </div>
      <div className="col-lg-4"><CartSummary totals={totals} /></div>
    </div>
  );
}

export default CartPage;
