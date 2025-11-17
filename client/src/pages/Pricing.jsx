import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import PaymentButton from '../components/PaymentButton';
import SEOHead from '../components/SEOHead';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price_mxn: 99,
      price_usd: 5,
      description: 'Perfecto para empezar',
      features: ['100 créditos/mes', 'Acceso a 2 Spaces', 'Watermark en imágenes', 'Soporte por email'],
      stripe_price_id: 'price_starter',
      lemon_variant_id: 'variant_starter',
      highlighted: false
    },
    {
      name: 'Professional',
      price_mxn: 299,
      price_usd: 15,
      description: 'Para negocios en crecimiento',
      features: ['1000 créditos/mes', 'Todos los Spaces', 'Sin watermark', 'Soporte prioritario', 'API access'],
      stripe_price_id: 'price_pro',
      lemon_variant_id: 'variant_pro',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price_mxn: 999,
      price_usd: 50,
      description: 'Solución empresarial completa',
      features: ['Créditos ilimitados', 'Todo incluido', 'Soporte 24/7', 'Integraciones custom', 'Dashboard premium'],
      stripe_price_id: 'price_enterprise',
      lemon_variant_id: 'variant_enterprise',
      highlighted: false
    }
  ];

  return (
    <>
      <SEOHead locale="es-mx" />
      <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a1f35] to-[#0f1419] relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-yellow-300 bg-clip-text text-transparent mb-4">
              💳 Planes de Precios
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Elige el plan perfecto para tu negocio y comienza a crecer hoy
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: plan.highlighted ? 1.05 : 1.02, y: -10 }}
                className={`relative group ${ plan.highlighted ? 'md:scale-105' : ''}`}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className={`relative h-full rounded-3xl border-2 p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-yellow-900/30 to-purple-900/30 border-yellow-500/50'
                    : 'bg-gradient-to-b from-white/10 to-white/5 border-white/10 group-hover:border-blue-500/50'
                }`}>
                  {plan.highlighted && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                        ⭐ Más Popular
                      </span>
                    </div>
                  )}

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <p className="text-4xl sm:text-5xl font-bold text-white">${plan.price_mxn}</p>
                    <p className="text-gray-400 text-sm">{plan.price_usd} USD / mes</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <Check size={20} className="text-green-400 flex-shrink-0" />
                        <span className="text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <PaymentButton
                    product={{...plan}}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Preguntas Frecuentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-yellow-400 font-semibold mb-2">❓ ¿Puedo cambiar de plan?</p>
                <p className="text-gray-300 text-sm">Sí, puedes cambiar o cancelar en cualquier momento desde tu panel de control.</p>
              </div>
              <div>
                <p className="text-yellow-400 font-semibold mb-2">❓ ¿Hay contrato?</p>
                <p className="text-gray-300 text-sm">No, somos mes a mes. Cancela cuando quieras sin penalización.</p>
              </div>
              <div>
                <p className="text-yellow-400 font-semibold mb-2">❓ ¿Qué métodos de pago aceptan?</p>
                <p className="text-gray-300 text-sm">Tarjeta de crédito, PayPal, Mercado Pago y transferencia bancaria.</p>
              </div>
              <div>
                <p className="text-yellow-400 font-semibold mb-2">❓ ¿Hay descuentos anuales?</p>
                <p className="text-gray-300 text-sm">Sí, pagá anualmente y ahorra un 20% en todos los planes.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
