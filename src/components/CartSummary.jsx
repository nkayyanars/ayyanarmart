import { currency } from '../utils/helpers';

function CartSummary({ totals }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h6>Bill Summary</h6>
        <p className="mb-1">Items: {totals.totalItems}</p>
        <p className="mb-1">Revenue: {currency(totals.revenue)}</p>
        <p className="mb-1 text-success">Profit: {currency(totals.profit)}</p>
        <p className="mb-0 text-danger">Loss: {currency(totals.loss)}</p>
      </div>
    </div>
  );
}

export default CartSummary;
