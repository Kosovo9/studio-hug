const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Crear checkout session de Stripe
router.post('/stripe/create-checkout', async (req, res) => {
  try {
    const { priceId, userId, plan } = req.body;
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
      metadata: {
        userId,
        plan
      }
    });
    
    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook de Stripe
router.post('/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      // TODO: Actualizar usuario en Supabase
      console.log('Payment successful:', session.metadata);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  
  res.json({ received: true });
});

// Obtener planes
router.get('/plans', async (req, res) => {
  try {
    const plans = {
      basic: {
        name: 'Basic',
        price_mxn: 99,
        price_usd: 5,
        stripe_price_id: process.env.STRIPE_PRICE_BASIC || 'price_basic',
        features: ['100 créditos/mes', 'Acceso a 2 Spaces', 'Watermark en imágenes', 'Soporte por email']
      },
      pro: {
        name: 'Pro',
        price_mxn: 299,
        price_usd: 15,
        stripe_price_id: process.env.STRIPE_PRICE_PRO || 'price_pro',
        features: ['1000 créditos/mes', 'Todos los Spaces', 'Sin watermark', 'Soporte prioritario', 'API access']
      },
      enterprise: {
        name: 'Enterprise',
        price_mxn: 999,
        price_usd: 50,
        stripe_price_id: process.env.STRIPE_PRICE_ENTERPRISE || 'price_enterprise',
        features: ['Créditos ilimitados', 'White-label', 'Soporte 24/7', 'Custom integrations', 'Account manager']
      }
    };
    
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mercado Pago
router.post('/mercadopago/create-preference', async (req, res) => {
  try {
    const { amount, title, userId, plan } = req.body;
    
    // TODO: Implementar Mercado Pago
    res.json({ 
      initPoint: `https://www.mercadopago.com.mx/checkout/v1/redirect?pref_id=test_${Date.now()}`,
      preferenceId: `test_${Date.now()}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lemon Squeezy
router.post('/lemonsqueezy/create-checkout', async (req, res) => {
  try {
    const { variantId, userId, plan } = req.body;
    
    // TODO: Implementar Lemon Squeezy
    res.json({ 
      checkoutUrl: `https://nexora-hug.lemonsqueezy.com/checkout/buy/${variantId}?embed=1`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

