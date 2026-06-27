"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Home, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <Home className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <span className="font-serif font-bold text-2xl text-white tracking-tight">VillageWork</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">{t("Home")}</Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">{t("About")}</Link>
            <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">{t("How It Works")}</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">{t("Contact")}</Link>
            
            <button 
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-full border border-gray-600 text-sm hover:border-primary transition-colors font-medium"
            >
              {lang === 'en' ? 'हिं' : 'EN'}
            </button>
            
            <Link href="/sign-in" className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-green-600 transition-colors">
              {t("Sign In")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-full border border-gray-600 text-sm hover:border-primary transition-colors font-medium"
            >
              {lang === 'en' ? 'हिं' : 'EN'}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-primary transition-colors">
              {isOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-dark border-b border-white/10 px-4 py-4">
          <div className="flex flex-col space-y-4">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">{t("Home")}</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">{t("About")}</Link>
            <Link href="/how-it-works" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">{t("How It Works")}</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">{t("Contact")}</Link>
            <Link href="/sign-in" onClick={() => setIsOpen(false)} className="bg-primary text-center text-white px-6 py-2 rounded-full font-bold hover:bg-green-600 transition-colors">
              {t("Sign In")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
