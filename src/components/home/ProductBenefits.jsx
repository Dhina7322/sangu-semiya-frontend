import React from 'react';
import { FiWind, FiHeart, FiCoffee, FiCheck } from 'react-icons/fi';

const ProductBenefits = ({ benefits }) => (
  <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, i) => (
          <div key={i} className={`p-10 rounded-[3rem] border transition-all duration-500 ${i === 1 ? 'bg-primary border-primary shadow-xl shadow-red-100' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-lg'}`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-8 ${i === 1 ? 'bg-white/20 text-white' : 'bg-white shadow-md text-primary'}`}>
              {i === 0 && <FiWind />}
              {i === 1 && <FiHeart />}
              {i === 2 && <FiCoffee />}
            </div>
            <h3 className={`text-xl font-bold mb-4 ${i === 1 ? 'text-white' : 'text-slate-900'}`}>{benefit.title}</h3>
            <p className={`text-base font-normal leading-relaxed mb-6 ${i === 1 ? 'text-white/80' : 'text-slate-500'}`}>{benefit.desc}</p>
            <ul className="space-y-3">
              {benefit.items.map((item, j) => (
                <li key={j} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${i === 1 ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                    <FiCheck />
                  </div>
                  <span className={`font-bold text-xs uppercase tracking-widest ${i === 1 ? 'text-white' : 'text-slate-700'}`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductBenefits;
