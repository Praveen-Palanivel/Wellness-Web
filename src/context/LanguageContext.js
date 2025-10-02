import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const DEFAULT_LANG = 'en';

const LanguageContext = createContext({
  language: DEFAULT_LANG,
  setLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem('appLanguage') || DEFAULT_LANG;
    } catch {
      return DEFAULT_LANG;
    }
  });

  const setLanguage = (langCode) => {
    setLanguageState(langCode);
    try {
      localStorage.setItem('appLanguage', langCode);
    } catch {}
  };

  useEffect(() => {
    // Ensure language is always a supported code
    const supported = ['en', 'hi', 'ta', 'ml'];
    if (!supported.includes(language)) {
      setLanguage(DEFAULT_LANG);
    }
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
