"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Wrench, FileText, ShieldCheck, ChevronUp, ChevronDown, ClipboardList, BadgeCheck, Check, Scissors, Hammer, GraduationCap, Droplets, PaintBucket, Building, Leaf } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (step) => {
    setExpandedStep(expandedStep === step ? null : step);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden bg-dark">
        {/* Botanical Leaves with Vignette */}
        <div className="absolute left-0 top-0 bottom-0 w-64 pointer-events-none z-0">
          <img src="/assets/images/leaves-left.png" alt="" className="h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/0 to-dark"></div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none z-0">
          <img src="/assets/images/leaves-right.png" alt="" className="h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-l from-dark/0 to-dark"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Column - 55% */}
            <div className="w-full lg:w-[55%] flex flex-col items-start text-left">
              <div className="text-primary text-[12px] font-bold tracking-[3px] uppercase mb-6">
                INDIA&apos;S #1 RURAL GIG PLATFORM
              </div>
              
              <h1 className="font-serif text-5xl md:text-[68px] text-white leading-[1.1] mb-6">
                <span className="font-normal block">Find skilled workers</span>
                <span className="text-primary italic block">in your village</span>
              </h1>
              
              <p className="text-[#9ca3af] text-[18px] mb-10 max-w-lg font-sans leading-relaxed">
                VillageWork connects skilled rural workers with nearby households and businesses — in their language, at their pace, on WhatsApp.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/search" className="bg-primary text-white font-bold px-[28px] py-[14px] rounded-[8px] uppercase tracking-[1px] text-center hover:bg-green-600 transition-colors duration-200">
                  I Need a Worker
                </Link>
                <Link href="/post-job" className="bg-transparent border-2 border-primary text-white font-bold px-[28px] py-[14px] rounded-[8px] uppercase tracking-[1px] text-center hover:bg-primary/10 transition-colors duration-200">
                  I Want Work
                </Link>
              </div>

              <div className="flex items-center gap-2 text-[13px] text-[#9ca3af]">
                <span>10,000+ Workers</span>
                <span className="text-primary font-bold">&middot;</span>
                <span>500+ Villages</span>
                <span className="text-primary font-bold">&middot;</span>
                <span>4.8★ Rating</span>
              </div>
            </div>

            {/* Right Column - 45% */}
            <div className="w-full lg:w-[45%] relative mt-12 lg:mt-0 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] z-10 hidden md:block">
                
                {/* Main CSS Card */}
                <div className="bg-[#1a2e1a] rounded-[24px] border border-[rgba(34,197,94,0.2)] shadow-[0_24px_60px_rgba(0,0,0,0.4)] p-[32px] w-full h-[420px] flex flex-col relative z-10">
                  
                  {/* Card Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-[72px] h-[72px] rounded-full bg-primary flex items-center justify-center text-white font-bold text-[28px] shrink-0 overflow-hidden">
                      <img src="/assets/images/worker-electrician.png" alt="Ramesh Kumar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-white font-bold text-[18px]">Ramesh Kumar</h3>
                        <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                          ⚡ Electrician
                        </div>
                      </div>
                      <div className="text-[#9ca3af] text-[13px] mb-1">
                        📍 Patna Rural &middot; 2.3 km
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-primary tracking-widest text-[14px]">★★★★★</div>
                        <div className="text-[#9ca3af] text-[12px]">(42 reviews)</div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] w-full bg-primary/15 mb-4 shrink-0"></div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 text-center mb-4 shrink-0">
                    <div>
                      <div className="text-white font-bold text-[24px]">127</div>
                      <div className="text-[#9ca3af] text-[12px]">Jobs Done</div>
                    </div>
                    <div>
                      <div className="text-primary font-bold text-[24px]">4.8★</div>
                      <div className="text-[#9ca3af] text-[12px]">Rating</div>
                    </div>
                    <div>
                      <div className="text-white font-bold text-[24px]">&lt; 1hr</div>
                      <div className="text-[#9ca3af] text-[12px]">Response</div>
                    </div>
                  </div>

                  {/* Availability Banner */}
                  <div className="bg-primary/10 border border-primary/30 rounded-[12px] p-[12px_16px] flex items-center justify-between mb-4 shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-[10px] h-[10px] rounded-full bg-primary animate-pulse"></div>
                      <span className="text-primary font-bold text-[14px]">Available Now</span>
                    </div>
                    <div className="text-white font-bold text-[18px]">&#8377;400<span className="text-[#9ca3af] text-[14px] font-normal">/day</span></div>
                  </div>

                  {/* Recent Jobs */}
                  <div className="mb-4 flex-1">
                    <div className="text-white font-bold text-[14px] mb-2">Recent Jobs</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-[32px] h-[32px] rounded-full bg-white/10 shrink-0"></div>
                        <div className="flex-1 text-[13px]">
                          <span className="text-white font-medium">Wiring repair</span> <span className="text-[#9ca3af]">&middot; Ara Village</span>
                        </div>
                        <div className="text-primary text-[11px] font-bold">✓ Completed</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-[32px] h-[32px] rounded-full bg-white/10 shrink-0"></div>
                        <div className="flex-1 text-[13px]">
                          <span className="text-white font-medium">Fan installation</span> <span className="text-[#9ca3af]">&middot; Chapra</span>
                        </div>
                        <div className="text-primary text-[11px] font-bold">✓ Completed</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-[32px] h-[32px] rounded-full bg-white/10 shrink-0"></div>
                        <div className="flex-1 text-[13px]">
                          <span className="text-white font-medium">Switchboard fix</span> <span className="text-[#9ca3af]">&middot; Muzaffarpur</span>
                        </div>
                        <div className="text-primary text-[11px] font-bold">✓ Completed</div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 shrink-0 mt-auto">
                    <button className="flex-1 bg-primary text-white font-bold py-3 rounded-[8px] hover:bg-green-600 transition-colors">
                      Book Now
                    </button>
                    <button className="flex-1 bg-transparent border-2 border-primary text-primary font-bold py-3 rounded-[8px] hover:bg-primary/10 transition-colors">
                      WhatsApp
                    </button>
                  </div>

                </div>

                {/* Floating Badge (Top-Right) */}
                <div className="absolute -top-[12px] -right-[12px] bg-primary rounded-[50px] px-[16px] py-[8px] text-dark font-bold text-[12px] shadow-lg z-20">
                  ⚡ Live Matching
                </div>

                {/* Floating Mini Card (Bottom-Left) */}
                <div className="absolute -bottom-[20px] -left-[20px] bg-[#0f1a0f] rounded-[14px] p-[14px_18px] border border-[rgba(34,197,94,0.2)] shadow-xl z-20">
                  <div className="text-white font-bold text-[14px] mb-1">🟢 3 new job requests</div>
                  <div className="text-[#9ca3af] text-[12px]">in Patna Rural today</div>
                </div>

                {/* Floating Stat Pill (Top-Left) */}
                <div className="absolute -top-[20px] -left-[20px] bg-primary rounded-[50px] px-[14px] py-[6px] text-dark font-bold text-[12px] shadow-xl z-20">
                  ⭐ Top Rated Worker
                </div>
              </div>

              {/* Mobile View Card (Visible only on mobile) */}
              <div className="w-full md:hidden mt-8">
                <div className="bg-[#1a2e1a] rounded-[24px] border border-[rgba(34,197,94,0.2)] shadow-xl p-[24px] w-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-[60px] h-[60px] rounded-full bg-primary flex items-center justify-center text-white font-bold text-[24px] shrink-0 shadow-lg overflow-hidden">
                      <img src="/assets/images/worker-electrician.png" alt="Ramesh Kumar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-bold text-[16px]">Ramesh Kumar</h3>
                      </div>
                      <div className="text-[#9ca3af] text-[12px] mb-1">📍 Patna Rural &middot; 2.3 km</div>
                      <div className="flex items-center gap-2">
                        <div className="text-primary tracking-widest text-[12px]">★★★★★</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center mb-6">
                    <div>
                      <div className="text-white font-bold text-[18px]">127</div>
                      <div className="text-[#9ca3af] text-[10px]">Jobs</div>
                    </div>
                    <div>
                      <div className="text-primary font-bold text-[18px]">4.8★</div>
                      <div className="text-[#9ca3af] text-[10px]">Rating</div>
                    </div>
                    <div>
                      <div className="text-white font-bold text-[18px]">&lt; 1hr</div>
                      <div className="text-[#9ca3af] text-[10px]">Response</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-1 bg-primary text-white font-bold py-3 rounded-[8px] text-[14px]">Book</button>
                    <button className="flex-1 bg-transparent border-2 border-primary text-primary font-bold py-3 rounded-[8px] text-[14px]">WhatsApp</button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="bg-[#0a1a0a] py-[60px] overflow-hidden w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]">
        <div className="text-center mb-[32px]">
          <div className="text-primary text-[12px] tracking-[4px] uppercase font-bold">
            &bull; WORKERS ACROSS INDIA &bull;
          </div>
        </div>

        <div className="marquee-container marquee-mask relative flex flex-col gap-6">
          
          {/* Row 1 - Scroll Left */}
          <div className="flex w-max animate-marquee-left">
            {[...Array(2)].map((_, i) => (
              <div key={`row1-${i}`} className="flex items-center">
                {/* Worker 1 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#22c55e] flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"><img src="/assets/images/worker-electrician.png" alt="Ramesh Kumar" className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">Ramesh Kumar</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">Electrician</span><span className="text-[#9ca3af] text-[12px]">&middot; Patna Rural</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.8</span><span className="text-white font-bold text-[12px]">&#8377;400/day</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-primary rounded-full animate-pulse-green shrink-0"></div>
                </div>
                {/* Skill 1 */}
                <div className="bg-primary/10 border border-primary/25 rounded-[50px] p-[10px_20px] shrink-0 mr-[16px] flex items-center gap-2 whitespace-nowrap"><Wrench className="w-[16px] h-[16px] text-primary"/><span className="text-white text-[13px] font-bold">Electrician</span></div>
                {/* Worker 2 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#16a34a] flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"><img src="/assets/images/worker-tutor.png" alt="Priya Sharma" className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">Priya Sharma</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">Tutor</span><span className="text-[#9ca3af] text-[12px]">&middot; Muzaffarpur</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.9</span><span className="text-white font-bold text-[12px]">&#8377;300/day</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-primary rounded-full animate-pulse-green shrink-0"></div>
                </div>
                {/* Skill 2 */}
                <div className="bg-primary/10 border border-primary/25 rounded-[50px] p-[10px_20px] shrink-0 mr-[16px] flex items-center gap-2 whitespace-nowrap"><Scissors className="w-[16px] h-[16px] text-primary"/><span className="text-white text-[13px] font-bold">Tailor</span></div>
                {/* Worker 3 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#15803d] flex items-center justify-center text-white font-bold text-lg shrink-0">V</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">Vijay Yadav</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">Mason</span><span className="text-[#9ca3af] text-[12px]">&middot; Darbhanga</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.7</span><span className="text-white font-bold text-[12px]">&#8377;500/day</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-primary rounded-full animate-pulse-green shrink-0"></div>
                </div>
                {/* Skill 3 */}
                <div className="bg-primary/10 border border-primary/25 rounded-[50px] p-[10px_20px] shrink-0 mr-[16px] flex items-center gap-2 whitespace-nowrap"><Hammer className="w-[16px] h-[16px] text-primary"/><span className="text-white text-[13px] font-bold">Carpenter</span></div>
                {/* Worker 4 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#166534] flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"><img src="/assets/images/worker-painter.png" alt="Anita Kumari" className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">Anita Kumari</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">Painter</span><span className="text-[#9ca3af] text-[12px]">&middot; Gaya</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.3</span><span className="text-white font-bold text-[12px]">&#8377;280/day</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-primary rounded-full animate-pulse-green shrink-0"></div>
                </div>
                {/* Skill 4 */}
                <div className="bg-primary/10 border border-primary/25 rounded-[50px] p-[10px_20px] shrink-0 mr-[16px] flex items-center gap-2 whitespace-nowrap"><GraduationCap className="w-[16px] h-[16px] text-primary"/><span className="text-white text-[13px] font-bold">Tutor</span></div>
                {/* Worker 5 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#14532d] flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"><img src="/assets/images/worker-electrician.png" alt="Suresh Bind" className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">Suresh Bind</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">Electrician</span><span className="text-[#9ca3af] text-[12px]">&middot; Nalanda</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.4</span><span className="text-white font-bold text-[12px]">&#8377;380/day</span></div>
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
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">Sunita Devi</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">Tailor</span><span className="text-[#9ca3af] text-[12px]">&middot; Ara</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.5</span><span className="text-white font-bold text-[12px]">&#8377;250/day</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-primary rounded-full animate-pulse-green shrink-0"></div>
                </div>
                {/* Skill 1 */}
                <div className="bg-primary/10 border border-primary/25 rounded-[50px] p-[10px_20px] shrink-0 mr-[16px] flex items-center gap-2 whitespace-nowrap"><Droplets className="w-[16px] h-[16px] text-primary"/><span className="text-white text-[13px] font-bold">Plumber</span></div>
                {/* Worker 2 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#16a34a] flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"><img src="/assets/images/worker-plumber.png" alt="Mohan Singh" className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">Mohan Singh</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">Plumber</span><span className="text-[#9ca3af] text-[12px]">&middot; Chapra</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.2</span><span className="text-white font-bold text-[12px]">&#8377;350/day</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-gray-600 rounded-full shrink-0"></div>
                </div>
                {/* Skill 2 */}
                <div className="bg-primary/10 border border-primary/25 rounded-[50px] p-[10px_20px] shrink-0 mr-[16px] flex items-center gap-2 whitespace-nowrap"><Building className="w-[16px] h-[16px] text-primary"/><span className="text-white text-[13px] font-bold">Mason</span></div>
                {/* Worker 3 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#15803d] flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"><img src="/assets/images/worker-carpenter.png" alt="Raju Mistri" className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">Raju Mistri</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">Carpenter</span><span className="text-[#9ca3af] text-[12px]">&middot; Bhagalpur</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.6</span><span className="text-white font-bold text-[12px]">&#8377;450/day</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-primary rounded-full animate-pulse-green shrink-0"></div>
                </div>
                {/* Skill 3 */}
                <div className="bg-primary/10 border border-primary/25 rounded-[50px] p-[10px_20px] shrink-0 mr-[16px] flex items-center gap-2 whitespace-nowrap"><PaintBucket className="w-[16px] h-[16px] text-primary"/><span className="text-white text-[13px] font-bold">Painter</span></div>
                {/* Worker 4 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#166534] flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"><img src="/assets/images/worker-tailor.png" alt="Meena Devi" className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">Meena Devi</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">Tailor</span><span className="text-[#9ca3af] text-[12px]">&middot; Sitamarhi</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.1</span><span className="text-white font-bold text-[12px]">&#8377;220/day</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-primary rounded-full animate-pulse-green shrink-0"></div>
                </div>
                {/* Skill 4 */}
                <div className="bg-primary/10 border border-primary/25 rounded-[50px] p-[10px_20px] shrink-0 mr-[16px] flex items-center gap-2 whitespace-nowrap"><Leaf className="w-[16px] h-[16px] text-primary"/><span className="text-white text-[13px] font-bold">Gardener</span></div>
                {/* Worker 5 */}
                <div className="bg-[#1a2e1a] border border-primary/15 rounded-[16px] p-[16px_20px] w-[260px] md:w-[260px] w-[220px] shrink-0 mr-[16px] flex items-center gap-[14px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#14532d] flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"><img src="/assets/images/worker-plumber.png" alt="Deepak Kumar" className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1"><span className="text-white font-bold text-[14px]">Deepak Kumar</span><Check className="w-[14px] h-[14px] text-primary" strokeWidth={3}/></div>
                    <div className="flex items-center gap-1 mt-0.5"><span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">Plumber</span><span className="text-[#9ca3af] text-[12px]">&middot; Vaishali</span></div>
                    <div className="flex items-center justify-between mt-1"><span className="text-primary text-[12px]">★4.5</span><span className="text-white font-bold text-[12px]">&#8377;320/day</span></div>
                  </div>
                  <div className="w-[8px] h-[8px] bg-primary rounded-full animate-pulse-green shrink-0"></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-[96px] bg-dark relative z-10 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center md:text-left mb-12">
            <h2 className="font-serif text-[36px] md:text-[48px] font-bold text-white leading-[1.1]">
              Skills for <span className="text-primary italic">every village need</span>
            </h2>
            <p className="font-sans text-[16px] text-[#9ca3af] mt-[12px] max-w-2xl mx-auto md:mx-0">
              Find trusted local workers for any job — from repairs to tutoring, in your village, on your terms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD 1 */}
            <div className="bg-[linear-gradient(135deg,#1a4d2e,#22c55e)] rounded-[20px] p-[40px_36px] min-h-[340px] flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:brightness-[1.08] hover:-translate-y-[4px] transition-all duration-[250ms] ease-out w-full">
              <div>
                <div className="bg-white/15 rounded-full p-[12px] w-[64px] h-[64px] flex items-center justify-center shrink-0">
                  <Wrench className="w-[40px] h-[40px] text-white" strokeWidth={1.5} />
                </div>
                <h3 className="font-sans font-bold text-[22px] text-white leading-[1.3] mt-[24px]">Find skilled workers near you</h3>
                <p className="font-sans text-[14px] text-white/80 leading-[1.7] mt-[12px]">
                  For urgent home repairs, installations, and daily tasks. AI matches you with verified workers within your village or 5km radius — instantly.
                </p>
              </div>
              <Link href="/workers" className="font-sans text-[14px] text-white underline mt-auto pt-6 hover:opacity-70 transition-opacity w-fit">
                Find workers &rarr;
              </Link>
            </div>

            {/* CARD 2 */}
            <div className="bg-[linear-gradient(135deg,#1a4d2e,#22c55e)] rounded-[20px] p-[40px_36px] min-h-[340px] flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:brightness-[1.08] hover:-translate-y-[4px] transition-all duration-[250ms] ease-out w-full">
              <div>
                <div className="bg-white/15 rounded-full p-[12px] w-[64px] h-[64px] flex items-center justify-center shrink-0">
                  <ClipboardList className="w-[40px] h-[40px] text-white" strokeWidth={1.5} />
                </div>
                <h3 className="font-sans font-bold text-[22px] text-white leading-[1.3] mt-[24px]">Post a job in 2 minutes</h3>
                <p className="font-sans text-[14px] text-white/80 leading-[1.7] mt-[12px]">
                  For one-time tasks or ongoing work. Describe your need in Hindi or English. Our engine finds the best available match for consistent reliability.
                </p>
              </div>
              <Link href="/post-job" className="font-sans text-[14px] text-white underline mt-auto pt-6 hover:opacity-70 transition-opacity w-fit">
                Post a job &rarr;
              </Link>
            </div>

            {/* CARD 3 */}
            <div className="bg-[linear-gradient(135deg,#1a4d2e,#22c55e)] rounded-[20px] p-[40px_36px] min-h-[340px] flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:brightness-[1.08] hover:-translate-y-[4px] transition-all duration-[250ms] ease-out w-full">
              <div>
                <div className="bg-white/15 rounded-full p-[12px] w-[64px] h-[64px] flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-[40px] h-[40px] text-white" strokeWidth={1.5} />
                </div>
                <h3 className="font-sans font-bold text-[22px] text-white leading-[1.3] mt-[24px]">Earn from your own village</h3>
                <p className="font-sans text-[14px] text-white/80 leading-[1.7] mt-[12px]">
                  For skilled workers ready to build a digital reputation. Get verified, receive WhatsApp job alerts, and grow your income without leaving home.
                </p>
              </div>
              <Link href="/post-job" className="font-sans text-[14px] text-white underline mt-auto pt-6 hover:opacity-70 transition-opacity w-fit">
                Join as worker &rarr;
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-[48px] font-bold text-white mb-12 text-left">
            How it Works
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div 
              className="bg-card rounded-[20px] p-[40px_32px] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] transition-all duration-200 flex flex-col cursor-pointer"
              onClick={() => toggleStep(1)}
            >
              <div className="font-serif font-bold text-[80px] text-white/90 leading-none mb-6">1</div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-white font-bold text-[24px]">Post a Job</h3>
                {expandedStep === 1 ? (
                  <ChevronUp className="w-[20px] h-[20px] text-primary" strokeWidth={2} />
                ) : (
                  <ChevronDown className="w-[20px] h-[20px] text-primary" strokeWidth={2} />
                )}
              </div>
              {expandedStep === 1 && (
                <p className="text-[#9ca3af] text-[14px] font-sans leading-[1.8] animate-in fade-in slide-in-from-top-2 duration-300">
                  Tell us the skill you need and when. Add your village name, budget, and preferred date. Done in under 2 minutes — no English required.
                </p>
              )}
            </div>

            {/* Card 2 */}
            <div 
              className="bg-card rounded-[20px] p-[40px_32px] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] transition-all duration-200 flex flex-col cursor-pointer"
              onClick={() => toggleStep(2)}
            >
              <div className="font-serif font-bold text-[80px] text-white/90 leading-none mb-6">2</div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-white font-bold text-[24px]">Get AI-Matched</h3>
                {expandedStep === 2 ? (
                  <ChevronUp className="w-[20px] h-[20px] text-primary" strokeWidth={2} />
                ) : (
                  <ChevronDown className="w-[20px] h-[20px] text-primary" strokeWidth={2} />
                )}
              </div>
              {expandedStep === 2 && (
                <p className="text-[#9ca3af] text-[14px] font-sans leading-[1.8] animate-in fade-in slide-in-from-top-2 duration-300">
                  Our engine matches you with the top 3 workers by skill, proximity, rating, and availability — instantly. View their profiles before you decide.
                </p>
              )}
            </div>

            {/* Card 3 */}
            <div 
              className="bg-card rounded-[20px] p-[40px_32px] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] transition-all duration-200 flex flex-col cursor-pointer"
              onClick={() => toggleStep(3)}
            >
              <div className="font-serif font-bold text-[80px] text-white/90 leading-none mb-6">3</div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-white font-bold text-[24px]">Accept via WhatsApp</h3>
                {expandedStep === 3 ? (
                  <ChevronUp className="w-[20px] h-[20px] text-primary" strokeWidth={2} />
                ) : (
                  <ChevronDown className="w-[20px] h-[20px] text-primary" strokeWidth={2} />
                )}
              </div>
              {expandedStep === 3 && (
                <p className="text-[#9ca3af] text-[14px] font-sans leading-[1.8] animate-in fade-in slide-in-from-top-2 duration-300">
                  Workers get a WhatsApp alert with job details. One tap to accept. Complete the work, earn your pay, and grow your village reputation.
                </p>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-bold tracking-widest uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-primary"></span> VOICES FROM THE VILLAGE
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Real Workers. Real Stories.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-r-2xl rounded-l-none border-l-4 border-primary shadow-lg shadow-black/20 relative">
              <div className="text-primary text-4xl font-serif absolute top-6 left-6 opacity-30">&quot;</div>
              <p className="text-white italic leading-relaxed mb-6 pt-4 text-lg">
                VillageWork gave me 3 clients in my first week. I never thought I could find work without going to the city.
              </p>
              <div>
                <div className="text-primary font-bold">Ramesh Kumar</div>
                <div className="text-gray-500 text-sm font-sans">Electrician &middot; Patna Rural</div>
              </div>
            </div>
            
            <div className="bg-card p-8 rounded-r-2xl rounded-l-none border-l-4 border-primary shadow-lg shadow-black/20 relative">
              <div className="text-primary text-4xl font-serif absolute top-6 left-6 opacity-30">&quot;</div>
              <p className="text-white italic leading-relaxed mb-6 pt-4 text-lg">
                I found a trusted plumber in 10 minutes. The reviews made me feel safe hiring someone I had never met before.
              </p>
              <div>
                <div className="text-primary font-bold">Sunita Devi</div>
                <div className="text-gray-500 text-sm font-sans">Homemaker &middot; Ara Village</div>
              </div>
            </div>
            
            <div className="bg-card p-8 rounded-r-2xl rounded-l-none border-l-4 border-primary shadow-lg shadow-black/20 relative">
              <div className="text-primary text-4xl font-serif absolute top-6 left-6 opacity-30">&quot;</div>
              <p className="text-white italic leading-relaxed mb-6 pt-4 text-lg">
                My tailoring orders doubled. Now I earn &#8377;18,000 a month without leaving my village.
              </p>
              <div>
                <div className="text-primary font-bold">Priya Sharma</div>
                <div className="text-gray-500 text-sm font-sans">Tailor &middot; Muzaffarpur</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#1a3d2b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Ready to earn from your village?</h2>
          <p className="text-green-100 text-xl mb-10 opacity-90 font-sans">Join 10,000+ workers already on VillageWork</p>
          <button className="bg-white text-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
            {t("Get Started")} Free
          </button>
        </div>
      </section>
    </div>
  );
}
