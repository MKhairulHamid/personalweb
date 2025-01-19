// src/App.js
import React, { useEffect } from 'react';
import Home from './pages/Home';

const App = () => {
  useEffect(() => {
    // Update the document title
    document.title = 'M Khairul Hamid';
    
    // Update favicon
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      // Replace [YOUR_LOGO_URL] with your actual logo URL
      favicon.href = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/1024px-.NET_Core_Logo.svg.png?20210328084203';
    } else {
      // If favicon link doesn't exist, create it
      const newFavicon = document.createElement('link');
      newFavicon.rel = 'icon';
      newFavicon.href = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/1024px-.NET_Core_Logo.svg.png?20210328084203';
      document.head.appendChild(newFavicon);
    }
  }, []);
  return <Home />;
};

export default App;