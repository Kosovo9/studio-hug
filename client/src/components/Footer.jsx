import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-xl border-t border-purple-500/20 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
              NEXORA-HUG
            </h3>
            <p className="text-gray-400 text-sm">
              Sistema automatizado de monetización con IA. Meta: $30K MXN/mes 🚀
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-purple-400 text-sm">Dashboard</Link></li>
              <li><Link to="/spaces" className="text-gray-400 hover:text-purple-400 text-sm">Spaces</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-purple-400 text-sm">Pricing</Link></li>
              <li><Link to="/affiliates" className="text-gray-400 hover:text-purple-400 text-sm">Afiliados</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li><a href="https://github.com/Kosovo9/studio-hug" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 text-sm">GitHub</a></li>
              <li><a href="/docs" className="text-gray-400 hover:text-purple-400 text-sm">Documentación</a></li>
              <li><Link to="/analytics" className="text-gray-400 hover:text-purple-400 text-sm">Analytics</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li><a href="mailto:support@nexora-hug.com" className="text-gray-400 hover:text-purple-400 text-sm">support@nexora-hug.com</a></li>
              <li className="text-gray-400 text-sm">Meta: $30K MXN/mes</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Nexora-Hug. Hecho con ❤️ para generar ingresos automáticos.
          </p>
        </div>
      </div>
    </footer>
  );
}

