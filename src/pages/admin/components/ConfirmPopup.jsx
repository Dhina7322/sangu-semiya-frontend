import { createPortal } from 'react-dom';

const ConfirmPopup = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return createPortal(
    <div 
      style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'rgba(15,23,42,0.5)' }} 
      className="flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl overflow-hidden border border-slate-100 font-sans animate-fade-in-up">
        
        {/* Modal Body */}
        <div className="p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
          <p className="text-sm text-slate-400 font-medium leading-relaxed italic">{message}</p>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex gap-4">
          <button 
            onClick={onClose} 
            className="flex-1 px-4 py-3 text-slate-400 font-bold uppercase text-[10px] tracking-widest border border-slate-200 rounded-xl hover:bg-white transition-all shadow-sm"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="flex-1 px-4 py-3 bg-red-500 text-white font-bold uppercase text-[10px] tracking-widest rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-100"
          >
            Confirm Delete
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};

export default ConfirmPopup;
