const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

class PixverseService {
  constructor(config) {
    this.apiKey = config.pixverse.api_key;
    this.apiBaseUrl = 'https://app-api.pixverse.ai/openapi/v2';
    this.maxRetries = 5;
    this.retryDelay = 2000;
  }

  /**
   * Genera UUID único para cada request
   */
  generateAiTraceId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Obtiene saldo de créditos disponibles
   */
  async getCreditBalance() {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/credit/balance`, {
        headers: {
          'API-KEY': this.apiKey,
          'Ai-trace-id': this.generateAiTraceId()
        }
      });

      if (response.data.ErrCode !== 0) {
        throw new Error(`API Error: ${response.data.ErrMsg}`);
      }

      return response.data.Resp;
    } catch (error) {
      throw new Error(`Error obtaining credit balance: ${error.message}`);
    }
  }

  /**
   * Sube una imagen a Pixverse y retorna img_id
   * @param {string|Buffer} imagePath - Ruta del archivo o Buffer
   * @returns {Promise<{img_id: number, img_url: string}>}
   */
  async uploadImage(imagePath) {
    try {
      const form = new FormData();
      
      if (Buffer.isBuffer(imagePath)) {
        form.append('image', imagePath, 'image.jpg');
      } else {
        form.append('image', fs.createReadStream(imagePath));
      }

      const response = await axios.post(
        `${this.apiBaseUrl}/image/upload`,
        form,
        {
          headers: {
            ...form.getHeaders(),
            'API-KEY': this.apiKey,
            'Ai-trace-id': this.generateAiTraceId()
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity
        }
      );

      if (response.data.ErrCode !== 0) {
        throw new Error(`Upload failed: ${response.data.ErrMsg}`);
      }

      return response.data.Resp;
    } catch (error) {
      throw new Error(`Image upload error: ${error.message}`);
    }
  }

  /**
   * Genera video a partir de imagen y prompt
   * Ideal para efecto de abrazo entre 2 personas
   * @param {number} imgId - ID de imagen subida
   * @param {string} prompt - Descripción del efecto deseado
   * @param {Object} options - Opciones adicionales
   */
  async generateImageToVideo(imgId, prompt, options = {}) {
    try {
      const payload = {
        model: options.model || 'v4.5',
        img_id: imgId,
        prompt: prompt || 'Two people embracing in a loving, fraternal hug, hyperrealistic motion',
        negative_prompt: options.negative_prompt || 'low quality, blurry, distorted',
        duration: options.duration || 5, // 5 o 8 segundos
        quality: options.quality || '720p', // '360p', '540p', '720p', '1080p'
        motion_mode: options.motion_mode || 'normal', // 'normal' o 'fast'
        seed: options.seed || undefined,
        camera_movement: options.camera_movement || 'smooth_zoom_in',
        style: options.style || undefined
      };

      // Remover propiedades undefined
      Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

      const response = await axios.post(
        `${this.apiBaseUrl}/video/img/generate`,
        payload,
        {
          headers: {
            'API-KEY': this.apiKey,
            'Ai-trace-id': this.generateAiTraceId(),
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.ErrCode !== 0) {
        throw new Error(`Generation failed: ${response.data.ErrMsg}`);
      }

      return response.data.Resp; // Retorna {video_id: number}
    } catch (error) {
      throw new Error(`Video generation error: ${error.message}`);
    }
  }

  /**
   * Verifica el estado de generación de video
   * Retorna {status: 1=completo, 5=en progreso, 7=bloqueado, 8=error}
   */
  async getVideoStatus(videoId) {
    try {
      const response = await axios.get(
        `${this.apiBaseUrl}/video/result/${videoId}`,
        {
          headers: {
            'API-KEY': this.apiKey,
            'Ai-trace-id': this.generateAiTraceId()
          }
        }
      );

      if (response.data.ErrCode !== 0) {
        throw new Error(`Status check failed: ${response.data.ErrMsg}`);
      }

      return response.data.Resp;
    } catch (error) {
      throw new Error(`Error checking video status: ${error.message}`);
    }
  }

  /**
   * Espera a que el video se complete (poling)
   * @param {number} videoId
   * @param {number} maxWait - Máximo tiempo de espera en ms
   */
  async waitForVideoCompletion(videoId, maxWait = 300000) {
    const startTime = Date.now();
    let attempts = 0;

    while (Date.now() - startTime < maxWait) {
      try {
        const result = await this.getVideoStatus(videoId);
        
        if (result.status === 1) {
          // Completado exitosamente
          return result;
        } else if (result.status === 7) {
          throw new Error('Video blocked by content moderation');
        } else if (result.status === 8) {
          throw new Error('Video generation failed');
        }

        // Status 5 = en progreso, continuar esperando
        attempts++;
        if (attempts % 6 === 0) {
          console.log(`[Pixverse] Waiting for video ${videoId}... (${attempts * 5}s)`);
        }

        await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (error) {
        if (attempts > 5) throw error;
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    throw new Error(`Video generation timeout after ${maxWait / 1000}s`);
  }

  /**
   * Flujo completo: subir imagen + generar video + esperar + retornar URL
   * OPTIMIZADO PARA 10X PERFORMANCE
   */
  async createHugVideo(imageBuffer, options = {}) {
    try {
      console.log('[Pixverse] Starting HUG video creation...');
      
      // 1. UPLOAD IMAGE
      console.log('[Pixverse] Uploading image...');
      const uploadResult = await this.uploadImage(imageBuffer);
      const imgId = uploadResult.img_id;
      console.log(`[Pixverse] Image uploaded: ${imgId}`);

      // 2. GENERATE VIDEO
      const prompt = options.prompt || 'Two people in a beautiful, hyperrealistic brotherly/loving embrace, emotional connection, warm hug, smooth motion, cinematic quality';
      console.log('[Pixverse] Generating video...');
      const generationResult = await this.generateImageToVideo(imgId, prompt, {
        duration: 5,
        quality: '720p',
        motion_mode: 'normal',
        model: 'v4.5'
      });
      const videoId = generationResult.video_id;
      console.log(`[Pixverse] Video generation started: ${videoId}`);

      // 3. WAIT FOR COMPLETION (con timeout de 5 min)
      console.log('[Pixverse] Waiting for video completion...');
      const completionResult = await this.waitForVideoCompletion(videoId, 300000);
      console.log('[Pixverse] Video completed successfully!');

      return {
        videoId,
        url: completionResult.url,
        status: completionResult.status,
        resolution: `${completionResult.outputWidth}x${completionResult.outputHeight}`,
        size: completionResult.size,
        generatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('[Pixverse] Error in createHugVideo:', error.message);
      throw error;
    }
  }
}

module.exports = PixverseService;
