import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/products');
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products', err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return (
<<<<<<< Updated upstream
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-xl font-bold text-primary animate-pulse tracking-widest uppercase">Loading Sangu Semiya...</div>
=======
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
         <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
         <div className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] animate-pulse">Loading Excellence</div>
      </div>
>>>>>>> Stashed changes
    </div>
  );

  return (
    <div className="bg-white min-h-screen py-20 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
<<<<<<< Updated upstream
        <div className="text-center mb-20 animate-fade-in-down">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Our Premium Range</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Delicious, healthy, and high-quality vermicelli varieties crafted for your family&apos;s favorite recipes.</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold text-lg italic">Our kitchen is currently preparing new varieties. Check back soon!</p>
=======
        <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-in-down">
          <span className="text-primary font-bold text-[10px] tracking-[0.3em] uppercase mb-3 block">Premium Collection</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight uppercase">Authentic Taste, <br/><span className="text-primary italic">Modern Choice</span></h1>
          <p className="text-lg text-slate-500 font-normal leading-relaxed">Discover our range of gold-standard vermicelli, crafted with 100% hard wheat for the perfect texture in every dish.</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-3xl mb-4">🌾</div>
            <p className="text-slate-400 font-bold text-lg uppercase tracking-widest italic">New varieties coming soon</p>
>>>>>>> Stashed changes
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map(product => (
              <div key={product._id} className="bg-white rounded-[2.5rem] shadow-sm hover:shadow-[0_20px_60px_-15px_rgba(218,41,28,0.15)] transition-all duration-500 overflow-hidden border border-slate-100 group">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={product.images[0] || 'https://via.placeholder.com/500?text=Sangu+Semiya'} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" 
                  />
<<<<<<< Updated upstream
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[11px] font-black text-slate-900 shadow-xl border border-white/50 uppercase tracking-widest">
                    {product.packSize}
                  </div>
                  {product.category && (
                    <div className="absolute top-6 left-6 bg-primary/95 text-white px-4 py-1.5 rounded-2xl text-[11px] font-black shadow-xl uppercase tracking-widest">
                      {product.category}
=======
                  
                  {/* SALE Ribbon */}
                  <div className="absolute top-0 right-0 overflow-hidden w-16 h-16 pointer-events-none">
                    <div className="absolute top-2 right-[-25px] bg-primary text-white text-[8px] font-bold uppercase py-1 px-8 rotate-45 shadow-sm">
                      SALE
                    </div>
                  </div>

                  {/* Quick Action Overlay (Optional but nice) */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </Link>

                {/* Product Info Section */}
                <div className="text-left mt-1">
                  <Link to={`/product/${product.name}`}>
                    <h3 className="text-sm font-semibold text-slate-800 hover:text-primary transition-colors line-clamp-1 mb-1">{product.name}</h3>
                  </Link>
                  
                  {product.price ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-primary font-bold text-lg leading-none">{product.price}</span>
                      <span className="text-slate-400 line-through text-xs font-medium">
                        ₹{Math.round(parseInt(product.price.replace(/[^\d]/g, '')) * 1.2)}
                      </span>
>>>>>>> Stashed changes
                    </div>
                  )}
                </div>
                
                <div className="p-10">
                  <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-primary transition duration-300">{product.name}</h3>
                  <p className="text-slate-500 mb-8 line-clamp-2 font-medium leading-relaxed">{product.description}</p>
                  
                  <div className="space-y-4">
                    <Link to={`/product/${product._id}`} className="block text-center w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-200">
                       Product Details
                    </Link>
                    {product.amazonLink && (
                      <a href={product.amazonLink} target="_blank" rel="noopener noreferrer" className="text-center w-full py-4 bg-[#FF9900] hover:bg-[#ffaa22] text-white font-black rounded-2xl transition-all duration-300 shadow-lg shadow-orange-100 flex justify-center items-center">
                        Buy on Amazon <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /></svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
