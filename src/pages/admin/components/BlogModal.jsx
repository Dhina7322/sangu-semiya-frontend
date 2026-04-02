import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiImage, FiFileText, FiLink, FiEye, FiImage as FiImg, FiCode, FiBold, FiItalic, FiUnderline, FiAlignLeft, FiAlignCenter, FiAlignRight } from 'react-icons/fi';

const BlogModal = ({ isOpen, onClose, blog, onSave, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    thumbnail: '',
    short_description: '',
    status: 'Published'
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        slug: blog.slug || '',
        content: blog.content || '',
        thumbnail: blog.thumbnail || '',
        short_description: blog.short_description || '',
        status: blog.status || 'Published'
      });
      setPreviewUrl(blog.thumbnail || '');
    } else {
      setFormData({ title: '', slug: '', content: '', thumbnail: '', short_description: '', status: 'Published' });
      setPreviewUrl('');
    }
    setSelectedFile(null);
  }, [blog, isOpen]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!blog && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, blog]);

  if (!isOpen) return null;

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
    onSave({ ...formData, thumbnail: previewUrl });
  };

  const inputCls = 'w-full text-sm border border-slate-100 rounded-xl px-4 py-3.5 focus:border-primary outline-none transition-all placeholder:text-slate-300 bg-slate-50/50';
  const labelCls = 'text-[9px] font-semibold text-slate-400 uppercase tracking-widest pl-1 mb-2 block';

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }}
      className="flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-[2rem] w-full max-w-4xl shadow-2xl overflow-hidden border border-slate-100 font-sans flex flex-col transform transition-all h-[90vh]">

        {/* Modal Header */}
        <div className="px-8 py-5 border-b border-slate-50 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <FiFileText size={20} />
             </div>
             <div>
                <h2 className="text-lg font-semibold text-slate-800 tracking-tight">
                  {blog ? 'Modify Blog Post' : 'Craft New Story'}
                </h2>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em]">{blog ? 'Update detail' : 'Publish inspiration for your audience'}</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Column (Main Form) */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className={labelCls}>Post Title</label>
                <input 
                  required 
                  type="text" 
                  value={formData.title} 
                  onChange={e => setFormData({ ...formData, title: e.target.value })} 
                  className={inputCls + ' text-base font-medium'} 
                  placeholder="Enter a compelling title..." 
                />
              </div>

              <div>
                <label className={labelCls}>Main Content</label>
                <div className="border border-slate-100 rounded-2xl overflow-hidden flex flex-col">
                  {/* Mock Editor Toolbar */}
                  <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-100 flex flex-wrap gap-4 text-slate-400">
                    <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
                      <FiBold className="cursor-pointer hover:text-primary transition" />
                      <FiItalic className="cursor-pointer hover:text-primary transition" />
                      <FiUnderline className="cursor-pointer hover:text-primary transition" />
                    </div>
                    <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
                      <FiAlignLeft className="cursor-pointer hover:text-primary transition" />
                      <FiAlignCenter className="cursor-pointer hover:text-primary transition" />
                      <FiAlignRight className="cursor-pointer hover:text-primary transition" />
                    </div>
                    <div className="flex items-center gap-3">
                      <FiLink className="cursor-pointer hover:text-primary transition" />
                      <FiImg className="cursor-pointer hover:text-primary transition" />
                      <FiCode className="cursor-pointer hover:text-primary transition" />
                    </div>
                  </div>
                  <textarea 
                    required 
                    rows="15" 
                    value={formData.content} 
                    onChange={e => setFormData({ ...formData, content: e.target.value })} 
                    className="w-full p-6 text-sm outline-none resize-none font-medium text-slate-600 bg-white min-h-[300px]" 
                    placeholder="Once upon a time in Sangu Kitchen..."
                  />
                </div>
              </div>
            </div>

            {/* Right Column (Side Panels) */}
            <div className="space-y-6">
              {/* Featured Image Picker */}
              <div>
                <label className={labelCls}>Featured Image</label>
                <div 
                  onClick={() => document.getElementById('blog-file').click()}
                  className="relative group h-56 rounded-[1.5rem] border-2 border-dashed border-slate-100 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all overflow-hidden"
                >
                  {previewUrl ? (
                    <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 bg-white rounded-2xl mx-auto shadow-sm flex items-center justify-center text-slate-300 group-hover:text-primary transition-colors">
                        <FiImage size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-800 font-bold uppercase tracking-widest">Pick Cover</p>
                        <p className="text-[8px] text-slate-400 uppercase font-semibold mt-1">JPG, PNG, WebP</p>
                      </div>
                    </div>
                  )}
                  <input id="blog-file" type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                </div>
              </div>

              {/* URL Slug */}
              <div>
                <label className={labelCls}>Permalink / Slug</label>
                <div className="relative">
                   <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                   <input 
                    type="text" 
                    value={formData.slug} 
                    onChange={e => setFormData({ ...formData, slug: e.target.value })} 
                    className={inputCls + ' pl-11 text-xs font-bold text-slate-400'} 
                    placeholder="url-friendly-slug" 
                   />
                </div>
              </div>

              {/* SEO Summary */}
              <div>
                <label className={labelCls}>SEO Description</label>
                <textarea 
                  rows="4" 
                  value={formData.short_description} 
                  onChange={e => setFormData({ ...formData, short_description: e.target.value })} 
                  className={inputCls + ' resize-none text-xs'} 
                  placeholder="Short summary for search results..." 
                />
              </div>

              {/* Status Toggle */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex justify-between items-center">
                 <div>
                    <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Published</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{formData.status}</p>
                 </div>
                 <button 
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, status: prev.status === 'Published' ? 'Draft' : 'Published' }))}
                  className={`w-12 h-6 rounded-full transition-all relative ${formData.status === 'Published' ? 'bg-emerald-500' : 'bg-slate-300'}`}
                 >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.status === 'Published' ? 'right-1' : 'left-1'}`} />
                 </button>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 bg-slate-50 border-t border-slate-50 flex gap-4 justify-between items-center shrink-0">
          <div className="hidden md:flex items-center gap-2 text-slate-400">
             <FiEye size={16} />
             <span className="text-[10px] font-black uppercase tracking-widest">Interactive Preview</span>
          </div>
          <div className="flex gap-3">
             <button onClick={onClose} className="px-8 py-3 text-slate-500 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-100 rounded-2xl transition">
               Cancel
             </button>
             <button 
              onClick={handleSubmit} 
              disabled={loading}
              className="px-12 py-3 bg-primary text-white font-bold text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
             >
               {loading ? 'Sharing...' : blog ? 'Update' : 'Publish Story'}
             </button>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
};

export default BlogModal;
