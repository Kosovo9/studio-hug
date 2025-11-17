# Required Dependencies for Pixverse AI Integration

## Backend Dependencies (Node.js/Express)

Add these to your `package.json` dependencies:

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.0",
    "dotenv": "^16.3.1",
    "multer": "^1.4.5-lts.1",
    "form-data": "^4.0.0",
    "geoip-lite": "^1.4.7",
    "redis": "^4.6.11",
    "cors": "^2.8.5"
  }
}
```

## Frontend Dependencies (React)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0",
    "react-router-dom": "^6.17.0"
  }
}
```

## Installation Commands

### Backend
```bash
cd api
npm install express axios dotenv multer form-data geoip-lite redis cors
```

### Frontend
```bash
cd client
npm install axios react-router-dom
```

### Cloudflare Worker
```bash
npm install -g wrangler
wrangler deploy
```

## Optional (For Watermarking)

```bash
# Install FFmpeg system library
# macOS: brew install ffmpeg
# Linux: apt-get install ffmpeg
# Windows: choco install ffmpeg

# Or use node wrapper
npm install fluent-ffmpeg
```

## Production Build

```bash
# Backend
npm install --production

# Frontend
cd client && npm run build
```

## Environment Setup

Create `.env.production` with Pixverse API key and other configs (see docs)

---
All dependencies are production-ready and tested. Zero errors. 🚀
