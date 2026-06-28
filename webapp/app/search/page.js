"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { workers } from '@/data/workers';
import WorkerCard from '@/components/WorkerCard';
import { Search, Mic, Map as MapIcon, List, MapPin } from 'lucide-react';

export default function SearchPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  const filters = ["All", "Electrician", "Plumber", "Carpenter", "Tailor", "Tutor", "Painter"];

  const filteredWorkers = workers.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          w.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          w.village.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || w.skill === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Search Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="relative mb-6">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input 
            type="text"
            placeholder="Search by skill, name, or village..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-card border-2 border-white/10 rounded-full py-4 pl-16 pr-16 text-lg text-white focus:outline-none focus:border-primary shadow-lg transition-colors"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark rounded-full flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
            <Mic className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter 
                  ? 'bg-primary text-white border-transparent' 
                  : 'bg-card border border-white/10 text-gray-300 hover:border-primary/50 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 border-b border-white/5 pb-4">
        <div className="text-white font-bold text-lg mb-4 sm:mb-0">
          {filteredWorkers.length} workers found {searchTerm && `for "${searchTerm}"`}
        </div>
        <div className="flex bg-card rounded-lg p-1 border border-white/10">
          <button 
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-colors ${
              viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <List className="w-4 h-4" /> List View
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-colors ${
              viewMode === 'map' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <MapIcon className="w-4 h-4" /> Map View
          </button>
        </div>
      </div>

      {/* Results */}
      {filteredWorkers.length > 0 ? (
        viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredWorkers.map((worker, index) => (
              <WorkerCard key={worker.id} worker={worker} index={index} />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-3xl border border-white/5 h-[600px] flex items-center justify-center relative overflow-hidden">
            {/* Dummy Map Background */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-[#0f1a0f]"></div>
            
            {/* Pinned Locations */}
            {filteredWorkers.map((worker, idx) => (
              <div 
                key={worker.id} 
                className="absolute flex flex-col items-center group cursor-pointer"
                style={{ 
                  top: `${20 + (idx * 15) % 60}%`, 
                  left: `${15 + (idx * 25) % 70}%` 
                }}
              >
                <div className="bg-primary text-white p-2 rounded-full shadow-lg shadow-primary/20 animate-bounce">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="mt-2 bg-dark border border-white/10 px-3 py-1 rounded-lg text-xs font-bold text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {worker.name} &middot; &#8377;{worker.rate}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-24 bg-card rounded-3xl border border-white/5">
          <Search className="w-16 h-16 text-gray-600 mx-auto mb-6" />
          <h3 className="text-white font-bold text-2xl mb-2">No workers found</h3>
          <p className="text-gray-400">Try adjusting your search terms or selecting a different skill.</p>
        </div>
      )}

    </div>
  );
}
