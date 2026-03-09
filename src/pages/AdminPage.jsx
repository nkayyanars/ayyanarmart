import { useState } from 'react';
import DayCloserPanel from '../components/DayCloserPanel';
import LowStockAlert from '../components/LowStockAlert';
import ProductForm from '../components/ProductForm';
import StockTable from '../components/StockTable';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

function AdminPage() {
  const { salesHistory } = useCart();
  const { addProduct, updateProduct, lowStockProducts, stockHistory, closings, closeDay, products } = useProducts();
  const [editing, setEditing] = useState(null);

  const todaySummary = {
    orders: salesHistory.length,
    items: salesHistory.reduce((s, x) => s + x.totalItems, 0),
    sales: salesHistory.reduce((s, x) => s + x.revenue, 0),
    profit: salesHistory.reduce((s, x) => s + x.profit, 0),
    loss: salesHistory.reduce((s, x) => s + x.loss, 0),
  };

  const handleCloseDay = () => {
    const ok = closeDay({
      totalOrders: todaySummary.orders,
      totalItemsSold: todaySummary.items,
      totalSalesAmount: todaySummary.sales,
      estimatedProfit: todaySummary.profit,
      estimatedLoss: todaySummary.loss,
      remainingStockSummary: products.reduce((s, p) => s + Number(p.stock), 0),
      lowStockCount: lowStockProducts.length,
    });
    if (!ok) alert('Day is already closed for today.');
  };

  return (
    <div className="row g-3">
      <div className="col-lg-6"><ProductForm editing={editing} onSubmit={(data) => {
        const payload = { ...data, price: Number(data.sellingPrice), stock: Number(data.stock), costPrice: Number(data.costPrice), sellingPrice: Number(data.sellingPrice) };
        if (editing) { updateProduct(editing.id, payload); setEditing(null); } else addProduct(payload);
      }} /></div>
      <div className="col-lg-6"><LowStockAlert items={lowStockProducts} /></div>
      <div className="col-12"><StockTable history={stockHistory} /></div>
      <div className="col-12"><DayCloserPanel todaySummary={todaySummary} closings={closings} onCloseDay={handleCloseDay} /></div>
    </div>
  );
}

export default AdminPage;
