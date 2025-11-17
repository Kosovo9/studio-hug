const sharp = require('sharp');
const path = require('path');

class WatermarkManager {
  constructor() {
    this.watermarkText = 'Powered by Nexora-Hug';
    this.logoPath = path.join(__dirname, '../assets/nexora-logo.png');
  }

  async addTextWatermark(inputPath, outputPath, options = {}) {
    const { 
      text = this.watermarkText, 
      position = 'southeast', 
      opacity = 0.5, 
      fontSize = 16 
    } = options;

    const svgWatermark = Buffer.from(`
      <svg width="300" height="60">
        <style>
          .watermark {
            font-family: Arial, sans-serif;
            font-size: ${fontSize}px;
            fill: white;
            opacity: ${opacity};
          }
        </style>
        <text x="10" y="40" class="watermark">${text}</text>
      </svg>
    `);

    await sharp(inputPath)
      .composite([{
        input: svgWatermark,
        gravity: position,
        blend: 'over'
      }])
      .toFile(outputPath);

    return outputPath;
  }

  async addLogoWatermark(inputPath, outputPath, options = {}) {
    const { position = 'southeast', opacity = 0.5 } = options;

    try {
      const logo = await sharp(this.logoPath)
        .resize(100, 100)
        .composite([{
          input: Buffer.from([255, 255, 255, Math.floor(255 * opacity)]),
          raw: { width: 1, height: 1, channels: 4 }
        }])
        .toBuffer();

      await sharp(inputPath)
        .composite([{
          input: logo,
          gravity: position,
          blend: 'over'
        }])
        .toFile(outputPath);

      return outputPath;
    } catch (error) {
      // Si no hay logo, usar texto
      return this.addTextWatermark(inputPath, outputPath, options);
    }
  }

  shouldApplyWatermark(userTier) {
    return userTier === 'free' || !userTier;
  }

  async processImage(imageBuffer, userTier, options = {}) {
    if (!this.shouldApplyWatermark(userTier)) {
      return imageBuffer; // Sin watermark para usuarios Pro+
    }

    const tempInput = path.join(__dirname, '../temp', `input_${Date.now()}.png`);
    const tempOutput = path.join(__dirname, '../temp', `output_${Date.now()}.png`);

    try {
      // Guardar buffer temporal
      await sharp(imageBuffer).toFile(tempInput);

      // Aplicar watermark
      await this.addTextWatermark(tempInput, tempOutput, {
        opacity: 0.5,
        position: 'southeast',
        ...options
      });

      // Leer resultado
      const result = await sharp(tempOutput).toBuffer();

      // Limpiar archivos temporales
      // TODO: Implementar cleanup

      return result;
    } catch (error) {
      console.error('Error applying watermark:', error);
      return imageBuffer; // Retornar original si falla
    }
  }
}

module.exports = new WatermarkManager();

