import React from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiEye, FiTarget, FiClock, FiUsers, FiHeart, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const OurCompany = () => {
  return (
    <div className="w-full bg-white font-sans">
      
      {/* Hero Banner */}
      <section className="relative bg-slate-900 py-32 lg:py-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="page-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="30" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#page-pattern)"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-primary border border-white/10 font-black text-[10px] tracking-[0.3em] uppercase mb-6">
            Since 1982
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6">
            Our Story
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
            From a humble carpet area in Coimbatore to becoming South India's trusted vermicelli brand
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-secondary/20 via-primary/10 to-transparent rounded-[4rem] blur-2xl opacity-60"></div>
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                <div className="aspect-[4/5] bg-gradient-to-br from-secondary to-red-800 flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="about-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                          <circle cx="30" cy="30" r="20" fill="none" stroke="white" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#about-pattern)"/>
                    </svg>
                  </div>
                  <div className="text-center z-10 p-12">
                    <div className="w-36 h-36 mx-auto mb-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-xl">
                      <FiAward className="text-white" size={64} />
                    </div>
                    <h3 className="text-white text-4xl font-black mb-2">K. Chandran</h3>
                    <p className="text-white/70 text-sm font-bold uppercase tracking-widest">Founder & Visionary</p>
                    <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20">
                      <span className="text-primary font-black text-xl">1982</span>
                      <span className="text-white/60 text-xs">EST.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block py-1.5 px-4 rounded-full bg-red-50 border border-red-100 text-secondary font-black text-[10px] tracking-[0.3em] uppercase shadow-sm">
                  Our Founder
                </span>
                <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95]">
                  K. Chandran
                </h2>
                <p className="text-primary font-black text-sm uppercase tracking-[0.2em]">
                  Founder, Sangu Brand Semiya
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                  Sangu Brand Semiya is a renowned company that has been offering delectable and authentic traditional foods to its customers for over <span className="text-secondary font-black">three decades</span>, and its success is largely attributable to its founder.
                </p>
                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                  Mr. K Chandran's entrepreneurial journey began in <span className="text-secondary font-black">1982</span> with a modest production of plain vermicelli in a small carpet area. In those days, vermicelli was not easily obtainable in the market, but Mr. K Chandran's unconventional product offerings, combined with <span className="text-secondary font-black">superior quality and taste</span> and innovative marketing strategies, enabled him to seize the Coimbatore market.
                </p>
                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                  Today, Sangu Brand Semiya stands as a testament to one man's vision of bringing quality traditional food to every Indian household. The legacy continues with the same passion for excellence that started over four decades ago.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-[3rem] p-12 lg:p-16 border border-slate-100 shadow-lg hover:shadow-2xl transition-shadow duration-500">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-red-700 rounded-3xl flex items-center justify-center text-white mb-10 shadow-xl">
                <FiEye size={36} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-6">Our Vision</h3>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                To be the leading provider of food products, empowering tradition through quality. We envision a future where every Indian household enjoys the authentic taste of traditional foods without compromising on nutritional value.
              </p>
            </div>
            <div className="bg-white rounded-[3rem] p-12 lg:p-16 border border-slate-100 shadow-lg hover:shadow-2xl transition-shadow duration-500">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-yellow-600 rounded-3xl flex items-center justify-center text-white mb-10 shadow-xl">
                <FiTarget size={36} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-6">Our Mission</h3>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                To manufacture and deliver the highest quality vermicelli and traditional food products, keeping alive the family tradition of authentic flavors, while expanding our reach through trusted dealer partnerships across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-24 lg:py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">Key Milestones</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FiClock size={32} />, title: '40+ Years', desc: 'Experience and expertise in the food industry', color: 'from-secondary to-red-700' },
              { icon: <FiUsers size={32} />, title: '10+ Dealers', desc: 'Partnering with dealers to bring our products to customers', color: 'from-primary to-yellow-600' },
              { icon: <FiHeart size={32} />, title: 'Family Tradition', desc: 'Preserving the family tradition of authentic foods', color: 'from-emerald-500 to-emerald-700' },
              { icon: <FiAward size={32} />, title: 'Quality First', desc: 'Unwavering commitment to superior quality and taste', color: 'from-violet-500 to-violet-700' },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-10 text-center hover:bg-white/10 transition-all duration-700 hover:-translate-y-2 group">
                <div className={`w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 transition-all duration-500`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <span className="inline-block py-1.5 px-4 rounded-full bg-red-50 border border-red-100 text-secondary font-black text-[10px] tracking-[0.3em] uppercase">
              What Drives Us
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Authenticity', desc: 'Every product is rooted in traditional recipes and methods passed down through generations.', icon: '🌾' },
              { title: 'Quality', desc: 'We never compromise on the quality of our ingredients or our manufacturing processes.', icon: '⭐' },
              { title: 'Innovation', desc: 'While respecting tradition, we continually innovate with new healthy variants like Ragi and Kambu vermicelli.', icon: '💡' },
            ].map((value, i) => (
              <div key={i} className="bg-slate-50 rounded-[3rem] p-12 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group text-center">
                <div className="text-5xl mb-8 transform group-hover:scale-110 transition-transform duration-500">{value.icon}</div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">Partner With Us</h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Join our growing network of dealers and distributors. Experience the Sangu Brand difference.
          </p>
          <div className="flex flex-wrap gap-5 justify-center">
            <Link to="/bulk-order" className="bg-secondary hover:bg-red-700 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 shadow-xl inline-flex items-center gap-3 group">
              Contact Us <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <Link to="/products" className="bg-white border-2 border-slate-200 text-slate-900 hover:border-secondary hover:text-secondary px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500">
              View Products
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default OurCompany;
