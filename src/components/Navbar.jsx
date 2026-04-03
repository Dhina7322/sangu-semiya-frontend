import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { FiMenu, FiX, FiChevronDown, FiMail, FiPhone } from 'react-icons/fi';
import logo from '../assets/Sangu-Brand-Semiya-Logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products for navbar', err);
      }
    };
    fetchProducts();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 top-0 transform-gpu translate-z-0">
      {/* Top Info Bar */}
      <div className="bg-gray-800 text-gray-300 text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span className="font-medium text-white tracking-wide">Sangu Brand Semiya</span>
          <div className="flex items-center gap-6">
            <a
              href="mailto:info@sangubrandsemiya.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <FiMail size={13} />
              <span>info@sangubrandsemiya.com</span>
            </a>
            <a
              href="tel:+919677707416"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <FiPhone size={13} />
              <span>+91 96777 07416</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="bg-primary shadow-lg relative h-24 md:h-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full relative">

            {/* Left Nav Links */}
            <div className="hidden md:flex items-center gap-7">
              <Link to="/" className="font-semibold text-gray-900 hover:text-secondary transition-colors duration-200">Home</Link>
              <Link to="/about" className="font-semibold text-gray-900 hover:text-secondary transition-colors duration-200">Our Company</Link>
              <div
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <Link to="/products" className="flex items-center gap-1 font-semibold text-gray-900 hover:text-secondary transition-colors duration-200">
                  Products <FiChevronDown size={14} className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                </Link>
                {productsOpen && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-md shadow-xl py-1 border border-gray-100 animate-fade-in-down transform-gpu">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <Link
                          key={product._id || product.id}
                          to={`/product/${product.name}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-secondary transition-colors"
                          onClick={() => setProductsOpen(false)}
                        >
                          {product.name}
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-400 italic">No products found</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Center Logo - CIRCULAR OVERLAPPING - Optimized dimensions */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2 md:top-2 z-50">
              <Link to="/" className="block">
                <div className="bg-white p-1 rounded-full shadow-2xl border-2 border-primary hover:scale-105 transition-transform duration-300">
                  <img
                    src={logo}
                    alt="Sangu Brand Semiya"
                    width="112"
                    height="112"
                    className="h-20 w-22 md:h-28 md:w-28 object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Right Nav Links */}
            <div className="hidden md:flex items-center gap-7">
              <Link to="/blog" className="font-semibold text-gray-900 hover:text-secondary transition-colors duration-200">Blog &amp; Recipe</Link>
              <Link to="/contact-us" className="font-semibold text-gray-900 hover:text-secondary transition-colors duration-200">Contact Us</Link>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center ml-auto">
              <button onClick={toggleMenu} aria-label="Toggle Menu" className="text-gray-900 hover:text-secondary focus:outline-none">
                {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-primary border-t border-yellow-400 animate-fade-in-down pb-6 pt-12 transform-gpu">
            <div className="px-4 space-y-1 text-center font-bold">
              <Link to="/" onClick={toggleMenu} className="block py-3 text-gray-900 hover:text-secondary transition">Home</Link>
              <Link to="/about" onClick={toggleMenu} className="block py-3 text-gray-900 hover:text-secondary transition">Our Company</Link>
              <div className="py-2">
                <Link to="/products" onClick={toggleMenu} className="block text-secondary/60 text-[13px] uppercase font-black tracking-widest mb-2 px-4 hover:text-secondary transition-colors text-center">Our Products</Link>
                <div className="space-y-1">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <Link
                        key={product._id || product.id}
                        to={`/product/${product.name}`}
                        onClick={toggleMenu}
                        className="block py-2 text-gray-800 hover:text-secondary transition text-sm font-medium"
                      >
                        {product.name}
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500 text-xs italic px-4">Loading products...</p>
                  )}
                </div>
              </div>
              <Link to="/blog" onClick={toggleMenu} className="block py-3 text-gray-900 hover:text-secondary transition">Blog &amp; Recipe</Link>
              <Link to="/contact-us" onClick={toggleMenu} className="block py-3 text-gray-900 hover:text-secondary transition">Contact Us</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default memo(Navbar);
