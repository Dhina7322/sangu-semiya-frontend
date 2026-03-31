import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const EnquiryManager = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthHeader = useCallback(() => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  }), []);

  const loadEnquiries = useCallback(async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5001/api/enquiry', getAuthHeader());
      setEnquiries(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [getAuthHeader]);

  useEffect(() => { loadEnquiries(); }, [loadEnquiries]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://127.0.0.1:5001/api/enquiry/${id}/status`, { status: newStatus }, getAuthHeader());
      setEnquiries(enquiries.map(e => e._id === id ? { ...e, status: newStatus } : e));
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const getStatusColor = (status) => {
    if(status === 'Resolved') return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    if(status === 'In-Progress') return 'bg-blue-50 text-blue-600 border-blue-100';
    return 'bg-amber-50 text-amber-600 border-amber-100';
  };

  if (loading) return <div className="text-xs font-bold text-slate-400 animate-pulse">Syncing leads...</div>;

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-xs font-black uppercase text-slate-400 tracking-wider">Lead Collection Hub</h2>
        <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded font-black uppercase">{enquiries.length} Active Records</span>
      </div>
      
      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left">
          <thead className="bg-white border-b border-slate-100 text-[10px] uppercase text-slate-400 font-black tracking-widest">
            <tr>
              <th className="px-3 py-2">Customer</th>
              <th className="px-3 py-2">Interest</th>
              <th className="px-3 py-2">Quantity</th>
              <th className="px-3 py-2 text-center">Status Tracking</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-[11px]">
            {enquiries.map(e => (
              <tr key={e._id} className="hover:bg-slate-50/50 transition duration-300">
                <td className="px-3 py-1.5 leading-tight">
                  <div className="font-bold text-slate-700">{e.name}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{e.phone} • {e.email}</div>
                </td>
                <td className="px-3 py-1.5 font-black text-primary uppercase text-[10px]">{e.product}</td>
                <td className="px-3 py-1.5 text-slate-500 font-medium">{e.quantity}</td>
                <td className="px-3 py-1.5">
                  <div className="flex flex-col items-center">
                    <select 
                      value={e.status || 'Pending'} 
                      onChange={(ev) => handleStatusChange(e._id, ev.target.value)}
                      className={`text-[9px] font-black px-2 py-1 rounded border outline-none cursor-pointer uppercase tracking-tighter ${getStatusColor(e.status || 'Pending')}`}
                    >
                      <option value="Pending">PENDING</option>
                      <option value="In-Progress">IN-PROGRESS</option>
                      <option value="Resolved">RESOLVED</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiryManager;
