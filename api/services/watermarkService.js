// Watermark Service for Free Tier Videos
const fs = require('fs');
const path = require('path');

class WatermarkService {
  constructor(config) {
    this.enabled = config.video.watermarkEnabled;
    this.text = config.video.watermarkText || 'PremiumHug.ai';
    this.position = config.video.watermarkPosition || 'bottom-right';
    this.opacity = config.video.watermarkOpacity || 0.7;
  }

  async addWatermark(videoPath, outputPath, isPaidUser = false) {
    // Skip watermark for paid users
    if (isPaidUser || !this.enabled) {
      return videoPath;
    }

    try {
      // FFmpeg command to add watermark text
      const ffmpegCmd = this.buildFFmpegCommand(videoPath, outputPath);
      
      return new Promise((resolve, reject) => {
        const { execFile } = require('child_process');
        execFile('ffmpeg', ffmpegCmd.split(' ').filter(Boolean), (err, stdout, stderr) => {
          if (err) reject(err);
          else resolve(outputPath);
        });
      });
    } catch (error) {
      console.error('Watermark error:', error);
      return videoPath; // Return original if watermarking fails
    }
  }

  buildFFmpegCommand(input, output) {
    const positions = {
      'bottom-right': 'x=W-w-20:y=H-h-20',
      'bottom-left': 'x=20:y=H-h-20',
      'top-right': 'x=W-w-20:y=20',
      'top-left': 'x=20:y=20',
      'center': 'x=(W-w)/2:y=(H-h)/2',
    };

    const pos = positions[this.position] || positions['bottom-right'];
    const alpha = Math.round(this.opacity * 255).toString(16).padStart(2, '0');

    return `-i "${input}" -vf "drawtext=text='${this.text}':${pos}:fontsize=24:fontcolor=white@${alpha}:box=1:boxcolor=black@0.5" "${output}"`;
  }
}

module.exports = WatermarkService;
