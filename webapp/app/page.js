/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Coins, ShieldCheck, ChevronUp, ChevronDown, ClipboardList, Check, Scissors, Hammer, GraduationCap, Droplets, PaintBucket, Building, Leaf, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

// ===== Duration helper for mobile =====
function dur(base, isMobile) {
  return isMobile ? base * 0.7 : base;
}

export default function Home() {
  const { t } = useLanguage();
  const [expandedStep, setExpandedStep] = useState(null);
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // ===== 3D Hover Tilt Effect State & Handlers =====
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ 
    rotateX: 0, 
    rotateY: 0,
    glareX: 50,
    glareY: 50
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchDevice || prefersReduced || !cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateY = (mouseX / (rect.width / 2)) * 12;
    const rotateX = -(mouseY / (rect.height / 2)) * 12;
    
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    
    setTilt({ rotateX, rotateY, glareX, glareY });
  };

  const handleMouseEnter = () => {
    if (isTouchDevice || prefersReduced) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice || prefersReduced) return;
    setIsHovered(false);
    setTilt({ 
      rotateX: 0, 
      rotateY: 0,
      glareX: 50,
      glareY: 50
    });
    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.style.willChange = 'auto';
      }
    }, 600);
  };

  const glowX = tilt.rotateY * 2;
  const glowY = tilt.rotateX * -2;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll detection for breathing animations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let scrollTimeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);



  // Refs for GSAP animations
  const heroTitleRef = useRef(null);
  const heroLine1Ref = useRef(null);
  const heroLine2Ref = useRef(null);
  const statsRowRef = useRef(null);
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);
  const leafLeftRef = useRef(null);
  const leafRightRef = useRef(null);
  const beamRef = useRef(null);
  const featuresHeadlineRef = useRef(null);
  const featuresSectionRef = useRef(null);
  const aboutRightRef = useRef(null);
  const accentLineRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const aboutStatRefs = useRef([]);
  const featureIconRefs = useRef([]);

  const toggleStep = (step) => {
    setExpandedStep(expandedStep === step ? null : step);
  };

  // ===== GSAP Animations =====
  useEffect(() => {
    if (prefersReduced) return;

    const iconElements = [...featureIconRefs.current];
    const ctx = gsap.context(() => {
      // --- Hero Title Reveal ---
      const titleLines = [heroLine1Ref.current, heroLine2Ref.current].filter(Boolean);
      gsap.from(titleLines, {
        y: 100,
        opacity: 0,
        duration: dur(1.2, isMobile),
        ease: "power4.out",
        stagger: 0.15,
      });

      // --- Trust Stats Counter (ScrollTrigger) ---
      if (statsRowRef.current) {
        const counterTargets = [
          { ref: stat1Ref.current, end: 10000 },
          { ref: stat2Ref.current, end: 500 },
          { ref: stat3Ref.current, end: 4.8, decimals: true },
        ];
        counterTargets.forEach(({ ref, end, decimals }) => {
          if (!ref) return;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: end,
            duration: dur(2, isMobile),
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRowRef.current,
              start: "top 85%",
              once: true,
            },
            onUpdate: () => {
              if (decimals) {
                ref.textContent = obj.val.toFixed(1) + "★";
              } else {
                ref.textContent = Math.round(obj.val).toLocaleString() + "+";
              }
            },
          });
        });
      }

      // --- Botanical Leaves Parallax / Curtain Opening Effect on Scroll ---
      if (leafLeftRef.current) {
        gsap.to(leafLeftRef.current, {
          y: isMobile ? 60 : 140,
          x: isMobile ? -30 : -80,
          rotate: -12,
          scale: 1.15,
          opacity: 0.2,
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
      if (leafRightRef.current) {
        gsap.to(leafRightRef.current, {
          y: isMobile ? 60 : 140,
          x: isMobile ? 30 : 80,
          rotate: 12,
          scale: 1.15,
          opacity: 0.2,
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // --- Features Headline Reveal ---
      if (featuresHeadlineRef.current) {
        gsap.from(featuresHeadlineRef.current, {
          opacity: 0,
          y: 60,
          duration: dur(1, isMobile),
          scrollTrigger: {
            trigger: featuresSectionRef.current,
            start: "top 80%",
          },
        });
      }

      // --- About Section: Right Column Text Reveal ---
      if (aboutRightRef.current) {
        const lines = aboutRightRef.current.querySelectorAll('.about-line');
        if (lines.length) {
          gsap.from(lines, {
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: dur(0.8, isMobile),
            scrollTrigger: {
              trigger: aboutRightRef.current,
              start: "top 75%",
            },
          });
        }
      }

      // --- About Section: Green Accent Line Grow ---
      if (accentLineRef.current) {
        gsap.from(accentLineRef.current, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: dur(0.8, isMobile),
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 80%",
          },
        });
      }

      // --- About Section: Stat Counters ---
      const aboutCounters = [
        { ref: aboutStatRefs.current[0], end: 500, suffix: "+" },
        { ref: aboutStatRefs.current[1], end: 10, suffix: "K+", multiplier: 1 },
        { ref: aboutStatRefs.current[2], end: 25, suffix: "K+", multiplier: 1 },
        { ref: aboutStatRefs.current[3], end: 4.8, suffix: "★", decimals: true },
      ];
      aboutCounters.forEach(({ ref, end, suffix, decimals }) => {
        if (!ref) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration: dur(2, isMobile),
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            if (decimals) {
              ref.textContent = obj.val.toFixed(1) + suffix;
            } else {
              ref.textContent = Math.round(obj.val) + suffix;
            }
          },
        });
      });



      // --- Feature Icon Hover (GSAP) ---
      iconElements.forEach((iconEl) => {
        if (!iconEl) return;
        const enterHandler = () => {
          gsap.to(iconEl, { rotate: 15, scale: 1.2, duration: 0.3, ease: "back.out(2)" });
        };
        const leaveHandler = () => {
          gsap.to(iconEl, { rotate: 0, scale: 1, duration: 0.3 });
        };
        iconEl.addEventListener('mouseenter', enterHandler);
        iconEl.addEventListener('mouseleave', leaveHandler);
        iconEl._gsapEnter = enterHandler;
        iconEl._gsapLeave = leaveHandler;
      });
    });

    return () => {
      // Cleanup GSAP
      ctx.revert();
      // Cleanup icon listeners
      iconElements.forEach((iconEl) => {
        if (iconEl && iconEl._gsapEnter) {
          iconEl.removeEventListener('mouseenter', iconEl._gsapEnter);
          iconEl.removeEventListener('mouseleave', iconEl._gsapLeave);
        }
      });
    };
  }, [prefersReduced, isMobile]);

  // Shared Framer Motion variants
  const fadeUp = (delay = 0) => ({
    initial: prefersReduced ? {} : { opacity: 0, y: 30 },
    animate: prefersReduced ? {} : { opacity: 1, y: 0 },
    transition: { duration: dur(0.8, isMobile), delay, ease: "easeOut" },
  });

  const whileInViewFadeUp = (delay = 0) => ({
    initial: prefersReduced ? {} : { opacity: 0, y: 60 },
    whileInView: prefersReduced ? {} : { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: dur(0.7, isMobile), delay, ease: [0.25, 0.46, 0.45, 0.94] },
  });

  const whileInViewScaleBounce = (delay = 0) => ({
    initial: prefersReduced ? {} : { opacity: 0, scale: 0 },
    whileInView: prefersReduced ? {} : { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: dur(0.8, isMobile), delay, type: "spring", bounce: 0.5 },
  });

  const buttonHover = prefersReduced ? {} : {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring", stiffness: 400 },
  };

  const cardHover = prefersReduced ? {} : {
    whileHover: {
      y: -12,
      scale: 1.02,
      boxShadow: "0 24px 60px rgba(34,197,94,0.15)",
    },
    transition: { type: "spring", stiffness: 300 },
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section w-full min-h-screen relative flex items-center pt-20 pb-20 overflow-hidden bg-[#0f1a0f]" style={{ position: 'relative', overflow: 'hidden', width: '100%', minHeight: '100vh', margin: 0, padding: 0 }}>
        {/* Background Video Layer — BOTTOM MOST (z-0) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            overflow: 'hidden',
            margin: 0,
            padding: 0,
            border: 'none',
            willChange: 'transform',
          }}
        >
          {/* Background Video */}
          <video
            src="/hero-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            fetchPriority="high"
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: isMobile ? 'center center' : 'center',
              display: 'block',
              margin: 0,
              padding: 0,
              border: 'none',
            }}
          />

          {/* Opacity overlay — dims the video (z-1) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              background: isMobile ? 'rgba(10, 20, 10, 0.88)' : 'rgba(10, 20, 10, 0.82)',
              zIndex: 1,
              margin: 0,
              padding: 0,
              border: 'none',
            }}
          />

          {/* Blur overlay — 1.5px blur (z-2) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              backdropFilter: 'blur(1.5px)',
              WebkitBackdropFilter: 'blur(1.5px)',
              zIndex: 2,
              margin: 0,
              padding: 0,
              border: 'none',
            }}
          />

          {/* Edge Gradients — seamless blend (z-3) */}
          {/* Top edge (blends into navbar) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              width: '100vw',
              height: '200px',
              background: 'linear-gradient(to bottom, #0f1a0f 0%, transparent 100%)',
              zIndex: 3,
              border: 'none',
            }}
          />
          {/* Bottom edge (blends into next section) */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100vw',
              height: '200px',
              background: 'linear-gradient(to top, #0f1a0f 0%, transparent 100%)',
              zIndex: 3,
              border: 'none',
            }}
          />
          {/* Left edge (blends behind botanical leaf) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '200px',
              height: '100%',
              background: 'linear-gradient(to right, #0f1a0f 0%, transparent 100%)',
              zIndex: 3,
              border: 'none',
            }}
          />
          {/* Right edge (blends behind botanical leaf) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '200px',
              height: '100%',
              background: 'linear-gradient(to left, #0f1a0f 0%, transparent 100%)',
              zIndex: 3,
              border: 'none',
            }}
          />
        </div>



        {/* z-5: SVG Topographic Lines */}
        {isMounted && !prefersReduced && !isMobile && (
          <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.04]" style={{ zIndex: 5 }} aria-hidden="true">
            <svg preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path className="topo-path" fill="none" stroke="#22c55e" strokeWidth="1" d="M0,20 Q25,30 50,15 T100,25" />
              <path className="topo-path" fill="none" stroke="#22c55e" strokeWidth="1" d="M0,35 Q30,45 60,30 T100,40" />
              <path className="topo-path" fill="none" stroke="#22c55e" strokeWidth="1" d="M0,50 Q40,60 70,45 T100,55" />
              <path className="topo-path" fill="none" stroke="#22c55e" strokeWidth="1" d="M0,65 Q35,75 75,55 T100,70" />
              <path className="topo-path" fill="none" stroke="#22c55e" strokeWidth="1" d="M0,80 Q45,90 85,75 T100,85" />
              <path className="topo-path" fill="none" stroke="#22c55e" strokeWidth="1" d="M0,95 Q25,100 55,90 T100,95" />
              <path className="topo-path" fill="none" stroke="#22c55e" strokeWidth="1" d="M0,10 Q20,15 40,5 T100,10" />
              <path className="topo-path" fill="none" stroke="#22c55e" strokeWidth="1" d="M0,85 Q50,95 80,85 T100,80" />
            </svg>
          </div>
        )}

        {/* z-5: Glow Orbs */}
        {isMounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]" style={{ zIndex: 5 }} aria-hidden="true">
            {/* Orb 1: Always kept, but reduced opacity/static on mobile */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ width: 600, height: 600, background: "rgba(34,197,94,0.06)", filter: "blur(80px)", top: '10%', left: '10%', opacity: isMobile ? 0.04 : 1 }}
              animate={prefersReduced || isMobile ? {} : { x: [-20, 20, -20], y: [-30, 30, -30], scale: [1, 1.1, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              layoutId={false}
              aria-hidden="true"
            />
            {/* Orb 2 & 3: Disabled on mobile */}
            {!isMobile && (
              <>
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{ width: 400, height: 400, background: "rgba(34,197,94,0.04)", filter: "blur(80px)", top: '5%', right: '5%' }}
                  animate={prefersReduced ? {} : { x: [20, -20, 20], y: [-20, 20, -20], scale: [1.1, 1, 1.1] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                  layoutId={false}
                  aria-hidden="true"
                />
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{ width: 300, height: 300, background: "rgba(34,197,94,0.05)", filter: "blur(80px)", bottom: '5%', left: '20%' }}
                  animate={prefersReduced ? {} : { x: [-10, 30, -10], y: [20, -20, 20] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 6 }}
                  layoutId={false}
                  aria-hidden="true"
                />
              </>
            )}
          </div>
        )}

        {/* z-6: Diagonal Light Beam */}
        {isMounted && !prefersReduced && (
          <motion.div
            ref={beamRef}
            className="absolute z-[6] pointer-events-none"
            style={{
              top: -100,
              left: -200,
              width: 3,
              height: 800,
              background: "linear-gradient(to bottom, transparent, rgba(34,197,94,0.08), transparent)",
              rotate: 35,
              transformOrigin: "top left",
              zIndex: 6,
            }}
            animate={{ x: [-200, 1800], opacity: [0, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, repeatDelay: 14, ease: "easeInOut" }}
            onAnimationStart={() => {
              if (beamRef.current) beamRef.current.style.willChange = "transform";
            }}
            onAnimationComplete={() => {
              if (beamRef.current) beamRef.current.style.willChange = "auto";
            }}
            layoutId={false}
            aria-hidden="true"
          />
        )}

        {/* z-7: Grain Overlay */}
        {isMounted && (
          <div className="absolute inset-0 pointer-events-none z-[7] opacity-[0.03]" style={{ background: "rgba(0,0,0,0.01)", filter: "url(#noise)", zIndex: 7 }} aria-hidden="true">
            <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
              <defs>
                <filter id="noise">
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                  <feColorMatrix type="saturate" values="0" />
                </filter>
              </defs>
            </svg>
          </div>
        )}

        {/* z-10: Botanical Leaves with Vignette */}
        <div ref={leafLeftRef} className="absolute left-0 top-0 bottom-0 w-64 pointer-events-none z-10 !bg-transparent border-0" style={{ zIndex: 10, background: 'transparent', backgroundColor: 'transparent', border: 'none' }}>
          <motion.img 
            src="/assets/images/leaves-left.png" 
            alt="" 
            className="h-full w-full object-cover opacity-60 !bg-transparent border-0"
            style={{ background: 'transparent', backgroundColor: 'transparent', border: 'none' }}
            animate={prefersReduced || isMobile || isScrolling ? {} : { scale: [1, 1.03, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            layoutId={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1a0f]/0 to-[#0f1a0f] !bg-transparent border-0" style={{ background: 'transparent', border: 'none' }}></div>
        </div>
        <div ref={leafRightRef} className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none z-10 !bg-transparent border-0" style={{ zIndex: 10, background: 'transparent', backgroundColor: 'transparent', border: 'none' }}>
          <motion.img 
            src="/assets/images/leaves-right.png" 
            alt="" 
            className="h-full w-full object-cover opacity-60 !bg-transparent border-0"
            style={{ background: 'transparent', backgroundColor: 'transparent', border: 'none' }}
            animate={prefersReduced || isMobile || isScrolling ? {} : { scale: [1, 1.03, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            layoutId={false}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0f1a0f]/0 to-[#0f1a0f] !bg-transparent border-0" style={{ background: 'transparent', border: 'none' }}></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full" style={{ zIndex: 20 }}>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Column - 55% */}
            <div className="w-full lg:w-[55%] flex flex-col items-start text-left">
              {/* Label */}
              <motion.div
                className="text-primary text-[12px] font-bold tracking-[3px] uppercase mb-6"
                {...(prefersReduced ? {} : {
                  initial: { opacity: 0, y: -20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: dur(0.6, isMobile), delay: 0.2 },
                })}
              >
                {t("INDIA'S #1 RURAL GIG PLATFORM")}
              </motion.div>
              
              {/* Headline */}
              <h1 ref={heroTitleRef} className="font-serif text-5xl md:text-[68px] text-white leading-[1.1] mb-6">
                <span ref={heroLine1Ref} className="font-normal block">{t("Find skilled workers")}</span>
                <span ref={heroLine2Ref} className="text-primary italic block">{t("in your village")}</span>
              </h1>
              
              {/* Subheading */}
              <motion.p
                className="text-[#9ca3af] text-[18px] mb-10 max-w-lg font-sans leading-relaxed"
                {...(prefersReduced ? {} : {
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: dur(0.8, isMobile), delay: 0.6 },
                })}
              >
                {t("VillageWork connects skilled rural workers with nearby households and businesses — in their language, at their pace, on WhatsApp.")}
              </motion.p>
              
              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-8"
                {...(prefersReduced ? {} : {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: dur(0.5, isMobile), delay: 0.9 },
                })}
              >
                <motion.div {...buttonHover}>
                  <Link href="/search" className="bg-primary text-white font-bold px-[28px] py-[14px] rounded-[8px] uppercase tracking-[1px] text-center hover:bg-green-600 transition-colors duration-200 inline-block">
                    {t("I Need a Worker")}
                  </Link>
                </motion.div>
                <motion.div {...buttonHover}>
                  <Link href="/post-job" className="bg-transparent border-2 border-primary text-white font-bold px-[28px] py-[14px] rounded-[8px] uppercase tracking-[1px] text-center hover:bg-primary/10 transition-colors duration-200 inline-block">
                    {t("I Want Work")}
                  </Link>
                </motion.div>
              </motion.div>

              {/* Trust Stats */}
              <div ref={statsRowRef} className="flex items-center gap-2 text-[13px] text-[#9ca3af]">
                <span><span ref={stat1Ref}>10,000+</span> {t("Workers")}</span>
                <span className="text-primary font-bold">&middot;</span>
                <span><span ref={stat2Ref}>500+</span> {t("Villages")}</span>
                <span className="text-primary font-bold">&middot;</span>
                <span><span ref={stat3Ref}>4.8★</span> {t("Rating")}</span>
              </div>
            </div>

            {/* Right Column - 45% */}
            <div className="w-full lg:w-[45%] relative mt-12 lg:mt-0 flex justify-center lg:justify-end">
              {/* Desktop Worker Card */}
              <motion.div
                className="relative w-full max-w-[500px] z-10 hidden md:block"
                {...(prefersReduced ? {} : {
                  initial: { opacity: 0, x: 60, rotate: 2 },
                  animate: { opacity: 1, x: 0, rotate: 0 },
                  transition: { duration: dur(1, isMobile), delay: 0.4, type: "spring", stiffness: 100 },
                })}
              >
                {/* Floating wrapper for infinite y animation */}
                <motion.div
                  animate={!prefersReduced && !isMobile ? { y: [-8, 8, -8] } : {}}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Perspective wrapper */}
                  <div
                    style={{
                      perspective: '1000px',
                      perspectiveOrigin: 'center center'
                    }}
                  >
                    {/* Tilt card */}
                    <motion.div
                      ref={cardRef}
                      onMouseMove={handleMouseMove}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      whileTap={isTouchDevice ? { scale: 1.02 } : {}}
                      animate={{
                        rotateX: tilt.rotateX,
                        rotateY: tilt.rotateY,
                        scale: isHovered && !isTouchDevice ? 1.04 : 1,
                        boxShadow: isHovered
                          ? `${glowX}px ${glowY}px 60px rgba(34,197,94,0.2), 0 20px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(34,197,94,0.1)`
                          : '0 8px 32px rgba(0,0,0,0.3)',
                        z: isHovered && !isTouchDevice ? 50 : 0
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                        mass: 0.8
                      }}
                      style={{
                        transformStyle: 'preserve-3d',
                        willChange: 'transform',
                        borderRadius: '24px',
                        position: 'relative',
                        cursor: 'pointer'
                      }}
                      className="bg-[#1a2e1a] rounded-[24px] border border-[rgba(34,197,94,0.2)] p-[32px] w-full h-[420px] flex flex-col relative z-10"
                    >
                      {/* GLARE EFFECT inside the card */}
                      {!prefersReduced && !isTouchDevice && (
                        <motion.div
                          animate={{
                            opacity: isHovered ? 0.12 : 0,
                            background: isHovered
                              ? `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)`
                              : 'none'
                          }}
                          transition={{ duration: 0.15 }}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '24px',
                            pointerEvents: 'none',
                            zIndex: 30,
                            mixBlendMode: 'overlay'
                          }}
                        />
                      )}

                      {/* Card Header */}
                      <div className="flex items-center gap-4 mb-4" style={{ transform: 'translateZ(25px)' }}>
                        <div className="w-[72px] h-[72px] rounded-full bg-primary flex items-center justify-center text-white font-bold text-[28px] shrink-0 overflow-hidden" style={{ transform: 'translateZ(30px)' }}>
                          <img src="/assets/images/worker-electrician.png" alt="Ramesh Kumar" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-white font-bold text-[18px]">{t("Ramesh Kumar")}</h3>
                            <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                              ⚡ {t("Electrician")}
                            </div>
                          </div>
                          <div className="text-[#9ca3af] text-[13px] mb-1">
                            📍 {t("Patna Rural")} &middot; {t("2.3 km")}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-primary tracking-widest text-[14px]">★★★★★</div>
                            <div className="text-[#9ca3af] text-[12px]">({t("42 reviews")})</div>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-[1px] w-full bg-primary/15 mb-4 shrink-0"></div>

                      {/* Stats Row */}
                      <div className="grid grid-cols-3 gap-4 text-center mb-4 shrink-0" style={{ transform: 'translateZ(20px)' }}>
                        <div>
                          <div className="text-white font-bold text-[24px]">127</div>
                          <div className="text-[#9ca3af] text-[12px]">{t("Jobs Done")}</div>
                        </div>
                        <div>
                          <div className="text-primary font-bold text-[24px]">4.8★</div>
                          <div className="text-[#9ca3af] text-[12px]">{t("Rating")}</div>
                        </div>
                        <div>
                          <div className="text-white font-bold text-[24px]">{t("< 1hr")}</div>
                          <div className="text-[#9ca3af] text-[12px]">{t("Response")}</div>
                        </div>
                      </div>

                      {/* Availability Banner */}
                      <div className="bg-primary/10 border border-primary/30 rounded-[12px] p-[12px_16px] flex items-center justify-between mb-4 shrink-0" style={{ transform: 'translateZ(15px)' }}>
                        <div className="flex items-center gap-3">
                          <div className="w-[10px] h-[10px] rounded-full bg-primary animate-available-pulse"></div>
                          <span className="text-primary font-bold text-[14px]">{t("Available Now")}</span>
                        </div>
                        <div className="text-white font-bold text-[18px]">&#8377;400<span className="text-[#9ca3af] text-[14px] font-normal">{t("/day")}</span></div>
                      </div>

                      {/* Recent Jobs */}
                      <div className="mb-4 flex-1" style={{ transform: 'translateZ(10px)' }}>
                        <div className="text-white font-bold text-[14px] mb-2">{t("Recent Jobs")}</div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-[32px] h-[32px] rounded-full bg-white/10 shrink-0"></div>
                            <div className="flex-1 text-[13px]">
                              <span className="text-white font-medium">{t("Wiring repair")}</span> <span className="text-[#9ca3af]">&middot; {t("Ara Village")}</span>
                            </div>
                            <div className="text-primary text-[11px] font-bold">✓ {t("Completed")}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-[32px] h-[32px] rounded-full bg-white/10 shrink-0"></div>
                            <div className="flex-1 text-[13px]">
                              <span className="text-white font-medium">{t("Fan installation")}</span> <span className="text-[#9ca3af]">&middot; {t("Chapra")}</span>
                            </div>
                            <div className="text-primary text-[11px] font-bold">✓ {t("Completed")}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-[32px] h-[32px] rounded-full bg-white/10 shrink-0"></div>
                            <div className="flex-1 text-[13px]">
                              <span className="text-white font-medium">{t("Switchboard fix")}</span> <span className="text-[#9ca3af]">&middot; {t("Muzaffarpur")}</span>
                            </div>
                            <div className="text-primary text-[11px] font-bold">✓ {t("Completed")}</div>
                          </div>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-4 shrink-0 mt-auto" style={{ transform: 'translateZ(18px)' }}>
                        <button className="flex-1 bg-primary text-white font-bold py-3 rounded-[8px] hover:bg-green-600 transition-colors">
                          {t("Book Now")}
                        </button>
                        <button className="flex-1 bg-transparent border-2 border-primary text-primary font-bold py-3 rounded-[8px] hover:bg-primary/10 transition-colors">
                          {t("WhatsApp")}
                        </button>
                      </div>

                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating Badge (Top-Right) — Pulse */}
                <motion.div
                  animate={{
                    x: isHovered && !isTouchDevice ? tilt.rotateY * -2 : 0,
                    y: isHovered && !isTouchDevice ? tilt.rotateX * 2 : 0,
                    z: 30
                  }}
                  transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    className="absolute -top-[12px] -right-[12px] bg-primary rounded-[50px] px-[16px] py-[8px] text-dark font-bold text-[12px] shadow-lg z-20"
                    animate={!prefersReduced ? {
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0 0 0px rgba(34,197,94,0)",
                        "0 0 20px rgba(34,197,94,0.4)",
                        "0 0 0px rgba(34,197,94,0)",
                      ],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⚡ {t("Live Matching")}
                  </motion.div>
                </motion.div>

                {/* Floating Mini Card (Bottom-Left) */}
                <motion.div
                  animate={{
                    x: isHovered && !isTouchDevice ? tilt.rotateY * -1.2 : 0,
                    y: isHovered && !isTouchDevice ? tilt.rotateX * 1.2 : 0,
                    z: 15
                  }}
                  transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute -bottom-[20px] -left-[20px] bg-[#0f1a0f] rounded-[14px] p-[14px_18px] border border-[rgba(34,197,94,0.2)] shadow-xl z-20">
                    <div className="text-white font-bold text-[14px] mb-1">🟢 {t("3 new job requests")}</div>
                    <div className="text-[#9ca3af] text-[12px]">{t("in Patna Rural today")}</div>
                  </div>
                </motion.div>

                {/* Floating Stat Pill (Top-Left) */}
                <motion.div
                  animate={{
                    x: isHovered && !isTouchDevice ? tilt.rotateY * -1.5 : 0,
                    y: isHovered && !isTouchDevice ? tilt.rotateX * 1.5 : 0,
                    z: 20
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute -top-[20px] -left-[20px] bg-primary rounded-[50px] px-[14px] py-[6px] text-dark font-bold text-[12px] shadow-xl z-20">
                    ⭐ {t("Top Rated Worker")}
                  </div>
                </motion.div>
              </motion.div>

              {/* Mobile View Card (Visible only on mobile) */}
              <div className="w-full md:hidden mt-8">
                <div className="bg-[#1a2e1a] rounded-[24px] border border-[rgba(34,197,94,0.2)] shadow-xl p-[24px] w-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-[60px] h-[60px] rounded-full bg-primary flex items-center justify-center text-white font-bold text-[24px] shrink-0 shadow-lg overflow-hidden">
                      <img src="/assets/images/worker-electrician.png" alt="Ramesh Kumar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-bold text-[16px]">{t("Ramesh Kumar")}</h3>
                      </div>
                      <div className="text-[#9ca3af] text-[12px] mb-1">📍 {t("Patna Rural")} &middot; {t("2.3 km")}</div>
                      <div className="flex items-center gap-2">
                        <div className="text-primary tracking-widest text-[12px]">★★★★★</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center mb-6">
                    <div>
                      <div className="text-white font-bold text-[18px]">127</div>
                      <div className="text-[#9ca3af] text-[10px]">{t("Jobs")}</div>
                    </div>
                    <div>
                      <div className="text-primary font-bold text-[18px]">4.8★</div>
                      <div className="text-[#9ca3af] text-[10px]">{t("Rating")}</div>
                    </div>
                    <div>
                      <div className="text-white font-bold text-[18px]">{t("< 1hr")}</div>
                      <div className="text-[#9ca3af] text-[10px]">{t("Response")}</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-1 bg-primary text-white font-bold py-3 rounded-[8px] text-[14px]">{t("Book Now")}</button>
                    <button className="flex-1 bg-transparent border-2 border-primary text-primary font-bold py-3 rounded-[8px] text-[14px]">{t("WhatsApp")}</button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="bg-[#0a1a0a] py-[60px] overflow-hidden w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]">
        <motion.div
          className="text-center mb-[32px]"
          {...(prefersReduced ? {} : {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: dur(0.6, isMobile) },
          })}
        >
          <div className="text-primary text-[12px] tracking-[4px] uppercase font-bold">
            &bull; {t("WORKERS ACROSS INDIA")} &bull;
          </div>
        </motion.div>

        <div className="marquee-container marquee-mask relative flex flex-col gap-6">
          
          {/* Row 1 - Scroll Left */}
          <div className="flex w-max animate-marquee-left">
            {[...Array(2)].map((_, i) => (
              <div key={`row1-${i}`} className="flex items-center">
                {/* Worker 1 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#22c55e] flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"><img src="/assets/images/worker-electrician.png" alt="Ramesh Kumar" className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">{t("Ramesh Kumar")}</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">{t("Electrician")}</span><span className="text-[#9ca3af] text-[12px]">&middot; {t("Patna Rural")}</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.8</span><span className="text-white font-bold text-[12px]">&#8377;400{t("/day")}</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-primary rounded-full animate-pulse-green shrink-0"></div>
                </div>
                {/* Skill 1 */}
                <div className="bg-primary/10 border border-primary/25 rounded-[50px] p-[10px_20px] shrink-0 mr-[16px] flex items-center gap-2 whitespace-nowrap"><Wrench className="w-[16px] h-[16px] text-primary"/><span className="text-white text-[13px] font-bold">{t("Electrician")}</span></div>
                {/* Worker 2 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#16a34a] flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"><img src="/assets/images/worker-tutor.png" alt="Priya Sharma" className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">{t("Priya Sharma")}</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">{t("Tutor")}</span><span className="text-[#9ca3af] text-[12px]">&middot; {t("Muzaffarpur")}</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.9</span><span className="text-white font-bold text-[12px]">&#8377;300{t("/day")}</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-primary rounded-full animate-pulse-green shrink-0"></div>
                </div>
                {/* Skill 2 */}
                <div className="bg-primary/10 border border-primary/25 rounded-[50px] p-[10px_20px] shrink-0 mr-[16px] flex items-center gap-2 whitespace-nowrap"><Scissors className="w-[16px] h-[16px] text-primary"/><span className="text-white text-[13px] font-bold">{t("Tailor")}</span></div>
                {/* Worker 3 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#15803d] flex items-center justify-center text-white font-bold text-lg shrink-0">V</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">{t("Vijay Yadav")}</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">{t("Mason")}</span><span className="text-[#9ca3af] text-[12px]">&middot; {t("Darbhanga")}</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.7</span><span className="text-white font-bold text-[12px]">&#8377;500{t("/day")}</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-primary rounded-full animate-pulse-green shrink-0"></div>
                </div>
                {/* Skill 3 */}
                <div className="bg-primary/10 border border-primary/25 rounded-[50px] p-[10px_20px] shrink-0 mr-[16px] flex items-center gap-2 whitespace-nowrap"><Hammer className="w-[16px] h-[16px] text-primary"/><span className="text-white text-[13px] font-bold">{t("Carpenter")}</span></div>
                {/* Worker 4 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#166534] flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"><img src="/assets/images/worker-painter.png" alt="Anita Kumari" className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">{t("Anita Kumari")}</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">{t("Painter")}</span><span className="text-[#9ca3af] text-[12px]">&middot; {t("Gaya")}</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.3</span><span className="text-white font-bold text-[12px]">&#8377;280{t("/day")}</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-primary rounded-full animate-pulse-green shrink-0"></div>
                </div>
                {/* Skill 4 */}
                <div className="bg-primary/10 border border-primary/25 rounded-[50px] p-[10px_20px] shrink-0 mr-[16px] flex items-center gap-2 whitespace-nowrap"><GraduationCap className="w-[16px] h-[16px] text-primary"/><span className="text-white text-[13px] font-bold">{t("Tutor")}</span></div>
                {/* Worker 5 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#14532d] flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"><img src="/assets/images/worker-electrician.png" alt="Suresh Bind" className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">{t("Suresh Bind")}</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">{t("Electrician")}</span><span className="text-[#9ca3af] text-[12px]">&middot; {t("Nalanda")}</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.4</span><span className="text-white font-bold text-[12px]">&#8377;380{t("/day")}</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-primary rounded-full animate-pulse-green shrink-0"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 - Scroll Right */}
          <div className="flex w-max animate-marquee-right">
            {[...Array(2)].map((_, i) => (
              <div key={`row2-${i}`} className="flex items-center">
                {/* Worker 1 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#22c55e] flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"><img src="/assets/images/worker-tailor.png" alt="Sunita Devi" className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">{t("Sunita Devi")}</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">{t("Tailor")}</span><span className="text-[#9ca3af] text-[12px]">&middot; {t("Ara")}</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.5</span><span className="text-white font-bold text-[12px]">&#8377;250{t("/day")}</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-primary rounded-full animate-pulse-green shrink-0"></div>
                </div>
                {/* Skill 1 */}
                <div className="bg-primary/10 border border-primary/25 rounded-[50px] p-[10px_20px] shrink-0 mr-[16px] flex items-center gap-2 whitespace-nowrap"><Droplets className="w-[16px] h-[16px] text-primary"/><span className="text-white text-[13px] font-bold">{t("Plumber")}</span></div>
                {/* Worker 2 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#16a34a] flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"><img src="/assets/images/worker-plumber.png" alt="Mohan Singh" className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">{t("Mohan Singh")}</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">{t("Plumber")}</span><span className="text-[#9ca3af] text-[12px]">&middot; {t("Chapra")}</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.2</span><span className="text-white font-bold text-[12px]">&#8377;350{t("/day")}</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-gray-600 rounded-full shrink-0"></div>
                </div>
                {/* Skill 2 */}
                <div className="bg-primary/10 border border-primary/25 rounded-[50px] p-[10px_20px] shrink-0 mr-[16px] flex items-center gap-2 whitespace-nowrap"><Building className="w-[16px] h-[16px] text-primary"/><span className="text-white text-[13px] font-bold">{t("Mason")}</span></div>
                {/* Worker 3 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#15803d] flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"><img src="/assets/images/worker-carpenter.png" alt="Raju Mistri" className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">{t("Raju Mistri")}</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">{t("Carpenter")}</span><span className="text-[#9ca3af] text-[12px]">&middot; {t("Bhagalpur")}</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.6</span><span className="text-white font-bold text-[12px]">&#8377;450{t("/day")}</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-primary rounded-full animate-pulse-green shrink-0"></div>
                </div>
                {/* Skill 3 */}
                <div className="bg-primary/10 border border-primary/25 rounded-[50px] p-[10px_20px] shrink-0 mr-[16px] flex items-center gap-2 whitespace-nowrap"><PaintBucket className="w-[16px] h-[16px] text-primary"/><span className="text-white text-[13px] font-bold">{t("Painter")}</span></div>
                {/* Worker 4 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#166534] flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"><img src="/assets/images/worker-tailor.png" alt="Meena Devi" className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">{t("Meena Devi")}</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">{t("Tailor")}</span><span className="text-[#9ca3af] text-[12px]">&middot; {t("Sitamarhi")}</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.1</span><span className="text-white font-bold text-[12px]">&#8377;220{t("/day")}</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-primary rounded-full animate-pulse-green shrink-0"></div>
                </div>
                {/* Skill 4 */}
                <div className="bg-primary/10 border border-primary/25 rounded-[50px] p-[10px_20px] shrink-0 mr-[16px] flex items-center gap-2 whitespace-nowrap"><Leaf className="w-[16px] h-[16px] text-primary"/><span className="text-white text-[13px] font-bold">{t("Gardener")}</span></div>
                {/* Worker 5 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#14532d] flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"><img src="/assets/images/worker-plumber.png" alt="Deepak Kumar" className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">{t("Deepak Kumar")}</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">{t("Plumber")}</span><span className="text-[#9ca3af] text-[12px]">&middot; {t("Vaishali")}</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.5</span><span className="text-white font-bold text-[12px]">&#8377;320{t("/day")}</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-primary rounded-full animate-pulse-green shrink-0"></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresSectionRef} className="features-section py-[96px] bg-dark relative z-10 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div ref={featuresHeadlineRef} className="text-center md:text-left mb-12">
            <h2 className="font-serif text-[36px] md:text-[48px] font-bold text-white leading-[1.1]">
              {t("Skills for")} <span className="text-primary italic">{t("every village need")}</span>
            </h2>
            <p className="font-sans text-[16px] text-[#9ca3af] mt-[12px] max-w-2xl mx-auto md:mx-0">
              {t("Find trusted local workers for any job — from repairs to tutoring, in your village, on your terms.")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD 1 */}
            <motion.div
              className="bg-[linear-gradient(135deg,#1a4d2e,#22c55e)] rounded-[20px] p-[40px_36px] min-h-[340px] flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] w-full"
              {...whileInViewFadeUp(0)}
              {...cardHover}
            >
              <div>
                <div className="w-[56px] h-[56px] rounded-full bg-white/15 flex items-center justify-center backdrop-blur-[4px] shrink-0">
                  <MapPin size={28} color="white" strokeWidth={1.8} />
                </div>
                <h3 className="font-sans font-bold text-[22px] text-white leading-[1.3] mt-[24px]">{t("Find skilled workers near you")}</h3>
                <p className="font-sans text-[14px] text-white/80 leading-[1.7] mt-[12px]">
                  {t("For urgent home repairs, installations, and daily tasks. AI matches you with verified workers within your village or 5km radius — instantly.")}
                </p>
              </div>
              <Link href="/workers" className="font-sans text-[14px] text-white underline mt-auto pt-6 hover:opacity-70 transition-opacity w-fit">
                {t("Find workers")} &rarr;
              </Link>
            </motion.div>

            {/* CARD 2 */}
            <motion.div
              className="bg-[linear-gradient(135deg,#1a4d2e,#22c55e)] rounded-[20px] p-[40px_36px] min-h-[340px] flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] w-full"
              {...whileInViewFadeUp(0.15)}
              {...cardHover}
            >
              <div>
                <div className="w-[56px] h-[56px] rounded-full bg-white/15 flex items-center justify-center backdrop-blur-[4px] shrink-0">
                  <ClipboardList size={28} color="white" strokeWidth={1.8} />
                </div>
                <h3 className="font-sans font-bold text-[22px] text-white leading-[1.3] mt-[24px]">{t("Post a job in 2 minutes")}</h3>
                <p className="font-sans text-[14px] text-white/80 leading-[1.7] mt-[12px]">
                  {t("For one-time tasks or ongoing work. Describe your need in Hindi or English. Our engine finds the best available match for consistent reliability.")}
                </p>
              </div>
              <Link href="/post-job" className="font-sans text-[14px] text-white underline mt-auto pt-6 hover:opacity-70 transition-opacity w-fit">
                {t("Post a Job")} &rarr;
              </Link>
            </motion.div>

            {/* CARD 3 */}
            <motion.div
              className="bg-[linear-gradient(135deg,#1a4d2e,#22c55e)] rounded-[20px] p-[40px_36px] min-h-[340px] flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] w-full"
              {...whileInViewFadeUp(0.3)}
              {...cardHover}
            >
              <div>
                <div className="w-[56px] h-[56px] rounded-full bg-white/15 flex items-center justify-center backdrop-blur-[4px] shrink-0">
                  <Coins size={28} color="white" strokeWidth={1.8} />
                </div>
                <h3 className="font-sans font-bold text-[22px] text-white leading-[1.3] mt-[24px]">{t("Earn from your own village")}</h3>
                <p className="font-sans text-[14px] text-white/80 leading-[1.7] mt-[12px]">
                  {t("For skilled workers ready to build a digital reputation. Get verified, receive WhatsApp job alerts, and grow your income without leaving home.")}
                </p>
              </div>
              <Link href="/post-job" className="font-sans text-[14px] text-white underline mt-auto pt-6 hover:opacity-70 transition-opacity w-fit">
                {t("Join as Worker")} &rarr;
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutSectionRef} className="about-section bg-[#0f1a0f] py-[64px] md:py-[96px] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center gap-[48px] md:gap-[80px]">
            {/* Left Column — Visual Side */}
            <motion.div
              className="w-full md:w-[45%] relative"
              {...(prefersReduced ? {} : {
                initial: { opacity: 0, x: -80 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: dur(0.9, isMobile), type: "spring", stiffness: 80 },
              })}
            >
              
              {/* Subtle radial green glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.06)_0%,transparent_70%)] z-0 pointer-events-none"></div>

              {/* Main card */}
              <div className="bg-[#1a2e1a] border border-[rgba(34,197,94,0.15)] rounded-[24px] p-[40px] relative z-10">
                <div className="text-[#22c55e] text-[11px] tracking-[3px] uppercase mb-4">{t("OUR MISSION")}</div>
                
                <h3 className="font-serif italic text-[28px] text-white leading-[1.5]">
                  &quot;{t("We believe every skilled hand deserves a digital identity.")}&quot;
                </h3>
                
                <div className="w-[40px] h-[2px] bg-[#22c55e] my-[24px]"></div>
                
                <p className="font-sans text-[14px] text-[#9ca3af] leading-[1.8]">
                  {t("Built by a team that grew up in villages and watched talent migrate to cities unnecessarily.")}
                </p>
              </div>

              {/* 4 Floating Stat Cards with Counters */}
              <motion.div
                className="grid grid-cols-2 gap-[12px] mt-[12px] relative z-10"
                {...(prefersReduced ? {} : {
                  initial: { opacity: 0, scale: 0.8 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { duration: dur(0.6, isMobile), delay: 0.3 },
                })}
              >
                <div className="bg-[#0f1a0f] border border-[rgba(34,197,94,0.2)] rounded-[14px] p-[16px_20px] text-center">
                  <div ref={el => aboutStatRefs.current[0] = el} className="font-serif font-bold text-[32px] text-[#22c55e]">500+</div>
                  <div className="font-sans text-[12px] text-[#9ca3af] uppercase tracking-[1px] mt-1">{t("Villages Covered")}</div>
                </div>
                <div className="bg-[#0f1a0f] border border-[rgba(34,197,94,0.2)] rounded-[14px] p-[16px_20px] text-center">
                  <div ref={el => aboutStatRefs.current[1] = el} className="font-serif font-bold text-[32px] text-[#22c55e]">10K+</div>
                  <div className="font-sans text-[12px] text-[#9ca3af] uppercase tracking-[1px] mt-1">{t("Workers Registered")}</div>
                </div>
                <div className="bg-[#0f1a0f] border border-[rgba(34,197,94,0.2)] rounded-[14px] p-[16px_20px] text-center">
                  <div ref={el => aboutStatRefs.current[2] = el} className="font-serif font-bold text-[32px] text-[#22c55e]">25K+</div>
                  <div className="font-sans text-[12px] text-[#9ca3af] uppercase tracking-[1px] mt-1">{t("Jobs Completed")}</div>
                </div>
                <div className="bg-[#0f1a0f] border border-[rgba(34,197,94,0.2)] rounded-[14px] p-[16px_20px] text-center">
                  <div ref={el => aboutStatRefs.current[3] = el} className="font-serif font-bold text-[32px] text-[#22c55e]">4.8★</div>
                  <div className="font-sans text-[12px] text-[#9ca3af] uppercase tracking-[1px] mt-1">{t("Average Rating")}</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column — Text Content */}
            <div ref={aboutRightRef} className="about-right w-full md:w-[55%] relative">
              {/* Thin vertical green accent line */}
              <div ref={accentLineRef} className="accent-line w-[3px] h-[60px] bg-[#22c55e] rounded-[2px] mb-[20px]"></div>

              <div className="about-line flex items-center gap-2 mb-[16px]">
                <span className="text-[#22c55e] text-[12px] tracking-[3px] uppercase">{t("WHO WE ARE")}</span>
              </div>

              <h2 className="about-line font-serif font-bold text-[36px] md:text-[48px] text-white leading-[1.2] mb-6">
                {t("Built for Bharat's")}<br />{t("forgotten workforce")}
              </h2>

              <p className="about-line font-sans text-[16px] text-[#9ca3af] leading-[1.8] mb-[20px]">
                {t("VillageWork was born from a simple observation — India's most skilled workers live in its villages, but its biggest opportunities live in cities. We decided to change that.")}
              </p>

              <p className="about-line font-sans text-[16px] text-[#9ca3af] leading-[1.8] mb-[32px]">
                {t("We built a hyperlocal platform where an electrician in Bihar can find his first digital client, a tailor in UP can grow a loyal customer base, and a tutor in Bengal can teach without travelling miles — all in their own language, in their own village.")}
              </p>

              <div className="flex flex-col gap-[20px] mb-[36px]">
                {[
                  { title: t("No English required"), desc: t("Full platform available in Hindi, Bengali, Tamil and more") },
                  { title: t("No app download needed"), desc: t("Workers receive jobs directly on WhatsApp — zero friction") },
                  { title: t("Government backed"), desc: t("Integrated with Skill India and PM Vishwakarma schemes") },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4"
                    {...(prefersReduced ? {} : {
                      initial: { opacity: 0, x: 40 },
                      whileInView: { opacity: 1, x: 0 },
                      viewport: { once: true },
                      transition: { delay: index * 0.2, duration: dur(0.6, isMobile) },
                    })}
                  >
                    <div className="mt-1"><Check className="w-[20px] h-[20px] text-[#22c55e]" strokeWidth={3} /></div>
                    <div>
                      <div className="font-bold text-white mb-1">{item.title}</div>
                      <div className="text-[#9ca3af] text-[14px] leading-relaxed">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                {...(prefersReduced ? {} : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: 0.6, duration: dur(0.5, isMobile) },
                })}
              >
                <Link href="/about" className="inline-block bg-transparent border-[1.5px] border-[#22c55e] text-white px-[28px] py-[12px] rounded-[8px] font-bold hover:bg-[#22c55e] hover:text-[#0f1a0f] transition-colors mt-[16px]">
                  {t("Learn Our Story")} &rarr;
                </Link>
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-[48px] font-bold text-white mb-12 text-left">
            {t("How it Works")}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <motion.div
              className="bg-card rounded-[20px] p-[40px_32px] border border-[rgba(255,255,255,0.08)] cursor-pointer"
              onClick={() => toggleStep(1)}
              initial={prefersReduced ? {} : { opacity: 0, y: 50 }}
              whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: dur(0.7, isMobile), delay: 0 }}
              whileHover={prefersReduced ? {} : {
                borderColor: "rgba(34,197,94,0.4)",
                y: -8,
                boxShadow: "0 20px 50px rgba(34,197,94,0.1)",
              }}
            >
              <motion.div {...whileInViewScaleBounce(0.3)} className="font-serif font-bold text-[80px] text-white/90 leading-none mb-6">1</motion.div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-white font-bold text-[24px]">{t("Post a Job")}</h3>
                {expandedStep === 1 ? (
                  <ChevronUp className="w-[20px] h-[20px] text-primary" strokeWidth={2} />
                ) : (
                  <ChevronDown className="w-[20px] h-[20px] text-primary" strokeWidth={2} />
                )}
              </div>
              {expandedStep === 1 && (
                <motion.p
                  className="text-[#9ca3af] text-[14px] font-sans leading-[1.8]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {t("Tell us the skill you need and when. Add your village name, budget, and preferred date. Done in under 2 minutes — no English required.")}
                </motion.p>
              )}
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="bg-card rounded-[20px] p-[40px_32px] border border-[rgba(255,255,255,0.08)] cursor-pointer"
              onClick={() => toggleStep(2)}
              initial={prefersReduced ? {} : { opacity: 0, y: 50 }}
              whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: dur(0.7, isMobile), delay: 0.2 }}
              whileHover={prefersReduced ? {} : {
                borderColor: "rgba(34,197,94,0.4)",
                y: -8,
                boxShadow: "0 20px 50px rgba(34,197,94,0.1)",
              }}
            >
              <motion.div {...whileInViewScaleBounce(0.5)} className="font-serif font-bold text-[80px] text-white/90 leading-none mb-6">2</motion.div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-white font-bold text-[24px]">{t("Get AI-Matched")}</h3>
                {expandedStep === 2 ? (
                  <ChevronUp className="w-[20px] h-[20px] text-primary" strokeWidth={2} />
                ) : (
                  <ChevronDown className="w-[20px] h-[20px] text-primary" strokeWidth={2} />
                )}
              </div>
              {expandedStep === 2 && (
                <motion.p
                  className="text-[#9ca3af] text-[14px] font-sans leading-[1.8]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {t("Our engine matches you with the top 3 workers by skill, proximity, rating, and availability — instantly. View their profiles before you decide.")}
                </motion.p>
              )}
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className="bg-card rounded-[20px] p-[40px_32px] border border-[rgba(255,255,255,0.08)] cursor-pointer"
              onClick={() => toggleStep(3)}
              initial={prefersReduced ? {} : { opacity: 0, y: 50 }}
              whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: dur(0.7, isMobile), delay: 0.4 }}
              whileHover={prefersReduced ? {} : {
                borderColor: "rgba(34,197,94,0.4)",
                y: -8,
                boxShadow: "0 20px 50px rgba(34,197,94,0.1)",
              }}
            >
              <motion.div {...whileInViewScaleBounce(0.7)} className="font-serif font-bold text-[80px] text-white/90 leading-none mb-6">3</motion.div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-white font-bold text-[24px]">{t("Accept via WhatsApp")}</h3>
                {expandedStep === 3 ? (
                  <ChevronUp className="w-[20px] h-[20px] text-primary" strokeWidth={2} />
                ) : (
                  <ChevronDown className="w-[20px] h-[20px] text-primary" strokeWidth={2} />
                )}
              </div>
              {expandedStep === 3 && (
                <motion.p
                  className="text-[#9ca3af] text-[14px] font-sans leading-[1.8]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {t("Workers get a WhatsApp alert with job details. One tap to accept. Complete the work, earn your pay, and grow your village reputation.")}
                </motion.p>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            {...(prefersReduced ? {} : {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: dur(0.7, isMobile) },
            })}
          >
            <div className="inline-flex items-center gap-2 text-primary text-sm font-bold tracking-widest uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-primary"></span> {t("VOICES FROM THE VILLAGE")}
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">{t("Real Workers. Real Stories.")}</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: t("VillageWork gave me 3 clients in my first week. I never thought I could find work without going to the city."), name: t("Ramesh Kumar"), role: `${t("Electrician")} · ${t("Patna Rural")}` },
              { quote: t("I found a trusted plumber in 10 minutes. The reviews made me feel safe hiring someone I had never met before."), name: t("Sunita Devi"), role: `${t("Homemaker")} · ${t("Ara Village")}` },
              { quote: t("My tailoring orders doubled. Now I earn ₹18,000 a month without leaving my village."), name: t("Priya Sharma"), role: `${t("Tailor")} · ${t("Muzaffarpur")}` },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-card p-8 rounded-r-2xl rounded-l-none border-l-4 border-primary shadow-lg shadow-black/20 relative"
                {...(prefersReduced ? {} : {
                  initial: { opacity: 0, y: 60 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: dur(0.6, isMobile), delay: index * 0.15 },
                })}
              >
                <div className="text-primary text-4xl font-serif absolute top-6 left-6 opacity-30">&quot;</div>
                <p className="text-white italic leading-relaxed mb-6 pt-4 text-lg">
                  {testimonial.quote}
                </p>
                <div>
                  <div className="text-primary font-bold">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm font-sans">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#1a3d2b]">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          {...(prefersReduced ? {} : {
            initial: { opacity: 0, scale: 0.95, y: 40 },
            whileInView: { opacity: 1, scale: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: dur(0.8, isMobile) },
          })}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">{t("Ready to earn from your village?")}</h2>
          <p className="text-green-100 text-xl mb-10 opacity-90 font-sans">{t("Join 10,000+ workers already on VillageWork")}</p>
          <motion.button
            className="bg-white text-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
            {...(prefersReduced ? {} : {
              whileHover: { scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" },
              whileTap: { scale: 0.97 },
            })}
          >
            {t("Get Started")} {t("Free")}
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
