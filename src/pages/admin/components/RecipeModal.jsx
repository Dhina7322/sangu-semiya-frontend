import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiImage, FiPlus, FiTrash2, FiClock, FiYoutube, FiType } from 'react-icons/fi';

const RecipeModal = ({ isOpen, onClose, recipe, onSave, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    time: '',
    youtubeLink: '',
    img: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name || '',
        time: recipe.time || '',
        youtubeLink: recipe.youtubeLink || '',
        img: recipe.img || ''
      });
      setPreviewUrl(recipe.img || '');
    } else {
      setFormData({ name: '', time: '', youtubeLink: '', img: '' });
      setPreviewUrl('');
    }
    setSelectedFile(null);
  }, [recipe, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In this specific implementation, we pass the raw data (including base64 if it's a new file)
    // or we could compress it here. Let's compress it to be safe.
    if (selectedFile) {
        const img = new Image();
        img.src = previewUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 600;
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
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
            onSave({ ...formData, img: compressedBase64 });
        };
    } else {
        onSave(formData);
    }
  };

  if (!isOpen) return null;

  const inputCls = 'w-full text-sm border border-slate-200 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all placeholder:text-slate-300 bg-white shadow-sm';
  const labelCls = 'text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] pl-1 mb-1.5 block';

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }}
      className="flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden border border-slate-100 font-sans flex flex-col transform transition-all">

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">
              {recipe ? 'Edit Cooking Recipe' : 'Add New Recipe'}
            </h2>
            <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest mt-0.5">Recipe sync</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Recipe Name</label>
              <div className="relative group">
                <FiType className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={14} />
                <input 
                  required 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  className={inputCls + ' pl-10 py-2.5'} 
                  placeholder="e.g. Classic Tomato Semiya" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Time</label>
                <div className="relative group">
                  <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={14} />
                  <input 
                    type="text" 
                    value={formData.time} 
                    onChange={e => setFormData({ ...formData, time: e.target.value })} 
                    className={inputCls + ' pl-10 py-2.5'} 
                    placeholder="15 Mins" 
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>YouTube</label>
                <div className="relative group">
                  <FiYoutube className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" size={14} />
                  <input 
                    type="url" 
                    value={formData.youtubeLink} 
                    onChange={e => setFormData({ ...formData, youtubeLink: e.target.value })} 
                    className={inputCls + ' pl-10 py-2.5'} 
                    placeholder="https://..." 
                  />
                </div>
              </div>
            </div>

            <div>
              <label className={labelCls}>Thumbnail</label>
              <div className="relative rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:border-primary transition-all overflow-hidden aspect-video flex flex-col items-center justify-center group cursor-pointer">
                {previewUrl ? (
                   <>
                     <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white text-slate-800 text-[9px] font-black uppercase px-4 py-1.5 rounded-full shadow-lg">Change</span>
                     </div>
                   </>
                ) : (
                   <div className="text-center space-y-1">
                      <div className="w-10 h-10 bg-white rounded-full mx-auto shadow-sm flex items-center justify-center text-slate-300 group-hover:text-primary transition-colors">
                        <FiImage size={20} />
                      </div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Upload</p>
                   </div>
                )}
                <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-50 flex gap-3 justify-end shrink-0">
          <button type="button" onClick={onClose} className="px-6 py-2 text-slate-500 font-bold text-[9px] uppercase tracking-widest hover:bg-slate-100 rounded-xl transition">
            Close
          </button>
          <button onClick={handleSubmit} disabled={loading}
            className="px-8 py-2 bg-primary text-white font-black text-[9px] uppercase tracking-widest rounded-xl shadow-lg shadow-red-50 hover:scale-105 active:scale-95 transition-all disabled:opacity-50">
            {loading ? 'Wait..' : recipe ? 'Update' : 'Add'}
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};

export default RecipeModal;
