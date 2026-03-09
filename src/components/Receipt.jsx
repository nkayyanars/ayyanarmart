import { currency, formatDate } from '../utils/helpers';

function Receipt({ order }) {
  if (!order) return null;
  return (
    <div className="card" id="receipt">
      <div className="card-body">
        <h4 className="text-center">NammaCart</h4>
        <p className="text-center">{formatDate(order.date)}</p>
        <table className="table table-sm">
          <thead><tr><th>Product</th><th>Qty</th><th>Unit</th><th>Subtotal</th></tr></thead>
          <tbody>
            {order.items.map((i) => <tr key={i.id}><td>{i.name}</td><td>{i.quantity}</td><td>{currency(i.sellingPrice)}</td><td>{currency(i.quantity * i.sellingPrice)}</td></tr>)}
          </tbody>
        </table>
        <h5 className="text-end">Grand Total: {currency(order.revenue)}</h5>
      </div>
    </div>
  );
}

export default Receipt;
