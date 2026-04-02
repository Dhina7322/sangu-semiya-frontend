import { useState, useEffect } from 'react';
import axios from 'axios';
import BlogModal from './BlogModal';
import StatusPopup from './StatusPopup';
import ConfirmPopup from './ConfirmPopup';
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiFileText, FiEye, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [status, setStatus] = useState({ isOpen: false, message: '', type: 'success' });
  const [confirm, setConfirm] = useState({ isOpen: false, blogId: null });

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5001/api/blogs');
      setBlogs(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => { loadBlogs(); }, []);

  const handleSave = async (blogData) => {
    try {
      if (editingBlog) {
        await axios.put(`http://localhost:5001/api/blogs/${editingBlog.id || editingBlog._id}`, blogData);
        setStatus({ isOpen: true, message: 'Story updated successfully!', type: 'success' });
      } else {
        await axios.post('http://localhost:5001/api/blogs', blogData);
        setStatus({ isOpen: true, message: 'New story published!', type: 'success' });
      }
      loadBlogs();
      setIsModalOpen(false);
    } catch (err) {
      setStatus({ isOpen: true, message: 'Failed to save story.', type: 'error' });
    }
  };

  const openDeleteConfirm = (id) => {
    setConfirm({ isOpen: true, blogId: id });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/blogs/${confirm.blogId}`);
      setStatus({ isOpen: true, message: 'Story deleted successfully.', type: 'success' });
      setConfirm({ isOpen: false, blogId: null });
      loadBlogs();
    } catch (err) {
      setStatus({ isOpen: true, message: 'Failed to delete story.', type: 'error' });
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const openNewBlog = () => {
    setEditingBlog(null);
    setIsModalOpen(true);
  };

  const filteredBlogs = blogs.filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <div className="text-center py-20 text-slate-400 font-medium uppercase text-[10px] tracking-widest animate-pulse">Syncing stories...</div>;

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Top Header Card */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col lg:flex-row gap-8 justify-between items-center">
        <div className="flex items-center gap-5">
           <div className="w-14 h-14 bg-slate-50 flex items-center justify-center rounded-[1.5rem] text-slate-900 border border-slate-100">
              <FiFileText size={24} />
           </div>
           <div>
              <h2 className="text-2xl font-semibold text-slate-800 tracking-tighter">Blogs Management</h2>
              <p className="text-xs text-slate-400 font-medium mt-1">Share stories, news, and design inspiration.</p>
           </div>
        </div>
        <button onClick={openNewBlog} className="w-full lg:w-auto px-10 py-4 bg-primary text-white rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-sm font-semibold uppercase tracking-widest">
          <FiPlus size={18} strokeWidth={2.5} /> New Blog Post
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Total Stories', val: blogs.length, icon: <FiFileText />, color: 'text-blue-500', bg: 'bg-blue-50' },
           { label: 'Published', val: blogs.filter(b => b.status === 'Published').length, icon: <FiCheckCircle />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
           { label: 'Drafts', val: blogs.filter(b => b.status !== 'Published').length, icon: <FiAlertCircle />, color: 'text-amber-500', bg: 'bg-amber-50' }
         ].map((stat, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex items-center gap-6">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} flex items-center justify-center rounded-2xl`}>
                {stat.icon}
              </div>
              <div>
                 <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-3xl font-semibold text-slate-800 tracking-tighter mt-1">{stat.val}</p>
              </div>
           </div>
         ))}
      </div>

      {/* Main Table Content */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-50 overflow-hidden">
        <div className="p-8 border-b border-slate-50">
           <div className="relative max-w-md">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
              <input 
                type="text" 
                placeholder="Search by title..." 
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-2xl outline-none text-sm font-medium text-slate-600 focus:bg-white focus:ring-2 focus:ring-slate-100 transition-all shadow-inner"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[10px] font-medium uppercase text-slate-400 tracking-widest">
              <tr>
                <th className="px-8 py-5">Post</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Date</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredBlogs.map((b) => (
                <tr key={b.id || b._id} className="hover:bg-slate-50/50 group transition-all duration-300">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
                         {b.thumbnail ? (
                           <img src={b.thumbnail} className="w-full h-full object-cover" alt="" />
                         ) : <FiFileText className="text-slate-300" />}
                      </div>
                      <div>
                        <div className="font-medium text-slate-800 text-sm tracking-tight leading-tight">{b.title}</div>
                        <div className="text-[10px] text-slate-400 font-medium mt-1">/blog/{b.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-semibold uppercase tracking-widest ${b.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-medium text-slate-400 text-[11px] uppercase tracking-tighter">
                    {new Date(b.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-3">
                       <button onClick={() => handleEdit(b)} className="p-3 text-slate-300 hover:text-primary transition-all hover:bg-slate-100 rounded-xl" title="Edit Story"><FiEdit size={18} /></button>
                       <button onClick={() => openDeleteConfirm(b.id || b._id)} className="p-3 text-slate-300 hover:text-red-500 transition-all hover:bg-slate-100 rounded-xl" title="Delete Story"><FiTrash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredBlogs.length === 0 && (
            <div className="p-24 text-center">
               <FiFileText size={48} className="text-slate-100 mx-auto mb-4" />
               <p className="text-slate-300 font-medium uppercase text-xs tracking-widest animate-pulse">No matching stories found.</p>
            </div>
          )}
        </div>
      </div>

      <BlogModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        blog={editingBlog}
        onSave={handleSave}
      />

      <ConfirmPopup 
        isOpen={confirm.isOpen}
        onClose={() => setConfirm({ ...confirm, isOpen: false })}
        onConfirm={confirmDelete}
        title="Archive Story?"
        message="This action will remove the story from the public blog and cannot be undone."
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

export default BlogManager;
