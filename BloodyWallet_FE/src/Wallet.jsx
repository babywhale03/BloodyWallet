import React from 'react';
import './Wallet.css';
import Certificate from './components/Certificate';
import Home from './img/footer-home.png'; // eslint-disable-line no-unused-vars
import WalletImg from './img/footer-wallet.png'; // eslint-disable-line no-unused-vars
import Donate from './img/footer-donate.png'; // eslint-disable-line no-unused-vars
import Profile from './img/footer-profile.png'; // eslint-disable-line no-unused-vars
import HomeColored from './img/footer-home-colored.png'; // eslint-disable-line no-unused-vars
import WalletColored from './img/footer-wallet-colored.png'; // eslint-disable-line no-unused-vars
import DonateColored from './img/footer-donate-colored.png'; // eslint-disable-line no-unused-vars
import ProfileColored from './img/footer-profile-colored.png'; // eslint-disable-line no-unused-vars
import Plus from './img/wallet-plus.png';

function Wallet() {
  const [certificates, setCertificates] = React.useState([]);

  const fetchCertificates = async () => {
    try {
      const response = await fetch('https://dodosae.shop/app/wall/blood?id=20');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('certificate hi');
      setCertificates([...data.result]);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  React.useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchImage = async () => {
    try {
      const response = await fetch('https://dodosae.shop/app/wall/blood', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      await fetchCertificates();
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="title">Blood Wallet</div>
        <div className="section">
          <div className="section-title">헌혈 지갑</div>
          <div className="section-selectbox" />
        </div>
      </div>
      <div className="select-image">
        <img src={Plus} alt="" onClick={fetchImage} />
        <div className="select-description">
          헌혈증서
          <br />
          사진 추가하기
        </div>
      </div>
      {certificates.map((certificate, index) => (
        <Certificate
          key={index}
          id={certificate.w_num}
          type={certificate.w_type}
          date={certificate.w_date}
          name={certificate.w_hos}
        />
      ))}
      <div className="footer">
        <div className="home">
          <img src={Home} alt="" />홈
        </div>
        <div className="wallet">
          <img src={WalletColored} alt="" />
          지갑
        </div>
        <div className="donate">
          <img src={Donate} alt="" />
          기부
        </div>
        <div className="profile">
          <img src={Profile} alt="" />
          프로필
        </div>
      </div>
    </div>
  );
}

export default Wallet;
