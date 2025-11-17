const axios = require('axios');

class WiseClient {
  constructor() {
    this.apiKey = process.env.WISE_API_KEY;
    this.baseURL = 'https://api.transferwise.com/v1';
    this.profileId = process.env.WISE_PROFILE_ID;
  }

  async createTransfer({ to, amount, currency, reference }) {
    try {
      // TODO: Implementar con Wise API real
      // Por ahora, simulación
      console.log(`Creating Wise transfer: ${to} - ${amount} ${currency}`);
      
      const transfer = {
        id: `wise_${Date.now()}`,
        status: 'processing',
        amount,
        currency,
        recipient: to,
        reference,
        createdAt: new Date().toISOString()
      };

      return transfer;
    } catch (error) {
      console.error('Wise transfer error:', error);
      throw error;
    }
  }

  async getBalance(currency = 'MXN') {
    try {
      // TODO: Implementar con Wise API
      return {
        currency,
        amount: 50000.00,
        available: 45000.00
      };
    } catch (error) {
      console.error('Wise balance error:', error);
      throw error;
    }
  }

  async getTransferStatus(transferId) {
    try {
      // TODO: Implementar con Wise API
      return {
        id: transferId,
        status: 'completed',
        completedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Wise status error:', error);
      throw error;
    }
  }
}

module.exports = new WiseClient();

