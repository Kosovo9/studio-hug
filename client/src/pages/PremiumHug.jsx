import React, { useState } from 'react';
import axios from 'axios';

const PremiumHug = () => {
  const [images, setImages] = useState([null, null]);
  const [price, setPrice] = useState(20);
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [status, setStatus] = useState('idle');

  // Get pricing in user's currency
  React.useEffect(() => {
    axios.get('/api/video/price')
      .then(res => {
        setPrice(res.data.price);
        setCurrency(res.data.code);
      })
      .catch(err => console.error('Pricing error:', err));
  }, []);

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!images[0] || !images[1]) {
      alert('Please upload 2 images');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image1', images[0]);
    formData.append('image2', images[1]);

    try {
      const res = await axios.post('/api/video/create-hug', formData);
      setVideoId(res.data.videoId);
      setStatus('processing');
      pollStatus(res.data.videoId);
    } catch (err) {
      alert('Error creating video: ' + err.message);
      setLoading(false);
    }
  };

  const pollStatus = async (id) => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`/api/video/status/${id}`);
        if (res.data.status === 'completed') {
          setStatus('completed');
          clearInterval(interval);
          setLoading(false);
        }
      } catch (err) {
        clearInterval(interval);
      }
    }, 2000);
  };

  return (
    <div className="premium-hug-container">
      <h1>PremiumHug.ai - Abrazo Hiperrealista</h1>
      <p>Precio: {currency} ${price}</p>
      
      <form onSubmit={handleSubmit}>
        <div className="image-uploads">
          {[0, 1].map(i => (
            <div key={i} className="upload-box">
              <label>Persona {i + 1}</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => handleImageChange(i, e.target.files[0])}
                disabled={loading}
              />
              {images[i] && <p>{images[i].name}</p>}
            </div>
          ))}
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Procesando...' : 'Crear Video'}
        </button>
      </form>

      {status === 'completed' && videoId && (
        <div className="video-result">
          <p>✅ Video completado!</p>
          <a href={`/api/video/download/${videoId}`}>Descargar</a>
        </div>
      )}
    </div>
  );
};

export default PremiumHug;
