import { useState } from 'react';
import axios from 'axios';

export default function PaymentButton({ plan, provider = 'stripe' }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      if (provider === 'stripe') {
        const { data } = await axios.post('/api/payments/stripe/create-checkout', {
          priceId: plan.stripe_price_id,
          userId: localStorage.getItem('userId'),
          plan: plan.name
        });
        window.location.href = data.url;
      } 
      else if (provider === 'mercadopago') {
        const { data } = await axios.post('/api/payments/mercadopago/create-preference', {
          amount: plan.price_mxn,
          title: `Plan ${plan.name}`,
          userId: localStorage.getItem('userId'),
          plan: plan.name
        });
        window.location.href = data.initPoint;
      }
      else if (provider === 'lemonsqueezy') {
        const { data } = await axios.post('/api/payments/lemonsqueezy/create-checkout', {
          variantId: plan.lemon_variant_id,
          userId: localStorage.getItem('userId'),
          plan: plan.name
        });
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Error procesando pago');
    }
    setLoading(false);
  };

  return (
    <button 
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50"
    >
      {loading ? '⏳ Procesando...' : `💳 Pagar con ${provider}`}
    </button>
  );
}

