import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const StatusPopup = ({ isOpen, message, type = 'success', onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const bgClass = type === 'success' ? 'bg-emerald-500' : 'bg-red-500';
  const icon = type === 'success' ? (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return createPortal(
    <div className="fixed top-6 right-6 z-[99999] animate-fade-in-down">
      <div className={`${bgClass} px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/20 backdrop-blur-md`}>
        <div className="bg-white/20 p-2 rounded-xl">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest leading-none mb-1">
            {type === 'success' ? 'System Notification' : 'System Error'}
          </p>
          <p className="text-sm font-bold text-white tracking-tight leading-none uppercase">
            {message}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default StatusPopup;
