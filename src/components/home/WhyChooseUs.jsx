import React from 'react';

const WhyChooseUs = ({ data }) => (
  <section className="py-24 lg:py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="mb-16 space-y-4">
        <span className="inline-block py-1.5 px-4 rounded-full bg-red-50 border border-red-100 text-primary font-black text-[10px] tracking-[0.3em] uppercase shadow-sm">
          The Sangu Edge
        </span>
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">
          Why Families Trust Us
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data.map((card, i) => (
          <div key={i} className="bg-[#f8fafc] p-10 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-700 group flex flex-col items-start text-left">
            <div className="w-16 h-16 mb-8 transform group-hover:scale-110 transition-transform duration-500">
               <img src={card.icon} alt={card.title} className="w-full h-full object-contain" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 leading-tight">{card.title}</h3>
            <p className="text-slate-500 text-[13px] font-medium leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
