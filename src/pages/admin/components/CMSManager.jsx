import { useState, useEffect } from 'react';
import axios from 'axios';
import StatusPopup from './StatusPopup';

const CMSManager = () => {
  const [formData, setFormData] = useState({
    heroBanner: { message: '', subMessage: '', heroImage: '' },
    contactDetails: { phone: '', email: '', address: '' },
    whyChooseUs: [
      { title: '', icon: '', description: '' },
      { title: '', icon: '', description: '' },
      { title: '', icon: '', description: '' },
      { title: '', icon: '', description: '' },
      { title: '', icon: '', description: '' }
    ],
    aboutText: ''
  });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ isOpen: false, message: '', type: 'success' });

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });

  const loadCMS = async () => {
    try {
      const res = await axios.get('https://sangu-semiya-backend-bq1f.onrender.com/api/homepage');
      if (res.data) {
        setFormData(res.data);
      }
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

  const compressAndSet = (file, section, index, field) => {
    if (file.size > 10 * 1024 * 1024) {
      setStatus({ isOpen: true, message: 'File is very large. Please use a smaller image (under 10MB).', type: 'error' });
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1440; // Increased quality for banners
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Use JPEG with 0.7 compression for better quality
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);

        if (section === 'whyChooseUs') {
          handleCardChange(index, field, dataUrl);
        } else {
          handleChange(section, field, dataUrl);
        }
      };
    };
  };

  const handleFileUpload = (e, section, index, field) => {
    const file = e.target.files[0];
    if (!file) return;
    compressAndSet(file, section, index, field);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      await axios.put('https://sangu-semiya-backend-bq1f.onrender.com/api/homepage', formData, getAuthHeader());
      setStatus({ isOpen: true, message: 'Content updated successfully!', type: 'success' });
    } catch (err) {
      console.error('Failed to update CMS', err);
      const isLarge = err.response?.status === 413;
      setStatus({
        isOpen: true,
        message: isLarge ? 'Images are too large. Please use smaller files.' : 'Failed to update CMS',
        type: 'error'
      });
    }
  };

  const handleCardChange = (index, field, value) => {
    const updatedCards = [...(formData.whyChooseUs || [])];
    while (updatedCards.length < 5) updatedCards.push({ title: '', icon: '', description: '' });
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setFormData({ ...formData, whyChooseUs: updatedCards });
  };

  if (loading) return <div className="text-xs font-bold text-slate-400 animate-pulse text-center py-20">Warming up CMS...</div>;

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 space-y-10">
      <header className="flex justify-between items-center border-b border-slate-50 pb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">Appearance Tuning</h2>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-1">Manage global brand presence</p>
        </div>
        <button onClick={handleSave} className="bg-primary text-white text-[10px] font-black uppercase px-8 py-3 rounded-xl hover:scale-105 transition-all shadow-lg shadow-primary/20">Deploy Changes</button>
      </header>

      <form onSubmit={handleSave} className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
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
                <textarea rows="2" value={formData.heroBanner?.subMessage || ''} onChange={(e) => handleChange('heroBanner', 'subMessage', e.target.value)} className="w-full text-xs font-medium border border-slate-200 rounded-xl p-3 outline-none focus:border-primary bg-white shadow-sm resize-none" />
              </div>
            </div>
          </section>

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

        <section className="space-y-6">
          <header className="flex justify-between items-center bg-slate-50 p-4 px-6 rounded-2xl">
            <h3 className="text-xs font-black text-slate-800 uppercase flex items-center">
              <span className="w-1.5 h-4 bg-secondary rounded-full mr-3"></span> Why Families Trust Us (Cards)
            </h3>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic">Local Icon uploads optimized</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[0, 1, 2, 3, 4].map((idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:border-primary/20 transition-all space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-900 px-2 py-1 bg-slate-50 rounded-lg">Card {idx + 1}</span>
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 overflow-hidden">
                    {formData.whyChooseUs?.[idx]?.icon && <img src={formData.whyChooseUs[idx].icon} className="w-full h-full object-contain" alt="" />}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block w-full cursor-pointer">
                    <div className="bg-slate-50 border border-slate-100 rounded-lg py-2 text-center hover:border-secondary transition-colors">
                      <span className="text-[8px] font-bold text-slate-400 uppercase">Change Icon</span>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'whyChooseUs', idx, 'icon')} />
                  </label>

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
