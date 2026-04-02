import { useState, useEffect } from 'react';
import axios from 'axios';
import StatusPopup from './StatusPopup';


const CMSManager = () => {
  const [formData, setFormData] = useState({
    heroBanner: { message: '', subMessage: '' },
    contactDetails: { phone: '', email: '', address: '' },
    whyChooseUs: [
      { title: '', icon: '', description: '' },
      { title: '', icon: '', description: '' },
      { title: '', icon: '', description: '' },
      { title: '', icon: '', description: '' },
      { title: '', icon: '', description: '' }
    ],
    aboutText: '',
    recipes: []
  });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ isOpen: false, message: '', type: 'success' });


  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });

  const loadCMS = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/homepage');
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
      await axios.put('http://localhost:5001/api/homepage', formData, getAuthHeader());
      setStatus({ isOpen: true, message: 'Content updated successfully!', type: 'success' });
    } catch (err) {
      console.error('Failed to update CMS', err);
      setStatus({ isOpen: true, message: 'Failed to update CMS', type: 'error' });
    }
  };


  const handleRecipeChange = (index, field, value) => {
    const updatedRecipes = [...(formData.recipes || [])];
    updatedRecipes[index] = { ...updatedRecipes[index], [field]: value };
    setFormData({ ...formData, recipes: updatedRecipes });
  };

  const handleCardChange = (index, field, value) => {
    const updatedCards = [...(formData.whyChooseUs || [])];
    // Ensure we have 5 slots
    while(updatedCards.length < 5) updatedCards.push({ title: '', icon: '', description: '' });
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setFormData({ ...formData, whyChooseUs: updatedCards });
  };

  if (loading) return <div className="text-xs font-bold text-slate-400 animate-pulse">Warming up CMS...</div>;

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 space-y-10">
      <header className="flex justify-between items-center border-b border-slate-50 pb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">Appearance Tuning</h2>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-1">Manage global brand presence</p>
        </div>
        <button onClick={handleSave} className="bg-primary text-white text-[10px] font-black uppercase px-8 py-3 rounded-xl hover:scale-105 transition-all shadow-lg shadow-red-50">Deploy Changes</button>
      </header>
      
      <form onSubmit={handleSave} className="space-y-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Banner Section */}
          <section className="space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase flex items-center">
              <span className="w-1.5 h-4 bg-secondary rounded-full mr-3"></span> Hero Banner
            </h3>
            <div className="space-y-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-50">
               <div className="space-y-1.5">
                 <label className="text-[10px] text-slate-400 uppercase font-black pl-1">Headline Content</label>
                 <input type="text" value={formData.heroBanner?.message || ''} onChange={(e) => handleChange('heroBanner', 'message', e.target.value)} className="w-full text-xs font-medium border border-slate-200 rounded-xl p-3 outline-none focus:border-primary bg-white shadow-sm" />
               </div>
               <div className="space-y-1.5">
                 <label className="text-[10px] text-slate-400 uppercase font-black pl-1">Supporting Subtext</label>
                 <textarea rows="3" value={formData.heroBanner?.subMessage || ''} onChange={(e) => handleChange('heroBanner', 'subMessage', e.target.value)} className="w-full text-xs font-medium border border-slate-200 rounded-xl p-3 outline-none focus:border-primary bg-white shadow-sm resize-none" />
               </div>
            </div>
          </section>

          {/* Contact Details */}
          <section className="space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase flex items-center">
              <span className="w-1.5 h-4 bg-secondary rounded-full mr-3"></span> Public Touchpoints
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-50">
               <div className="space-y-1.5">
                 <label className="text-[10px] text-slate-400 uppercase font-black pl-1">Official Email</label>
                 <input type="email" value={formData.contactDetails?.email || ''} onChange={(e) => handleChange('contactDetails', 'email', e.target.value)} className="w-full text-xs font-medium border border-slate-200 rounded-xl p-3 bg-white" />
               </div>
               <div className="space-y-1.5">
                 <label className="text-[10px] text-slate-400 uppercase font-black pl-1">Support Phone</label>
                 <input type="text" value={formData.contactDetails?.phone || ''} onChange={(e) => handleChange('contactDetails', 'phone', e.target.value)} className="w-full text-xs font-medium border border-slate-200 rounded-xl p-3 bg-white" />
               </div>
               <div className="col-span-1 md:col-span-2 space-y-1.5">
                 <label className="text-[10px] text-slate-400 uppercase font-black pl-1">Physical Distribution HQ</label>
                 <input type="text" value={formData.contactDetails?.address || ''} onChange={(e) => handleChange('contactDetails', 'address', e.target.value)} className="w-full text-xs font-medium border border-slate-200 rounded-xl p-3 bg-white" />
               </div>
            </div>
          </section>
        </div>

        {/* Cooking Inspiration / Recipes */}
        <section className="space-y-6">
          <header className="flex justify-between items-center bg-slate-50 p-4 px-6 rounded-2xl">
            <h3 className="text-xs font-black text-slate-800 uppercase flex items-center">
              <span className="w-1.5 h-4 bg-primary rounded-full mr-3"></span> Cooking Inspiration (Recipes)
            </h3>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic">Live Preview sync enabled</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <p className="text-[10px] font-black text-primary mb-4 uppercase tracking-widest flex items-center justify-between">
                  Recipe Card #{idx+1}
                  <span className="text-slate-200">● ● ●</span>
                </p>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Recipe Title"
                    value={formData.recipes?.[idx]?.name || ''} 
                    onChange={(e) => handleRecipeChange(idx, 'name', e.target.value)}
                    className="w-full text-xs font-bold border-b border-slate-100 pb-2 outline-none focus:border-secondary"
                  />
                  <input 
                    type="text" 
                    placeholder="Cooking Time (e.g. 15 Mins)"
                    value={formData.recipes?.[idx]?.time || ''} 
                    onChange={(e) => handleRecipeChange(idx, 'time', e.target.value)}
                    className="w-full text-[10px] border-b border-slate-50 pb-2 outline-none italic"
                  />
                  <input 
                    type="text" 
                    placeholder="image choose us"
                    value={formData.recipes?.[idx]?.img || ''} 
                    onChange={(e) => handleRecipeChange(idx, 'img', e.target.value)}
                    className="w-full text-[9px] font-mono text-slate-400 bg-slate-50 p-2 rounded truncate"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="space-y-6">
          <header className="flex justify-between items-center bg-slate-50 p-4 px-6 rounded-2xl">
            <h3 className="text-xs font-black text-slate-800 uppercase flex items-center">
              <span className="w-1.5 h-4 bg-secondary rounded-full mr-3"></span> Why Families Trust Us (Cards)
            </h3>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic">3D Icon URLs supported</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[0, 1, 2, 3, 4].map((idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:border-primary/20 transition-all space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-900 px-2 py-1 bg-slate-50 rounded-lg">Card {idx+1}</span>
                  {formData.whyChooseUs?.[idx]?.icon && <img src={formData.whyChooseUs[idx].icon} className="w-6 h-6 object-contain" alt="" />}
                </div>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="image choose us"
                    value={formData.whyChooseUs?.[idx]?.icon || ''} 
                    onChange={(e) => handleCardChange(idx, 'icon', e.target.value)}
                    className="w-full text-[9px] font-mono border border-slate-100 p-2 rounded-lg bg-slate-50 focus:bg-white"
                  />
                  <input 
                    type="text" 
                    placeholder="Title"
                    value={formData.whyChooseUs?.[idx]?.title || ''} 
                    onChange={(e) => handleCardChange(idx, 'title', e.target.value)}
                    className="w-full text-[11px] font-bold border-b border-slate-100 pb-1 outline-none focus:border-primary px-1"
                  />
                  <textarea 
                    rows="3"
                    placeholder="Description..."
                    value={formData.whyChooseUs?.[idx]?.description || ''} 
                    onChange={(e) => handleCardChange(idx, 'description', e.target.value)}
                    className="w-full text-[10px] font-medium border-none p-0 outline-none italic text-slate-500 resize-none leading-tight"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Story */}
        <section className="space-y-4">
          <h3 className="text-xs font-black text-slate-800 uppercase flex items-center">
            <span className="w-1.5 h-4 bg-secondary rounded-full mr-3"></span> Brand Heritage Narrative
          </h3>
          <textarea rows="5" value={formData.aboutText || ''} onChange={(e) => handleChange('root', 'aboutText', e.target.value)} className="w-full text-xs font-medium border border-slate-200 rounded-2xl p-6 outline-none focus:border-primary shadow-inner bg-slate-50/50 leading-relaxed" placeholder="Tell your brand story..." />
        </section>

      </form>
      <StatusPopup 
        isOpen={status.isOpen}
        message={status.message}
        type={status.type}
        onClose={() => setStatus({ ...status, isOpen: false })}
      />
    </div>
  );
};

export default CMSManager;
