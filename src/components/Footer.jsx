import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Sangu Brand Semiya</h3>
            <p className="text-gray-600 mb-4 max-w-sm mx-auto md:mx-0">
              Delivering healthy, delicious, and easy-to-cook vermicelli products to your family's table since 2005.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-600 hover:text-primary transition">Our Products</Link></li>
              <li><Link to="/bulk-order" className="text-gray-600 hover:text-primary transition">Dealer Enquiry</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Email: info@sangusemiya.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: Sangu Global Foods, Food Park Area.</li>
            </ul>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sangu Brand Semiya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
