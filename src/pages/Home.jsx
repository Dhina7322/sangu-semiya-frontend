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
import FounderSection from '../components/home/FounderSection';
import MilestoneSection from '../components/home/MilestoneSection';
import CookingInspiration from '../components/home/CookingInspiration';

const Home = () => {
  const [data, setData] = useState({
    heroBanner: { 
      message: "Sangu Brand Semiya", 
      subMessage: "Offering delectable and authentic traditional foods for over three decades. Trusted by families since 1982." 
    },
    whyChooseUs: [
      { title: "Quick Cooking", icon: "https://img.icons8.com/3d-fluency/94/stopwatch.png", description: "Ready in just 5-7 minutes for your busy mornings." },
      { title: "Easy to Digest", icon: "https://img.icons8.com/3d-fluency/94/tea-leaves.png", description: "Light on the stomach, made from 100% hard wheat." },
      { title: "Healthy Variants", icon: "https://img.icons8.com/3d-fluency/94/wheat.png", description: "Ragi, Kambu & Wheat — Zero Maida, high fiber." },
      { title: "Multiple Uses", icon: "https://img.icons8.com/3d-fluency/94/steaming-bowl.png", description: "Perfect for Payasam, Upma, Biryani, and more." },
      { title: "Long Shelf Life", icon: "https://img.icons8.com/3d-fluency/94/security-shield.png", description: "Stays fresh longer with our quality packaging." }
    ],
    recipes: []
  });

  const [featuredProducts, setFeaturedProducts] = useState([
    { _id: '1', name: "Roasted Vermicelli", description: "Premium roasted vermicelli, non-sticky & golden.", images: ["https://images.unsplash.com/photo-1627286301435-06f157f12270?auto=format&fit=crop&q=80&w=800"], category: "Signature" },
    { _id: '2', name: "Ragi Vermicelli", description: "Nutrient-rich Ragi vermicelli for healthy living.", images: ["https://images.unsplash.com/photo-1598515214041-0ca2dd675d0b?auto=format&fit=crop&q=80&w=800"], category: "Healthy" },
    { _id: '3', name: "Veg Noodles", description: "Quick-cook vegetable noodles for the whole family.", images: ["https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=800"], category: "Noodles" },
    { _id: '4', name: "Chinese Noodles", description: "Authentic Chinese-style noodles, perfect stir-fry base.", images: ["https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800"], category: "Noodles" }
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
        const res = await axios.get('http://localhost:5001/api/homepage');
        if(res.data) {
          const apiData = { ...res.data };
          setData(prev => ({ ...prev, ...apiData }));
        }
      } catch (err) { console.log('Using default home data'); }
    };

    const fetchFeaturedProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/products');
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
    <div className="w-full bg-white font-sans selection:bg-secondary selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-white pt-10 pb-10 lg:pt-16 lg:pb-24 overflow-hidden flex items-center">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 skew-x-[-12deg] translate-x-20 z-0 border-l border-slate-100 opacity-40"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="text-center lg:text-left space-y-4 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-red-50 border border-red-100 text-secondary font-semibold text-[8px] tracking-widest uppercase">
                Established 1982
              </div>
              <h1 className="text-3xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
                Authentic & <br/>
                <span className="text-secondary italic">Nutritious Food</span>
              </h1>
              <p className="text-base text-slate-500 max-w-sm mx-auto lg:mx-0 font-normal leading-relaxed">
                Offering delectable and authentic traditional foods for over three decades — trusted by families since 1982.
              </p>
              
              <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start pt-2">
                <a href="https://amazon.in" target="_blank" rel="noreferrer" className="group bg-slate-900 hover:bg-secondary text-white px-5 py-3 rounded-lg font-semibold text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center gap-2">
                  Shop on Amazon 
                  <span>→</span>
                </a>
                <Link to="/products" className="bg-white border border-slate-200 text-slate-400 hover:border-secondary hover:text-secondary px-5 py-3 rounded-lg font-semibold text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center justify-center">
                  View Catalog
                </Link>
              </div>
            </div>
            
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative p-2 rounded-2xl group border border-slate-100 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                   <img 
                    src="https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=800" 
                    alt="Sangu Brand Semiya" 
                    className="rounded-xl w-full object-cover h-[400px] lg:h-[500px]" 
                   />
              </div>
            </div>
          </div>
        </div>
      </section>

      <AmazonStrip />
      
      <section className="py-14 lg:py-20">
        <FounderSection />
      </section>

      <CookingInspiration recipes={data.recipes} />

      {data.whyChooseUs && (
        <section className="py-14 lg:py-20 bg-slate-50/30">
          <WhyChooseUs data={data.whyChooseUs} />
        </section>
      )}

      <ProductionProcess steps={steps} />

      <section className="py-14 lg:py-20">
        <ProductBenefits benefits={benefits} />
      </section>
      
      {/* featured gallery */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div className="space-y-1">
              <span className="text-secondary font-medium text-[8px] tracking-widest uppercase block">Premium Selection</span>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">Gold-Standard Range</h2>
            </div>
            <Link to="/products" className="text-slate-400 font-medium uppercase text-[9px] tracking-widest pb-1 border-b border-slate-50 hover:text-secondary hover:border-secondary transition-all">
               View All Products
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p, idx) => (
              <div key={p._id || p.id || idx} className="group relative flex flex-col">
                <Link to={`/product/${p.name}`} className="relative aspect-square overflow-hidden bg-slate-50 rounded-2xl mb-4 border border-slate-100">
                  <img 
                    src={p.images?.[0] || 'https://via.placeholder.com/500?text=Sangu+Semiya'} 
                    alt={p.name} 
                    className="w-full h-full object-contain p-6 transform group-hover:scale-105 transition duration-500" 
                  />
                </Link>

                <div className="text-left px-1">
                  <Link to={`/product/${p.name}`}>
                    <h3 className="text-xs font-semibold text-slate-800 hover:text-primary transition-colors line-clamp-1 mb-1 uppercase tracking-tight">{p.name}</h3>
                  </Link>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{p.category || "Authentic"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MilestoneSection />

      <section className="">
        <BulkOrderCTA />
      </section>

      <section className="py-14 lg:py-20 bg-slate-50/50">
        <EnquirySection trustCards={trustCards} />
      </section>
      
    </div>
  );
};

export default Home;
