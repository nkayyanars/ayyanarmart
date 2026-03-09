import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { storage } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => storage.get('notifications', []));

  useEffect(() => storage.set('notifications', notifications), [notifications]);

  const addNotification = (message, type = 'info') => {
    setNotifications((prev) => [{ id: uuidv4(), message, type, read: false, createdAt: Date.now() }, ...prev]);
  };

  const markRead = (id) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markRead, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
