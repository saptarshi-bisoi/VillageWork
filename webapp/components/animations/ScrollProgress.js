"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollProgress() {
  const barRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !barRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          }
        }
      );
    });

    return () => ctx.revert();
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: '#22c55e',
        transformOrigin: 'left',
        transform: 'scaleX(0)',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
}
