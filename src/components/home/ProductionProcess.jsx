import React from 'react';

const ProductionProcess = ({ steps }) => (
  <section className="py-32 bg-slate-900 overflow-hidden relative">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
      <div className="mb-16 space-y-4">
        <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-secondary border border-white/10 font-black text-[10px] tracking-[0.3em] uppercase shadow-sm">
          Behind the Strands
        </span>
        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
          Our Production Process
        </h2>
      </div>
      
      <div className="relative mt-20">
        <div className="hidden lg:block absolute top-[60px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          {steps.map((step, i) => (
            <div key={i} className="space-y-6 text-center lg:text-left group">
              <div className="w-28 h-28 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/10 flex items-center justify-center text-4xl shadow-2xl mx-auto lg:mx-0 transform group-hover:bg-primary group-hover:-translate-y-4 transition-all duration-700">
                {step.icon}
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="w-10 h-[2px] bg-primary rounded-full"></span>
                  <h3 className="text-2xl font-black text-white italic">Step 0{i+1}</h3>
                </div>
                <p className="text-white font-black text-xl">{step.title}</p>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProductionProcess;
