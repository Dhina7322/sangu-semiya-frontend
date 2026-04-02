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
      await axios.post('http://localhost:5001/api/enquiry', enquiryData);
      alert("Thank you! Enquiry received.");
      setForm({ name: '', phone: '', quantity: '' });
    } catch (err) {
      console.error("Enquiry submission error:", err);
      alert("Something went wrong. Please try again or call us.");
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="space-y-10">
            <div className="space-y-3">
              <span className="inline-block py-1 px-3 rounded-full bg-red-50 border border-red-100 text-primary font-bold text-[9px] tracking-widest uppercase">Partnership Trust</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-none">Built for Business</h2>
            </div>
            
            <div className="space-y-6">
              {trustCards.map((card, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0 border border-slate-100">
                    {i === 0 && <FiTrendingUp size={24} />}
                    {i === 1 && <FiSmile size={24} />}
                    {i === 2 && <FiTarget size={24} />}
                  </div>
                  <div className="space-y-1">
                     <h3 className="text-lg font-bold text-slate-900 leading-tight">{card.title}</h3>
                     <p className="text-slate-500 font-normal text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 p-10 lg:p-14 rounded-3xl border border-slate-100 shadow-lg relative">
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-xl shadow-xl text-white font-bold animate-bounce"><FiZap /></div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight leading-none italic">Instant Enquiry</h3>
            <p className="text-slate-500 font-normal mb-8 text-sm">Quick response guaranteed within 2 hours.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2">Your Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white border border-slate-200 focus:border-primary rounded-xl p-4 font-bold text-sm text-slate-900 shadow-sm transition-all outline-none" 
                  placeholder="Enter name"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full bg-white border border-slate-200 focus:border-primary rounded-xl p-4 font-bold text-sm text-slate-900 shadow-sm transition-all outline-none" 
                    placeholder="+91..."
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2">Quantity (KG)</label>
                  <input 
                    type="number" 
                    className="w-full bg-white border border-slate-200 focus:border-primary rounded-xl p-4 font-bold text-sm text-slate-900 shadow-sm transition-all outline-none" 
                    placeholder="e.g. 500"
                    value={form.quantity}
                    onChange={(e) => setForm({...form, quantity: e.target.value})}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-slate-900 hover:bg-primary text-white py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-xl transition-all duration-300">
                 Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnquirySection;
