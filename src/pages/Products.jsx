import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiEye, FiExternalLink } from 'react-icons/fi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
         <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
         <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">Loading Collection</div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen py-20 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-16 max-w-2xl mx-auto animate-fade-in-down">
          <span className="text-primary font-bold text-[9px] tracking-widest uppercase mb-3 block">Premium Selection</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">Authentic Taste, <br/><span className="text-primary italic text-3xl md:text-4xl">Modern Choice</span></h1>
          <p className="text-base text-slate-500 font-normal leading-relaxed">Discover our range of gold-standard vermicelli, crafted with 100% hard wheat for the perfect texture in every dish.</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-100">
            <div className="text-3xl mb-4">🌾</div>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest italic">Our kitchen is preparing new varieties</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map(product => (
              <div key={product._id || product.id} className="group relative flex flex-col animate-fade-in">
                
                <Link to={`/product/${product.name}`} className="relative aspect-square overflow-hidden bg-slate-50 rounded-2xl mb-4 border border-slate-100">
                  <img 
                    src={product.images?.[0] || 'https://via.placeholder.com/500?text=Sangu+Semiya'} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-6 transform group-hover:scale-105 transition duration-500" 
                  />
                  
                  {product.featured && (
                    <div className="absolute top-3 right-3 bg-secondary text-white text-[8px] font-bold uppercase py-1 px-3 rounded-full shadow-lg z-10">
                      Best Seller
                    </div>
                  )}
                </Link>

                <div className="text-left px-1">
                  <Link to={`/product/${product.name}`}>
                    <h3 className="text-xs font-medium text-slate-800 hover:text-primary transition-colors line-clamp-1 mb-1 uppercase tracking-tight">{product.name}</h3>
                  </Link>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">{product.category || "Authentic"}</p>
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
