import React from 'react';
import { FiClock, FiActivity, FiZap, FiBox, FiShield } from 'react-icons/fi';

const fallbackIcons = [<FiClock />, <FiActivity />, <FiZap />, <FiBox />, <FiShield />];

const WhyChooseUs = ({ data }) => (
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="mb-12 space-y-2">
      <span className="inline-block py-1 px-3 rounded-full bg-red-50 border border-red-100 text-primary font-medium text-[8px] tracking-widest uppercase mb-1">
        The Sangu Edge
      </span>
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
        Why Families Trust Us
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
      {data.map((card, i) => (
        <div key={i} className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500 group flex flex-col items-start text-left">
          <div className="w-12 h-12 mb-6 transform group-hover:scale-105 transition-all duration-300 bg-white rounded-xl flex items-center justify-center text-primary text-xl shadow-sm border border-slate-100 overflow-hidden">
             {card.icon?.startsWith('http') || card.icon?.startsWith('data:') ? (
               <img src={card.icon} alt={card.title} className="w-full h-full object-contain p-2" />
             ) : (
               fallbackIcons[i % fallbackIcons.length]
             )}
          </div>
          <h3 className="text-xs font-semibold text-slate-900 mb-2 leading-tight uppercase tracking-tight">{card.title}</h3>
          <p className="text-slate-400 text-[11px] font-normal leading-relaxed opacity-80">{card.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default WhyChooseUs;
