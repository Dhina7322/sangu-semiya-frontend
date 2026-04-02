import React from 'react';
import { FiEye, FiClock, FiUsers, FiHeart } from 'react-icons/fi';

const milestones = [
  {
    icon: <FiEye size={32} />,
    title: 'Vision & Mission',
    description: 'Leading provider of food products, empowering tradition through quality',
    accent: 'from-secondary to-red-700',
  },
  {
    icon: <FiClock size={32} />,
    title: '40+ Years',
    description: 'Experience and expertise in the food industry for over 40 years',
    accent: 'from-primary to-yellow-600',
  },
  {
    icon: <FiUsers size={32} />,
    title: '10+ Dealers',
    description: 'Partnering with over 10 dealers to bring our products to customers',
    accent: 'from-emerald-500 to-emerald-700',
  },
  {
    icon: <FiHeart size={32} />,
    title: 'Family Tradition',
    description: 'Family tradition of authentic traditional foods',
    accent: 'from-violet-500 to-violet-700',
  },
];

const MilestoneSection = () => (
  <section className="py-24 lg:py-32 bg-slate-900 relative overflow-hidden">
    {/* Background decorative elements */}
    <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
    
    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
      <div className="text-center mb-20 space-y-4">
        <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-primary border border-white/10 font-black text-[10px] tracking-[0.3em] uppercase shadow-sm">
          Our Journey
        </span>
        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
          Milestones
        </h2>
        <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto">
          From a humble beginning in 1982 to becoming Coimbatore's trusted vermicelli brand
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {milestones.map((item, i) => (
          <div
            key={i}
            className="relative group bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-10 text-center hover:bg-white/10 transition-all duration-700 hover:-translate-y-2"
          >
            {/* Icon */}
            <div className={`w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br ${item.accent} flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
              {item.icon}
            </div>
            
            {/* Content */}
            <h3 className="text-2xl font-black text-white mb-4 leading-tight">
              {item.title}
            </h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              {item.description}
            </p>

            {/* Hover glow */}
            <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MilestoneSection;
