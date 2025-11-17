import { Check } from 'lucide-react';
import PaymentButton from '../components/PaymentButton';
import { motion } from 'framer-motion';

export default function Pricing() {
  const plans = {
    basic: {
      name: 'Basic',
      price_mxn: 99,
      price_usd: 5,
      features: ['100 créditos/mes', 'Acceso a 2 Spaces', 'Watermark en imágenes', 'Soporte por email'],
      stripe_price_id: 'price_basic',
      lemon_variant_id: 'variant_basic'
    },
    pro: {
      name: 'Pro',
      price_mxn: 299,
      price_usd: 15,
      features: ['1000 créditos/mes', 'Todos los Spaces', 'Sin watermark', 'Soporte prioritario', 'API access'],
      stripe_price_id: 'price_pro',
      lemon_variant_id: 'variant_pro'
    },
    enterprise: {
      name: 'Enterprise',
      price_mxn: 999,
      price_usd: 50,
      features: ['Créditos ilimitados', 'White-label', 'Soporte 24/7', 'Custom integrations', 'Account manager'],
      stripe_price_id: 'price_enterprise',
      lemon_variant_id: 'variant_enterprise'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-white mb-4">💎 Planes Premium</h1>
        <p className="text-xl text-center text-gray-400 mb-12">Elige el plan perfecto para ti</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.values(plans).map(plan => (
            <motion.div
              key={plan.name}
              whileHover={{ scale: 1.05 }}
              className="bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-8"
            >
              <h3 className="text-3xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  ${plan.price_mxn}
                </span>
                <span className="text-gray-400"> MXN/mes</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center gap-2 text-gray-300">
                    <Check className="text-green-400" size={20} />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <PaymentButton plan={plan} provider="stripe" />
                <PaymentButton plan={plan} provider="mercadopago" />
                <PaymentButton plan={plan} provider="lemonsqueezy" />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-gray-400">🔒 Pagos seguros procesados por Stripe, Mercado Pago y Lemon Squeezy</p>
        </div>
      </div>
    </div>
  );
}

