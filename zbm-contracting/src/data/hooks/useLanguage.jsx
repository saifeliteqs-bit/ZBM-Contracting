import { createContext, useContext, useState } from 'react';
import { translations } from '../data/translations';

export const LanguageContext = createContext(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be inside LanguageProvider');
  return ctx;
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const isAr = lang === 'ar';
  const toggle = () => setLang(l => l === 'en' ? 'ar' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, t, isAr, toggle }}>
      <div dir={isAr ? 'rtl' : 'ltr'} className={isAr ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}
