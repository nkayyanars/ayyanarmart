import { formatDate } from '../utils/helpers';

function StockTable({ history }) {
  return (
    <div className="card shadow-sm">
      <div className="card-header">Stock Movement Records</div>
      <div className="table-responsive"><table className="table table-sm mb-0"><thead><tr><th>Date</th><th>Product ID</th><th>Change</th><th>Reason</th></tr></thead><tbody>
        {history.slice(0, 10).map((h) => <tr key={h.id}><td>{formatDate(h.date)}</td><td>{h.productId}</td><td>{h.delta}</td><td>{h.reason}</td></tr>)}
        {!history.length && <tr><td colSpan="4" className="text-center py-3">No stock updates yet.</td></tr>}
      </tbody></table></div>
    </div>
  );
}

export default StockTable;
