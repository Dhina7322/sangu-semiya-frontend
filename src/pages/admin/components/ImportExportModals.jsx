import { useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';

export const ImportModal = ({ isOpen, onClose, refreshProducts }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const downloadSampleCSV = () => {
    const headers = "sku,name,description,packSize,amazonLink\n";
    const sampleData = "SS-001,Roasted Semiya,Premium roasted quality,200g,https://amazon.in/dp/sample\n";
    const blob = new Blob([headers + sampleData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sangu_semiya_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = async () => {
    if (!file) return alert('Select CSV file first');
    setLoading(true);
    const formData = new FormData();
    formData.append('csvFile', file);
    try {
      await axios.post('http://localhost:5001/api/products/utils/import', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Bulk Update Success');
      refreshProducts();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Sync Error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'rgba(15,23,42,0.5)' }}
      className="flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl overflow-hidden border border-slate-100 font-sans">

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-sm font-semibold text-slate-800">Bulk Import</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">

          {/* Download Template */}
          <button
            onClick={downloadSampleCSV}
            className="w-full py-2.5 bg-blue-50 text-blue-500 rounded-xl text-xs font-medium border border-blue-100 hover:bg-blue-100 transition flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Download Sample Template
          </button>

          {/* Required columns info */}
          <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
            <p className="text-[10px] text-slate-400 font-medium mb-1">Required Columns</p>
            <code className="text-xs text-primary font-medium">sku, name, description, packSize, amazonLink</code>
          </div>

          {/* File Drop Zone */}
          <div className="border border-dashed border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-3 bg-slate-50/40">
            <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center text-blue-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-600">
                {file ? file.name : 'Drop CSV file here'}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">CSV data file only</p>
            </div>
            <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} className="hidden" id="csv-upload" />
            <label htmlFor="csv-upload" className="cursor-pointer px-5 py-2 bg-slate-800 text-white text-xs font-medium rounded-lg hover:bg-slate-700 transition">
              Select File
            </label>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 pb-5">
          <button
            onClick={handleImport}
            disabled={loading}
            className="w-full py-3 bg-primary text-white font-semibold text-sm rounded-xl shadow-md shadow-red-100 hover:bg-primary-dark transition-all"
          >
            {loading ? 'Uploading...' : 'Commit Sync'}
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};


export const ExportModal = ({ isOpen, onClose }) => {
  const handleExport = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/products/utils/export', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Sangu_Semiya_Sync_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onClose();
    } catch (err) {
      alert('Export Connection Error');
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'rgba(15,23,42,0.5)' }}
      className="flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl w-full max-w-xs shadow-xl overflow-hidden border border-slate-100 font-sans text-center">

        <div className="p-7 space-y-5">

          {/* Icon */}
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-400">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Export Products</h2>
            <p className="text-xs text-slate-400 font-normal mt-1">Download all products as a CSV file</p>
          </div>

          {/* Buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleExport}
              className="w-full py-3 bg-primary text-white font-semibold text-sm rounded-xl shadow-md shadow-red-100 hover:bg-primary-dark transition-all"
            >
              Download CSV
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 text-slate-400 text-xs font-normal hover:text-slate-600 transition"
            >
              Dismiss
            </button>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
};
