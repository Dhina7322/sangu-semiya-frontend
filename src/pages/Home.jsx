import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Reusable Components
import WhyChooseUs from '../components/home/WhyChooseUs';
import ProductionProcess from '../components/home/ProductionProcess';
import ProductBenefits from '../components/home/ProductBenefits';
import BulkOrderCTA from '../components/home/BulkOrderCTA';
import AmazonStrip from '../components/home/AmazonStrip';
import EnquirySection from '../components/home/EnquirySection';

const Home = () => {
  const [data, setData] = useState({
    heroBanner: { 
      message: "Sangu Brand Semiya", 
      subMessage: "Discover the professional touch with our premium wheat strands. Healthy, Delicious & Quick to Cook since 2005." 
    },
    whyChooseUs: [
      { title: "Quick Cooking", icon: "https://img.icons8.com/3d-fluency/94/stopwatch.png", description: "Ready in just 5-7 minutes for your busy mornings." },
      { title: "Easy to Digest", icon: "https://img.icons8.com/3d-fluency/94/tea-leaves.png", description: "Light on the stomach, made from 100% hard wheat." },
      { title: "Healthy Variants", icon: "https://img.icons8.com/3d-fluency/94/wheat.png", description: "Zero Maida, high fiber, and nutritionally rich." },
      { title: "Multiple Uses", icon: "https://img.icons8.com/3d-fluency/94/steaming-bowl.png", description: "Perfect for Payasam, Upma, Biryani, and more." },
      { title: "Long Shelf Life", icon: "https://img.icons8.com/3d-fluency/94/security-shield.png", description: "Stays fresh longer with our triple-layer packaging." }
    ]
  });

  const [featuredProducts, setFeaturedProducts] = useState([
    { _id: '1', name: "Classic Wheat Semiya", description: "100% pure hard wheat semolina.", images: ["https://images.unsplash.com/photo-1627286301435-06f157f12270?auto=format&fit=crop&q=80&w=800"], category: "Signature", price: "₹45.00" },
    { _id: '2', name: "Golden Roasted Vermicelli", description: "Expertly roasted for a non-sticky texture.", images: ["https://images.unsplash.com/photo-1598515214041-0ca2dd675d0b?auto=format&fit=crop&q=80&w=800"], category: "Classic", price: "₹52.00" },
    { _id: '3', name: "Fine Strand Vermicelli", description: "Extra thin strands made from premium durum wheat.", images: ["https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=800"], category: "Instant", price: "₹48.00" }
  ]);
  
  const [recipes, setRecipes] = useState([
    { name: "Sweet Semiya Payasam", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=600", time: "20 Mins" },
    { name: "Spicy Semiya Upma", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600", time: "15 Mins" },
    { name: "Fine Vegetable Biryani", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600", time: "30 Mins" }
  ]);

  const steps = [
    { title: "Raw Selection", icon: "🚜", desc: "Sourcing the finest hard wheat grains." },
    { title: "Cleaning", icon: "✨", desc: "Multi-stage automated purification." },
    { title: "Production", icon: "⚙️", desc: "Untouched-by-hand extrusion." },
    { title: "Quality Check", icon: "🔬", desc: "ISO-standard nutritional testing." }
  ];

  const benefits = [
    { title: "Ingredients", icon: "🌾", desc: "100% Hard Wheat Semolina / Durum Wheat.", items: ["No Maida", "No Bleach", "No Additives"] },
    { title: "Health Benefits", icon: "💪", desc: "Rich in complex carbohydrates and gluten-friendly.", items: ["Zero Cholesterol", "Low GI", "Fiber Rich"] },
    { title: "Usage Ideas", icon: "🍳", desc: "Versatile base for global and local recipes.", items: ["Breakfast Upma", "Classic Payasam", "Vermicelli Pasta"] }
  ];

  const trustCards = [
    { title: "Easy Management", icon: "📊", desc: "Simplified stocking and fast-moving inventory for retail partners." },
    { title: "User Friendly", icon: "😊", desc: "Consistent texture ensures perfect results for every home chef." },
    { title: "Business Growth", icon: "📈", desc: "Proven market demand and strong customer loyalty drive your profits." }
  ];

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5001/api/homepage');
        if(res.data) {
          setData(prev => ({ ...prev, ...res.data }));
          if (res.data.recipes?.length > 0) setRecipes(res.data.recipes);
        }
      } catch (err) { console.log('Using default home data'); }
    };

    const fetchFeaturedProducts = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5001/api/products');
        if(res.data?.length > 0) {
          const featured = res.data.filter(p => p.featured);
          setFeaturedProducts(featured.length > 0 ? featured.slice(0, 4) : res.data.slice(0, 4));
        }
      } catch (err) { console.log('Using default featured focus'); }
    };

    fetchHomeData();
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="w-full bg-white font-sans selection:bg-primary selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-white pt-32 pb-16 lg:pt-48 lg:pb-40 overflow-hidden flex items-center min-h-[90vh]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 skew-x-[-12deg] translate-x-20 z-0 border-l border-slate-100 opacity-60"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-red-50 border border-red-100 text-primary font-black text-[11px] tracking-[0.2em] uppercase shadow-sm">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                Perfecting Texture Since 2005
              </div>
              <h1 className="text-64px-to-88px font-black text-slate-900 tracking-[-0.04em] leading-[0.95]">
                {data.heroBanner?.message || "Authentic &"} <br/>
                <span className="text-primary italic">Nutritious</span>
              </h1>
              <style dangerouslySetInnerHTML={{ __html: `.text-64px-to-88px { font-size: clamp(3.5rem, 8vw, 5.5rem); }` }} />
              <p className="text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                {data.heroBanner?.subMessage || "Quick to cook, easy to digest. Discover the joy of perfect semiya every time."}
              </p>
              
              <div className="flex flex-wrap gap-5 justify-center lg:justify-start pt-6">
                <a href="https://amazon.in" target="_blank" rel="noreferrer" className="group bg-slate-900 hover:bg-primary text-white px-10 py-5 rounded-2xl font-black text-sm tracking-widest uppercase shadow-2xl transition-all duration-500 flex items-center gap-3">
                  Shop on Amazon 
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </a>
                <Link to="/products" className="bg-white border-2 border-slate-100 text-slate-900 hover:border-primary hover:text-primary px-10 py-5 rounded-2xl font-black text-sm tracking-widest uppercase transition-all duration-500 flex items-center justify-center">
                  Explore Catalog
                </Link>
              </div>
            </div>
            
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute top-0 -left-10 w-96 h-96 bg-red-100/50 rounded-full blur-[100px] animate-blob"></div>
              <div className="absolute bottom-0 -right-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
              <div className="relative p-4 rounded-[4rem] group border border-slate-100 shadow-2xl bg-white/50 backdrop-blur-sm">
                   <img 
                    src="https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=1000" 
                    alt="Sangu Semiya Gourmet" 
                    className="rounded-[3.2rem] w-full object-cover h-[500px] lg:h-[600px] shadow-sm transform hover:scale-[1.02] transition-transform duration-700" 
                   />
              </div>
            </div>
          </div>
        </div>
      </section>

      <AmazonStrip />
      {data.whyChooseUs && <WhyChooseUs data={data.whyChooseUs} />}
      <ProductionProcess steps={steps} />
      <ProductBenefits benefits={benefits} />
      
      {/* Featured Products Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4 block">Premium Selection</span>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">Gold-Standard Range</h2>
            </div>
            <Link to="/products" className="group flex items-center gap-4 text-slate-900 font-black uppercase text-xs tracking-widest pb-2 border-b-2 border-slate-900 hover:text-primary hover:border-primary transition-all duration-300">
               Explore Full Catalog
               <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {featuredProducts.map((p, idx) => (
              <div key={p._id || p.id || idx} className="group relative flex flex-col">
                <Link to={`/product/${p.name}`} className="relative aspect-[4/5] overflow-hidden bg-slate-50 rounded-2xl mb-4 border border-slate-100">
                  <img 
                    src={p.images?.[0] || 'https://via.placeholder.com/500?text=Sangu+Semiya'} 
                    alt={p.name} 
                    className="w-full h-full object-contain p-8 transform group-hover:scale-105 transition duration-500" 
                  />
                  {idx === 0 && (
                    <div className="absolute top-4 right-4 bg-primary text-white text-[9px] font-black uppercase py-1 px-3 rounded-full shadow-lg">
                      Best Seller
                    </div>
                  )}
                </Link>

                <div className="text-left px-1">
                  <Link to={`/product/${p.name}`}>
                    <h3 className="text-sm font-bold text-slate-800 hover:text-primary transition-colors line-clamp-1 mb-1 uppercase tracking-tight">{p.name}</h3>
                  </Link>
                  <p className="text-primary font-black text-lg">{p.price || "₹45.00"}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{p.category || "Authentic"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BulkOrderCTA />
      <EnquirySection trustCards={trustCards} />
      
      {/* Recipe Previews */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="mb-16 space-y-4">
              <span className="inline-block py-1.5 px-4 rounded-full bg-red-50 border border-red-100 text-primary font-black text-[10px] tracking-[0.3em] uppercase shadow-sm">Kitchen Ready</span>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">Cooking Inspiration</h2>
           </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {recipes.map((recipe, idx) => (
                <div key={idx} className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_45px_100px_-20px_rgba(218,41,28,0.15)] transition duration-700 group border border-slate-100 relative">
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-2xl text-[10px] font-black shadow-lg z-10 text-slate-900 tracking-widest border border-white/50">⏱ {recipe.time}</div>
                  <div className="h-80 overflow-hidden">
                    <img src={recipe.img} alt={recipe.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000" />
                  </div>
                  <div className="p-10 text-center font-black text-2xl text-slate-900 group-hover:text-primary transition-colors italic">{recipe.name}</div>
                </div>
             ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
