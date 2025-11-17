import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function PixverseHugGenerator() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [uploadedImages, setUploadedImages] = useState({ image1: null, image2: null });
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState('full');

  const abVariants = {
    full: {
      title: 'Full HD Embrace',
      description: '1080p hyperrealistic embrace video',
      duration: '5 seconds',
      quality: 'Premium'
    },
    standard: {
      title: 'Standard Embrace',
      description: '720p realistic embrace video',
      duration: '5 seconds',
      quality: 'Standard'
    }
  };

  const handleImageUpload = (e, imageType) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages(prev => ({
          ...prev,
          [imageType]: event.target?.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateEmbrace = async () => {
    if (!uploadedImages.image1 || !uploadedImages.image2) {
      alert('Please upload both images');
      return;
    }

    setLoading(true);
    setGenerationProgress(0);

    try {
      const formData = new FormData();
      
      // Convert data URLs back to files
      const blob1 = await fetch(uploadedImages.image1).then(r => r.blob());
      const blob2 = await fetch(uploadedImages.image2).then(r => r.blob());
      
      formData.append('image1', blob1, 'image1.jpg');
      formData.append('image2', blob2, 'image2.jpg');

      // Show progress simulation
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => Math.min(prev + Math.random() * 25, 90));
      }, 1000);

      const response = await axios.post('/api/video/create-hug', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      clearInterval(progressInterval);
      setGenerationProgress(100);

      const videoData = {
        id: response.data.videoId,
        url: response.data.url,
        variant: selectedVariant,
        price: response.data.price,
        currency: response.data.currency,
        generatedAt: new Date(response.data.generatedAt),
        image1: uploadedImages.image1,
        image2: uploadedImages.image2,
        status: 'completed'
      };

      setVideos(prev => [videoData, ...prev]);
      setCurrentVideo(videoData);
      setUploadedImages({ image1: null, image2: null });
    } catch (error) {
      console.error('Error generating embrace:', error);
      alert('Failed to generate embrace video');
    } finally {
      setLoading(false);
      setGenerationProgress(0);
    }
  };

  const downloadVideo = async (videoId) => {
    try {
      const response = await axios.get(`/api/video/download/${videoId}?paid=true`);
      window.open(response.data.downloadUrl, '_blank');
    } catch (error) {
      console.error('Error downloading video:', error);
      alert('Failed to download video');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 mb-4">
            🎬 Pixverse Embrace Generator
          </h1>
          <p className="text-gray-300 text-lg">Create hyperrealistic embrace videos with AI - 1000% emotional authenticity</p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Generator Panel */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-2">
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8">
            {/* Variant Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Select Quality Variant</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(abVariants).map(([key, variant]) => (
                  <motion.button
                    key={key}
                    onClick={() => setSelectedVariant(key)}
                    whileHover={{ scale: 1.05 }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedVariant === key
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-purple-500/30 bg-transparent hover:border-purple-500/50'
                    }`}
                  >
                    <div className="text-left">
                      <h4 className="font-bold text-white">{variant.title}</h4>
                      <p className="text-sm text-gray-300">{variant.quality}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Upload Embrace Subjects</h3>
              <div className="grid grid-cols-2 gap-4">
                {['image1', 'image2'].map((imageType) => (
                  <div key={imageType} className="border-2 border-dashed border-purple-500/50 rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, imageType)}
                      className="hidden"
                      id={`upload-${imageType}`}
                    />
                    <label htmlFor={`upload-${imageType}`} className="cursor-pointer block">
                      {uploadedImages[imageType] ? (
                        <>
                          <img src={uploadedImages[imageType]} alt="preview" className="w-full h-40 object-cover rounded mb-2" />
                          <p className="text-green-400 text-sm">✓ Image selected</p>
                        </>
                      ) : (
                        <>
                          <svg className="w-12 h-12 mx-auto mb-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <p className="text-gray-300">Upload {imageType === 'image1' ? 'Person 1' : 'Person 2'}</p>
                        </>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <motion.button
              onClick={generateEmbrace}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-lg transition-all"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating... {Math.round(generationProgress)}%
                </div>
              ) : (
                '✨ Generate Embrace Video'
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Videos Gallery */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-1">
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 h-full">
            <h3 className="text-xl font-bold text-white mb-6">Generated Videos</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {videos.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No videos generated yet</p>
              ) : (
                videos.map((video) => (
                  <motion.div
                    key={video.id}
                    onClick={() => setCurrentVideo(video)}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      currentVideo?.id === video.id
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-purple-500/30 bg-transparent hover:border-purple-500/50'
                    }`}
                  >
                    <p className="text-sm font-mono text-purple-300">#{video.id}</p>
                    <p className="text-xs text-gray-400 mt-1">{video.variant}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadVideo(video.id);
                      }}
                      className="mt-2 w-full bg-purple-500 hover:bg-purple-600 text-white text-xs py-2 rounded transition-colors"
                    >
                      Download
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Current Video Preview */}
      {currentVideo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mt-12"
        >
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Video Preview</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {currentVideo.url && (
                <motion.div className="md:col-span-2">
                  <video
                    src={currentVideo.url}
                    controls
                    className="w-full rounded-lg border border-purple-500/30"
                    autoPlay
                  />
                </motion.div>
              )}
              <div className="space-y-4">
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Video ID</p>
                  <p className="text-white font-mono text-lg">{currentVideo.id}</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Variant</p>
                  <p className="text-white font-bold">{currentVideo.variant}</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Generated</p>
                  <p className="text-white text-sm">{currentVideo.generatedAt?.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => downloadVideo(currentVideo.id)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
                >
                  Download Video
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
