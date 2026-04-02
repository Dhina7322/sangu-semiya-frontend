import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const [productRes, allProductsRes] = await Promise.all([
          axios.get(`http://127.0.0.1:5001/api/products/${id}`),
          axios.get(`http://127.0.0.1:5001/api/products`)
        ]);
        setProduct(productRes.data);
        if (productRes.data) {
          document.title = `${productRes.data.name} | Sangu Brand Semiya`;
          if (productRes.data.packSize) {
            const sizes = productRes.data.packSize.split(',').map(s => s.trim());
            setSelectedSize(sizes[0]);
          }
          const related = allProductsRes.data
            .filter(p => p.id !== productRes.data.id && p.name !== productRes.data.name)
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
      <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-4">
      <div className="text-8xl font-black text-slate-100 tracking-tight">404</div>
      <div className="text-lg font-bold text-slate-800 uppercase tracking-widest">Product Not Found</div>
      <Link to="/products" className="mt-4 bg-slate-900 text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors">
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

  const features = meta.features?.length > 0 ? meta.features : [
    { icon: '🌾', label: '100% Hard Wheat Semolina' },
    { icon: '✨', label: 'No Maida, No Bleach, No Additives' },
    { icon: '⏱️', label: 'Cooks in Just 5–7 Minutes' },
    { icon: '🛡️', label: 'Triple-Layer Fresh-Lock Packaging' },
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
    <div className="bg-white min-h-screen font-sans">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-slate-100 py-3 px-6 lg:px-16">
        <div className="max-w-screen-xl mx-auto flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          <Link to="/" className="hover:text-slate-900 transition">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-slate-900 transition">Products</Link>
          <span>/</span>
          <span className="text-slate-900">{product.name}</span>
        </div>
      </div>

      {/* ── Main Product Zone ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_380px] gap-6 lg:gap-10">

          {/* Left: Thumbnail Rail */}
          <div className="flex lg:flex-col gap-3 order-2 lg:order-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-16 h-16 lg:w-20 lg:h-20 border-2 overflow-hidden shrink-0 transition-all ${
                  activeImage === idx ? 'border-slate-900' : 'border-slate-100 opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-contain p-1" />
              </button>
            ))}
          </div>

          {/* Center: Main Image */}
          <div className="order-1 lg:order-2 bg-slate-50 flex items-center justify-center aspect-square lg:aspect-auto lg:h-[600px] relative overflow-hidden group">
            <img
              src={images[activeImage]}
              alt={product.name}
              className="w-full h-full object-contain p-8 lg:p-16 transition-transform duration-700 group-hover:scale-105"
            />
            {/* Badge */}
            <div className="absolute top-4 left-4 bg-primary text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1">
              Sangu Brand
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="order-3 flex flex-col justify-start pt-2">
            {/* Category & SKU */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">{product.category || 'General'}</span>
              {product.sku && (
                <>
                  <span className="text-slate-200">|</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">SKU: {product.sku}</span>
                </>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2 uppercase">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5 pb-5 border-b border-slate-100">
              {product.price ? (
                <>
                  <span className="text-2xl font-black text-slate-900">{product.price}</span>
                  <span className="text-sm text-slate-400 line-through font-medium">
                    ₹{Math.round(parseInt(product.price.replace(/[^\d]/g, '')) * 1.2)}
                  </span>
                  <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-1 tracking-wide">
                    Save 17%
                  </span>
                </>
              ) : (
                <span className="text-base font-semibold text-slate-400 italic">Contact for Pricing</span>
              )}
            </div>

            {/* Variant / Pack Size */}
            {availableSizes.length > 0 && (
              <div className="mb-6">
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-3">
                  Pack Size / {selectedSize}
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                        selectedSize === size
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <Link
                to={`/bulk-order?product=${encodeURIComponent(product.name)}&size=${encodeURIComponent(selectedSize)}`}
                className="flex items-center justify-center gap-3 bg-slate-900 text-white py-4 text-[11px] font-black uppercase tracking-[0.25em] hover:bg-primary transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                </svg>
                Bulk Enquiry
              </Link>
              {product.amazonLink && (
                <a
                  href={product.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border-2 border-[#FF9900] text-[#FF9900] py-4 text-[11px] font-black uppercase tracking-[0.25em] hover:bg-[#FF9900] hover:text-white transition-colors duration-300"
                >
                  Buy on Amazon
                </a>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-5 mb-6">
              {product.description || 'Crafted with premium 100% hard wheat semolina. No maida, no additives — just pure, authentic semiya your family deserves.'}
            </p>

            {/* Mini Feature List */}
            <ul className="space-y-3 border-t border-slate-100 pt-5">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="text-base">{f.icon}</span>
                  <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Full-Width Lifestyle Image Banner ── */}
      <div className="w-full h-[420px] lg:h-[560px] bg-slate-900 relative overflow-hidden flex items-center justify-center mt-8">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent z-10"></div>
        <img
          src={images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-20 max-w-screen-xl mx-auto px-6 lg:px-16 w-full">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">The Story</p>
          <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase max-w-lg">
            {bannerHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < bannerHeadline.split('\n').length - 1 && <br />}</span>
            ))}
          </h2>
          <p className="text-slate-300 mt-6 max-w-md text-sm leading-relaxed">
            {product.description || 'Sangu Brand Semiya is crafted from the finest hard wheat semolina — processed untouched by hand, tested to ISO standards, and sealed for maximum freshness.'}
          </p>
        </div>
      </div>

      {/* ── Features / Selling Points ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Why Choose Sangu</p>
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase leading-tight mb-8">
              Bigger, Better,<br/>Purer.
            </h2>
            <div className="space-y-0 divide-y divide-slate-100">
              {[
                { label: '100% Raw Durum Wheat', desc: 'Only the finest hard wheat suji — no maida fillers, ever.' },
                { label: 'Ultra-Fine Extrusion', desc: 'Precision machinery ensures consistent strand thickness every batch.' },
                { label: 'Non-Sticky Guarantee', desc: 'Cooks perfectly separated — ideal for payasam, upma, or biryani.' },
                { label: 'Long Shelf Life', desc: 'Triple-layer nitrogen-flushed packaging locks in freshness for months.' },
              ].map((item, i) => (
                <div key={i} className="py-5">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-1">{item.label}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition Panel */}
          <div className="bg-slate-50 p-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Nutrition Facts (per 100g)</h3>
            <div className="space-y-0 divide-y divide-white">
              {nutritionRows.map(([label, val]) => (
                <div key={label} className="flex justify-between items-center py-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
                  <span className="text-sm font-black text-slate-900">{val}</span>
                </div>
              ))}
</div>
            <p className="text-[9px] text-slate-400 mt-6 italic">* Approximate values per 100g dry product</p>
          </div>
        </div>
      </div>

      {/* ── Dark CTA Band ── */}
      <div className="bg-slate-900 py-16 lg:py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3">The Full Range</p>
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight uppercase">Sangu Semiya</h2>
            <p className="text-slate-400 mt-3 text-sm max-w-md">
              Discover our complete lineup — roasted, plain, fine-strand, and more. One brand, premium quality across every variant.
            </p>
          </div>
          <Link
            to="/products"
            className="shrink-0 border-2 border-white text-white px-10 py-4 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-slate-900 transition-colors duration-300"
          >
            Shop All Products
          </Link>
        </div>
      </div>

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-16 lg:py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">You May Also Like</p>
              <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase">Related Varieties</h2>
            </div>
            <Link to="/products" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition pb-1 border-b border-slate-200">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <div key={p._id || p.id} className="group">
                <Link to={`/product/${p.name}`} className="block aspect-square bg-slate-50 overflow-hidden mb-3">
                  <img
                    src={p.images?.[0] || 'https://via.placeholder.com/400?text=Sangu'}
                    alt={p.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-500"
                  />
                </Link>
                <Link to={`/product/${p.name}`}>
                  <h3 className="text-xs font-bold text-slate-800 hover:text-primary transition-colors uppercase tracking-wide line-clamp-1">{p.name}</h3>
                </Link>
                {p.price ? (
                  <p className="text-xs font-black text-slate-900 mt-1">{p.price}</p>
                ) : (
                  <p className="text-xs text-slate-400 mt-1 italic">Enquiry</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetail;
