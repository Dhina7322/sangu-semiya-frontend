import React from 'react';
import { Link } from 'react-router-dom';

const BulkOrderCTA = () => (
  <section className="py-32 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-30 lg:opacity-60 grayscale-[100%] hover:grayscale-0 transition-all duration-1000 hidden lg:block">
          <img src="/Users/admin/.gemini/antigravity/brain/100e1836-2f0f-404b-95ff-defb443c54bb/recipe_upma_1774948967187.png" className="w-full h-full object-cover" alt="Distributor Support" />
        </div>
        
        <div className="relative z-10 max-w-2xl space-y-10">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-xs px-5 py-2 bg-white/5 border border-white/10 rounded-full inline-block">Grow with Sangu</span>
          <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-none">Distributor & Wholesale Partnership</h2>
          <p className="text-xl text-slate-400 font-medium leading-relaxed tracking-tight">Access premium margins, high-converting marketing collateral, and priority nationwide shipping. Partner with South India's fastest-growing vermicelli brand today.</p>
          
          <div className="flex flex-wrap gap-6 pt-4">
            <Link to="/bulk-order" className="bg-primary hover:bg-red-700 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 shadow-xl shadow-red-900/10 active:scale-95 text-center">
              Bulk Enquiry
            </Link>
            <a href="https://wa.me/911234567890" target="_blank" rel="noreferrer" className="bg-emerald-500 hover:bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 shadow-xl shadow-emerald-900/10 flex items-center justify-center gap-3 active:scale-95">
               <span className="text-xl">💬</span> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BulkOrderCTA;
