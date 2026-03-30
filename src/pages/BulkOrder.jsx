import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

  useEffect(() => {
    // If navigated from product page with query param
    const searchParams = new URLSearchParams(location.search);
    const prodName = searchParams.get('product');
    if (prodName) {
      setFormData(prev => ({ ...prev, product: prodName }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submit
    alert('Enquiry submitted successfully! Our team will contact you soon.');
    setFormData({ name: '', phone: '', email: '', product: '', quantity: '', message: '' });
  };

  const openWhatsApp = () => {
    const text = `Hi Sangu Semiya team, I want to bulk order %0a*Product:* ${formData.product || 'Any'} %0a*Quantity:* ${formData.quantity || 'TBD'}`;
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
                 <li className="flex items-center"><svg className="h-6 w-6 mr-3 text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> High profit margins</li>
                 <li className="flex items-center"><svg className="h-6 w-6 mr-3 text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Marketing support & materials</li>
                 <li className="flex items-center"><svg className="h-6 w-6 mr-3 text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Priority dispatch pan-India</li>
                 <li className="flex items-center"><svg className="h-6 w-6 mr-3 text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Direct factory connect</li>
               </ul>

               <div className="space-y-3">
                 <p className="font-semibold text-red-100">Or reach us instantly via WhatsApp:</p>
                 <button onClick={openWhatsApp} className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white py-4 rounded-xl font-bold flex align-center justify-center transition shadow-lg">
                   <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
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
                    <option value="Roasted Vermicelli">Roasted Vermicelli</option>
                    <option value="Wheat Vermicelli">Wheat Vermicelli</option>
                    <option value="All Products">All Products</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Quantity *</label>
                  <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="e.g., 500 kgs or 50 cartons" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" rows="4" placeholder="Tell us about your requirement..."></textarea>
              </div>

              <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg transition transform hover:-translate-y-1">
                Send Enquiry
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BulkOrder;
