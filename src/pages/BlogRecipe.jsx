import React from 'react';
import { FiClock, FiUsers, FiChevronRight } from 'react-icons/fi';

const recipes = [
  {
    name: 'Sweet Semiya Payasam',
    description: 'A classic South Indian dessert made with roasted vermicelli, milk, sugar, and garnished with cashews and raisins. Perfect for festivals and celebrations.',
    time: '20 Mins',
    serves: '4 People',
    difficulty: 'Easy',
    product: 'Roasted Vermicelli',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=600',
    color: 'from-amber-50 to-orange-50',
  },
  {
    name: 'Spicy Semiya Upma',
    description: 'A hearty breakfast dish of roasted vermicelli tempered with mustard seeds, curry leaves, and fresh vegetables. Quick, nutritious, and flavorful.',
    time: '15 Mins',
    serves: '3 People',
    difficulty: 'Easy',
    product: 'Roasted Vermicelli',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
    color: 'from-green-50 to-emerald-50',
  },
  {
    name: 'Vermicelli Biryani',
    description: 'A lighter twist on the classic biryani using fine vermicelli strands with aromatic spices and mixed vegetables. A perfect meal for the whole family.',
    time: '30 Mins',
    serves: '4 People',
    difficulty: 'Medium',
    product: 'Wheat Vermicelli',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600',
    color: 'from-rose-50 to-red-50',
  },
  {
    name: 'Ragi Vermicelli Kheer',
    description: 'A healthy dessert made with nutrient-rich Ragi vermicelli, jaggery, and coconut milk. A guilt-free treat packed with protein and calcium.',
    time: '25 Mins',
    serves: '4 People',
    difficulty: 'Easy',
    product: 'Ragi Vermicelli',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600',
    color: 'from-violet-50 to-purple-50',
  },
  {
    name: 'Chinese Noodle Stir Fry',
    description: 'Quick and delicious stir-fried Chinese noodles with seasonal vegetables and soy sauce. A family favourite that\'s ready in minutes.',
    time: '20 Mins',
    serves: '3 People',
    difficulty: 'Easy',
    product: 'Chinese Noodles',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=600',
    color: 'from-sky-50 to-blue-50',
  },
  {
    name: 'Kambu Vermicelli Pongal',
    description: 'A wholesome South Indian breakfast featuring protein-rich Kambu (pearl millet) vermicelli with pepper and cumin seasoning.',
    time: '20 Mins',
    serves: '3 People',
    difficulty: 'Easy',
    product: 'Kambu Vermicelli',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600',
    color: 'from-yellow-50 to-amber-50',
  },
];

const BlogRecipe = () => {
  return (
    <div className="w-full bg-white font-sans">

      {/* Hero Banner */}
      <section className="relative bg-slate-900 py-32 lg:py-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-primary border border-white/10 font-black text-[10px] tracking-[0.3em] uppercase mb-6">
            Kitchen Inspiration
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6">
            Blog & Recipes
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
            Discover delicious recipes and cooking inspiration using Sangu Brand products
          </p>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {recipes.map((recipe, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_80px_-20px_rgba(218,41,28,0.12)] transition-all duration-700 group border border-slate-100 relative">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  />
                  {/* Overlay badges */}
                  <div className="absolute top-5 left-5 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[10px] font-black shadow-lg text-slate-900 tracking-widest flex items-center gap-1.5">
                      <FiClock size={12} /> {recipe.time}
                    </span>
                    <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[10px] font-black shadow-lg text-slate-900 tracking-widest flex items-center gap-1.5">
                      <FiUsers size={12} /> {recipe.serves}
                    </span>
                  </div>
                  <div className="absolute bottom-5 right-5">
                    <span className={`bg-secondary text-white px-4 py-1.5 rounded-xl text-[10px] font-black shadow-lg tracking-widest uppercase`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-4">
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest text-secondary bg-red-50 px-3 py-1 rounded-full">
                    {recipe.product}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-secondary transition-colors leading-tight">
                    {recipe.name}
                  </h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">
                    {recipe.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">Have a Recipe to Share?</h2>
          <p className="text-xl text-slate-500 font-medium">
            Love cooking with Sangu Brand products? Share your recipe with us and get featured on our blog!
          </p>
          <a href="mailto:info@sangubrandsemiya.com" className="inline-flex items-center gap-3 bg-secondary hover:bg-red-700 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 shadow-xl group">
            Share Your Recipe
            <FiChevronRight className="group-hover:translate-x-2 transition-transform duration-300" />
          </a>
        </div>
      </section>

    </div>
  );
};

export default BlogRecipe;
