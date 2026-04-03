import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiBox, FiClock, FiShield, FiBriefcase, FiCheckCircle, FiWind, FiTarget, FiZap, FiActivity, FiTrendingUp, FiPackage } from 'react-icons/fi';
import CookingInspiration from '../components/home/CookingInspiration';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const [productRes, allProductsRes, homeRes] = await Promise.all([
          axios.get(`http://localhost:5001/api/products/${id}`),
          axios.get(`http://localhost:5001/api/products`),
          axios.get(`http://localhost:5001/api/homepage`)
        ]);
        setProduct(productRes.data);
        if (homeRes.data?.recipes) {
          setRecipes(homeRes.data.recipes);
        }
        if (productRes.data) {
          document.title = `${productRes.data.name} | Sangu Brand Semiya`;
          if (productRes.data.packSize) {
            const sizes = productRes.data.packSize.split(',').map(s => s.trim());
            setSelectedSize(sizes[0]);
          }
          const related = allProductsRes.data
            .filter(p => (p.id || p._id) !== (productRes.data.id || productRes.data._id) && p.name !== productRes.data.name)
            .slice(0, 4);
          setRelatedProducts(related);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product details', err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-6 h-6 border-2 border-slate-200 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-4">
      <div className="text-6xl font-bold text-slate-100 tracking-tight">404</div>
      <div className="text-sm font-bold text-slate-800 uppercase tracking-widest">Product Not Found</div>
      <Link to="/products" className="mt-4 bg-slate-900 text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-colors">
        Back to Products
      </Link>
    </div>
  );

  const availableSizes = product.packSize
    ? product.packSize.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  const images = product.images?.length > 0
    ? product.images
    : ['https://via.placeholder.com/800x900?text=Sangu+Semiya'];

  const meta = product.metadata || {};

  const getIcon = (iconName) => {
    const iconMap = {
      'Wind': <FiWind />,
      'Check': <FiCheckCircle />,
      'Clock': <FiClock />,
      'Shield': <FiShield />,
      'Target': <FiTarget />,
      'Zap': <FiZap />,
      'Activity': <FiActivity />,
      'Briefcase': <FiBriefcase />,
      'Chart': <FiTrendingUp />,
      'Box': <FiBox />,
      'Package': <FiPackage />,
    };
    return iconMap[iconName] || <FiPackage />;
  };

  const features = meta.features?.length > 0 ? meta.features.map(f => ({
    icon: typeof f.icon === 'string' ? getIcon(f.icon) : f.icon,
    label: f.label
  })) : [
    { icon: <FiBriefcase />, label: '100% Hard Wheat Semolina' },
    { icon: <FiCheckCircle />, label: 'No Maida, No Bleach, No Additives' },
    { icon: <FiClock />, label: 'Cooks in Just 5–7 Minutes' },
    { icon: <FiShield />, label: 'Triple-Layer Fresh-Lock Packaging' },
  ];

  const nutritionRows = meta.nutrition?.length > 0 ? meta.nutrition.map(n => [n.label, n.value]) : [
    ['Energy', '360 kcal'],
    ['Protein', '10.5 g'],
    ['Carbohydrates', '77.2 g'],
    ['Total Fat', '0.8 g'],
    ['Dietary Fiber', '2.5 g'],
    ['Sodium', '< 5 mg'],
  ];

  const bannerHeadline = meta.bannerHeadline || 'Pure Wheat.\nPerfect Texture.\nEvery Time.';

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-primary selection:text-white">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-slate-50 py-3 px-6 lg:px-16">
        <div className="max-w-screen-xl mx-auto flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-400">
          <Link to="/" className="hover:text-slate-900 transition">Home</Link>
          <span className="opacity-30">/</span>
          <Link to="/products" className="hover:text-slate-900 transition">Products</Link>
          <span className="opacity-30">/</span>
          <span className="text-slate-900">{product.name}</span>
        </div>
      </div>

      {/* ── Main Product Zone ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_360px] gap-8 lg:gap-12">

          {/* Left: Thumbnail Rail */}
          <div className="flex lg:flex-col gap-3 order-2 lg:order-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-14 h-14 lg:w-16 lg:h-16 rounded-xl border transition-all overflow-hidden p-1 bg-white ${
                  activeImage === idx ? 'border-slate-900 shadow-md' : 'border-slate-100 opacity-60 hover:opacity-100 hover:border-slate-300'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>

          {/* Center: Main Image */}
          <div className="order-1 lg:order-2 bg-slate-50/50 rounded-3xl flex items-center justify-center aspect-square lg:aspect-auto lg:h-[540px] relative overflow-hidden group border border-slate-100">
            <img
              src={images[activeImage]}
              alt={product.name}
              className="w-full h-full object-contain p-8 lg:p-14 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm shadow-sm text-slate-900 text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-slate-200">
              Sangu Quality
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="order-3 flex flex-col justify-start">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded">{product.category || 'Collection'}</span>
              {product.sku && (
                <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">SKU: {product.sku}</span>
              )}
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-tight mb-4 uppercase">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-slate-100">
               <span className="text-sm font-semibold text-slate-400 italic">Price on Enquiry</span>
            </div>

            {availableSizes.length > 0 && (
              <div className="mb-8">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-3">Select Pack Size</p>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                        selectedSize === size
                          ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 shadow-sm'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 mb-8">
              <Link
                to={`/bulk-order?product=${encodeURIComponent(product.name)}&size=${encodeURIComponent(selectedSize)}`}
                className="flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg active:scale-95"
              >
                <FiBox className="w-4 h-4" />
                Bulk Enquiry
              </Link>
              {product.amazonLink && (
                <a
                  href={product.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-slate-200 text-slate-600 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
                >
                  Buy on Amazon
                </a>
              )}
            </div>

            <p className="text-[13px] text-slate-500 leading-relaxed mb-8">
              {product.description || 'Crafted with premium 100% hard wheat semolina. No maida, no additives — just pure, authentic semiya your family deserves.'}
            </p>

            <ul className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-8">
              {features.slice(0, 4).map((f, i) => (
                <li key={i} className="flex flex-col items-center text-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-lg text-primary">{f.icon}</span>
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-normal leading-tight">{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Simplified Lifestyle Banner ── */}
      <div className="w-full h-[400px] bg-slate-900 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-slate-900/60 z-10"></div>
        <img
          src={images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-screen-xl mx-auto px-6 lg:px-16 w-full text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight italic">
            {bannerHeadline.split('\n').join(' ')}
          </h2>
          <p className="text-white/60 mt-4 max-w-lg mx-auto text-sm">
            Experience the gold standard of vermicelli excellence.
          </p>
        </div>
      </div>

      {/* ── Detailed Grid ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-primary">Quality Promise</span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Pure Wheat Excellence</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: '100% Raw Durum Wheat', desc: 'Only the finest hard wheat suji — no maida fillers, ever.' },
                { label: 'Non-Sticky Guarantee', desc: 'Perfectly separated strands every single time you cook.' },
                { label: 'Family Trusted', desc: 'Serving traditional South Indian households since 1982.' },
              ].map((item, i) => (
                <div key={i} className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <h3 className="text-xs font-bold text-slate-900 mb-1 uppercase tracking-tight">{item.label}</h3>
                  <p className="text-xs text-slate-400 font-normal leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 p-8 lg:p-12 rounded-3xl border border-slate-100 shadow-inner">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <FiZap className="text-primary" /> Nutrition at a Glance
            </h3>
            <div className="space-y-2">
              {nutritionRows.map(([label, val]) => (
                <div key={label} className="flex justify-between items-center py-3 border-b border-white last:border-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
                  <span className="text-xs font-bold text-slate-900">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <div className="bg-slate-50/50 border-t border-slate-100 py-20">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
            <div className="flex items-end justify-between mb-12">
              <div className="space-y-2">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Recommended</p>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Related Varieties</h2>
              </div>
              <Link to="/products" className="text-xs font-bold text-slate-400 hover:text-primary transition underline underline-offset-8 decoration-slate-200">
                View All Varieties
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <div key={p._id || p.id} className="group flex flex-col items-center text-center">
                  <Link to={`/product/${p.name}`} className="block aspect-square bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-4 p-6 w-full">
                    <img
                      src={p.images?.[0] || 'https://via.placeholder.com/400?text=Sangu'}
                      alt={p.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <Link to={`/product/${p.name}`}>
                    <h3 className="text-xs font-bold text-slate-800 hover:text-primary transition-colors uppercase tracking-tight line-clamp-1 mb-1">{p.name}</h3>
                  </Link>
                  <p className="text-xs font-bold text-primary">{p.price || "₹45.00"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* ── Cooking Inspiration ── */}
      <CookingInspiration recipes={recipes} />
    </div>
  );
};

export default ProductDetail;
