import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import StatusPopup from './StatusPopup';
import ConfirmPopup from './ConfirmPopup';
import RecipeModal from './RecipeModal';
import { FiPlus, FiEdit, FiTrash2, FiYoutube, FiClock, FiSearch, FiRefreshCw, FiGrid } from 'react-icons/fi';

const RecipeManager = () => {
  const [recipes, setRecipes] = useState([]);
  const [homepageData, setHomepageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [editingIndex, setEditingIndex] = useState(-1);

  // Status & Confirm Popups
  const [status, setStatus] = useState({ isOpen: false, message: '', type: 'success' });
  const [confirm, setConfirm] = useState({ isOpen: false, index: -1 });

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });

  const loadRecipes = async () => {
    setLoading(true);
    try {
      const res = await api.get('/homepage');
      if (res.data) {
        setHomepageData(res.data);
        setRecipes(res.data.recipes || []);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => { loadRecipes(); }, []);

  const handleSave = async (updatedRecipes) => {
    try {
      const payload = { ...homepageData, recipes: updatedRecipes };
      await api.put('/homepage', payload);
      setStatus({ isOpen: true, message: 'Cooking Recipes synchronized successfully!', type: 'success' });
      setRecipes(updatedRecipes);
      setHomepageData(payload);
      return true;
    } catch (err) {
      const isLarge = err.response?.status === 413;
      setStatus({ 
        isOpen: true, 
        message: isLarge ? 'Images are too large. Please use smaller files.' : 'Sync failed.', 
        type: 'error' 
      });
      return false;
    }
  };

  const [modalLoading, setModalLoading] = useState(false);

  const onModalSave = async (recipeData) => {
    setModalLoading(true);
    let finalRecipe = { ...recipeData };
    
    // If there's a new file, upload it first
    if (recipeData.file) {
      try {
        const uploadFormData = new FormData();
        uploadFormData.append('image', recipeData.file);
        const uploadRes = await api.post('/homepage/media-upload', uploadFormData);
        finalRecipe.img = uploadRes.data.url;
        delete finalRecipe.file;
      } catch (err) {
        setStatus({ isOpen: true, message: 'Image upload failed. Try a smaller file.', type: 'error' });
        setModalLoading(false);
        return;
      }
    }

    let updatedRecipes = [...recipes];
    if (editingIndex >= 0) {
      updatedRecipes[editingIndex] = finalRecipe;
    } else {
      updatedRecipes.push(finalRecipe);
    }
    
    const success = await handleSave(updatedRecipes);
    if (success) {
      setIsModalOpen(false);
      setEditingRecipe(null);
      setEditingIndex(-1);
    }
    setModalLoading(false);
  };

  const openDeleteConfirm = (index) => {
    setConfirm({ isOpen: true, index });
  };

  const confirmDelete = async () => {
    const updatedRecipes = recipes.filter((_, i) => i !== confirm.index);
    const success = await handleSave(updatedRecipes);
    if (success) {
      setConfirm({ isOpen: false, index: -1 });
    }
  };

  const handleEdit = (recipe, index) => {
    setEditingRecipe(recipe);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingRecipe(null);
    setEditingIndex(-1);
    setIsModalOpen(true);
  };

  const filteredRecipes = recipes.filter(r => 
    r.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.time?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-xs font-bold text-slate-400 animate-pulse text-center py-20">Refreshing Recipe Inventory...</div>;

  return (
    <div className="space-y-6">
      
      {/* Top Header & Actions */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col lg:flex-row gap-6 justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <FiGrid size={20} className="text-primary" /> Cooking Recipe Inventory
          </h2>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-0.5">Manage live homepage recipes</p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search recipes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl outline-none text-xs font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <button onClick={loadRecipes} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition text-slate-400"><FiRefreshCw /></button>
          <button onClick={openAddModal} className="flex-1 lg:flex-none px-8 py-3 bg-primary text-white rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-red-50 hover:scale-105 active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest">
            <FiPlus strokeWidth={3} /> Add Recipe
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] px-8">
              <tr>
                <th className="px-8 py-6">Thumbnail & Name</th>
                <th className="px-6 py-6 text-center">Time</th>
                <th className="px-6 py-6 text-center">YouTube</th>
                <th className="px-8 py-6 text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRecipes.map((r, idx) => {
                const originalIndex = recipes.indexOf(r);
                return (
                  <tr key={idx} className="hover:bg-slate-50/50 transition duration-300 group">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-10 bg-slate-100 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center shrink-0">
                           {r.img ? (
                             <img src={r.img} className="w-full h-full object-cover" alt="" />
                           ) : (
                             <span className="text-[10px] text-slate-300">VOID</span>
                           )}
                        </div>
                        <div className="font-bold text-slate-800 tracking-tight text-sm">{r.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full border border-slate-100 font-bold text-slate-500 text-[10px] uppercase">
                        <FiClock size={12} className="text-primary" /> {r.time || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {r.youtubeLink ? (
                        <a href={r.youtubeLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-8 h-8 bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition shadow-sm">
                           <FiYoutube size={16} />
                        </a>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-300 uppercase italic">Null</span>
                      )}
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex justify-end gap-2">
                         <button onClick={() => handleEdit(r, originalIndex)} className="p-2.5 text-slate-300 hover:text-primary transition-all hover:bg-slate-50 rounded-xl">
                           <FiEdit size={16} />
                         </button>
                         <button onClick={() => openDeleteConfirm(originalIndex)} className="p-2.5 text-slate-300 hover:text-red-500 transition-all hover:bg-slate-50 rounded-xl">
                           <FiTrash2 size={16} />
                         </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredRecipes.length === 0 && (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                <FiGrid size={32} />
              </div>
              <p className="text-slate-300 font-bold uppercase text-[10px] tracking-widest italic animate-pulse">No recipes found in your inventory.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals & Popups */}
      <RecipeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipe={editingRecipe}
        onSave={onModalSave}
        loading={modalLoading}
      />

      <ConfirmPopup 
        isOpen={confirm.isOpen}
        onClose={() => setConfirm({ ...confirm, isOpen: false })}
        onConfirm={confirmDelete}
        title="Destroy Recipe Record?"
        message="This operation will purge this recipe from the live homepage feed. This action cannot be reversed."
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

export default RecipeManager;
