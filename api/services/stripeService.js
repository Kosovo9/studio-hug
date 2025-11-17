const stripe = require('stripe');
const config = require('../config/config');

class StripeService {
  constructor() {
    this.stripe = stripe(config.stripe.secretKey);
    this.webhookSecret = config.stripe.webhookSecret;
  }

  async createPaymentIntent(amount, metadata = {}) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe usa centavos
        currency: 'usd',
        metadata,
        automatic_payment_methods: {
          enabled: true
        }
      });
      return paymentIntent;
    } catch (error) {
      console.error('Error creando Payment Intent en Stripe:', error.message);
      throw new Error('No se pudo crear el pago');
    }
  }

  async retrievePaymentIntent(intentId) {
    try {
      return await this.stripe.paymentIntents.retrieve(intentId);
    } catch (error) {
      console.error('Error recuperando Payment Intent:', error.message);
      throw new Error('No se pudo recuperar el pago');
    }
  }

  async createCustomer(customerData) {
    try {
      const customer = await this.stripe.customers.create({
        email: customerData.email,
        name: customerData.name,
        description: customerData.description,
        metadata: customerData.metadata || {}
      });
      return customer;
    } catch (error) {
      console.error('Error creando cliente en Stripe:', error.message);
      throw new Error('No se pudo crear el cliente');
    }
  }

  async createSubscription(customerId, priceId, subscriptionData = {}) {
    try {
      const subscription = await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: {
          save_default_payment_method: 'on_subscription'
        },
        metadata: subscriptionData.metadata || {}
      });
      return subscription;
    } catch (error) {
      console.error('Error creando suscripción en Stripe:', error.message);
      throw new Error('No se pudo crear la suscripción');
    }
  }

  async updateSubscription(subscriptionId, updateData) {
    try {
      const subscription = await this.stripe.subscriptions.update(
        subscriptionId,
        updateData
      );
      return subscription;
    } catch (error) {
      console.error('Error actualizando suscripción Stripe:', error.message);
      throw new Error('No se pudo actualizar la suscripción');
    }
  }

  async cancelSubscription(subscriptionId) {
    try {
      const subscription = await this.stripe.subscriptions.del(subscriptionId);
      return subscription;
    } catch (error) {
      console.error('Error cancelando suscripción Stripe:', error.message);
      throw new Error('No se pudo cancelar la suscripción');
    }
  }

  async createPayoutAccount(accountData) {
    try {
      const account = await this.stripe.accounts.create({
        type: 'express',
        email: accountData.email,
        country: accountData.country || 'US',
        business_type: accountData.businessType || 'individual',
        metadata: accountData.metadata || {}
      });
      return account;
    } catch (error) {
      console.error('Error creando cuenta de payout Stripe:', error.message);
      throw new Error('No se pudo crear la cuenta de payout');
    }
  }

  async createTransfer(amount, destinationAccountId, metadata = {}) {
    try {
      const transfer = await this.stripe.transfers.create({
        amount: Math.round(amount * 100),
        currency: 'usd',
        destination: destinationAccountId,
        metadata
      });
      return transfer;
    } catch (error) {
      console.error('Error creando transferencia Stripe:', error.message);
      throw new Error('No se pudo crear la transferencia');
    }
  }

  verifyWebhookSignature(body, signature) {
    try {
      return this.stripe.webhooks.constructEvent(body, signature, this.webhookSecret);
    } catch (error) {
      console.error('Error verificando firma del webhook Stripe:', error.message);
      return null;
    }
  }
}

module.exports = new StripeService();
