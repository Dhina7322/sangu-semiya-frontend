import React, { useState } from 'react';
import axios from 'axios';
import { FiTrendingUp, FiSmile, FiTarget, FiZap } from 'react-icons/fi';

const EnquirySection = ({ trustCards }) => {
  const [form, setForm] = useState({ name: '', phone: '', quantity: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const enquiryData = {
        name: form.name,
        phone: form.phone,
        quantity: form.quantity,
        email: '',
        product: 'General Enquiry',
        message: 'Sent from Instant Enquiry form'
      };
      await axios.post('https://sangu-semiya-backend-bq1f.onrender.com/api/enquiry', enquiryData);
      alert("Thank you! Enquiry received.");
      setForm({ name: '', phone: '', quantity: '' });
    } catch (err) {
      console.error("Enquiry submission error:", err);
      alert("Something went wrong. Please try again or call us.");
    }
  };

  return (
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="space-y-10">
            <div className="space-y-2">
              <span className="inline-block py-1 px-3 rounded-full bg-red-50 border border-red-100 text-primary font-medium text-[8px] tracking-widest uppercase">Partnership Trust</span>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight leading-none">Built for Business</h2>
            </div>
            
            <div className="space-y-6">
              {trustCards.map((card, i) => (
                <div key={i} className={`flex gap-6 group reveal reveal-left delay-${(i + 1) * 100}`}>
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl shadow-sm group-hover:bg-primary transition-all duration-300 shrink-0 border border-slate-100 overflow-hidden">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="space-y-1">
                     <h3 className="text-sm font-semibold text-slate-900 leading-tight uppercase tracking-tight">{card.title}</h3>
                     <p className="text-slate-400 font-normal text-xs leading-relaxed opacity-80">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50/50 p-8 lg:p-12 rounded-3xl border border-slate-100 shadow-sm relative">
            <div className="absolute -top-4 -right-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-base shadow-lg text-white font-bold animate-bounce"><FiZap /></div>
            <h3 className="text-xl font-semibold text-slate-900 mb-1 tracking-tight leading-none italic">Instant Enquiry</h3>
            <p className="text-slate-400 font-normal mb-8 text-xs opacity-70">Quick response guaranteed within 2 hours.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="block text-[8px] uppercase font-bold tracking-widest text-slate-400 pl-1">Your Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white border border-slate-200 focus:border-primary rounded-lg p-3 font-medium text-xs text-slate-900 shadow-sm transition-all outline-none" 
                  placeholder="Enter name"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[8px] uppercase font-bold tracking-widest text-slate-400 pl-1">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full bg-white border border-slate-200 focus:border-primary rounded-lg p-3 font-medium text-xs text-slate-900 shadow-sm transition-all outline-none" 
                    placeholder="+91..."
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[8px] uppercase font-bold tracking-widest text-slate-400 pl-1">Quantity (KG)</label>
                  <input 
                    type="number" 
                    className="w-full bg-white border border-slate-200 focus:border-primary rounded-lg p-3 font-medium text-xs text-slate-900 shadow-sm transition-all outline-none" 
                    placeholder="e.g. 500"
                    value={form.quantity}
                    onChange={(e) => setForm({...form, quantity: e.target.value})}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-slate-900 hover:bg-primary text-white py-3 rounded-lg font-semibold text-[10px] uppercase tracking-widest shadow-md transition-all duration-300 mt-2">
                 Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default EnquirySection;
