import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const EditAdminModal = ({ admin, isOpen, onClose, onUpdate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (admin) {
      setEmail(admin.email);
      setPassword('');
    }
  }, [admin]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const payload = { email };
      if (password) payload.password = password;

      await axios.put(`http://localhost:5001/api/users/${admin._id}`, payload, config);
      onUpdate();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 transition-opacity animate-fade-in" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-zoom-in">
        <div className="p-8">
           <header className="mb-8 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-slate-800 tracking-tight">Modify Assistant</h2>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-1">Adjust sub-admin credentials</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
           </header>

           <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest pl-1">Sign-in Email</label>
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm font-medium border border-slate-200 rounded-2xl p-4 focus:border-primary outline-none transition-all bg-slate-50/30" 
                  placeholder="name@sangusemiya.com" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest pl-1">New Password (Secret)</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-sm font-medium border border-slate-200 rounded-2xl p-4 focus:border-primary outline-none transition-all bg-slate-50/30" 
                  placeholder="Leave empty to keep same" 
                />
                <p className="text-[9px] text-slate-400 pl-1">Only fill this if you want to reset their password.</p>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 border border-slate-200 text-slate-600 font-semibold uppercase text-[10px] tracking-widest rounded-2xl hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 py-4 bg-slate-900 text-white font-semibold uppercase text-[10px] tracking-widest rounded-2xl shadow-lg hover:bg-slate-800 transition-all"
                >
                  {loading ? 'Processing...' : 'Save Adjustments'}
                </button>
              </div>
           </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EditAdminModal;
