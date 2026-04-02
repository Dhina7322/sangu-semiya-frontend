import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

  const navLinkClass = (path) =>
    `font-medium transition-colors duration-200 whitespace-nowrap ${
      isActive(path) ? 'text-primary' : 'text-white hover:text-primary'
    }`;

  return (
    <nav className="fixed w-full z-50 top-0">
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
      <div className="bg-secondary shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 relative">

            {/* Left Nav Links */}
            <div className="hidden md:flex items-center gap-7">
              <Link to="/" className={navLinkClass('/')}>Home</Link>
              <Link to="/about" className={navLinkClass('/about')}>Our Company</Link>
              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button className="flex items-center gap-1 font-medium text-white hover:text-primary transition-colors duration-200">
                  Products <FiChevronDown size={14} className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                </button>
                {productsOpen && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-md shadow-xl py-1 border border-gray-100 animate-fade-in-down">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <Link
                          key={product._id || product.id}
                          to={`/product/${product.name}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-secondary transition-colors"
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

            {/* Center Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 flex-shrink-0">
              <Link to="/">
                <img
                  src={logo}
                  alt="Sangu Brand Semiya"
                  className="h-20 w-20 object-contain drop-shadow-lg"
                  style={{ marginTop: '10px' }}
                />
              </Link>
            </div>

            {/* Right Nav Links */}
            <div className="hidden md:flex items-center gap-7">
              
              <Link to="/blog" className={navLinkClass('/blog')}>Blog &amp; Recipe</Link>
              <Link to="/contact-us" className={navLinkClass('/contact-us')}>Contact Us</Link>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center ml-auto">
              <button onClick={toggleMenu} className="text-white hover:text-primary focus:outline-none">
                {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-secondary border-t border-red-700 animate-fade-in-down">
            <div className="px-4 py-4 space-y-1 text-center">
              <Link to="/" onClick={toggleMenu} className="block py-2.5 text-white hover:text-primary font-medium transition">Home</Link>
              <Link to="/about" onClick={toggleMenu} className="block py-2.5 text-white hover:text-primary font-medium transition">Our Company</Link>
              
              {/* Mobile Products Dropdown */}
              <div className="py-2.5">
                <p className="text-primary text-[10px] uppercase font-bold tracking-widest mb-2 px-4 shadow-sm">Product Range</p>
                <div className="space-y-1">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <Link
                        key={product._id || product.id}
                        to={`/product/${product.name}`}
                        onClick={toggleMenu}
                        className="block py-2 text-gray-300 hover:text-white transition text-sm"
                      >
                        {product.name}
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500 text-xs italic px-4">Loading products...</p>
                  )}
                </div>
              </div>

              <Link to="/media" onClick={toggleMenu} className="block py-2.5 text-white hover:text-primary font-medium transition">Media & Awards</Link>
              <Link to="/blog" onClick={toggleMenu} className="block py-2.5 text-white hover:text-primary font-medium transition">Blog &amp; Recipe</Link>
              <Link to="/contact-us" onClick={toggleMenu} className="block py-2.5 text-white hover:text-primary font-medium transition">Contact Us</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
