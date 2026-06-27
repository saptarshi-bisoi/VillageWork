"use client";

import { workers } from '@/data/workers';
import { notFound } from 'next/navigation';
import { MapPin, Star, BadgeCheck, Briefcase, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import ReviewCard from '@/components/ReviewCard';
import Link from 'next/link';

export default function WorkerProfile({ params }) {
  const workerId = parseInt(params.id);
  const worker = workers.find(w => w.id === workerId);

  if (!worker) {
    notFound();
  }

  // Dummy Reviews Data
  const reviews = [
    { id: 1, reviewerName: "Amit", village: "Patna Rural", rating: 5, date: "2 weeks ago", text: "Fixed our wiring in 2 hours. Very professional." },
    { id: 2, reviewerName: "Rekha", village: "Ara Village", rating: 4, date: "1 month ago", text: "Good work, came on time." },
    { id: 3, reviewerName: "Sanjay", village: "Chapra", rating: 5, date: "2 months ago", text: "Best in our area. Highly recommend." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Top Section */}
      <div className="bg-card rounded-3xl p-8 md:p-12 border border-white/5 relative mb-12">
        <Link href="/workers" className="text-gray-400 hover:text-white text-sm absolute top-6 left-8 mb-4 inline-block">
          &larr; Back to workers
        </Link>
        <div className="flex flex-col md:flex-row items-center gap-8 mt-6">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-700 border-4 border-dark overflow-hidden shadow-xl">
              {worker.image ? (
                <img src={worker.image} alt={worker.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-4xl font-bold text-gray-400">
                  {worker.name.charAt(0)}
                </div>
              )}
            </div>
            {worker.verified && (
              <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1 border-4 border-card" title="Verified Member">
                <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase inline-block mb-4">
              {worker.skill}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              {worker.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-400 mb-6">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {worker.village} ({worker.distance})
              </span>
              <span className="hidden md:inline">&middot;</span>
              <span className="flex items-center gap-1 text-white font-bold">
                <Star className="w-4 h-4 text-gold fill-gold" /> {worker.rating} 
                <span className="text-gray-400 font-normal">({worker.reviews} reviews)</span>
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="text-primary font-bold text-3xl">
                &#8377;{worker.rate}<span className="text-gray-400 text-base font-normal">/day</span>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-colors shadow-lg shadow-primary/25">
                  Book Now
                </button>
                <button 
                  onClick={() => alert(`Request sent to ${worker.name} via WhatsApp!`)}
                  className="flex-1 sm:flex-none border-2 border-primary text-primary px-8 py-3 rounded-full font-bold hover:bg-primary/10 transition-colors"
                >
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-card p-6 rounded-2xl border border-white/5 text-center">
          <Briefcase className="w-6 h-6 text-primary mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">127</div>
          <div className="text-gray-400 text-sm">Jobs Done</div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-white/5 text-center">
          <Star className="w-6 h-6 text-gold mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{worker.rating}</div>
          <div className="text-gray-400 text-sm">Avg Rating</div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-white/5 text-center">
          <Clock className="w-6 h-6 text-primary mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">&lt; 1hr</div>
          <div className="text-gray-400 text-sm">Response Time</div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-white/5 text-center">
          <Calendar className="w-6 h-6 text-primary mx-auto mb-3" />
          <div className="text-xl font-bold text-white mb-1 mt-1">Jan 2025</div>
          <div className="text-gray-400 text-sm">Member Since</div>
        </div>
      </div>

      {/* About Section */}
      <div className="mb-16">
        <h2 className="font-serif text-3xl font-bold text-white mb-6">About {worker.name}</h2>
        <p className="text-gray-300 leading-relaxed mb-6 font-sans">
          I have over 8 years of experience working as a {worker.skill.toLowerCase()} in {worker.village} and surrounding areas. I specialize in quick, reliable service for local households and small businesses.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Wiring", "Switchboard", "Solar Panel", "Fan Installation"].map(tag => (
            <span key={tag} className="bg-dark border border-white/10 text-gray-300 px-4 py-2 rounded-lg text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="font-serif text-3xl font-bold text-white mb-8">What Neighbours Say</h2>
        <div className="space-y-6">
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

    </div>
  );
}
