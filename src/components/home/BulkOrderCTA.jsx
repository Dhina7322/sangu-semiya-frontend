import React from 'react';
import { Link } from 'react-router-dom';
import { FiMessageCircle } from 'react-icons/fi';

const BulkOrderCTA = () => (
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="bg-slate-900 rounded-3xl p-10 lg:p-14 overflow-hidden relative shadow-sm">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="30" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-pattern)"/>
          </svg>
        </div>
        
        <div className="relative z-10 max-w-xl space-y-4">
          <span className="text-secondary font-semibold uppercase tracking-widest text-[8px] px-3 py-1 bg-white/5 border border-white/5 rounded-full inline-block">Grow with Sangu</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight leading-tight">Distributor & Wholesale Partnership</h2>
          <p className="text-sm text-slate-400 font-normal leading-relaxed opacity-80">Partnering with over 10+ dealers across Tamil Nadu. Access premium margins and priority shipping with Coimbatore's most trusted vermicelli brand since 1982.</p>
          
          <div className="flex flex-wrap gap-3 pt-3">
            <Link to="/contact-us" className="bg-secondary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold text-[10px] tracking-widest uppercase transition-all duration-300 shadow-md text-center">
              Bulk Enquiry
            </Link>
            <a href="https://wa.me/919677707416" target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold text-[10px] tracking-widest uppercase transition-all duration-300 border border-white/10 flex items-center justify-center gap-2">
               <FiMessageCircle size={14} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
);

export default BulkOrderCTA;
