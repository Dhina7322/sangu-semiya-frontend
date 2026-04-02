import React from 'react';
import { FiClock, FiActivity, FiZap, FiBox, FiShield } from 'react-icons/fi';

const WhyChooseUs = ({ data }) => (
  <section className="py-20 lg:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="mb-14 space-y-3">
        <span className="inline-block py-1 px-3 rounded-full bg-red-50 border border-red-100 text-primary font-bold text-[9px] tracking-widest uppercase mb-1">
          The Sangu Edge
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
          Why Families Trust Us
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        {data.map((card, i) => (
          <div key={i} className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500 group flex flex-col items-start text-left">
            <div className="w-12 h-12 mb-6 transform group-hover:scale-105 transition-all duration-300 bg-white rounded-xl flex items-center justify-center text-primary text-xl shadow-sm border border-slate-100">
               {i === 0 && <FiClock />}
               {i === 1 && <FiActivity />}
               {i === 2 && <FiZap />}
               {i === 3 && <FiBox />}
               {i === 4 && <FiShield />}
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2 leading-tight">{card.title}</h3>
            <p className="text-slate-500 text-xs font-normal leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
