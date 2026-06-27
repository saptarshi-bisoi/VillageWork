"use client";

import { useState } from 'react';
import { Star } from 'lucide-react';
import ReviewCard from '@/components/ReviewCard';

export default function RatingsPage() {
  const [activeFilter, setActiveFilter] = useState('All Skills');

  const filters = ["All Skills", "Electrician", "Plumber", "Carpenter", "Tailor", "Tutor", "Painter", "Mason"];

  const dummyReviews = [
    { id: 1, reviewerName: "Amit", village: "Patna Rural", rating: 5, date: "2 weeks ago", text: "Fixed our wiring in 2 hours. Very professional.", worker: "Ramesh Kumar", skill: "Electrician" },
    { id: 2, reviewerName: "Rekha", village: "Ara Village", rating: 4, date: "1 month ago", text: "Good work, came on time.", worker: "Sunita Devi", skill: "Tailor" },
    { id: 3, reviewerName: "Sanjay", village: "Chapra", rating: 5, date: "2 months ago", text: "Best in our area. Highly recommend.", worker: "Mohan Singh", skill: "Plumber" },
    { id: 4, reviewerName: "Neha", village: "Muzaffarpur", rating: 5, date: "3 months ago", text: "Excellent tutoring for my kids.", worker: "Priya Sharma", skill: "Tutor" },
    { id: 5, reviewerName: "Vikram", village: "Bhagalpur", rating: 4, date: "4 months ago", text: "Sturdy furniture work.", worker: "Raju Mistri", skill: "Carpenter" },
    { id: 6, reviewerName: "Pooja", village: "Gaya", rating: 5, date: "5 months ago", text: "Painted my entire house beautifully.", worker: "Anita Kumari", skill: "Painter" },
  ];

  const filteredReviews = activeFilter === 'All Skills' ? dummyReviews : dummyReviews.filter(r => r.skill === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-white mb-4">Reviews & Ratings</h1>
        <p className="text-gray-400">See what the community is saying about our workers.</p>
      </div>

      {/* Overall Stats Banner */}
      <div className="bg-card rounded-3xl p-8 border border-white/5 mb-12 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <div className="text-center md:w-1/3 shrink-0">
            <div className="text-6xl font-bold text-white mb-2">4.6</div>
            <div className="flex justify-center text-gold mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-6 h-6 ${i < 4 ? 'fill-gold' : 'fill-transparent opacity-30'}`} strokeWidth={1.5} />
              ))}
            </div>
            <div className="text-gray-400">Based on 1,284 reviews</div>
          </div>

          <div className="flex-1 w-full space-y-3">
            {[
              { stars: 5, percent: 68 },
              { stars: 4, percent: 22 },
              { stars: 3, percent: 7 },
              { stars: 2, percent: 2 },
              { stars: 1, percent: 1 },
            ].map(row => (
              <div key={row.stars} className="flex items-center gap-4">
                <div className="text-white font-bold w-4">{row.stars}</div>
                <Star className="w-4 h-4 text-gray-500 shrink-0" strokeWidth={2} />
                <div className="flex-1 h-2 bg-dark rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${row.percent}%` }}
                  ></div>
                </div>
                <div className="text-gray-400 text-sm w-8 text-right">{row.percent}%</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                activeFilter === filter 
                  ? 'bg-primary text-white border-transparent' 
                  : 'bg-card border border-white/10 text-gray-400 hover:border-primary/50 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredReviews.map(review => (
            <div key={review.id} className="relative">
              {/* Added worker info above the ReviewCard component since ReviewCard doesn't display worker info natively */}
              <div className="absolute top-6 right-6 text-right z-10 hidden sm:block">
                <div className="text-white font-bold text-sm">{review.worker}</div>
                <div className="text-primary text-xs font-bold uppercase">{review.skill}</div>
              </div>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
        
        {filteredReviews.length === 0 && (
          <div className="text-center text-gray-400 py-12">No reviews found for this skill category.</div>
        )}

        <div className="text-center">
          <button className="border-2 border-primary text-primary px-8 py-3 rounded-full font-bold hover:bg-primary/10 transition-colors">
            Load More Reviews
          </button>
        </div>
      </div>

    </div>
  );
}
