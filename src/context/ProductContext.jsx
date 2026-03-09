import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { initialProducts } from '../data/products';
import { storage } from '../utils/storage';
import { useNotification } from './NotificationContext';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const { addNotification } = useNotification();
  const [products, setProducts] = useState(() => storage.get('products', initialProducts));
  const [stockHistory, setStockHistory] = useState(() => storage.get('stockHistory', []));
  const [closings, setClosings] = useState(() => storage.get('dayClosings', []));
  const [lowStockThreshold, setLowStockThreshold] = useState(() => storage.get('lowStockThreshold', 5));

  useEffect(() => storage.set('products', products), [products]);
  useEffect(() => storage.set('stockHistory', stockHistory), [stockHistory]);
  useEffect(() => storage.set('dayClosings', closings), [closings]);
  useEffect(() => storage.set('lowStockThreshold', lowStockThreshold), [lowStockThreshold]);

  const addProduct = (product) => {
    setProducts((prev) => [...prev, { ...product, id: uuidv4() }]);
    addNotification('Product added successfully', 'success');
  };

  const updateProduct = (id, payload) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...payload } : p)));
    addNotification('Product updated successfully', 'success');
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addNotification('Product deleted successfully', 'danger');
  };

  const updateStock = (id, delta, reason = 'Manual stock update') => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, Number(p.stock) + Number(delta)) } : p)),
    );
    setStockHistory((prev) => [{ id: uuidv4(), productId: id, delta, reason, date: new Date().toISOString() }, ...prev]);
    addNotification('Stock updated successfully', 'info');
  };

  const lowStockProducts = useMemo(
    () => products.filter((p) => Number(p.stock) <= Number(lowStockThreshold)),
    [products, lowStockThreshold],
  );

  const closeDay = (summary) => {
    const today = new Date().toDateString();
    if (closings.some((c) => new Date(c.date).toDateString() === today)) return false;
    const record = { id: uuidv4(), date: new Date().toISOString(), ...summary };
    setClosings((prev) => [record, ...prev]);
    addNotification('Day closed successfully', 'success');
    return true;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        stockHistory,
        lowStockThreshold,
        setLowStockThreshold,
        lowStockProducts,
        closings,
        closeDay,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
