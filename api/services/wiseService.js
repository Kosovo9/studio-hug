const axios = require('axios');
const config = require('../config/config');

class WiseService {
  constructor() {
    this.apiKey = config.wise.apiKey;
    this.profileId = config.wise.profileId;
    this.baseUrl = 'https://api.wise.com';
  }

  async getAuthHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  async getExchangeRate(sourceCurrency, targetCurrency) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await axios.get(
        `${this.baseUrl}/v1/rates?source=${sourceCurrency}&target=${targetCurrency}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tipo de cambio Wise:', error.message);
      throw new Error('No se pudo obtener el tipo de cambio');
    }
  }

  async createRecipient(recipientData) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await axios.post(
        `${this.baseUrl}/v1/accounts`,
        {
          profile_id: this.profileId,
          accountHolderName: recipientData.name,
          currency: recipientData.currency,
          type: recipientData.type || 'iban', // iban, email, etc.
          details: recipientData.details // Detalles específicos del tipo de cuenta
        },
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error('Error creando destinatario en Wise:', error.response?.data || error.message);
      throw new Error('No se pudo crear el destinatario');
    }
  }

  async createQuote(quoteData) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await axios.post(
        `${this.baseUrl}/v2/quotes`,
        {
          profile_id: this.profileId,
          source_currency: quoteData.sourceCurrency,
          target_currency: quoteData.targetCurrency,
          source_amount: quoteData.sourceAmount,
          target_amount: quoteData.targetAmount,
          type: quoteData.type || 'SEND' // SEND o RECEIVE
        },
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error('Error creando cotización Wise:', error.response?.data || error.message);
      throw new Error('No se pudo crear la cotización');
    }
  }

  async createTransfer(transferData) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await axios.post(
        `${this.baseUrl}/v1/transfers`,
        {
          profile_id: this.profileId,
          quote_uuid: transferData.quoteId,
          account_id: transferData.accountId,
          reference: transferData.reference,
          user_profile: transferData.userProfile
        },
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error('Error creando transferencia Wise:', error.response?.data || error.message);
      throw new Error('No se pudo crear la transferencia');
    }
  }

  async fundTransfer(transferId, fundingData) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await axios.post(
        `${this.baseUrl}/v3/profiles/${this.profileId}/transfers/${transferId}/payments`,
        {
          type: fundingData.type || 'BALANCE',
          reference: fundingData.reference
        },
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error('Error financiando transferencia Wise:', error.response?.data || error.message);
      throw new Error('No se pudo financiar la transferencia');
    }
  }

  async getTransferStatus(transferId) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await axios.get(
        `${this.baseUrl}/v1/transfers/${transferId}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estado de transferencia Wise:', error.message);
      throw new Error('No se pudo obtener el estado de la transferencia');
    }
  }

  async getBalance() {
    try {
      const headers = await this.getAuthHeaders();
      const response = await axios.get(
        `${this.baseUrl}/v4/profiles/${this.profileId}/balances`,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error('Error obteniendo saldo Wise:', error.message);
      throw new Error('No se pudo obtener el saldo');
    }
  }
}

module.exports = new WiseService();
