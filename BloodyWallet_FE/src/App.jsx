import React from 'react';
import './App.css';
import SplashComponent from './Splash';
import MainComponent from './Main';
import WalletComponent from './Wallet';
import DonateComponent from './Donate';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashComponent />} />
        <Route path="/main" element={<MainComponent />} />
        <Route path="/wallet" element={<WalletComponent />} />
        <Route path="/donate" element={<DonateComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
