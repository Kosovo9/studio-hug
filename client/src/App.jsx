import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-950 text-white">
          <nav className="bg-black/30 p-4 border-b border-purple-500/20">
            <h1 className="text-2xl font-bold">NEXORA-HUG TEST</h1>
          </nav>
          <main className="container mx-auto p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
