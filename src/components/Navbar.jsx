import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed w-full z-50 glass-panel shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary">
              Sangu Semiya
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium transition">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-primary font-medium transition">Products</Link>
            <Link to="/bulk-order" className="bg-primary hover:bg-red-700 text-white px-5 py-2 rounded-full font-medium transition shadow-md hover:shadow-lg">Bulk Enquiry</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-primary focus:outline-none">
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute w-full left-0 origin-top animate-fade-in-down">
          <div className="px-2 pt-2 pb-5 space-y-1 sm:px-3 text-center">
            <Link to="/" onClick={toggleMenu} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-red-50 rounded-md">Home</Link>
            <Link to="/products" onClick={toggleMenu} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-red-50 rounded-md">Products</Link>
            <Link to="/bulk-order" onClick={toggleMenu} className="block mt-4 px-3 py-3 text-base font-medium bg-primary text-white rounded-md mx-4 shadow-md">Bulk Enquiry</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
