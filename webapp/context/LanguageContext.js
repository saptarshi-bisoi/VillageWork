"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    "Find Workers": "Find Workers",
    "Post a Job": "Post a Job",
    "Join as Worker": "Join as Worker",
    "Sign In": "Sign In",
    "Home": "Home",
    "About": "About",
    "How It Works": "How It Works",
    "Contact": "Contact",
    "Get Started": "Get Started",
    "Available": "Available",
    "Verified": "Verified",
    "Book Now": "Book Now",
    "Search": "Search"
  },
  hi: {
    "Find Workers": "काम खोजें",
    "Post a Job": "काम पोस्ट करें",
    "Join as Worker": "वर्कर बनें",
    "Sign In": "साइन इन",
    "Home": "होम",
    "About": "परिचय",
    "How It Works": "कैसे काम करता है",
    "Contact": "संपर्क",
    "Get Started": "शुरू करें",
    "Available": "उपलब्ध",
    "Verified": "सत्यापित",
    "Book Now": "अभी बुक करें",
    "Search": "खोजें"
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('vw_lang');
    if (stored && (stored === 'en' || stored === 'hi')) {
      setLang(stored);
    }
  }, []);

  const toggleLanguage = () => {
    const next = lang === 'en' ? 'hi' : 'en';
    setLang(next);
    localStorage.setItem('vw_lang', next);
  };

  const t = (key) => {
    if (!mounted) return translations.en[key] || key;
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
