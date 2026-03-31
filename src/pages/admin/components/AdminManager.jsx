import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditAdminModal from './EditAdminModal';
import StatusPopup from './StatusPopup';
import ConfirmPopup from './ConfirmPopup';


const AdminManager = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Profile Update State
  const [profileData, setProfileData] = useState({ 
    currentEmail: '', 
    currentPassword: '', 
    newEmail: '', 
    newPassword: '' 
  });
  const [profileLoading, setProfileLoading] = useState(false);
  
  // Create Sub-Admin State
  const [newSubAdmin, setNewSubAdmin] = useState({ email: '', password: '' });
  const [createLoading, setCreateLoading] = useState(false);

  // Edit Sub-Admin Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);

  // Status Notification State
  const [status, setStatus] = useState({ isOpen: false, message: '', type: 'success' });
  
  // Custom Confirmation State
  const [confirm, setConfirm] = useState({ isOpen: false, adminId: null });


  const token = localStorage.getItem('adminToken');
  const config = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);

  const showStatus = (message, type = 'success') => {
    setStatus({ isOpen: true, message, type });
  };

  const fetchAdmins = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/users', config);
      setAdmins(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [config]);


  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!profileData.currentEmail || !profileData.currentPassword) {
       showStatus('Verification required: Please enter current email and password.', 'error');
       return;
    }


    setProfileLoading(true);
    try {
      // Mapping to backend expected fields
      const payload = {
        currentEmail: profileData.currentEmail,
        currentPassword: profileData.currentPassword,
        email: profileData.newEmail,
        password: profileData.newPassword
      };
      
      await axios.put('http://localhost:5001/api/users/profile', payload, config);
      showStatus('Security Credentials Updated Successfully. Please log in again.');
      setTimeout(() => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminRole');
        navigate('/admin/login');
      }, 2000);
    } catch (err) {
      showStatus(err.response?.data?.message || 'Verification failed. Incorrect current credentials.', 'error');
    } finally {
      setProfileLoading(false);
    }
  };


  const handleCreateSubAdmin = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      await axios.post('http://localhost:5001/api/users/subadmin', newSubAdmin, config);
      showStatus('Sub-Admin created successfully');
      setNewSubAdmin({ email: '', password: '' });
      fetchAdmins();
    } catch (err) {
      showStatus(err.response?.data?.message || 'Creation failed', 'error');
    } finally {
      setCreateLoading(false);
    }
  };


  const confirmDeleteAdmin = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/users/${confirm.adminId}`, config);
      showStatus('Admin account eradicated');
      setConfirm({ isOpen: false, adminId: null });
      fetchAdmins();
    } catch (err) {
      showStatus(err.response?.data?.message || 'Delete failed', 'error');
    }
  };


  if (loading) return <div className="text-xs font-semibold text-primary animate-pulse py-10 tracking-widest uppercase">Synchronizing Administration System...</div>;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Edit Modal Hook */}
      <EditAdminModal 
        isOpen={isEditModalOpen}
        admin={editingAdmin}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingAdmin(null);
        }}
        onUpdate={() => fetchAdmins()}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Profile Update Section */}
         <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col h-full">
            <header className="mb-8">
               <h2 className="text-lg font-semibold text-slate-800 tracking-tight">Access Credentials</h2>
               <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-1">Update your own login details</p>
            </header>
            
            <form onSubmit={handleUpdateProfile} className="space-y-4 flex-1">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1.5">
                   <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest pl-1">Verify Current Email</label>
                   <input 
                     required
                     type="email" 
                     value={profileData.currentEmail}
                     onChange={e => setProfileData({...profileData, currentEmail: e.target.value})}
                     className="w-full text-xs font-medium border border-slate-200 rounded-xl p-3 focus:border-primary outline-none transition-all bg-slate-50/50" 
                     placeholder="Enter active email" 
                   />
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest pl-1">Verify Current Password</label>
                   <input 
                     required
                     type="password" 
                     value={profileData.currentPassword}
                     onChange={e => setProfileData({...profileData, currentPassword: e.target.value})}
                     className="w-full text-xs font-medium border border-slate-200 rounded-xl p-3 focus:border-primary outline-none transition-all bg-slate-50/50" 
                     placeholder="••••••••" 
                   />
                 </div>
               </div>

               <div className="pt-4 border-t border-slate-100 mt-2">
                  <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-4">New Credential Setup</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-1.5">
                       <label className="text-[10px] font-semibold uppercase tracking-widest pl-1 text-slate-500">Proposed Email</label>
                       <input 
                         type="email" 
                         value={profileData.newEmail}
                         onChange={e => setProfileData({...profileData, newEmail: e.target.value})}
                         className="w-full text-xs font-medium border border-slate-200 rounded-xl p-3 focus:border-primary outline-none transition-all bg-white" 
                         placeholder="Leave blank to keep same" 
                       />
                     </div>
                     <div className="space-y-1.5">
                       <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest pl-1 text-slate-500">Proposed Password</label>
                       <input 
                         type="password" 
                         value={profileData.newPassword}
                         onChange={e => setProfileData({...profileData, newPassword: e.target.value})}
                         className="w-full text-xs font-medium border border-slate-200 rounded-xl p-3 focus:border-primary outline-none transition-all bg-white" 
                         placeholder="••••••••" 
                       />
                     </div>
                  </div>
               </div>
               
               <button 
                 type="submit" 
                 disabled={profileLoading}
                 className="w-full py-4 mt-4 bg-slate-900 text-white font-semibold uppercase text-[10px] tracking-widest rounded-xl shadow-lg hover:bg-slate-800 transition-all uppercase"
               >
                 {profileLoading ? 'Authenticating & Updating...' : 'Verify & Commit Credential Change'}
               </button>
            </form>
            <div className="mt-6 p-4 bg-red-50 rounded-2xl border border-red-100">
              <p className="text-[9px] text-red-500 font-semibold uppercase tracking-tight leading-relaxed">
                ⚠️ Warning: Security Protocol. Changing credentials will invalidate your current session and require re-authentication.
              </p>
            </div>
         </div>

         {/* Create Sub-Admin Section */}
         <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col h-full">
            <header className="mb-8">
               <h2 className="text-lg font-semibold text-slate-800 tracking-tight">Create Sub-Admin</h2>
               <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-1">Initialize restricted access accounts</p>
            </header>
            
            <form onSubmit={handleCreateSubAdmin} className="space-y-6 flex-1">
               <div className="space-y-2">
                 <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest pl-1">Sub-Admin Email</label>
                 <input 
                   required
                   type="email" 
                   value={newSubAdmin.email}
                   onChange={e => setNewSubAdmin({...newSubAdmin, email: e.target.value})}
                   className="w-full text-sm font-medium border border-slate-200 rounded-2xl p-4 focus:border-primary outline-none transition-all bg-slate-50/30" 
                   placeholder="subadmin@sangusemiya.com" 
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest pl-1">Initial Password</label>
                 <input 
                   required
                   type="password" 
                   value={newSubAdmin.password}
                   onChange={e => setNewSubAdmin({...newSubAdmin, password: e.target.value})}
                   className="w-full text-sm font-medium border border-slate-200 rounded-2xl p-4 focus:border-primary outline-none transition-all bg-slate-50/30" 
                   placeholder="Set account password" 
                 />
               </div>
               <button 
                 type="submit" 
                 disabled={createLoading}
                 className="w-full py-4 bg-primary text-white font-semibold uppercase text-[10px] tracking-widest rounded-2xl shadow-xl shadow-red-50 hover:bg-primary-dark transition-all"
               >
                 {createLoading ? 'Provisioning...' : 'Initialize Sub-Admin Account'}
               </button>
            </form>
         </div>

      </div>

      {/* Admins List Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <header className="p-8 border-b border-slate-50">
           <h2 className="text-lg font-semibold text-slate-800 tracking-tight">Administration Inventory</h2>
           <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-1">Manage active system controllers</p>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] uppercase text-slate-400 font-semibold tracking-[0.15em]">
              <tr>
                <th className="px-8 py-6">Admin Account</th>
                <th className="px-6 py-6">System Role</th>
                <th className="px-6 py-6">Created On</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {admins.map(admin => (
                <tr key={admin._id} className="hover:bg-slate-50/30 transition duration-300">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border border-slate-200 shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                      </div>
                      <div className="font-semibold text-slate-700 tracking-tight">{admin.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-4 py-2 rounded-[1rem] text-[10px] font-semibold uppercase tracking-tighter border ${admin.role === 'Admin' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                     <span className="text-xs font-medium text-slate-400 tracking-tight">{new Date(admin.createdAt).toLocaleDateString()}</span>
                  </td>
                  <td className="px-8 py-5 text-right flex items-center justify-end gap-3 mt-1.5">
                    {admin.role === 'Sub-Admin' && (
                      <>
                        <button 
                          onClick={() => {
                            setEditingAdmin(admin);
                            setIsEditModalOpen(true);
                          }}
                          className="p-2 text-slate-300 hover:text-primary transition-colors hover:bg-primary/5 rounded-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                        </button>
                        <button 
                          onClick={() => setConfirm({ isOpen: true, adminId: admin._id })} 
                          className="p-2 text-slate-300 hover:text-red-400 transition-colors hover:bg-red-50 rounded-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>

                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmPopup 
        isOpen={confirm.isOpen}
        onClose={() => setConfirm({ ...confirm, isOpen: false })}
        onConfirm={confirmDeleteAdmin}
        title="Purge Admin Account?"
        message="This will permanently revoke system access for this user. This operation cannot be undone."
      />

      <StatusPopup 
        isOpen={status.isOpen}
        message={status.message}
        type={status.type}
        onClose={() => setStatus({ ...status, isOpen: false })}
      />
    </div>

  );
};

export default AdminManager;
