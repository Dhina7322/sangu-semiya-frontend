import React from 'react';
import { Link } from 'react-router-dom';
import { FiMessageCircle } from 'react-icons/fi';

const BulkOrderCTA = () => (
  <section className="bg-white py-20 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="bg-slate-900 rounded-3xl p-10 lg:p-20 overflow-hidden relative shadow-2xl">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="30" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="text-secondary font-bold uppercase tracking-widest text-[9px] px-4 py-2 bg-white/5 border border-white/10 rounded-full inline-block">Grow with Sangu</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">Distributor & Wholesale Partnership</h2>
          <p className="text-base text-slate-400 font-normal leading-relaxed opacity-80">Partnering with over 10+ dealers across Tamil Nadu. Access premium margins, high-converting marketing collateral, and priority shipping. Partner with Coimbatore's most trusted vermicelli brand — established in 1982.</p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/contact-us" className="bg-secondary hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg text-center">
              Bulk Enquiry
            </Link>
            <a href="https://wa.me/919677707416" target="_blank" rel="noreferrer" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
              <FiMessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BulkOrderCTA;
