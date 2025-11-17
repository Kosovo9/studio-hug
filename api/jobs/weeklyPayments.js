const cron = require('node-cron');

// CRON JOB para pagos automáticos cada LUNES a las 9 AM CST
cron.schedule('0 9 * * 1', async () => {
  console.log('💰 Iniciando pagos semanales de afiliados...');
  
  try {
    // TODO: Obtener afiliados elegibles de Supabase
    const affiliates = await getAffiliatesForPayment();
    
    for (const affiliate of affiliates) {
      if (affiliate.earnings_mxn >= 500) { // Pago mínimo: $500 MXN
        try {
          await processWiseTransfer({
            to: affiliate.wise_email,
            amount: affiliate.earnings_mxn,
            currency: 'MXN',
            reference: `Pago semanal - Nexora ${new Date().toISOString()}`
          });
          
          console.log(`✅ Pago procesado: ${affiliate.wise_email} - $${affiliate.earnings_mxn} MXN`);
          
          // TODO: Actualizar estado en Supabase
          await updatePaymentStatus(affiliate.id, 'completed');
        } catch (error) {
          console.error(`❌ Error procesando pago para ${affiliate.wise_email}:`, error);
          
          // Backup: Intentar con PayPal
          try {
            await processPayPalTransfer({
              to: affiliate.paypal_email,
              amount: affiliate.earnings_mxn,
              currency: 'MXN'
            });
            console.log(`✅ Pago procesado vía PayPal: ${affiliate.paypal_email}`);
          } catch (paypalError) {
            console.error(`❌ Error también con PayPal:`, paypalError);
            await updatePaymentStatus(affiliate.id, 'failed');
          }
        }
      } else {
        console.log(`⏸️ Pago pendiente (mínimo no alcanzado): ${affiliate.wise_email} - $${affiliate.earnings_mxn} MXN`);
      }
    }
    
    console.log('🎉 Proceso de pagos semanales completado');
  } catch (error) {
    console.error('❌ Error en proceso de pagos:', error);
  }
}, {
  timezone: "America/Mexico_City"
});

// Funciones helper (implementar con Wise API)
async function getAffiliatesForPayment() {
  // TODO: Query a Supabase
  return [
    {
      id: 'aff_1',
      wise_email: 'affiliate1@example.com',
      paypal_email: 'affiliate1@example.com',
      earnings_mxn: 1500.00
    }
  ];
}

async function processWiseTransfer({ to, amount, currency, reference }) {
  // TODO: Implementar con Wise API
  console.log(`Processing Wise transfer: ${to} - ${amount} ${currency}`);
  return { success: true, transferId: `wise_${Date.now()}` };
}

async function processPayPalTransfer({ to, amount, currency }) {
  // TODO: Implementar con PayPal API
  console.log(`Processing PayPal transfer: ${to} - ${amount} ${currency}`);
  return { success: true, transferId: `paypal_${Date.now()}` };
}

async function updatePaymentStatus(affiliateId, status) {
  // TODO: Actualizar en Supabase
  console.log(`Updating payment status: ${affiliateId} - ${status}`);
}

// Ejecutar manualmente para testing
if (require.main === module) {
  console.log('🧪 Ejecutando pagos manualmente (testing)...');
  cron.schedule('* * * * *', async () => {
    // Ejecutar inmediatamente para testing
    const affiliates = await getAffiliatesForPayment();
    console.log('Affiliates encontrados:', affiliates.length);
  });
}

module.exports = { getAffiliatesForPayment, processWiseTransfer };

