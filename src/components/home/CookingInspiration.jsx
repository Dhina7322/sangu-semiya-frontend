import React from 'react';

const CookingInspiration = ({ recipes = [] }) => {
  if (!recipes || recipes.length === 0) return null;

  return (
    <section className="py-14 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-2">
          <span className="text-secondary font-medium text-[8px] tracking-widest uppercase block">
            Creative Kitchen
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
            Cooking Inspiration
          </h2>
          <p className="text-xs text-slate-400 font-normal max-w-md mx-auto">
             Discover delicious and healthy recipes crafted to bring out the best in our traditional vermicelli.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {recipes.map((recipe, i) => (
            <div key={i} className="group flex flex-col space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                <img 
                  src={recipe.img || 'https://via.placeholder.com/600x450?text=Sangu+Recipe'} 
                  alt={recipe.name} 
                  className="w-full h-full object-cover transform duration-700 group-hover:scale-105"
                />
                
                {recipe.youtubeLink && (
                  <a 
                    href={recipe.youtubeLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto"
                  >
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </a>
                )}

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-100 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[8px] font-bold text-slate-900 tracking-widest uppercase">
                    {recipe.time || "10 MINS"}
                  </span>
                </div>
              </div>

              <div className="space-y-1 px-1">
                <h3 className="text-sm font-semibold text-slate-800 tracking-tight transition-colors duration-300 group-hover:text-primary">
                  {recipe.name || `Delicious Recipe #${i+1}`}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-px bg-slate-100"></span>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                    Quick & Healthy
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CookingInspiration;
