import React from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiArrowRight } from 'react-icons/fi';

const FounderSection = () => (
  <section className="py-20 lg:py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Image Side */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-br from-secondary/10 via-primary/5 to-transparent rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
          <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <div className="aspect-[4/5] bg-gradient-to-br from-secondary to-red-800 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="founder-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="10" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#founder-pattern)"/>
                </svg>
              </div>
              <div className="text-center z-10 p-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg">
                  <FiAward className="text-white" size={40} />
                </div>
                <h3 className="text-white text-2xl font-bold mb-1">K. Chandran</h3>
                <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Founder & Visionary</p>
                <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
                  <span className="text-primary font-bold text-base">1982</span>
                  <span className="text-white/60 text-[10px]">EST.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-primary text-white px-6 py-3 rounded-xl shadow-lg font-bold text-base transform group-hover:scale-105 transition-transform duration-300">
            40+ Years
          </div>
        </div>

        {/* Content Side */}
        <div className="space-y-6">
          <div className="space-y-3">
            <span className="inline-block py-1 px-3 rounded-full bg-red-50 border border-red-100 text-secondary font-bold text-[9px] tracking-widest uppercase mb-1">
              Our Legacy
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              K. Chandran
            </h2>
            <p className="text-primary font-bold text-[11px] uppercase tracking-[0.1em] opacity-80">
              Founder, Sangu Brand Semiya
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-base text-slate-600 font-normal leading-relaxed">
              Sangu Brand Semiya is a renowned company that has been offering delectable and authentic traditional foods to its customers for over <span className="text-secondary font-bold text-sm">three decades</span>, and its success is largely attributable to its founder.
            </p>
            <p className="text-base text-slate-600 font-normal leading-relaxed">
              Mr. K Chandran's entrepreneurial journey began in <span className="text-secondary font-bold text-sm">1982</span> with a modest production of plain vermicelli in a small carpet area. In those days, vermicelli was not easily obtainable in the market, but Mr. K Chandran's unconventional product offerings, combined with <span className="text-secondary font-bold text-sm">superior quality and taste</span> and innovative marketing strategies, enabled him to seize the Coimbatore market.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 text-center">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <p className="text-2xl font-bold text-secondary mb-0.5">1982</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Established</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <p className="text-2xl font-bold text-secondary mb-0.5">40+</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Years Legacy</p>
            </div>
          </div>

          <Link 
            to="/our-company" 
            className="inline-flex items-center gap-2 bg-secondary hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg group"
          >
            Know More
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default FounderSection;
