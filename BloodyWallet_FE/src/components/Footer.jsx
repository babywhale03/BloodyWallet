import React from 'react';
import './Footer.css';
import Home from '../img/footer-home.png'; // eslint-disable-line no-unused-vars
import Wallet from '../img/footer-wallet.png'; // eslint-disable-line no-unused-vars
import Donate from '../img/footer-donate.png'; // eslint-disable-line no-unused-vars
import Profile from '../img/footer-profile.png'; // eslint-disable-line no-unused-vars
import HomeColored from '../img/footer-home-colored.png'; // eslint-disable-line no-unused-vars
import WalletColored from '../img/footer-wallet-colored.png'; // eslint-disable-line no-unused-vars
import DonateColored from '../img/footer-donate-colored.png'; // eslint-disable-line no-unused-vars
import ProfileColored from '../img/footer-profile-colored.png'; // eslint-disable-line no-unused-vars

function Footer() {
  return (
    <div className="footer">
      <div className="home">홈</div>
      <div className="wallet">지갑</div>
      <div className="donate">기부</div>
      <div className="profile">프로필</div>
    </div>
  );
}

export default Footer;
