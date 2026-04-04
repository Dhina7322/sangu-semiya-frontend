import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { FiClock, FiChevronLeft, FiPlayCircle, FiArrowRight, FiInfo } from 'react-icons/fi';

const RecipeDetail = () => {
    const { name } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await api.get('/homepage');
                if (res.data?.recipes) {
                    const match = res.data.recipes.find(r => r.name === name);
                    setRecipe(match);
                }
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchRecipe();
        window.scrollTo(0, 0);
    }, [name]);

    if (loading) return <div className="min-h-screen pt-40 flex items-center justify-center font-bold text-slate-300 animate-pulse tracking-[0.4em] uppercase">Loading Recipe...</div>;
    if (!recipe) return <div className="min-h-screen pt-40 flex items-center justify-center font-bold text-slate-300 uppercase italic">Recipe not found.</div>;

    // Helper to extract YouTube ID for embedding
    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId(recipe.youtubeLink);

    return (
        <div className="w-full bg-[#fcfcfc] font-sans selection:bg-primary/20 pb-20">

            {/* 1. CINEMATIC HERO */}
            <section className="relative pt-32 lg:pt-40 pb-24 overflow-hidden bg-slate-900 border-b border-white/5">
                <div className="absolute inset-0 z-0 opacity-30">
                    <img
                        src={recipe.img || 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1200'}
                        className="w-full h-full object-cover blur-sm scale-110"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                </div>

                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-primary transition-all text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full border border-white/10 backdrop-blur">
                        <FiChevronLeft /> Back to Inspiration
                    </Link>

                    <div className="space-y-4">
                        <div className="flex justify-center items-center gap-4 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                            <FiClock className="animate-pulse" /> {recipe.time || '15 MINS'}
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-none animate-fade-in-up">
                            {recipe.name}
                        </h1>
                    </div>
                </div>
            </section>

            {/* 2. VIDEO & CONTENT AREA */}
            <section className="relative -mt-16 z-20">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-white rounded-[3rem] shadow-2xl p-8 lg:p-12 border border-slate-50 space-y-12">
                        
                        {/* Video Player */}
                        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-black group border-4 border-white">
                            {videoId ? (
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                                    title={recipe.name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 space-y-4">
                                    <FiInfo size={48} className="opacity-20" />
                                    <p className="font-bold uppercase tracking-widest text-[10px]">No Video Guide Available</p>
                                </div>
                            )}
                        </div>

                        {/* Quick Facts */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                             <div className="p-6 bg-slate-50 rounded-3xl space-y-2 border border-slate-100">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block italic">Cooking Duration</span>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">{recipe.time || 'Fast'}</h3>
                             </div>
                             <div className="p-6 bg-red-50 rounded-3xl space-y-2 border border-red-100/50">
                                <span className="text-[9px] font-black text-secondary uppercase tracking-widest block italic">Difficulty</span>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">Easy To Serve</h3>
                             </div>
                             <div className="p-6 bg-slate-900 rounded-3xl space-y-2 border border-slate-800 shadow-xl shadow-slate-200">
                                <span className="text-[9px] font-black text-primary uppercase tracking-widest block italic text-center">Video Tutorial</span>
                                <div className="flex justify-center pt-1">
                                    {recipe.youtubeLink ? (
                                        <a href={recipe.youtubeLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white text-xs font-bold hover:text-primary transition-colors">
                                            <FiPlayCircle /> Watch Full Guide
                                        </a>
                                    ) : (
                                        <span className="text-slate-500 text-xs font-bold italic">Manual Guide</span>
                                    )}
                                </div>
                             </div>
                        </div>

                        {/* Description / Preparation Method */}
                        <div className="space-y-6 pt-6 border-t border-slate-50">
                           <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Preparation Method</h2>
                           <div className="text-slate-600 text-[17px] leading-[1.8] font-medium whitespace-pre-wrap max-w-none">
                               {recipe.description || "1. Boil 3 cups of water in a large pan.\n2. Add Sangu Brand Semiya slowly to avoid clumping.\n3. Stir constantly for 3-5 minutes until the vermicelli is soft and fully cooked.\n4. Drain excess water and season with your favorite spices.\n5. Serve hot for a healthy breakfast or evening snack!"}
                           </div>
                        </div>

                        {/* Branding Sidebar style footer */}
                        <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white text-lg font-black shadow-lg shadow-red-50">S</div>
                                <div>
                                    <p className="text-sm font-black text-slate-800 tracking-tight">Sangu Brand Semiya</p>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Premium Wholesale Food Products Since 1982</p>
                                </div>
                            </div>
                            <Link to="/products" className="px-8 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3">
                                Explore Products <FiArrowRight strokeWidth={3} className="text-primary" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RecipeDetail;
