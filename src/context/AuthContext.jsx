import { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '../utils/storage';

const AuthContext = createContext();

const demoUsers = {
  admin: { username: 'admin', password: 'admin123', role: 'admin' },
  user: { username: 'user', password: 'user123', role: 'user' },
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => storage.get('session', null));

  useEffect(() => storage.set('session', currentUser), [currentUser]);

  const login = (username, password) => {
    const found = Object.values(demoUsers).find(
      (u) => u.username === username && u.password === password,
    );
    if (!found) return { ok: false };
    const session = { username: found.username, role: found.role };
    setCurrentUser(session);
    return { ok: true, user: session };
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
