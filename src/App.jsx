// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GroupQuiz from './pages/GroupQuiz';

const App = () => {
  useEffect(() => {
    document.title = 'M Khairul Hamid';
    
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/1024px-.NET_Core_Logo.svg.png?20210328084203';
    } else {
      const newFavicon = document.createElement('link');
      newFavicon.rel = 'icon';
      newFavicon.href = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/1024px-.NET_Core_Logo.svg.png?20210328084203';
      document.head.appendChild(newFavicon);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route exact path="/personalweb" element={<Home />} />
          <Route path="/personalweb/group-quiz" element={<GroupQuiz />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;