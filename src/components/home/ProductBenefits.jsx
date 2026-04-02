import React from 'react';

const ProductBenefits = ({ benefits }) => (
  <section className="py-40 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {benefits.map((benefit, i) => (
          <div key={i} className={`p-12 rounded-[3.5rem] border transition-all duration-700 ${i === 1 ? 'bg-primary border-primary shadow-2xl shadow-red-200' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-xl'}`}>
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-10 shadow-inner ${i === 1 ? 'bg-white/20' : 'bg-white shadow-xl'}`}>
              {benefit.icon}
            </div>
            <h3 className={`text-3xl font-black mb-6 ${i === 1 ? 'text-white' : 'text-slate-900'}`}>{benefit.title}</h3>
            <p className={`text-lg font-medium leading-relaxed mb-8 ${i === 1 ? 'text-white/80' : 'text-slate-500'}`}>{benefit.desc}</p>
            <ul className="space-y-4">
              {benefit.items.map((item, j) => (
                <li key={j} className="flex items-center gap-4">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${i === 1 ? 'bg-white text-primary' : 'bg-primary text-white'}`}>✓</span>
                  <span className={`font-black text-sm uppercase tracking-widest ${i === 1 ? 'text-white' : 'text-slate-700'}`}>{item}</span>
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
