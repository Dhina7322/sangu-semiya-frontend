import React from 'react';
import { FiCheck } from 'react-icons/fi';

const ProductBenefits = ({ benefits }) => (
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      {benefits.map((benefit, i) => (
        <div key={i} className={`p-10 rounded-[3rem] border transition-all duration-500 reveal reveal-up delay-${(i + 1) * 100} ${i === 1 ? 'bg-primary border-primary shadow-xl shadow-red-50' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-lg'}`}>
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm overflow-hidden ${i === 1 ? 'bg-white/10 border border-white/10' : 'bg-white border border-slate-100'}`}>
            <img src={benefit.image} alt={benefit.title} className="w-full h-full object-cover" />
          </div>
          <h3 className={`text-lg font-semibold mb-3 tracking-tight ${i === 1 ? 'text-white' : 'text-slate-900'}`}>{benefit.title}</h3>
          <p className={`text-xs font-normal leading-relaxed mb-6 opacity-80 ${i === 1 ? 'text-white/80' : 'text-slate-500'}`}>{benefit.desc}</p>
          <ul className="space-y-3">
            {benefit.items.map((item, j) => (
              <li key={j} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-md flex items-center justify-center text-[8px] font-bold shadow-sm ${i === 1 ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                  <FiCheck />
                </div>
                <span className={`font-semibold text-[10px] uppercase tracking-widest ${i === 1 ? 'text-white' : 'text-slate-700'}`}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

export default ProductBenefits;
