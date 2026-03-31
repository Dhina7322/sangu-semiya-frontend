import { useState, useEffect } from 'react';
import axios from 'axios';

const CMSManager = () => {
  const [formData, setFormData] = useState({
    heroBanner: { message: '', subMessage: '' },
    contactDetails: { phone: '', email: '', address: '' },
    aboutText: ''
  });
  const [loading, setLoading] = useState(true);

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });

  const loadCMS = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5001/api/homepage');
      if (res.data) setFormData(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => { loadCMS(); }, []);

  const handleChange = (section, field, value) => {
    if (section === 'root') {
      setFormData({ ...formData, [field]: value });
    } else {
      setFormData({ 
        ...formData, 
        [section]: { ...formData[section], [field]: value } 
      });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://127.0.0.1:5001/api/homepage', formData, getAuthHeader());
      alert('Content updated successfully!');
    } catch (err) {
      console.error('Failed to update CMS', err);
    }
  };

  if (loading) return <div className="text-xs font-bold text-slate-400 animate-pulse">Warming up CMS...</div>;

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 overflow-hidden">
      <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-3">
        <h2 className="text-sm font-black uppercase text-slate-400">Appearance Tuning</h2>
        <button onClick={handleSave} className="bg-primary text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-lg active:scale-95 transition-all shadow-sm shadow-red-200">Deploy Changes</button>
      </div>
      
      <form onSubmit={handleSave} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner Section */}
          <section className="space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase flex items-center">
              <span className="w-1 h-3 bg-secondary rounded-full mr-2"></span> Top Banner
            </h3>
            <div className="space-y-2">
               <div>
                 <label className="text-[10px] text-slate-400 uppercase font-black">Headline</label>
                 <input type="text" value={formData.heroBanner?.message || ''} onChange={(e) => handleChange('heroBanner', 'message', e.target.value)} className="w-full text-xs border border-slate-200 rounded p-1.5 outline-none focus:border-primary" />
               </div>
               <div>
                 <label className="text-[10px] text-slate-400 uppercase font-black">Subtext</label>
                 <textarea rows="2" value={formData.heroBanner?.subMessage || ''} onChange={(e) => handleChange('heroBanner', 'subMessage', e.target.value)} className="w-full text-xs border border-slate-200 rounded p-1.5 outline-none focus:border-primary" />
               </div>
            </div>
          </section>

          {/* Contact Details */}
          <section className="space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase flex items-center">
              <span className="w-1 h-3 bg-secondary rounded-full mr-2"></span> Public Contacts
            </h3>
            <div className="grid grid-cols-2 gap-2">
               <div className="col-span-1">
                 <label className="text-[10px] text-slate-400 uppercase font-black">Support Email</label>
                 <input type="email" value={formData.contactDetails?.email || ''} onChange={(e) => handleChange('contactDetails', 'email', e.target.value)} className="w-full text-xs border border-slate-200 rounded p-1.5" />
               </div>
               <div className="col-span-1">
                 <label className="text-[10px] text-slate-400 uppercase font-black">Support Phone</label>
                 <input type="text" value={formData.contactDetails?.phone || ''} onChange={(e) => handleChange('contactDetails', 'phone', e.target.value)} className="w-full text-xs border border-slate-200 rounded p-1.5" />
               </div>
               <div className="col-span-2">
                 <label className="text-[10px] text-slate-400 uppercase font-black">Physical HQ Address</label>
                 <input type="text" value={formData.contactDetails?.address || ''} onChange={(e) => handleChange('contactDetails', 'address', e.target.value)} className="w-full text-xs border border-slate-200 rounded p-1.5" />
               </div>
            </div>
          </section>
        </div>

        {/* Brand Story */}
        <section className="space-y-3">
          <h3 className="text-xs font-black text-slate-800 uppercase flex items-center">
            <span className="w-1 h-3 bg-secondary rounded-full mr-2"></span> Our Story
          </h3>
          <textarea rows="3" value={formData.aboutText || ''} onChange={(e) => handleChange('root', 'aboutText', e.target.value)} className="w-full text-xs border border-slate-200 rounded p-1.5 outline-none focus:border-primary shadow-inner bg-slate-50/50" />
        </section>

      </form>
    </div>
  );
};

export default CMSManager;
