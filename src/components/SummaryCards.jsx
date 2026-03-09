import { currency } from '../utils/helpers';

function SummaryCards({ totals, productCount, lowStock }) {
  const cards = [
    { label: 'Products', value: productCount, cls: 'primary' },
    { label: 'Items in Cart', value: totals.totalItems, cls: 'info' },
    { label: 'Revenue', value: currency(totals.revenue), cls: 'success' },
    { label: 'Low Stock', value: lowStock, cls: 'warning' },
  ];

  return (
    <div className="row g-3">
      {cards.map((c) => <div className="col-md-3" key={c.label}><div className={`card border-${c.cls} shadow-sm`}><div className="card-body"><p className="mb-1 text-muted">{c.label}</p><h5>{c.value}</h5></div></div></div>)}
    </div>
  );
}

export default SummaryCards;
