import { currency, formatDate } from '../utils/helpers';

function DayCloserPanel({ todaySummary, closings, onCloseDay }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5>Day Closer</h5>
        <p className="mb-1">Orders: {todaySummary.orders}</p>
        <p className="mb-1">Items Sold: {todaySummary.items}</p>
        <p className="mb-1">Sales: {currency(todaySummary.sales)}</p>
        <button className="btn btn-dark btn-sm" onClick={onCloseDay}>Close Day</button>
      </div>
      <div className="table-responsive"><table className="table table-sm mb-0"><thead><tr><th>Date</th><th>Sales</th><th>Profit</th><th>Loss</th></tr></thead><tbody>
        {closings.slice(0, 5).map((c) => <tr key={c.id}><td>{formatDate(c.date)}</td><td>{currency(c.totalSalesAmount)}</td><td>{currency(c.estimatedProfit)}</td><td>{currency(c.estimatedLoss)}</td></tr>)}
      </tbody></table></div>
    </div>
  );
}

export default DayCloserPanel;
