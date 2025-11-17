const express = require('express');
const router = express.Router();

// Crear código de afiliado
router.post('/create', async (req, res) => {
  try {
    const { userId, name } = req.body;
    
    const affiliateCode = `NEX${Date.now().toString(36).toUpperCase()}`;
    
    // TODO: Guardar en Supabase
    const affiliate = {
      id: `aff_${Date.now()}`,
      userId,
      affiliateCode,
      name: name || 'Mi Código',
      totalEarnings: 0,
      totalConversions: 0,
      pendingPayment: 0,
      createdAt: new Date().toISOString()
    };
    
    res.json({ success: true, affiliateCode, affiliate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener estadísticas de afiliado
router.get('/stats/:code', async (req, res) => {
  try {
    const { code } = req.params;
    
    // TODO: Obtener de Supabase
    const stats = {
      totalEarnings: 2500.50,
      totalConversions: 15,
      pendingPayment: 500.00,
      conversionRate: 3.2,
      earningsByMonth: [
        { month: 'Enero', earnings: 500 },
        { month: 'Febrero', earnings: 750 },
        { month: 'Marzo', earnings: 1250 }
      ]
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leaderboard de afiliados
router.get('/leaderboard', async (req, res) => {
  try {
    // TODO: Obtener de Supabase
    const leaderboard = [
      { rank: 1, name: 'Juan Pérez', earnings: 5000, conversions: 50 },
      { rank: 2, name: 'María García', earnings: 3500, conversions: 35 },
      { rank: 3, name: 'Carlos López', earnings: 2500, conversions: 25 }
    ];
    
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Track conversión
router.post('/track', async (req, res) => {
  try {
    const { affiliateCode, userId, amount } = req.body;
    
    // Calcular comisión (20% del primer pago)
    const commission = amount * 0.20;
    
    // TODO: Guardar en Supabase
    console.log(`Conversion tracked: ${affiliateCode} - $${commission} MXN`);
    
    res.json({ 
      success: true, 
      commission,
      message: 'Conversión registrada'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

