import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import SpaceManager from './pages/SpaceManager';
import Analytics from './pages/Analytics';
import Affiliates from './pages/Affiliates';
import Pricing from './pages/Pricing';
import Settings from './pages/Settings';
import PixversePage from './pages/PixversePage';
import PremiumHug from './pages/PremiumHug';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-950">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/spaces" element={<SpaceManager />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/affiliates" element={<Affiliates />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/pixverse" element={<PixversePage />} />
              <Route path="/premium-hug" element={<PremiumHug />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
