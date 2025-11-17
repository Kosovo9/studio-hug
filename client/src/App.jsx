import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SpaceManager from './pages/SpaceManager';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Affiliates from './pages/Affiliates';
import Pricing from './pages/Pricing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/spaces" element={<SpaceManager />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/affiliates" element={<Affiliates />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

