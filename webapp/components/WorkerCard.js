"use client";

import { MapPin, Star, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function WorkerCard({ worker, index = 0 }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className="bg-card rounded-2xl p-6 border border-white/5 group"
      {...(prefersReduced ? {} : {
        initial: { opacity: 0, y: 60 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: {
          duration: 0.6,
          delay: index * 0.1,
          ease: "easeOut",
        },
        whileHover: {
          y: -8,
          scale: 1.02,
          borderColor: "rgba(34,197,94,0.35)",
        },
      })}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden relative">
            {worker.image ? (
              <img src={worker.image} alt={worker.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-xl font-bold text-gray-400">
                {worker.name.charAt(0)}
              </div>
            )}
          </div>
          {worker.available && (
            <div className="absolute top-0 right-0 w-4 h-4 bg-primary border-2 border-card rounded-full animate-available-pulse" title="Available Today"></div>
          )}
        </div>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
          {worker.skill}
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          {worker.name}
          {worker.verified && <BadgeCheck className="w-4 h-4 text-blue-400" strokeWidth={2} />}
        </h3>
        <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
          <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
          {worker.village} &middot; {worker.distance}
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1 text-sm">
          <Star className="w-4 h-4 text-gold fill-gold" strokeWidth={1.5} />
          <span className="font-bold text-white">{worker.rating}</span>
          <span className="text-gray-500">({worker.reviews})</span>
        </div>
        <div className="text-primary font-bold">
          &#8377;{worker.rate}<span className="text-gray-500 text-xs font-normal">/day</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Link href={`/worker/${worker.id}`} className="flex-1 border border-primary text-primary hover:bg-primary/10 text-center py-2 rounded-lg text-sm font-bold transition-colors">
          View Profile
        </Link>
        <button 
          onClick={() => alert(`Request sent to ${worker.name} via WhatsApp!`)}
          className="flex-1 bg-primary text-white hover:bg-green-600 text-center py-2 rounded-lg text-sm font-bold transition-colors"
        >
          WhatsApp
        </button>
      </div>
    </motion.div>
  );
}
