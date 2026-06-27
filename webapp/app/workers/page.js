"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { workers } from '@/data/workers';
import WorkerCard from '@/components/WorkerCard';
import { Search, MapPin, SlidersHorizontal, IndianRupee } from 'lucide-react';

export default function WorkersPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [village, setVillage] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [priceRange, setPriceRange] = useState(1000);
  const [minRating, setMinRating] = useState(false);
  const [availableToday, setAvailableToday] = useState(false);

  const skills = ["Electrician", "Plumber", "Carpenter", "Tailor", "Tutor", "Painter", "Mason"];

  const handleSkillChange = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          worker.skill.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkills.length === 0 || selectedSkills.includes(worker.skill);
    const matchesVillage = village === '' || worker.village.toLowerCase().includes(village.toLowerCase());
    const matchesPrice = worker.rate <= priceRange;
    const matchesRating = minRating ? worker.rating >= 4.0 : true;
    const matchesAvailability = availableToday ? worker.available : true;
    
    return matchesSearch && matchesSkill && matchesVillage && matchesPrice && matchesRating && matchesAvailability;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar (Filters) */}
        <div className="w-full lg:w-[280px] shrink-0">
          <div className="bg-card border border-white/5 rounded-2xl p-6 sticky top-28">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg text-white flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-primary" strokeWidth={1.5} />
                Filters
              </h2>
              <button 
                onClick={() => {
                  setSearchTerm(''); setSelectedSkills([]); setVillage(''); setPinCode(''); setPriceRange(1000); setMinRating(false); setAvailableToday(false);
                }}
                className="text-gray-400 text-sm hover:text-white"
              >
                Reset
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search name or skill..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-dark border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h3 className="text-white font-bold text-sm mb-3">Skill Category</h3>
              <div className="space-y-2">
                {skills.map(skill => (
                  <label key={skill} className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer hover:text-white">
                    <input 
                      type="checkbox" 
                      checked={selectedSkills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                      className="rounded border-gray-600 bg-dark text-primary focus:ring-primary focus:ring-offset-dark"
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <h3 className="text-white font-bold text-sm mb-3">Location</h3>
              <div className="space-y-2">
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Village Name" 
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full bg-dark border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="PIN Code" 
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full bg-dark border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-white font-bold text-sm mb-3 flex items-center justify-between">
                Price Range
                <span className="text-primary font-normal text-xs">&#8377;100 - &#8377;{priceRange}</span>
              </h3>
              <input 
                type="range" 
                min="100" max="1000" step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            {/* Rating & Availability */}
            <div className="mb-8 space-y-4">
              <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer hover:text-white">
                <input 
                  type="checkbox" 
                  checked={minRating}
                  onChange={() => setMinRating(!minRating)}
                  className="rounded border-gray-600 bg-dark text-primary focus:ring-primary focus:ring-offset-dark"
                />
                4★ and above
              </label>
              <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer hover:text-white">
                <input 
                  type="checkbox" 
                  checked={availableToday}
                  onChange={() => setAvailableToday(!availableToday)}
                  className="rounded border-gray-600 bg-dark text-primary focus:ring-primary focus:ring-offset-dark"
                />
                Available Today
              </label>
            </div>

            <button className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-green-600 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Right Content (Cards) */}
        <div className="w-full lg:flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="font-serif text-3xl font-bold text-white">Browse Workers</h1>
            <div className="text-gray-400 text-sm">
              Showing {filteredWorkers.length} results
            </div>
          </div>
          
          {filteredWorkers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredWorkers.map(worker => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-2xl border border-white/5">
              <p className="text-gray-400">No workers found. Try adjusting your filters.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
