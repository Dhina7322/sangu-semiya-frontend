import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const products = [
  { name: 'Roasted Vermicelli', sizes: '180g | 450g', color: 'from-amber-50 to-orange-50', border: 'border-amber-100', emoji: '🌾' },
  { name: 'Veg Noodles', sizes: '180g', color: 'from-green-50 to-emerald-50', border: 'border-green-100', emoji: '🥬' },
  { name: 'Ragi Vermicelli', sizes: '180g | 450g', color: 'from-rose-50 to-red-50', border: 'border-rose-100', emoji: '🫘' },
  { name: 'Kambu Vermicelli', sizes: '180g', color: 'from-yellow-50 to-amber-50', border: 'border-yellow-100', emoji: '🌿' },
  { name: 'Wheat Vermicelli', sizes: '180g', color: 'from-orange-50 to-yellow-50', border: 'border-orange-100', emoji: '🌾' },
  { name: 'Chinese Noodles', sizes: '200g | 1Kg', color: 'from-sky-50 to-blue-50', border: 'border-sky-100', emoji: '🍜' },
  { name: 'Samba Wheat Broken', sizes: '250g | 500g', color: 'from-stone-50 to-amber-50', border: 'border-stone-200', emoji: '🥣' },
];

const ProductRange = () => (
  <section className="py-24 lg:py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl">
          <span className="text-secondary font-black text-[10px] tracking-[0.3em] uppercase mb-4 block">
            Complete Collection
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">
            Our Product Range
          </h2>
        </div>
        <Link
          to="/products"
          className="group flex items-center gap-4 text-slate-900 font-black uppercase text-xs tracking-widest pb-2 border-b-2 border-slate-900 hover:text-secondary hover:border-secondary transition-all duration-300"
        >
          View All Products
          <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <Link
            key={i}
            to={`/product/${product.name}`}
            className={`group bg-gradient-to-br ${product.color} ${product.border} border rounded-[2.5rem] p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden`}
          >
            {/* Decorative circle */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/40 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
            
            {/* Emoji icon */}
            <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 relative z-10">
              {product.emoji}
            </div>
            
            {/* Name */}
            <h3 className="text-base font-black text-slate-900 mb-2 leading-tight group-hover:text-secondary transition-colors duration-300 relative z-10">
              {product.name}
            </h3>
            
            {/* Sizes */}
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-white/70 px-4 py-1.5 rounded-full relative z-10">
              {product.sizes}
            </p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ProductRange;
