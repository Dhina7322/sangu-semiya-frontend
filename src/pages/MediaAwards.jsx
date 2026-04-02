import React from 'react';
import { FiAward, FiStar, FiTv, FiFileText } from 'react-icons/fi';

const MediaAwards = () => {
  return (
    <div className="w-full bg-white font-sans">

      {/* Hero Banner */}
      <section className="relative bg-slate-900 py-32 lg:py-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-primary border border-white/10 font-black text-[10px] tracking-[0.3em] uppercase mb-6">
            Recognition
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6">
            Media & Awards
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
            Our journey of excellence recognized by industry leaders and media
          </p>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <span className="inline-block py-1.5 px-4 rounded-full bg-red-50 border border-red-100 text-secondary font-black text-[10px] tracking-[0.3em] uppercase">
              Achievements
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">Awards & Recognition</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FiAward size={36} />,
                title: 'Quality Excellence Award',
                description: 'Recognized for maintaining the highest standards in food manufacturing and quality control.',
                year: '40+ Years of Trust',
                color: 'from-secondary to-red-700',
              },
              {
                icon: <FiStar size={36} />,
                title: 'Best Traditional Food Brand',
                description: 'Honored as one of the best traditional food brands in the Coimbatore region.',
                year: 'Regional Recognition',
                color: 'from-primary to-yellow-600',
              },
              {
                icon: <FiTv size={36} />,
                title: 'Media Coverage',
                description: 'Featured in various regional media for our contribution to the traditional food industry.',
                year: 'Press & Media',
                color: 'from-emerald-500 to-emerald-700',
              },
            ].map((award, i) => (
              <div key={i} className="bg-slate-50 rounded-[3rem] p-12 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group text-center">
                <div className={`w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br ${award.color} flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  {award.icon}
                </div>
                <span className="inline-block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 bg-slate-100 px-4 py-1.5 rounded-full">{award.year}</span>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{award.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{award.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Highlight */}
      <section className="py-24 lg:py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-primary to-yellow-600 flex items-center justify-center shadow-2xl">
              <FiFileText className="text-white" size={40} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic">
              "Empowering tradition through quality food products since 1982"
            </h2>
            <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
              From a modest production unit in Coimbatore to a brand trusted across Tamil Nadu, Sangu Brand Semiya continues to uphold the legacy of Mr. K Chandran with every strand of vermicelli we produce.
            </p>
            <div className="flex flex-wrap gap-8 justify-center pt-4">
              {[
                { num: '40+', label: 'Years' },
                { num: '10+', label: 'Dealers' },
                { num: '7', label: 'Products' },
                { num: '1000s', label: 'Happy Families' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-4xl font-black text-primary">{stat.num}</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default MediaAwards;
