import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product details', err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const [activeImage, setActiveImage] = useState(0);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-xl font-bold text-primary animate-pulse tracking-widest uppercase">Loading Product Details...</div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-4">
      <div className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Product Not Found</div>
      <Link to="/products" className="text-primary font-black uppercase text-xs hover:underline">Back to Shop</Link>
    </div>
  );

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <Link to="/products" className="text-gray-500 hover:text-primary transition font-black uppercase text-xs flex items-center">&larr; Return to Showcase</Link>
        </div>

        <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 p-8 lg:p-16 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-[2.5rem] overflow-hidden shadow-inner border border-slate-100 h-[400px] lg:h-[600px]">
                <img 
                  src={product.images[activeImage] || 'https://via.placeholder.com/800?text=Sangu+Semiya'} 
                  alt={product.name} 
                  className="w-full h-full object-cover shadow-2xl" 
                />
              </div>
              {product.images?.length > 1 && (
                <div className="flex space-x-4 justify-center lg:justify-start">
                  {product.images.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setActiveImage(idx)}
                      className={`h-24 w-24 rounded-2xl overflow-hidden border-4 transition-all duration-300 ${activeImage === idx ? 'border-primary shadow-xl scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest leading-none border border-primary/10">Sangu Original</span>
                {product.sku && <span className="bg-slate-100 text-slate-500 px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest leading-none border border-slate-200">{product.sku}</span>}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">{product.name}</h1>
              
              <div className="inline-flex bg-slate-50 text-slate-700 px-6 py-3 rounded-2xl text-xs font-black mb-8 items-center border border-slate-100 uppercase tracking-tight">
                📦 Standard Packs: <span className="text-primary ml-2">{product.packSize}</span>
              </div>

              <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium">
                {product.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12 border-b border-slate-100 pb-12">
                {product.amazonLink && (
                   <a href={product.amazonLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#FF9900] hover:bg-[#ffaa22] text-white font-black py-5 rounded-[1.5rem] text-center text-lg shadow-xl shadow-orange-100 transition flex justify-center items-center">
                      Buy on Amazon
                   </a>
                )}
                <Link to={`/bulk-order?product=${encodeURIComponent(product.name)}`} className="flex-1 bg-slate-900 border-2 border-slate-900 text-white hover:bg-slate-800 font-black py-5 text-center text-lg transition rounded-[1.5rem] shadow-xl shadow-slate-200">
                  Bulk Enquiry
                </Link>
              </div>

              {/* Dynamic Metadata */}
              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Category</h4>
                    <p className="text-sm font-black text-slate-800 border-l-4 border-primary pl-3 uppercase">{product.category}</p>
                 </div>
                 {product.variants && (
                   <div className="space-y-2">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Variants</h4>
                      <p className="text-sm font-black text-slate-800 border-l-4 border-secondary pl-3 uppercase">{product.variants}</p>
                   </div>
                 )}
              </div>

            </div>

          </div>
        </div>

        {/* Nutritional & Technical Information (Placeholder standard logic) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
                <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center uppercase tracking-tighter"><span className="w-8 h-8 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mr-4 text-xs tracking-normal">🌾</span> Health & Preparation</h3>
                <div className="space-y-6">
                  <p className="text-slate-600 font-medium bg-slate-50 p-6 rounded-2xl border border-slate-100 italic">&quot;Grown from high-grade wheat, our semiya retains its structure and golden hue even after cooking, ensuring no stickiness for your signature dishes.&quot;</p>
                  <ul className="grid grid-cols-1 gap-4 font-black text-xs text-slate-600 uppercase tracking-tight">
                    <li className="flex items-center gap-3"><svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg> 100% Raw Hard Wheat Suji</li>
                    <li className="flex items-center gap-3"><svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg> Roasted to Perfection</li>
                    <li className="flex items-center gap-3"><svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg> Fast 5-Minute Hydration</li>
                  </ul>
                </div>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
                <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center uppercase tracking-tighter"><span className="w-8 h-8 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mr-4 text-xs tracking-normal">📊</span> Nutritional Values</h3>
                <div className="space-y-3">
                   {[
                     ['Energy', '360 kcal'],
                     ['Protein', '10.5 g'],
                     ['Carbohydrates', '77.2 g'],
                     ['Fat', '0.8 g'],
                     ['Fiber', '2.5 g']
                   ].map(([label, val]) => (
                     <div key={label} className="flex justify-between items-center py-3 border-b border-slate-50 group-hover:border-slate-100 transition-colors">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{label}</span>
                        <span className="text-sm font-black text-slate-800">{val} / 100g</span>
                     </div>
                   ))}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
