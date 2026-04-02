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
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="inline-block py-1.5 px-4 rounded-full bg-red-50 border border-red-100 text-primary font-black text-[10px] tracking-[0.3em] uppercase">Partnership Trust</span>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">Built for Business</h2>
            </div>
            
          <div className="space-y-8">
            {trustCards.map((card, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-4xl shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                  {i === 0 && <FiTrendingUp size={32} />}
                  {i === 1 && <FiSmile size={32} />}
                  {i === 2 && <FiTarget size={32} />}
                </div>
                <div className="space-y-2">
                   <h3 className="text-2xl font-black text-slate-900 leading-none">{card.title}</h3>
                   <p className="text-slate-500 font-medium text-lg leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
          </div>

          <div className="bg-slate-50 p-12 lg:p-20 rounded-[4rem] border border-slate-100 shadow-2xl relative">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary rounded-full flex items-center justify-center text-3xl shadow-2xl text-white font-black animate-bounce rotate-12"><FiZap /></div>
            <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight leading-none italic">Instant Enquiry</h3>
            <p className="text-slate-500 font-medium mb-10 text-lg">Quick response guaranteed within 2 hours.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Your Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white border-2 border-white focus:border-primary rounded-2xl p-5 font-bold text-slate-900 shadow-sm transition-all" 
                  placeholder="Enter name"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full bg-white border-2 border-white focus:border-primary rounded-2xl p-5 font-bold text-slate-900 shadow-sm transition-all" 
                    placeholder="+91..."
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Quantity (KG)</label>
                  <input 
                    type="number" 
                    className="w-full bg-white border-2 border-white focus:border-primary rounded-2xl p-5 font-bold text-slate-900 shadow-sm transition-all" 
                    placeholder="e.g. 500"
                    value={form.quantity}
                    onChange={(e) => setForm({...form, quantity: e.target.value})}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-slate-900 hover:bg-primary text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all duration-500 transform active:scale-95">
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
