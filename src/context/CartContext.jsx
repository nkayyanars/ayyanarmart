import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { storage } from '../utils/storage';
import { useNotification } from './NotificationContext';
import { useProducts } from './ProductContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { addNotification } = useNotification();
  const { products, updateStock } = useProducts();
  const [cartItems, setCartItems] = useState(() => storage.get('cartItems', []));
  const [salesHistory, setSalesHistory] = useState(() => storage.get('salesHistory', []));

  useEffect(() => storage.set('cartItems', cartItems), [cartItems]);
  useEffect(() => storage.set('salesHistory', salesHistory), [salesHistory]);

  const addToCart = (product) => {
    if (product.stock === 0) return;
    setCartItems((prev) => {
      const existing = prev.find((x) => x.id === product.id);
      if (existing && existing.quantity >= product.stock) return prev;
      if (existing) return prev.map((x) => (x.id === product.id ? { ...x, quantity: x.quantity + 1 } : x));
      addNotification(`${product.name} added to cart`, 'success');
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const changeQty = (id, qty) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, Math.min(qty, product.stock)) } : item))
        .filter((x) => x.quantity > 0),
    );
  };

  const removeItem = (id) => setCartItems((prev) => prev.filter((x) => x.id !== id));

  const totals = useMemo(() => {
    const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);
    const revenue = cartItems.reduce((s, i) => s + i.quantity * i.sellingPrice, 0);
    const cost = cartItems.reduce((s, i) => s + i.quantity * i.costPrice, 0);
    return { totalItems, revenue, cost, profit: revenue - cost, loss: Math.max(0, cost - revenue) };
  }, [cartItems]);

  const checkout = () => {
    if (!cartItems.length) return null;
    cartItems.forEach((item) => updateStock(item.id, -item.quantity, 'Sold via billing'));
    const order = { id: Date.now(), date: new Date().toISOString(), items: cartItems, ...totals };
    setSalesHistory((prev) => [order, ...prev]);
    setCartItems([]);
    return order;
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, changeQty, removeItem, totals, checkout, salesHistory }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
