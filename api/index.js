require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { validateEnv } = require('./utils/validateEnv');
const spacesRouter = require('./routes/spaces');
const analyticsRouter = require('./routes/analytics');
const paymentsRouter = require('./routes/payments');
const affiliatesRouter = require('./routes/affiliates');

// Validate environment variables
validateEnv();

const app = express();
const { generalLimiter } = require('./middleware/rateLimiter');

app.use(cors());
app.use(express.json());
app.use(generalLimiter);

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

// Error handler global
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({ 
    error: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 API corriendo en puerto ${PORT}`);
});

module.exports = app;

