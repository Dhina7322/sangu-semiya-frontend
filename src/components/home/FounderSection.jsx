import React from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiArrowRight } from 'react-icons/fi';

const FounderSection = () => (
  <section className="py-24 lg:py-32 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Image Side */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-br from-secondary/20 via-primary/10 to-transparent rounded-[4rem] blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
            <div className="aspect-[4/5] bg-gradient-to-br from-secondary to-red-800 flex items-center justify-center relative">
              {/* Decorative pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="founder-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                      <circle cx="30" cy="30" r="20" fill="none" stroke="white" strokeWidth="0.5"/>
                      <circle cx="30" cy="30" r="10" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#founder-pattern)"/>
                </svg>
              </div>
              <div className="text-center z-10 p-12">
                <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-xl">
                  <FiAward className="text-white" size={56} />
                </div>
                <h3 className="text-white text-3xl font-black mb-2">K. Chandran</h3>
                <p className="text-white/70 text-sm font-bold uppercase tracking-widest">Founder & Visionary</p>
                <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20">
                  <span className="text-primary font-black text-lg">1982</span>
                  <span className="text-white/60 text-xs">EST.</span>
                </div>
              </div>
            </div>
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -right-6 bg-primary text-white px-8 py-4 rounded-2xl shadow-2xl font-black text-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
            40+ Years
          </div>
        </div>

        {/* Content Side */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="inline-block py-1.5 px-4 rounded-full bg-red-50 border border-red-100 text-secondary font-black text-[10px] tracking-[0.3em] uppercase shadow-sm">
              Our Legacy
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95]">
              K. Chandran
            </h2>
            <p className="text-primary font-black text-sm uppercase tracking-[0.2em]">
              Founder, Sangu Brand Semiya
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              Sangu Brand Semiya is a renowned company that has been offering delectable and authentic traditional foods to its customers for over <span className="text-secondary font-black">three decades</span>, and its success is largely attributable to its founder.
            </p>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              Mr. K Chandran's entrepreneurial journey began in <span className="text-secondary font-black">1982</span> with a modest production of plain vermicelli in a small carpet area. In those days, vermicelli was not easily obtainable in the market, but Mr. K Chandran's unconventional product offerings, combined with <span className="text-secondary font-black">superior quality and taste</span> and innovative marketing strategies, enabled him to seize the Coimbatore market.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <p className="text-3xl font-black text-secondary mb-1">1982</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Established</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <p className="text-3xl font-black text-secondary mb-1">40+</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Years Legacy</p>
            </div>
          </div>

          <Link 
            to="/about" 
            className="inline-flex items-center gap-3 bg-secondary hover:bg-red-700 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 shadow-xl group"
          >
            Know More
            <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default FounderSection;
