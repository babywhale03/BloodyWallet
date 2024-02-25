import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
// import Main from './Main';
// import Splash from './Splash';
// import Wallet from './Wallet';
import Donate from './Donate';
import './index.css';
// import Splash from './Splash';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Splash /> */}
    {/* <Main /> */}
    {/* <Wallet /> */}
    <Donate />
  </React.StrictMode>,
);
