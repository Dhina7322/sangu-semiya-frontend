import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import BulkOrder from './pages/BulkOrder';
import OurCompany from './pages/OurCompany';
import ContactUs from './pages/ContactUs';
import MediaAwards from './pages/MediaAwards';
import BlogRecipe from './pages/BlogRecipe';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className={`flex-grow ${!isAdminRoute ? 'pt-28' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/bulk-order" element={<BulkOrder />} />
          <Route path="/about" element={<OurCompany />} />
          <Route path="/our-story" element={<OurCompany />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/media" element={<MediaAwards />} />
          <Route path="/blog" element={<BlogRecipe />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </Router>
  );
}

export default App;
