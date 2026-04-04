import React from 'react';

const ProductionProcess = ({ steps }) => (
  <section className="py-14 lg:py-20 bg-slate-900 overflow-hidden relative">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
      <div className="space-y-3">
        <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-secondary border border-white/10 font-bold text-[9px] tracking-widest uppercase mb-1">
          Production Excellence
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          How We Make It
        </h2>
      </div>

      <div className="relative pt-12">
        <div className="hidden lg:block absolute top-[44px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          {steps.map((step, i) => (
            <div key={i} className={`space-y-6 text-center lg:text-left group reveal reveal-up delay-${(i + 1) * 100}`}>
              <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center justify-center text-2xl shadow-xl mx-auto lg:mx-0 transform-gpu group-hover:bg-primary group-hover:-translate-y-2 transition-all duration-500 text-white overflow-hidden relative">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 justify-center lg:justify-start opacity-60">
                  <span className="w-8 h-[1px] bg-primary"></span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Phase 0{i + 1}</h3>
                </div>
                <p className="text-white font-bold text-base">{step.title}</p>
                <p className="text-slate-400 font-normal text-[13px] leading-relaxed max-w-[200px] mx-auto lg:mx-0">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProductionProcess;
