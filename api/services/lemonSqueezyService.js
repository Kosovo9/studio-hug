const axios = require('axios');
const config = require('../config/config');

class LemonSqueezyService {
  constructor() {
    this.apiKey = config.lemonSqueezy.apiKey;
    this.baseUrl = 'https://api.lemonsqueezy.com/v1';
  }

  async getAuthHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.api+json'
    };
  }

  async createProduct(productData) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await axios.post(
        `${this.baseUrl}/products`,
        {
          data: {
            type: 'products',
            attributes: {
              name: productData.name,
              description: productData.description,
              status: productData.status || 'published',
              redirect_on_purchase: productData.redirectUrl
            }
          }
        },
        { headers }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error creando producto Lemon Squeezy:', error.response?.data || error.message);
      throw new Error('No se pudo crear el producto');
    }
  }

  async createVariant(productId, variantData) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await axios.post(
        `${this.baseUrl}/variants`,
        {
          data: {
            type: 'variants',
            attributes: {
              name: variantData.name,
              price: variantData.price * 100, // Lemon Squeezy usa centavos
              currency: variantData.currency || 'USD',
              is_license_key: variantData.isLicenseKey || false
            },
            relationships: {
              product: {
                data: {
                  type: 'products',
                  id: productId.toString()
                }
              }
            }
          }
        },
        { headers }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error creando variante Lemon Squeezy:', error.response?.data || error.message);
      throw new Error('No se pudo crear la variante');
    }
  }

  async createCheckout(variantId, checkoutData) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await axios.post(
        `${this.baseUrl}/checkouts`,
        {
          data: {
            type: 'checkouts',
            attributes: {
              checkout_data: {
                email: checkoutData.email,
                name: checkoutData.name,
                billing_address: checkoutData.billingAddress,
                custom: checkoutData.custom
              }
            },
            relationships: {
              variant: {
                data: {
                  type: 'variants',
                  id: variantId.toString()
                }
              }
            }
          }
        },
        { headers }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error creando checkout Lemon Squeezy:', error.response?.data || error.message);
      throw new Error('No se pudo crear el checkout');
    }
  }

  async getOrder(orderId) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await axios.get(
        `${this.baseUrl}/orders/${orderId}`,
        { headers }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error obteniendo orden Lemon Squeezy:', error.response?.data || error.message);
      throw new Error('No se pudo obtener la orden');
    }
  }

  async createSubscription(variantId, subscriptionData) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await axios.post(
        `${this.baseUrl}/subscriptions`,
        {
          data: {
            type: 'subscriptions',
            attributes: {
              customer_email: subscriptionData.email,
              billing_cycle: subscriptionData.billingCycle || 'monthly',
              pause_at: subscriptionData.pauseAt
            },
            relationships: {
              variant: {
                data: {
                  type: 'variants',
                  id: variantId.toString()
                }
              }
            }
          }
        },
        { headers }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error creando suscripción Lemon Squeezy:', error.response?.data || error.message);
      throw new Error('No se pudo crear la suscripción');
    }
  }

  async updateSubscription(subscriptionId, updateData) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await axios.patch(
        `${this.baseUrl}/subscriptions/${subscriptionId}`,
        {
          data: {
            type: 'subscriptions',
            id: subscriptionId.toString(),
            attributes: updateData
          }
        },
        { headers }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error actualizando suscripción Lemon Squeezy:', error.response?.data || error.message);
      throw new Error('No se pudo actualizar la suscripción');
    }
  }

  verifyWebhookSignature(payload, signature) {
    try {
      const crypto = require('crypto');
      const hash = crypto
        .createHmac('sha256', this.apiKey)
        .update(payload)
        .digest('hex');
      return hash === signature;
    } catch (error) {
      console.error('Error verificando firma del webhook:', error.message);
      return false;
    }
  }
}

module.exports = new LemonSqueezyService();
