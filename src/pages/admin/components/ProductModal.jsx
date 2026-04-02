import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';

const DEFAULT_FEATURES = [
  { icon: '🌾', label: '100% Hard Wheat Semolina' },
  { icon: '✨', label: 'No Maida, No Bleach, No Additives' },
  { icon: '⏱️', label: 'Cooks in Just 5–7 Minutes' },
  { icon: '🛡️', label: 'Triple-Layer Fresh-Lock Packaging' },
];

const DEFAULT_NUTRITION = [
  { label: 'Energy', value: '360 kcal' },
  { label: 'Protein', value: '10.5 g' },
  { label: 'Carbohydrates', value: '77.2 g' },
  { label: 'Total Fat', value: '0.8 g' },
  { label: 'Dietary Fiber', value: '2.5 g' },
  { label: 'Sodium', value: '< 5 mg' },
];

const ProductModal = ({ isOpen, onClose, product, refreshProducts, onSuccess }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    name: '', sku: '', description: '', packSize: '', amazonLink: '',
    price: '', status: 'Active', category: 'General', variants: '', featured: false,
  });
  const [metadata, setMetadata] = useState({
    bannerHeadline: 'Pure Wheat.\nPerfect Texture.\nEvery Time.',
    features: DEFAULT_FEATURES,
    nutrition: DEFAULT_NUTRITION,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingPrice, setFetchingPrice] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        description: product.description || '',
        packSize: product.packSize || '',
        amazonLink: product.amazonLink || '',
        price: product.price || '',
        status: product.status || 'Active',
        category: product.category || 'General',
        variants: product.variants || '',
        featured: product.featured || false,
      });
      const m = product.metadata || {};
      setMetadata({
        bannerHeadline: m.bannerHeadline || 'Pure Wheat.\nPerfect Texture.\nEvery Time.',
        features: m.features?.length > 0 ? m.features : DEFAULT_FEATURES,
        nutrition: m.nutrition?.length > 0 ? m.nutrition : DEFAULT_NUTRITION,
      });
    } else {
      setFormData({ name: '', sku: '', description: '', packSize: '', amazonLink: '', price: '', status: 'Active', category: 'General', variants: '', featured: false });
      setMetadata({ bannerHeadline: 'Pure Wheat.\nPerfect Texture.\nEvery Time.', features: DEFAULT_FEATURES, nutrition: DEFAULT_NUTRITION });
    }
    setSelectedFile(null);
    setActiveTab('basic');
  }, [product, isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleFetchPrice = async () => {
    if (!formData.amazonLink) return alert('Please enter an Amazon URL first');
    setFetchingPrice(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.post('http://127.0.0.1:5001/api/products/fetch-amazon-price',
        { url: formData.amazonLink },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.price) setFormData(prev => ({ ...prev, price: res.data.price }));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to fetch price from Amazon.');
    } finally {
      setFetchingPrice(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('metadata', JSON.stringify(metadata));
    if (selectedFile) data.append('images', selectedFile);
    try {
      const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };
      const url = product
        ? `http://127.0.0.1:5001/api/products/${product.id || product._id}`
        : 'http://127.0.0.1:5001/api/products';
      if (product) {
        await axios.put(url, data, config);
        onSuccess('Product Updated Successfully');
      } else {
        await axios.post(url, data, config);
        onSuccess('New Product Created');
      }
      refreshProducts();
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  // ── Feature Helpers ──
  const updateFeature = (i, key, val) => {
    const updated = [...metadata.features];
    updated[i] = { ...updated[i], [key]: val };
    setMetadata(m => ({ ...m, features: updated }));
  };
  const addFeature = () => setMetadata(m => ({ ...m, features: [...m.features, { icon: '✅', label: '' }] }));
  const removeFeature = (i) => setMetadata(m => ({ ...m, features: m.features.filter((_, idx) => idx !== i) }));

  // ── Nutrition Helpers ──
  const updateNutrition = (i, key, val) => {
    const updated = [...metadata.nutrition];
    updated[i] = { ...updated[i], [key]: val };
    setMetadata(m => ({ ...m, nutrition: updated }));
  };
  const addNutrition = () => setMetadata(m => ({ ...m, nutrition: [...m.nutrition, { label: '', value: '' }] }));
  const removeNutrition = (i) => setMetadata(m => ({ ...m, nutrition: m.nutrition.filter((_, idx) => idx !== i) }));

  if (!isOpen) return null;

  const inputCls = 'w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 focus:border-primary outline-none transition-all placeholder:text-slate-300';
  const labelCls = 'text-[10px] font-semibold text-slate-400 uppercase tracking-widest';

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'rgba(15,23,42,0.5)' }}
      className="flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden border border-slate-100 font-sans flex flex-col" style={{ maxHeight: '90vh' }}>

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 shrink-0">
          {['basic', 'content'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-slate-400 hover:text-slate-600'}`}>
              {tab === 'basic' ? '📦 Basic Info' : '✏️ Page Content'}
            </button>
          ))}
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-4">

          {/* ── TAB 1: BASIC INFO ── */}
          {activeTab === 'basic' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={labelCls}>Product Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputCls} placeholder="Product Name" />
                </div>
                <div className="space-y-1">
                  <label className={labelCls}>SKU (Internal Code)</label>
                  <input type="text" value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} className={inputCls} placeholder="e.g. SS-001" />
                </div>
              </div>

              <div className="space-y-1">
                <label className={labelCls}>Brief Description</label>
                <textarea rows="2" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className={inputCls + ' resize-none'} placeholder="Product short summary..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={labelCls}>Category</label>
                  <input type="text" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className={inputCls} placeholder="e.g. Signature, Classic" />
                </div>
                <div className="space-y-1">
                  <label className={labelCls}>Variants</label>
                  <input type="text" value={formData.variants} onChange={e => setFormData({ ...formData, variants: e.target.value })} className={inputCls} placeholder="e.g. Roasted, Plain" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={labelCls}>Pack Sizes (comma-separated)</label>
                  <input type="text" value={formData.packSize} onChange={e => setFormData({ ...formData, packSize: e.target.value })} className={inputCls} placeholder="200g, 500g, 1kg" />
                </div>
                <div className="space-y-1">
                  <label className={labelCls}>Status</label>
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className={inputCls + ' cursor-pointer bg-white'}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 py-1">
                <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} className="w-4 h-4 text-primary border-slate-200 rounded" />
                <label htmlFor="featured" className="text-xs font-semibold text-slate-600">Mark as Featured (shown on Homepage)</label>
              </div>

              {/* Amazon + Price */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={labelCls}>Amazon Link</label>
                  <div className="flex gap-2">
                    <input type="url" value={formData.amazonLink} onChange={e => setFormData({ ...formData, amazonLink: e.target.value })} className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2.5 outline-none transition-all placeholder:text-slate-300" placeholder="https://amazon.in/dp/..." />
                    <button type="button" onClick={handleFetchPrice} disabled={fetchingPrice}
                      className="px-3 bg-amber-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-wide transition disabled:opacity-50 hover:bg-amber-600 shrink-0">
                      {fetchingPrice ? '...' : 'Fetch'}
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className={labelCls}>Live Price</label>
                  <input type="text" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className={inputCls + ' font-bold text-primary'} placeholder="₹0.00" />
                </div>
              </div>

              {/* Image Upload */}
              <div className="border border-dashed border-slate-200 rounded-xl p-4 flex items-center gap-4 bg-slate-50/50">
                <div className="shrink-0 w-10 h-10 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center text-slate-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-500 truncate">{selectedFile ? selectedFile.name : 'No image selected'}</p>
                  <p className="text-[9px] text-slate-300 uppercase tracking-wide mt-0.5">Local image upload</p>
                </div>
                <input type="file" onChange={e => setSelectedFile(e.target.files[0])} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="cursor-pointer px-4 py-2 bg-slate-800 text-white text-[9px] font-bold uppercase rounded-lg hover:bg-slate-700 transition tracking-widest shrink-0">Browse</label>
              </div>
            </>
          )}

          {/* ── TAB 2: PAGE CONTENT ── */}
          {activeTab === 'content' && (
            <>
              {/* Banner Headline */}
              <div className="space-y-1">
                <label className={labelCls}>🖼️ Lifestyle Banner Headline</label>
                <p className="text-[10px] text-slate-400">This appears as the large text over the full-width banner image on the product page. Use line breaks for effect.</p>
                <textarea
                  rows="4"
                  value={metadata.bannerHeadline}
                  onChange={e => setMetadata(m => ({ ...m, bannerHeadline: e.target.value }))}
                  className={inputCls + ' resize-none font-medium'}
                  placeholder={'Pure Wheat.\nPerfect Texture.\nEvery Time.'}
                />
              </div>

              {/* Product Features */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <label className={labelCls}>⭐ Product Features (Mini List)</label>
                  <button type="button" onClick={addFeature} className="text-[10px] font-bold text-primary hover:underline">+ Add Row</button>
                </div>
                <p className="text-[10px] text-slate-400">Shown below the CTA buttons on the product detail page.</p>
                <div className="space-y-2">
                  {metadata.features.map((f, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input type="text" value={f.icon} onChange={e => updateFeature(i, 'icon', e.target.value)}
                        className="w-12 text-center text-sm border border-slate-200 rounded-lg px-2 py-2 outline-none" placeholder="🌾" />
                      <input type="text" value={f.label} onChange={e => updateFeature(i, 'label', e.target.value)}
                        className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none placeholder:text-slate-300" placeholder="Feature description..." />
                      <button type="button" onClick={() => removeFeature(i)} className="text-slate-300 hover:text-red-400 transition p-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutrition Facts */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <label className={labelCls}>📊 Nutrition Facts</label>
                  <button type="button" onClick={addNutrition} className="text-[10px] font-bold text-primary hover:underline">+ Add Row</button>
                </div>
                <p className="text-[10px] text-slate-400">Shown in the nutrition panel on the product detail page (per 100g).</p>
                <div className="space-y-2">
                  {metadata.nutrition.map((n, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input type="text" value={n.label} onChange={e => updateNutrition(i, 'label', e.target.value)}
                        className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none placeholder:text-slate-300" placeholder="e.g. Energy" />
                      <input type="text" value={n.value} onChange={e => updateNutrition(i, 'value', e.target.value)}
                        className="w-28 text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none font-bold placeholder:text-slate-300" placeholder="360 kcal" />
                      <button type="button" onClick={() => removeNutrition(i)} className="text-slate-300 hover:text-red-400 transition p-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex gap-3 justify-end shrink-0">
          <button onClick={onClose} className="px-6 py-2.5 text-slate-500 font-semibold text-xs border border-slate-200 rounded-lg hover:bg-slate-100 transition tracking-wide">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading}
            className="px-8 py-2.5 bg-primary text-white font-bold text-xs rounded-lg shadow-md shadow-red-100 hover:bg-red-700 transition-all tracking-wide disabled:opacity-60">
            {loading ? 'Saving...' : product ? 'Save Product' : 'Create Product'}
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};

export default ProductModal;