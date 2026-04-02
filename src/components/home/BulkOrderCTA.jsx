import React from 'react';
import { Link } from 'react-router-dom';
import { FiMessageCircle } from 'react-icons/fi';

const BulkOrderCTA = () => (
  <section className="py-32 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 overflow-hidden relative shadow-2xl">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="30" fill="none" stroke="white" strokeWidth="0.5"/>
                <circle cx="40" cy="40" r="15" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-pattern)"/>
          </svg>
        </div>
        
        <div className="relative z-10 max-w-2xl space-y-10">
          <span className="text-secondary font-black uppercase tracking-[0.4em] text-xs px-5 py-2 bg-white/5 border border-white/10 rounded-full inline-block">Grow with Sangu</span>
          <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-none">Distributor & Wholesale Partnership</h2>
          <p className="text-xl text-slate-400 font-medium leading-relaxed tracking-tight">Partnering with over 10+ dealers across Tamil Nadu. Access premium margins, high-converting marketing collateral, and priority shipping. Partner with Coimbatore's most trusted vermicelli brand — established in 1982.</p>
          
          <div className="flex flex-wrap gap-6 pt-4">
            <Link to="/contact-us" className="bg-secondary hover:bg-red-700 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 shadow-xl shadow-red-900/10 active:scale-95 text-center">
              Bulk Enquiry
            </Link>
            <a href="https://wa.me/919677707416" target="_blank" rel="noreferrer" className="bg-emerald-500 hover:bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 shadow-xl shadow-emerald-900/10 flex items-center justify-center gap-3 active:scale-95">
               <FiMessageCircle size={20} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BulkOrderCTA;
