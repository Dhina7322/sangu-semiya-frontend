import React from 'react';
import { FiEye, FiClock, FiUsers, FiHeart } from 'react-icons/fi';

const milestones = [
  {
    icon: <FiEye size={20} />,
    title: 'Vision & Mission',
    description: 'Leading provider of food products, empowering tradition through quality',
    accent: 'from-secondary to-red-700',
  },
  {
    icon: <FiClock size={20} />,
    title: '40+ Years',
    description: 'Experience and expertise in the food industry for over 40 years',
    accent: 'from-primary to-yellow-600',
  },
  {
    icon: <FiUsers size={20} />,
    title: '10+ Dealers',
    description: 'Partnering with over 10 dealers to bring our products to customers',
    accent: 'from-emerald-500 to-emerald-700',
  },
  {
    icon: <FiHeart size={20} />,
    title: 'Family Tradition',
    description: 'Family tradition of authentic traditional foods',
    accent: 'from-violet-500 to-violet-700',
  },
];

const MilestoneSection = () => (
  <section className="py-20 lg:py-24 bg-slate-900 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-[100px]"></div>
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]"></div>
    
    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16 space-y-2">
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 text-primary border border-white/5 font-medium text-[8px] tracking-widest uppercase mb-1">
          Our Journey
        </span>
        <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
          Milestones
        </h2>
        <p className="text-slate-400 text-xs font-normal max-w-lg mx-auto opacity-70">
          From a humble beginning in 1982 to becoming Coimbatore's trusted vermicelli brand.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {milestones.map((item, i) => (
          <div
            key={i}
            className="group bg-white/5 backdrop-blur-sm border border-white/5 rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-300"
          >
            <div className={`w-12 h-12 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.accent} flex items-center justify-center text-white shadow-lg transition-transform duration-300`}>
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 leading-tight uppercase tracking-tight">
              {item.title}
            </h3>
            <p className="text-slate-400 text-xs font-normal leading-relaxed opacity-60">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MilestoneSection;
