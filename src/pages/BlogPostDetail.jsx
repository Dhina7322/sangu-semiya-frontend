import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiClock, FiChevronLeft, FiCalendar, FiShare2, FiArrowRight } from 'react-icons/fi';

const BlogPostDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://sangu-semiya-backend-bq1f.onrender.com/api/blogs/${slug}`);
        setBlog(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return <div className="min-h-screen pt-40 flex items-center justify-center font-bold text-slate-300 animate-pulse tracking-[0.4em] uppercase">Opening Story...</div>;
  if (!blog) return <div className="min-h-screen pt-40 flex items-center justify-center font-bold text-slate-300 uppercase italic">Story not found.</div>;

  return (
    <div className="w-full bg-[#fcfcfc] font-sans selection:bg-primary/20 pb-20">
      
      {/* 1. COMPACT HERO HEADER */}
      <section className="relative pt-32 lg:pt-40 pb-24 overflow-hidden bg-slate-900 border-b border-white/5">
        <div className="absolute inset-0 z-0">
           <img 
            src={blog.thumbnail || 'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=1200'} 
            className="w-full h-full object-cover opacity-20 blur-[1px] grayscale-[50%]" 
            alt="" 
           />
           <div className="absolute inset-0 bg-gradient-to-up from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-8">
           <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-primary transition-all text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full border border-white/10 backdrop-blur backdrop-filter">
              <FiChevronLeft /> Back to Stories
           </Link>
           
           <div className="space-y-4">
              <div className="flex justify-center items-center gap-4 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                 <FiCalendar /> {new Date(blog.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric'})}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95]">
                {blog.title}
              </h1>
           </div>
        </div>
      </section>

      {/* 2. COMPACT CONTENT AREA */}
      <section className="relative -mt-12 z-20">
        <div className="max-w-4xl mx-auto px-6">
           <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 lg:p-14 border border-slate-50 space-y-12">
              
              {/* Introduction Card style */}
              <p className="text-xl md:text-2xl font-bold text-slate-400 italic leading-snug border-l-4 border-primary pl-8 py-2">
                 {blog.short_description}
              </p>

              {/* High Quality Main Image */}
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-50 aspect-video lg:aspect-[21/9]">
                 <img 
                  src={blog.thumbnail || 'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=1200'} 
                  className="w-full h-full object-cover" 
                  alt={blog.title} 
                 />
              </div>

              {/* Clean Article Content */}
              <article className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:text-lg prose-p:leading-[1.8] prose-strong:text-slate-900 prose-a:text-secondary whitespace-pre-wrap font-medium">
                 {blog.content}
              </article>

              {/* Share & Signature */}
              <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
                 <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-lg font-black shadow-lg">S</div>
                    <div>
                       <p className="text-sm font-black text-slate-800 tracking-tight">Sangu Brand Kitchen</p>
                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Nourishing Generations Since 1982</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <button className="p-4 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all rounded-2xl shadow-sm">
                       <FiShare2 size={20} />
                    </button>
                    <Link to="/products" className="px-8 py-4 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3">
                       Our Products <FiArrowRight strokeWidth={3} />
                    </Link>
                 </div>
              </div>

           </div>
        </div>
      </section>

      {/* 3. CTA */}
      <section className="pt-24 pb-32">
         <div className="max-w-2xl mx-auto px-6 text-center space-y-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Feeling Inspired to Cook?</h2>
            <p className="text-base text-slate-500 font-medium leading-relaxed max-w-lg mx-auto">
               Discover the authentic taste and health benefits of Sangu Brand's premium vermicelli collection.
            </p>
            <div className="pt-4">
               <Link to="/blog" className="text-[11px] font-black uppercase tracking-widest text-slate-900 border-b-4 border-primary/20 hover:border-secondary transition-all pb-1 leading-loose">
                  Explore More Culinary Stories
               </Link>
            </div>
         </div>
      </section>

    </div>
  );
};

export default BlogPostDetail;
