import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState({
    heroBanner: { 
      message: "Authentic & Nutritious", 
      subMessage: "Quick to cook, easy to digest. Discover the joy of perfect semiya every time." 
    },
    whyChooseUs: [
      { title: "100% Raw Hard Wheat", icon: "🌾", description: "Sourced from the finest grains." },
      { title: "Zero Maida", icon: "🌿", description: "Completely natural, healthy choice." },
      { title: "Quick Cooking", icon: "⏱️", description: "Ready in just 5-7 minutes." }
    ]
  });

  const [featuredProducts, setFeaturedProducts] = useState([
    { _id: '1', name: "Roasted Vermicelli", description: "Golden roasted for that perfect aroma and non-sticky texture.", images: ["https://images.unsplash.com/photo-1611060205850-205934522401?auto=format&fit=crop&w=500&q=80"], category: "Signature" },
    { _id: '2', name: "Raw Wheat Semiya", description: "100% pure hard wheat semolina. The healthy choice for every meal.", images: ["https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?auto=format&fit=crop&w=500&q=80"], category: "Classic" },
    { _id: '3', name: "Quick Cook Vermicelli", description: "Extra thin strands for lightning fast breakfasts.", images: ["https://images.unsplash.com/photo-1616431718012-39f50682136e?auto=format&fit=crop&w=500&q=80"], category: "Instant" }
  ]);
  
  const recipes = [
    { name: "Sweet Semiya Payasam", img: "https://images.unsplash.com/photo-1626450949065-226e6ba1f0e4?auto=format&fit=crop&w=400&q=80", time: "20 Mins" },
    { name: "Spicy Semiya Upma", img: "https://images.unsplash.com/photo-1589113103551-24867990b790?auto=format&fit=crop&w=400&q=80", time: "15 Mins" },
    { name: "Semiya Vegetable Biryani", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80", time: "30 Mins" }
  ];

  const steps = [
    { title: "Premium Sourcing", desc: "Selecting the highest quality hard wheat.", icon: "1️⃣" },
    { title: "Hygienic Extrusion", desc: "Automated, untouched-by-hand processing.", icon: "2️⃣" },
    { title: "Safe Packaging", desc: "Sealed tight to retain texture & freshness.", icon: "3️⃣" },
  ];

  useEffect(() => {
    // Attempt to override dummy data with dynamic CMS data
    axios.get('http://localhost:5001/api/homepage')
      .then(res => { if(res.data && res.data.heroBanner?.message) setData(res.data) })
      .catch(() => console.log('Using default static data'));

    // Attempt to fetch actual products
    axios.get('http://localhost:5001/api/products')
      .then(res => { if(res.data && res.data.length > 0) setFeaturedProducts(res.data.slice(0, 3)) })
      .catch(() => console.log('Using default featured products'));
  }, []);

  return (
    <div className="w-full bg-[#F9FAFB]">
      
      {/* Hero Section */}
      <section className="relative bg-white pt-24 pb-16 lg:py-32 overflow-hidden flex items-center min-h-[85vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
<<<<<<< Updated upstream
              <span className="inline-block py-1.5 px-4 rounded-full bg-red-100 text-primary font-bold text-sm tracking-widest uppercase shadow-sm">Established Since 2005</span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {data.heroBanner?.message} <br/>
                <span className="text-primary block mt-2 text-6xl md:text-8xl">Sangu Semiya</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                {data.heroBanner?.subMessage}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                <a href="https://amazon.com" target="_blank" rel="noreferrer" className="bg-[#FF9900] hover:bg-[#ffaa22] text-black px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-orange-200 transition transform hover:-translate-y-1 flex items-center justify-center">
                  Buy on Amazon
                </a>
                <Link to="/bulk-order" className="bg-white border-2 border-primary text-primary hover:bg-red-50 px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-red-100 transition transform hover:-translate-y-1 flex items-center justify-center">
                  Bulk Enquiry
=======
              <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-red-50 border border-red-100 text-primary font-bold text-[10px] tracking-[0.2em] uppercase shadow-sm">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                Perfecting Texture Since 2005
              </div>
              <h1 className="text-48px-to-64px font-bold text-slate-900 tracking-tight leading-[1.1] uppercase">
                {data.heroBanner?.message || "Authentic &"} <br/>
                <span className="text-primary italic">Nutritious</span>
              </h1>
              <style dangerouslySetInnerHTML={{ __html: `.text-48px-to-64px { font-size: clamp(2.5rem, 6vw, 4rem); }` }} />
              <p className="text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                {data.heroBanner?.subMessage || "Quick to cook, easy to digest. Discover the joy of perfect semiya every time."}
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                <a href="https://amazon.in" target="_blank" rel="noreferrer" className="group bg-slate-900 hover:bg-primary text-white px-8 py-4 rounded-xl font-bold text-xs tracking-widest uppercase shadow-xl transition-all duration-500 flex items-center gap-2">
                  Shop on Amazon 
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
                <Link to="/products" className="bg-white border-2 border-slate-100 text-slate-900 hover:border-primary hover:text-primary px-8 py-4 rounded-xl font-bold text-xs tracking-widest uppercase transition-all duration-500 flex items-center justify-center">
                  Explore Catalog
>>>>>>> Stashed changes
                </Link>
              </div>
            </div>
            
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none animate-fade-in">
              <div className="absolute top-0 -left-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply opacity-50 blur-3xl animate-blob"></div>
              <div className="absolute top-0 -right-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
              <div className="relative bg-white p-3 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition duration-500">
                 <img src="https://images.unsplash.com/photo-1611060205850-205934522401?auto=format&fit=crop&w=800&q=80" alt="Sangu Semiya bowl" className="rounded-2xl w-full object-cover h-[450px]" />
                 <div className="absolute -bottom-6 -left-6 bg-white px-6 py-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
                   <span className="text-4xl">🌾</span>
                   <div>
                     <p className="font-bold text-gray-900">100% Pure</p>
                     <p className="text-sm text-gray-500">Hard Wheat Semolina</p>
                   </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Why Families Trust Us</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.whyChooseUs?.map((item, index) => (
              <div key={index} className="bg-white rounded-3xl p-10 text-center hover:shadow-2xl hover:shadow-red-50 transition duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="text-6xl mb-6 bg-red-50 w-24 h-24 mx-auto rounded-full items-center justify-center flex shadow-inner">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 font-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-white">
<<<<<<< Updated upstream
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Our Premium Varieties</h2>
              <p className="text-gray-600 max-w-xl font-medium">From classic wheat to golden roasted, explore the range that has made Sangu a household name.</p>
            </div>
            <Link to="/products" className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-red-100 hover:bg-opacity-90 transition">View All Products</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredProducts.map((product) => (
              <div key={product._id} className="group bg-[#F9FAFB] rounded-[2.5rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
                <div className="h-72 relative overflow-hidden">
=======
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-bold text-[10px] tracking-[0.3em] uppercase mb-3 block">Premium Selection</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight uppercase">Gold-Standard Range</h2>
            </div>
            <Link to="/products" className="group flex items-center gap-3 text-slate-900 font-bold uppercase text-[10px] tracking-widest pb-1.5 border-b border-slate-900 hover:text-primary hover:border-primary transition-all duration-300">
               Explore Full Catalog
               <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {featuredProducts.map((p, idx) => (
              <div key={p._id || p.id || idx} className="group relative flex flex-col">
                <Link to={`/product/${p.name}`} className="relative aspect-[4/5] overflow-hidden bg-slate-50 rounded-xl mb-4 border border-slate-100">
>>>>>>> Stashed changes
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                  />
<<<<<<< Updated upstream
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                    {product.category || 'Featured'}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition">{product.name}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-2 text-sm font-medium">{product.description}</p>
                  <Link 
                    to={`/product/${product._id}`} 
                    className="inline-flex items-center text-primary font-black uppercase text-xs tracking-widest hover:gap-2 transition-all"
                  >
                    View Details <span className="ml-1">&rarr;</span>
                  </Link>
=======
                  {idx === 0 && (
                    <div className="absolute top-3 right-3 bg-primary text-white text-[8px] font-bold uppercase py-1 px-3 rounded-full shadow-lg">
                      Best Seller
                    </div>
                  )}
                </Link>

                <div className="text-left px-1">
                  <Link to={`/product/${p.name}`}>
                    <h3 className="text-xs font-bold text-slate-800 hover:text-primary transition-colors line-clamp-1 mb-1 uppercase tracking-tight">{p.name}</h3>
                  </Link>
                  <p className="text-primary font-bold text-base">{p.price || "₹45.00"}</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">{p.category || "Authentic"}</p>
>>>>>>> Stashed changes
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Flow */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
             <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Our Production Process</h2>
             <p className="text-gray-600 text-lg">Untouched by hand, packed with love.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-red-100 transform -translate-y-1/2 z-0"></div>
            {steps.map((step, idx) => (
               <div key={idx} className="relative z-10 bg-white p-8 rounded-3xl border-2 border-red-50 shadow-lg text-center">
                 <div className="text-5xl mb-4">{step.icon}</div>
                 <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                 <p className="text-gray-600">{step.desc}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Previews */}
<<<<<<< Updated upstream
      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
             <div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Cooking Inspiration</h2>
                <div className="w-24 h-1.5 bg-secondary rounded-full"></div>
             </div>
             <Link to="/products" className="hidden md:inline-block text-primary font-bold hover:underline">View All Varieties &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {recipes.map((recipe, idx) => (
                <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition group border border-gray-100 relative">
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold shadow-md z-10 text-gray-800">
                    ⏱️ {recipe.time}
                  </div>
                  <div className="h-64 overflow-hidden">
                    <img src={recipe.img} alt={recipe.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{recipe.name}</h3>
                  </div>
=======
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="mb-12 space-y-3">
              <span className="inline-block py-1 px-3 rounded-full bg-red-50 border border-red-100 text-primary font-bold text-[9px] tracking-[0.2em] uppercase shadow-sm">Kitchen Ready</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight uppercase">Cooking Inspiration</h2>
           </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {recipes.map((recipe, idx) => (
                <div key={idx} className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_45px_100px_-20px_rgba(218,41,28,0.15)] transition duration-700 group border border-slate-100 relative">
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-2xl text-[10px] font-bold shadow-lg z-10 text-slate-900 tracking-widest border border-white/50">⏱ {recipe.time}</div>
                  <div className="h-80 overflow-hidden">
                    <img src={recipe.img} alt={recipe.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000" />
                  </div>
                  <div className="p-10 text-center font-bold text-2xl text-slate-900 group-hover:text-primary transition-colors italic">{recipe.name}</div>
>>>>>>> Stashed changes
                </div>
             ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
