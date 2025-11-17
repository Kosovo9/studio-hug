const axios = require('axios');
const config = require('../config/config');

class PayPalService {
  constructor() {
    this.clientId = config.paypal.clientId;
    this.clientSecret = config.paypal.clientSecret;
    this.mode = config.paypal.mode;
    this.baseUrl = this.mode === 'sandbox' 
      ? 'https://api.sandbox.paypal.com' 
      : 'https://api.paypal.com';
  }

  async getAccessToken() {
    try {
      const response = await axios.post(
        `${this.baseUrl}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          auth: {
            username: this.clientId,
            password: this.clientSecret
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error('Error obteniendo token de PayPal:', error.message);
      throw new Error('No se pudo obtener token de PayPal');
    }
  }

  async createOrder(orderData) {
    try {
      const accessToken = await this.getAccessToken();
      const response = await axios.post(
        `${this.baseUrl}/v2/checkout/orders`,
        {
          intent: 'CAPTURE',
          purchase_units: [
            {
              reference_id: orderData.referenceId,
              amount: {
                currency_code: orderData.currency || 'USD',
                value: orderData.amount.toString(),
                breakdown: {
                  item_total: {
                    currency_code: orderData.currency || 'USD',
                    value: orderData.amount.toString()
                  }
                }
              },
              items: orderData.items || [],
              custom_id: orderData.customId || ''
            }
          ],
          payer: orderData.payer || {},
          application_context: {
            brand_name: 'Nexora-Hug',
            landing_page: 'LOGIN',
            user_action: 'PAY_NOW',
            return_url: `${config.frontendUrl}/paypal-success`,
            cancel_url: `${config.frontendUrl}/paypal-cancel`
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creando orden de PayPal:', error.response?.data || error.message);
      throw new Error('No se pudo crear la orden de PayPal');
    }
  }

  async captureOrder(orderId) {
    try {
      const accessToken = await this.getAccessToken();
      const response = await axios.post(
        `${this.baseUrl}/v2/checkout/orders/${orderId}/capture`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error capturando orden de PayPal:', error.response?.data || error.message);
      throw new Error('No se pudo capturar la orden de PayPal');
    }
  }

  async getOrder(orderId) {
    try {
      const accessToken = await this.getAccessToken();
      const response = await axios.get(
        `${this.baseUrl}/v2/checkout/orders/${orderId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error obteniendo orden de PayPal:', error.response?.data || error.message);
      throw new Error('No se pudo obtener la orden de PayPal');
    }
  }

  async createSubscription(planId, subscriptionData) {
    try {
      const accessToken = await this.getAccessToken();
      const response = await axios.post(
        `${this.baseUrl}/v1/billing/subscriptions`,
        {
          plan_id: planId,
          subscriber: subscriptionData.subscriber || {},
          custom_id: subscriptionData.customId || '',
          application_context: {
            brand_name: 'Nexora-Hug',
            locale: 'es_MX',
            return_url: `${config.frontendUrl}/paypal-subscription-success`,
            cancel_url: `${config.frontendUrl}/paypal-subscription-cancel`
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creando suscripción PayPal:', error.response?.data || error.message);
      throw new Error('No se pudo crear la suscripción de PayPal');
    }
  }

  verifyWebhook(body, signature) {
    // Implementación básica de verificación
    // En producción, usar la API de verificación de PayPal
    try {
      console.log('Webhook de PayPal recibido:', body);
      return true;
    } catch (error) {
      console.error('Error verificando webhook de PayPal:', error.message);
      return false;
    }
  }
}

module.exports = new PayPalService();
