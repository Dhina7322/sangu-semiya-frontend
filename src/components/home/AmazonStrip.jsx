import React from 'react';

const AmazonStrip = () => (
  <section className="bg-primary py-12 lg:py-16 overflow-hidden relative group">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
      <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tight underline decoration-white/20 underline-offset-8">
        Buy our products easily on Amazon
      </h2>
      <a href="https://amazon.in" target="_blank" rel="noreferrer" className="bg-white text-primary hover:bg-slate-900 hover:text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 shadow-xl overflow-hidden relative group shrink-0">
        <span className="relative z-10">Shop on Amazon</span>
        <div className="absolute inset-0 bg-slate-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0"></div>
      </a>
    </div>
  </section>
);

export default AmazonStrip;
