"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { workers } from '@/data/workers';
import WorkerCard from '@/components/WorkerCard';

export default function PostJobPage() {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [budget, setBudget] = useState(500);
  const [skill, setSkill] = useState('Electrician');

  const skills = ["Electrician", "Plumber", "Carpenter", "Tailor", "Tutor", "Painter", "Mason"];

  const matchedWorkers = workers
    .filter(w => w.skill === skill && w.rate <= budget)
    .slice(0, 3); // Top 3 matches

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl font-bold text-white mb-4">Post a Job</h1>
        <p className="text-gray-400">Describe what you need done, and we&apos;ll find the best workers near you.</p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-card border border-white/5 rounded-3xl p-8 shadow-xl">
          <div className="space-y-6">
            
            <div>
              <label className="block text-white font-bold mb-2">Job Title</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Fix bathroom wiring"
                className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-white font-bold mb-2">Skill Needed</label>
              <select 
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                {skills.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-bold mb-2">Job Description</label>
              <textarea 
                rows="4"
                required
                placeholder="Describe what needs to be done..."
                className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-bold mb-2">Your Village</label>
                <input 
                  type="text" 
                  required
                  placeholder="Village name"
                  className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-white font-bold mb-2">PIN Code</label>
                <input 
                  type="number" 
                  required
                  placeholder="PIN Code"
                  className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-bold mb-2">Preferred Date</label>
              <input 
                type="date" 
                required
                className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors color-scheme-dark"
                style={{ colorScheme: 'dark' }}
              />
            </div>

            <div>
              <label className="flex items-center justify-between text-white font-bold mb-2">
                <span>Budget Limit per day</span>
                <span className="text-primary">&#8377;100 - &#8377;{budget}</span>
              </label>
              <input 
                type="range" 
                min="100" max="2000" step="100"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-lg shadow-primary/25">
                Find Matching Workers
              </button>
            </div>
            
          </div>
        </form>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-primary mb-2">Top {matchedWorkers.length} Matches Found</h2>
            <p className="text-gray-400">We found the best available workers for your job.</p>
          </div>
          
          {matchedWorkers.length > 0 ? (
            <div className="space-y-6">
              {matchedWorkers.map(worker => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          ) : (
            <div className="bg-card border border-white/5 p-8 rounded-2xl text-center">
              <p className="text-white mb-4">No workers found within your budget or skill area.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-primary font-bold hover:underline"
              >
                Go back and adjust requirements
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
