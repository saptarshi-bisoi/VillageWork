"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function NavLink({ href, children, onClick }) {
  return (
    <Link href={href} onClick={onClick} className="relative text-gray-300 hover:text-white transition-colors group">
      {children}
      <motion.span
        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{ transformOrigin: "left" }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  );
}

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [langFlip, setLangFlip] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleToggleLang = () => {
    setLangFlip(true);
    toggleLanguage();
    setTimeout(() => setLangFlip(false), 400);
  };

  const MotionOrDiv = prefersReduced ? 'nav' : motion.nav;
  const navProps = prefersReduced ? {} : {
    initial: { y: -80, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <MotionOrDiv {...navProps} className="sticky top-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <Logo className="w-11 h-11 group-hover:scale-105 transition-transform duration-300" />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl text-white tracking-tight leading-none">VillageWork</span>
                <span className="text-[11px] text-gray-400 font-sans mt-0.5 font-medium tracking-wide">{t("Rural talent Need digital speed.")}</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/">{t("Home")}</NavLink>
            <NavLink href="/#about">{t("About")}</NavLink>
            <NavLink href="/#how-it-works">{t("How It Works")}</NavLink>
            
            <motion.button 
              onClick={handleToggleLang}
              className="px-3 py-1 rounded-full border border-gray-600 text-sm hover:border-primary transition-colors font-medium"
              animate={langFlip && !prefersReduced ? { rotateY: [0, 90, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {lang === 'en' ? 'हिं' : 'EN'}
            </motion.button>
            
            <motion.div
              whileHover={prefersReduced ? {} : { scale: 1.05, boxShadow: "0 0 20px rgba(34,197,94,0.4)" }}
              whileTap={prefersReduced ? {} : { scale: 0.95 }}
            >
              <Link href="/sign-in" className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-green-600 transition-colors inline-block">
                {t("Sign In")}
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <motion.button 
              onClick={handleToggleLang}
              className="px-3 py-1 rounded-full border border-gray-600 text-sm hover:border-primary transition-colors font-medium"
              animate={langFlip && !prefersReduced ? { rotateY: [0, 90, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {lang === 'en' ? 'हिं' : 'EN'}
            </motion.button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-primary transition-colors">
              {isOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-dark border-b border-white/10 px-4 py-4"
            initial={prefersReduced ? false : { x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-col space-y-4">
              <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">{t("Home")}</Link>
              <Link href="/#about" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">{t("About")}</Link>
              <Link href="/#how-it-works" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">{t("How It Works")}</Link>
              <Link href="/sign-in" onClick={() => setIsOpen(false)} className="bg-primary text-center text-white px-6 py-2 rounded-full font-bold hover:bg-green-600 transition-colors">
                {t("Sign In")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionOrDiv>
  );
}
