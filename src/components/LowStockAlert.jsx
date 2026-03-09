function LowStockAlert({ items }) {
  if (!items.length) return <div className="alert alert-success">All products have healthy stock.</div>;
  return <div className="alert alert-warning">Low stock alert: {items.map((i) => `${i.name} only ${i.stock} left`).join(', ')}</div>;
}

export default LowStockAlert;
