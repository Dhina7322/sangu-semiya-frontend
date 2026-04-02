import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5001/api/products');
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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
         <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
         <div className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Loading Excellence</div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-24 max-w-3xl mx-auto animate-fade-in-down">
          <span className="text-primary font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">Premium Collection</span>
          <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">Authentic Taste, <br/><span className="text-primary italic">Modern Choice</span></h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">Discover our range of gold-standard vermicelli, crafted with 100% hard wheat for the perfect texture in every dish.</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-100">
            <div className="text-4xl mb-6">🌾</div>
            <p className="text-slate-400 font-black text-xl uppercase tracking-widest italic">Our kitchen is preparing new varieties</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map(product => (
              <div key={product._id || product.id} className="group relative flex flex-col animate-fade-in">
                
                {/* Image Section */}
                <Link to={`/product/${product.name}`} className="relative aspect-square overflow-hidden bg-gray-100 rounded-sm mb-4">
                  <img 
                    src={product.images?.[0] || 'https://via.placeholder.com/500?text=Sangu+Semiya'} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-6 transform group-hover:scale-105 transition duration-500" 
                  />
                  
                  {/* SALE Ribbon */}
                  <div className="absolute top-0 right-0 overflow-hidden w-20 h-20 pointer-events-none">
                    <div className="absolute top-3 right-[-30px] bg-primary text-white text-[9px] font-black uppercase py-1 px-10 rotate-45 shadow-sm">
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
                      <span className="text-primary font-black text-lg leading-none">{product.price}</span>
                      <span className="text-slate-400 line-through text-xs font-medium">
                        ₹{Math.round(parseInt(product.price.replace(/[^\d]/g, '')) * 1.2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400 italic">Price on Enquiry</span>
                  )}

                  {product.packSize && (
                    <p className="text-[10px] text-slate-400 mt-1">{product.packSize}</p>
                  )}
                </div>
                
                {/* Secondary Actions (Hidden until hover) */}
                <div className="absolute bottom-16 right-2 flex flex-col gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Link to={`/product/${product.name}`} className="w-10 h-10 bg-white rounded-full border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition shadow-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </Link>
                  {product.amazonLink && (
                    <a href={product.amazonLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full border border-slate-100 flex items-center justify-center text-[#FF9900] hover:bg-[#FF9900] hover:text-white transition shadow-lg">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /></svg>
                    </a>
                  )}
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

