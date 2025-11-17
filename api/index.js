require('dotenv').config();
const express = require('express');
const cors = require('cors');
const spacesRouter = require('./routes/spaces');
const analyticsRouter = require('./routes/analytics');
const paymentsRouter = require('./routes/payments');
const affiliatesRouter = require('./routes/affiliates');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/spaces', spacesRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/affiliates', affiliatesRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    message: 'Nexora-Hug API running 🚀',
    target: '$30K MXN/mes'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 API corriendo en puerto ${PORT}`);
});

module.exports = app;

