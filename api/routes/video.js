const express = require('express');
const router = express.Router();
const multer = require('multer');
const PixverseService = require('../services/pixverseService');
const CurrencyDetector = require('../lib/currencyDetector');

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max
  fileFilter: (req, file, cb) => {
    if (['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se aceptan JPG, PNG o WebP'));
    }
  }
});

let pixverseService;

// Middleware: Inicializar Pixverse Service
router.use((req, res, next) => {
  if (!pixverseService) {
    pixverseService = new PixverseService(require('../config/config'));
  }
  next();
});

/**
 * POST /api/video/create-hug
 * Crea video de abrazo hiperrealista
 * Body: FormData con imagenes
 * Retorna: {videoId, url, price, currency, region}
 */
router.post('/create-hug', upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 }
]), async (req, res) => {
  try {
    const { image1, image2 } = req.files;
    
    if (!image1 || !image2) {
      return res.status(400).json({ error: 'Se requieren dos imágenes' });
    }

    // Combinar imágenes o usar una de ellas
    const imageBuffer = image1[0].buffer;

    console.log(`[VIDEO] Creating hug video for ${req.currencyInfo.country}`);
    
    // Crear video con Pixverse
    const result = await pixverseService.createHugVideo(imageBuffer, {
      prompt: 'Two people in a beautiful, hyperrealistic fraternal embrace, emotional connection, warm hug, smooth motion, cinematic quality'
    });

    // Retornar con info de moneda
    res.json({
      success: true,
      videoId: result.videoId,
      url: result.url,
      price: req.currencyInfo.price,
      currency: req.currencyInfo.currency,
      region: req.currencyInfo.region,
      country: req.currencyInfo.country,
      resolution: result.resolution,
      generatedAt: result.generatedAt
    });
  } catch (error) {
    console.error('[VIDEO] Error creating hug:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/video/status/:videoId
 * Obtiene estado de generación del video
 */
router.get('/status/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    const status = await pixverseService.getVideoStatus(parseInt(videoId));
    
    res.json({
      videoId,
      status: status.status,
      url: status.url || null,
      percentage: status.status === 1 ? 100 : status.status === 5 ? 50 : 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/video/download/:videoId
 * Descarga video con watermark (si es free tier)
 */
router.get('/download/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    const { paid } = req.query; // true si usuario pagó
    
    const status = await pixverseService.getVideoStatus(parseInt(videoId));
    
    if (status.status !== 1) {
      return res.status(400).json({ error: 'Video aún se está generando' });
    }

    // Si no pagó, agregar watermark
    let downloadUrl = status.url;
    if (!paid) {
      // Aquí irían lógica de watermark
      // downloadUrl = await addWatermark(status.url);
    }

    res.json({
      downloadUrl,
      expiresIn: 3600000, // 1 hora
      watermarked: !paid
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/video/price
 * Obtiene precio en moneda del usuario
 */
router.get('/price', (req, res) => {
  const currencyInfo = req.currencyInfo || CurrencyDetector.getByIP(req.clientIP);
  
  res.json({
    price: currencyInfo.price,
    currency: currencyInfo.currency,
    region: currencyInfo.region,
    country: currencyInfo.country,
    formatted: `${currencyInfo.price} ${currencyInfo.currency}`
  });
});

/**
 * GET /api/video/credit-balance
 * Obtiene saldo de créditos disponibles
 */
router.get('/credit-balance', async (req, res) => {
  try {
    const balance = await pixverseService.getCreditBalance();
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
