# Integraciones de Pago - Nexora-Hug

## Descripción General

Este directorio contiene los servicios de integración con múltiples proveedores de pago para el sistema Nexora-Hug. Cada servicio proporciona una interfaz consistente para gestionar pagos, suscripciones y transferencias.

## Servicios Disponibles

### 1. **PayPal Service** (`paypalService.js`)

Integración completa con la API de PayPal para procesar pagos y suscripciones.

**Métodos Principales:**
- `getAccessToken()` - Obtiene token de autenticación
- `createOrder(orderData)` - Crea una orden de compra
- `captureOrder(orderId)` - Captura/finaliza una orden
- `getOrder(orderId)` - Obtiene detalles de una orden
- `createSubscription(planId, subscriptionData)` - Crea suscripción
- `verifyWebhook(body, signature)` - Verifica webhooks

**Configuración Requerida (.env):**
```
PAYPAL_CLIENT_ID=tu_client_id
PAYPAL_CLIENT_SECRET=tu_client_secret
PAYPAL_MODE=sandbox (o production)
```

### 2. **Lemon Squeezy Service** (`lemonSqueezyService.js`)

Integración con Lemon Squeezy para vender productos digitales y software.

**Métodos Principales:**
- `createProduct(productData)` - Crea un producto
- `createVariant(productId, variantData)` - Crea variante de producto
- `createCheckout(variantId, checkoutData)` - Crea proceso de pago
- `createSubscription(variantId, subscriptionData)` - Crea suscripción
- `updateSubscription(subscriptionId, updateData)` - Actualiza suscripción
- `verifyWebhookSignature(payload, signature)` - Verifica webhooks

**Configuración Requerida (.env):**
```
LEMON_SQUEEZY_API_KEY=tu_api_key
```

### 3. **Stripe Service** (`stripeService.js`)

Integración con Stripe para pagos con tarjeta y suscripciones.

**Métodos Principales:**
- `createPaymentIntent(amount, metadata)` - Crea intención de pago
- `retrievePaymentIntent(intentId)` - Obtiene detalles del pago
- `createCustomer(customerData)` - Crea cliente
- `createSubscription(customerId, priceId, subscriptionData)` - Crea suscripción
- `updateSubscription(subscriptionId, updateData)` - Actualiza suscripción
- `cancelSubscription(subscriptionId)` - Cancela suscripción
- `createTransfer(amount, destinationAccountId, metadata)` - Transfiere dinero
- `verifyWebhookSignature(body, signature)` - Verifica webhooks

**Configuración Requerida (.env):**
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_BASIC=price_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_ENTERPRISE=price_...
```

### 4. **Wise Service** (`wiseService.js`)

Integración con Wise para transferencias internacionales y multi-moneda.

**Métodos Principales:**
- `getExchangeRate(sourceCurrency, targetCurrency)` - Obtiene tipo de cambio
- `createRecipient(recipientData)` - Registra destinatario
- `createQuote(quoteData)` - Crea cotización de transferencia
- `createTransfer(transferData)` - Crea transferencia
- `fundTransfer(transferId, fundingData)` - Financia transferencia
- `getTransferStatus(transferId)` - Obtiene estado de transferencia
- `getBalance()` - Obtiene saldo de cuenta

**Configuración Requerida (.env):**
```
WISE_API_KEY=tu_api_key
WISE_PROFILE_ID=tu_profile_id
```

## Uso de los Servicios

Todos los servicios están precargados como singletons y pueden ser importados directamente:

```javascript
const paypalService = require('../services/paypalService');
const lemonService = require('../services/lemonSqueezyService');
const stripeService = require('../services/stripeService');
const wiseService = require('../services/wiseService');

// Ejemplo: Crear orden con PayPal
const order = await paypalService.createOrder({
  referenceId: 'ORD-12345',
  amount: 99.99,
  currency: 'USD',
  items: [{ name: 'Producto', quantity: 1, price: 99.99 }]
});

// Ejemplo: Crear suscripción con Stripe
const customer = await stripeService.createCustomer({
  email: 'user@example.com',
  name: 'John Doe'
});

const subscription = await stripeService.createSubscription(
  customer.id,
  'price_monthly'
);
```

## Manejo de Errores

Todos los servicios lanzan excepciones descriptivas. Se recomienda usar try-catch:

```javascript
try {
  const payment = await stripeService.createPaymentIntent(100);
} catch (error) {
  console.error('Error de pago:', error.message);
}
```

## Webhooks

Cada servicio proporciona métodos para verificar webhooks de forma segura:

```javascript
const event = stripeService.verifyWebhookSignature(body, signature);
if (event) {
  // Procesar evento verificado
}
```

## Variables de Entorno

Asegúrate de configurar todas las variables en `.env`. Consulta `.env.example` para la lista completa.

## Soporte

Para más información sobre cada proveedor:
- [PayPal API](https://developer.paypal.com/)
- [Lemon Squeezy API](https://docs.lemonsqueezy.com/)
- [Stripe API](https://stripe.com/docs/api)
- [Wise API](https://wise.com/gb/developers/)
