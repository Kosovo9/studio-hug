const axios = require('axios');
const config = require('../config/config');

class MercadopagoService {
  constructor() {
    this.accessToken = config.mercadopago.accessToken;
    this.publicKey = config.mercadopago.publicKey;
    this.baseUrl = 'https://api.mercadopago.com';
    this.linkUrl = 'https://link.mercadopago.com.mx/studionexora';
  }

  async getAuthHeaders() {
    return {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
      'X-Idempotency-Key': Date.now().toString()
    };
  }

  // PAGO SIMPLE - Ideal para primeras 24h (30K MXN)
  async generatePaymentLink(amount, description = 'Pago Nexora-Hug', email = null) {
    try {
      const headers = await this.getAuthHeaders();
      
      // Crear preferencia de pago
      const response = await axios.post(
        `${this.baseUrl}/checkout/preferences`,
        {
          items: [
            {
              title: description,
              unit_price: amount,
              quantity: 1,
              currency_id: 'MXN'
            }
          ],
          payer: email ? { email } : {},
          payment_methods: {
            excluded_payment_types: [],
            installments: 12
          },
          back_urls: {
            success: `${config.frontendUrl}/payment-success`,
            failure: `${config.frontendUrl}/payment-failed`,
            pending: `${config.frontendUrl}/payment-pending`
          },
          auto_return: 'approved',
          external_reference: `NXH-${Date.now()}`,
          metadata: {
            timestamp: new Date().toISOString(),
            platform: 'studio-nexora'
          }
        },
        { headers }
      );
      
      return {
        id: response.data.id,
        init_point: response.data.init_point,
        sandbox_init_point: response.data.sandbox_init_point,
        link: response.data.init_point
      };
    } catch (error) {
      console.error('Error generando link de pago MercadoPago:', error.response?.data || error.message);
      throw new Error('No se pudo generar el link de pago');
    }
  }

  // CREAR SUSCRIPCIÓN - Para modelo recurrente (25 días a 300K)
  async createSubscription(subscriptionData) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await axios.post(
        `${this.baseUrl}/preapproval`,
        {
          payer_email: subscriptionData.email,
          auto_recurring: {
            frequency: subscriptionData.frequency || 1, // 1 = mensual
            frequency_type: subscriptionData.frequencyType || 'months',
            transaction_amount: subscriptionData.amount,
            currency_id: 'MXN',
            start_date: subscriptionData.startDate || new Date().toISOString(),
            end_date: subscriptionData.endDate
          },
          back_url: `${config.frontendUrl}/subscription-success`,
          external_reference: `SUB-${Date.now()}`,
          reason: subscriptionData.reason || 'Suscripción Nexora-Hug'
        },
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error creando suscripción MercadoPago:', error.response?.data || error.message);
      throw new Error('No se pudo crear la suscripción');
    }
  }

  // WEBHOOK - Recibir notificaciones de pagos
  verifyWebhook(payload) {
    try {
      console.log('Webhook recibido de MercadoPago:', payload);
      
      // MercadoPago envía notificaciones con información del pago
      if (payload.type === 'payment') {
        return {
          validated: true,
          type: payload.type,
          data: payload.data
        };
      }
      
      if (payload.type === 'plan') {
        return {
          validated: true,
          type: 'subscription',
          data: payload.data
        };
      }
      
      return { validated: false };
    } catch (error) {
      console.error('Error verificando webhook MercadoPago:', error.message);
      return { validated: false };
    }
  }

  // OBTENER DETALLES DE PAGO
  async getPaymentDetails(paymentId) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await axios.get(
        `${this.baseUrl}/v1/payments/${paymentId}`,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error obteniendo detalles de pago:', error.message);
      throw new Error('No se pudo obtener los detalles del pago');
    }
  }

  // OBTENER SUSCRIPCIÓN
  async getSubscriptionDetails(subscriptionId) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await axios.get(
        `${this.baseUrl}/preapproval/${subscriptionId}`,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error obteniendo detalles de suscripción:', error.message);
      throw new Error('No se pudo obtener los detalles de la suscripción');
    }
  }

  // CANCELAR SUSCRIPCIÓN
  async cancelSubscription(subscriptionId) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await axios.put(
        `${this.baseUrl}/preapproval/${subscriptionId}`,
        { status: 'cancelled' },
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error cancelando suscripción:', error.message);
      throw new Error('No se pudo cancelar la suscripción');
    }
  }

  // REFUND - Devolver dinero
  async refundPayment(paymentId, amount = null) {
    try {
      const headers = await this.getAuthHeaders();
      
      const refundData = amount ? { amount } : {};
      
      const response = await axios.post(
        `${this.baseUrl}/v1/payments/${paymentId}/refunds`,
        refundData,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error reembolsando pago:', error.message);
      throw new Error('No se pudo procesar el reembolso');
    }
  }

  // GENERAR LINK FLEXIBLE (Como el que ya tienes)
  getFlexibleLink() {
    return {
      url: this.linkUrl,
      description: 'Link de pago flexible Nexora-Hug',
      note: 'El cliente puede ingresar cualquier monto'
    };
  }
}

module.exports = new MercadopagoService();
