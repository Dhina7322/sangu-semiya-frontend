import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-xl font-bold text-primary animate-pulse tracking-widest uppercase">Loading Sangu Semiya...</div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen py-20 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-20 animate-fade-in-down">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Our Premium Range</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Delicious, healthy, and high-quality vermicelli varieties crafted for your family&apos;s favorite recipes.</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold text-lg italic">Our kitchen is currently preparing new varieties. Check back soon!</p>
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
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[11px] font-black text-slate-900 shadow-xl border border-white/50 uppercase tracking-widest">
                    {product.packSize}
                  </div>
                  {product.category && (
                    <div className="absolute top-6 left-6 bg-primary/95 text-white px-4 py-1.5 rounded-2xl text-[11px] font-black shadow-xl uppercase tracking-widest">
                      {product.category}
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
