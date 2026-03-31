import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';

const ProductModal = ({ isOpen, onClose, product, refreshProducts, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '', sku: '', description: '', packSize: '', amazonLink: '', status: 'Active'
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        description: product.description || '',
        packSize: product.packSize || '',
        amazonLink: product.amazonLink || '',
        status: product.status || 'Active'
      });
    } else {
      setFormData({ name: '', sku: '', description: '', packSize: '', amazonLink: '', status: 'Active' });
    }
    setSelectedFile(null);
  }, [product, isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (selectedFile) data.append('images', selectedFile);
    try {
      const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };
      const url = product
        ? `http://localhost:5001/api/products/${product.id || product._id}`
        : 'http://localhost:5001/api/products';
      
      if (product) {
        await axios.put(url, data, config);
        onSuccess('Inventory Record Updated');
      } else {
        await axios.post(url, data, config);
        onSuccess('New Product Listing Initialized');
      }
      
      refreshProducts();
      onClose();
    } catch (err) {
      console.error(err);
      // We could add an onError prop, but for now we'll just log or show a silent fail
    } finally {
      setLoading(false);
    }
  };


  if (!isOpen) return null;

  // ✅ Portal renders directly into document.body — escapes ALL parent stacking contexts
  return createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'rgba(15,23,42,0.5)' }}
      className="flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden border border-slate-100 font-sans">

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            {product ? 'Edit Product' : 'Add New Entry'}
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Product Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                placeholder="Product Name"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">SKU (Internal Code)</label>
              <input
                required
                type="text"
                value={formData.sku}
                onChange={e => setFormData({...formData, sku: e.target.value})}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                placeholder="SKU Code"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Brief Description</label>
            <textarea
              rows="2"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 outline-none resize-none transition-all placeholder:text-slate-300"
              placeholder="Product short summary..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Pack Size</label>
              <input
                type="text"
                value={formData.packSize}
                onChange={e => setFormData({...formData, packSize: e.target.value})}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 outline-none transition-all placeholder:text-slate-300"
                placeholder="200g, 500g, etc."
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 outline-none cursor-pointer bg-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Amazon Product URL</label>
            <input
              type="url"
              value={formData.amazonLink}
              onChange={e => setFormData({...formData, amazonLink: e.target.value})}
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 outline-none transition-all placeholder:text-slate-300"
              placeholder="https://amazon.in/dp/..."
            />
          </div>

          {/* File Upload */}
          <div className="border border-dashed border-slate-200 rounded-xl p-4 flex items-center gap-4 bg-slate-50/50">
            <div className="shrink-0 w-10 h-10 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center text-slate-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-500 truncate">
                {selectedFile ? selectedFile.name : 'No image selected'}
              </p>
              <p className="text-[9px] text-slate-300 uppercase tracking-wide mt-0.5">Local image upload</p>
            </div>
            <input type="file" onChange={e => setSelectedFile(e.target.files[0])} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer px-4 py-2 bg-slate-800 text-white text-[9px] font-bold uppercase rounded-lg hover:bg-slate-700 transition tracking-widest shrink-0">
              Browse
            </label>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-slate-500 font-semibold text-xs border border-slate-200 rounded-lg hover:bg-slate-100 transition tracking-wide"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-2.5 bg-primary text-white font-bold text-xs rounded-lg shadow-md shadow-red-100 hover:bg-primary-dark transition-all tracking-wide"
          >
            {loading ? 'Saving...' : product ? 'Save Product' : 'Initialize Listing'}
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};

export default ProductModal;