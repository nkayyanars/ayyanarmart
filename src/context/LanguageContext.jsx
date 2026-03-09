import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../data/translations';
import { storage } from '../utils/storage';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => storage.get('language', 'en'));

  useEffect(() => storage.set('language', language), [language]);

  const t = useMemo(() => translations[language], [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
