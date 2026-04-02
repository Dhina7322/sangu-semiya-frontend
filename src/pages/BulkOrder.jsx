import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FiShield, FiTruck, FiBox, FiPhoneCall, FiMessageCircle } from 'react-icons/fi';

const BulkOrder = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: '',
    quantity: '',
    message: ''
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    // If navigated from product page with query param
    const searchParams = new URLSearchParams(location.search);
    const prodName = searchParams.get('product');
    const size = searchParams.get('size');
    if (prodName || size) {
      setFormData(prev => ({ 
        ...prev, 
        product: prodName || '', 
        message: size ? `Source: ${size} variant. ` : '' 
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:5001/api/enquiry', formData);
      alert('Enquiry submitted successfully! Our team will contact you soon.');
      setFormData({ name: '', phone: '', email: '', product: '', quantity: '', message: '' });
    } catch (err) {
      console.error('Submission error:', err);
      alert('Network issue: Please try contacting us via WhatsApp instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const text = `Hi Sangu Semiya team, I want to bulk order %0a*Product:* ${formData.product || 'Any'} %0a*Quantity:* ${formData.quantity || 'TBD'} %0a*Message:* ${formData.message || 'N/A'}`;
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Partner with Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Are you a distributor, wholesaler, or caterer? Fill out the form below for special bulk pricing and dealer benefits.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-5xl mx-auto">
          
          {/* Info Side */}
          <div className="lg:w-2/5 bg-primary p-12 text-white flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10"></div>
             
             <div className="relative z-10">
               <h3 className="text-3xl font-bold mb-6">Distributor Benefits</h3>
               <ul className="space-y-4 mb-12">
                 <li className="flex items-center gap-3"><div className="w-6 h-6 bg-red-400/20 rounded-lg flex items-center justify-center"><FiShield className="text-white" size={14} /></div> High profit margins</li>
                 <li className="flex items-center gap-3"><div className="w-6 h-6 bg-red-400/20 rounded-lg flex items-center justify-center"><FiBox className="text-white" size={14} /></div> Marketing support & materials</li>
                 <li className="flex items-center gap-3"><div className="w-6 h-6 bg-red-400/20 rounded-lg flex items-center justify-center"><FiTruck className="text-white" size={14} /></div> Priority dispatch pan-India</li>
                 <li className="flex items-center gap-3"><div className="w-6 h-6 bg-red-400/20 rounded-lg flex items-center justify-center"><FiPhoneCall className="text-white" size={14} /></div> Direct factory connect</li>
               </ul>

               <div className="space-y-3">
                 <p className="font-semibold text-red-100">Or reach us instantly via WhatsApp:</p>
                 <button onClick={openWhatsApp} className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white py-4 rounded-xl font-bold flex align-center justify-center transition shadow-lg gap-2">
                   <FiMessageCircle size={22} />
                   Message on WhatsApp
                 </button>
               </div>
             </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-3/5 p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Submit Enquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="+91 90000 00000" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="john@company.com" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interested Product *</label>
                  <select name="product" value={formData.product} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white">
                    <option value="">Select Product...</option>
                    {products.map((p) => (
                      <option key={p.id || p._id} value={p.name}>{p.name}</option>
                    ))}
                    <option value="All Products">Combination / All Products</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Quantity *</label>
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="e.g. 500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" rows="4" placeholder="Tell us about your requirement..."></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className={`w-full ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-black'} text-white py-4 rounded-xl font-bold text-lg shadow-lg transition transform hover:-translate-y-1`}>
                {isSubmitting ? 'Sending Request...' : 'Send Enquiry'}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BulkOrder;
