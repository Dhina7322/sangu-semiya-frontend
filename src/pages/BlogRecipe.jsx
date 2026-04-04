import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiClock, FiBookOpen, FiArrowRight, FiCalendar } from 'react-icons/fi';

const BlogRecipe = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('https://sangu-semiya-backend-bq1f.onrender.com/api/blogs');
        setBlogs(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-300 animate-pulse uppercase tracking-[0.3em]">Loading Collection...</div>;

  return (
    <div className="w-full bg-[#fdfdfd] font-sans selection:bg-primary/30">

      {/* Modern Compact Hero */}
      <section className="bg-slate-900 pt-32 pb-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center space-y-4">
           <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] block animate-fade-in">Editorial</span>
           <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter animate-fade-in-up">Stories & Inspiration</h1>
           <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto animate-fade-in-up delay-100 font-medium leading-relaxed">
             Everything from kitchen tips to traditional secrets, curated by Sangu Brand.
           </p>
        </div>
      </section>

      {/* Balanced compact Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {blogs.length > 0 ? (
               blogs.map((recipe, i) => (
                <Link key={recipe.id || recipe._id || i} to={`/blog/${recipe.slug}`} className="group block space-y-6 animate-fade-in-up" 
                     style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}>
                  
                  {/* Aspect Ratio Controlled Image */}
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 shadow-xl shadow-slate-100 group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-500">
                    <img
                      src={recipe.thumbnail || 'https://via.placeholder.com/800?text=Sangu+Blog'}
                      alt={recipe.title}
                      className="w-full h-full object-cover transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                       <span className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl text-[9px] font-black text-slate-900 flex items-center gap-2 border border-slate-100 shadow-sm">
                          <FiClock className="text-secondary" /> {recipe.time || '15 MIN'}
                       </span>
                    </div>
                  </div>

                  {/* Concise Content */}
                  <div className="space-y-3 px-1">
                    <div className="flex items-center gap-2 text-[9px] font-black text-secondary uppercase tracking-widest">
                       <FiCalendar /> {new Date(recipe.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric'})}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                       {recipe.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-medium">
                       {recipe.short_description}
                    </p>
                    <div className="pt-2">
                       <span className="text-[10px] font-black text-slate-900 inline-flex items-center gap-2 border-b-2 border-primary/20 group-hover:border-primary transition-all pb-0.5 uppercase tracking-widest">
                          Read Full Story <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                       </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
                <div className="lg:col-span-3 text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100 italic font-bold text-slate-300 uppercase tracking-widest text-xs">
                   Awaiting fresh stories...
                </div>
            )}
          </div>
        </div>
      </section>

      {/* Compact CTA */}
      <section className="pb-32 px-6">
         <div className="max-w-4xl mx-auto p-12 lg:p-16 rounded-[2.5rem] bg-slate-900 text-center space-y-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter relative z-10">Have a Culinary Story?</h2>
            <p className="text-slate-400 max-w-sm mx-auto text-sm relative z-10 font-medium">Share your traditional recipes and get featured.</p>
            <a href="mailto:info@sangubrandsemiya.com" className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 relative z-10">
               Contribute Now
            </a>
         </div>
      </section>

    </div>
  );
};

export default BlogRecipe;
