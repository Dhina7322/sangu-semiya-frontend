import React, { useState } from 'react';
import axios from 'axios';
import { FiMapPin, FiPhone, FiMail, FiMessageCircle, FiSend, FiClock, FiCheckCircle } from 'react-icons/fi';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', product: '', quantity: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/enquiry', form);
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', product: '', quantity: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Enquiry submission error:', err);
      alert('Something went wrong. Please try again or call us directly.');
    }
  };

  return (
    <div className="w-full bg-white font-sans">

      {/* Hero Banner */}
      <section className="relative bg-slate-900 py-32 lg:py-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-primary border border-white/10 font-black text-[10px] tracking-[0.3em] uppercase mb-6">
            Get In Touch
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
            Ready to partner with us? Have questions about our products? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {[
              {
                icon: <FiMapPin size={28} />,
                title: 'Visit Us',
                lines: ['344 / 3, Periyannan Nagar,', 'Thadagam Road, Tvs Nagar,', 'Coimbatore - 641 025'],
                color: 'from-secondary to-red-700',
              },
              {
                icon: <FiPhone size={28} />,
                title: 'Call Us',
                lines: ['0422 239 5630', '96777 07416', '94436 55877'],
                links: ['tel:04222395630', 'tel:+919677707416', 'tel:+919443655877'],
                color: 'from-primary to-yellow-600',
              },
              {
                icon: <FiMail size={28} />,
                title: 'Email Us',
                lines: ['info@sangubrandsemiya.com', 'info.sangubrandsemiya@gmail.com'],
                links: ['mailto:info@sangubrandsemiya.com', 'mailto:info.sangubrandsemiya@gmail.com'],
                color: 'from-emerald-500 to-emerald-700',
              },
              {
                icon: <FiClock size={28} />,
                title: 'Business Hours',
                lines: ['Monday – Saturday', '9:00 AM – 6:00 PM', 'Sunday – Closed'],
                color: 'from-violet-500 to-violet-700',
              },
            ].map((card, i) => (
              <div key={i} className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group text-center">
                <div className={`w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-all duration-500`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">{card.title}</h3>
                <div className="space-y-1.5">
                  {card.lines.map((line, j) => (
                    card.links ? (
                      <a key={j} href={card.links[j]} className="block text-sm text-slate-500 font-medium hover:text-secondary transition-colors">
                        {line}
                      </a>
                    ) : (
                      <p key={j} className="text-sm text-slate-500 font-medium">{line}</p>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form + WhatsApp */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            
            {/* Form - takes 3 columns */}
            <div className="lg:col-span-3 bg-slate-50 rounded-[3rem] p-10 lg:p-16 border border-slate-100 shadow-xl">
              <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Send Us a Message</h2>
              <p className="text-slate-500 font-medium mb-10 text-lg">Quick response guaranteed within 2 hours.</p>

              {submitted && (
                <div className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-4">
                  <FiCheckCircle className="text-emerald-600 shrink-0" size={24} />
                  <p className="text-emerald-800 font-bold">Thank you! Your enquiry has been received. We'll get back to you shortly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Your Name *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                      className="w-full bg-white border-2 border-slate-100 focus:border-secondary rounded-2xl p-5 font-bold text-slate-900 shadow-sm transition-all outline-none"
                      placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Email Address</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
                      className="w-full bg-white border-2 border-slate-100 focus:border-secondary rounded-2xl p-5 font-bold text-slate-900 shadow-sm transition-all outline-none"
                      placeholder="your@email.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Phone Number *</label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                      className="w-full bg-white border-2 border-slate-100 focus:border-secondary rounded-2xl p-5 font-bold text-slate-900 shadow-sm transition-all outline-none"
                      placeholder="+91..." />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Product Interest</label>
                    <select value={form.product} onChange={(e) => setForm({...form, product: e.target.value})}
                      className="w-full bg-white border-2 border-slate-100 focus:border-secondary rounded-2xl p-5 font-bold text-slate-900 shadow-sm transition-all outline-none">
                      <option value="">Select a product</option>
                      <option value="Roasted Vermicelli">Roasted Vermicelli</option>
                      <option value="Ragi Vermicelli">Ragi Vermicelli</option>
                      <option value="Kambu Vermicelli">Kambu Vermicelli</option>
                      <option value="Wheat Vermicelli">Wheat Vermicelli</option>
                      <option value="Veg Noodles">Veg Noodles</option>
                      <option value="Chinese Noodles">Chinese Noodles</option>
                      <option value="Samba Wheat Broken">Samba Wheat Broken</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Quantity (KG)</label>
                  <input type="text" value={form.quantity} onChange={(e) => setForm({...form, quantity: e.target.value})}
                    className="w-full bg-white border-2 border-slate-100 focus:border-secondary rounded-2xl p-5 font-bold text-slate-900 shadow-sm transition-all outline-none"
                    placeholder="e.g. 500 KG" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Your Message</label>
                  <textarea rows="4" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})}
                    className="w-full bg-white border-2 border-slate-100 focus:border-secondary rounded-2xl p-5 font-bold text-slate-900 shadow-sm transition-all outline-none resize-none"
                    placeholder="Tell us about your requirements..." />
                </div>
                <button type="submit" className="w-full bg-secondary hover:bg-red-700 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all duration-500 transform active:scale-95 flex items-center justify-center gap-3">
                  <FiSend size={18} /> Submit Enquiry
                </button>
              </form>
            </div>

            {/* Side Info - takes 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              {/* WhatsApp CTA */}
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-[2.5rem] p-10 text-white text-center shadow-2xl">
                <FiMessageCircle size={48} className="mx-auto mb-6" />
                <h3 className="text-2xl font-black mb-4">Chat on WhatsApp</h3>
                <p className="text-emerald-100 font-medium mb-8">Get instant responses on WhatsApp for quick enquiries</p>
                <a href="https://wa.me/919677707416" target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-white text-emerald-700 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-50 transition-all duration-300 shadow-lg">
                  WhatsApp Us
                </a>
              </div>

              {/* GSTIN Info */}
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-center shadow-xl">
                <h3 className="text-xl font-black text-white mb-4">Business Details</h3>
                <div className="space-y-3 text-slate-400">
                  <p className="text-sm font-bold uppercase tracking-wider">Sangu Brand Semiya™</p>
                  <p className="text-primary font-black">GSTIN: 33ABKPC7067J1ZK</p>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-slate-100 rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.123!2d76.94!3d11.02!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzEyLjAiTiA3NsKwNTYnMjQuMCJF!5e0!3m2!1sen!2sin!4v1616161616161!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sangu Brand Semiya Location"
                  className="rounded-[2.5rem]"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactUs;
