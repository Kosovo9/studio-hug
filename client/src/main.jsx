import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => (
  <div style={{ width: '100vw', height: '100vh', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h1 style={{ fontSize: '48px', color: 'red' }}>NEXORA APP WORKS!</h1>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
