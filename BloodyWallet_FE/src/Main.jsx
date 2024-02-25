import React from 'react';
import './App.css';
import Blood from './img/main-blood.png';
import Mileage from './img/main-mileage.png';
import Arrow from './img/main-arrow.png';
import Certificate from './img/main-certificate.png';
import Home from './img/footer-home.png'; // eslint-disable-line no-unused-vars
import Wallet from './img/footer-wallet.png'; // eslint-disable-line no-unused-vars
import Donate from './img/footer-donate.png'; // eslint-disable-line no-unused-vars
import Profile from './img/footer-profile.png'; // eslint-disable-line no-unused-vars
import HomeColored from './img/footer-home-colored.png'; // eslint-disable-line no-unused-vars
import WalletColored from './img/footer-wallet-colored.png'; // eslint-disable-line no-unused-vars
import DonateColored from './img/footer-donate-colored.png'; // eslint-disable-line no-unused-vars
import ProfileColored from './img/footer-profile-colored.png'; // eslint-disable-line no-unused-vars
// import Splash from './Splash';
import { Link } from 'react-router-dom';

function ImageComponent({ isRed }) {
  return <div className={`image ${isRed ? 'red' : ''}`} />;
}

function Main() {
  const totalCount = 10;
  const [redCount, setRedCount] = React.useState(0);
  const [mileage, setMileage] = React.useState(0);

  React.useEffect(() => {
    const bringStamp = async () => {
      try {
        const response = await fetch(
          'https://dodosae.shop/app/prof/cup?id=20',
          {
            method: 'GET',
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const body = await response.json();
        console.log(body.result[0][0].p_cup);
        setRedCount(body.result[0][0].p_cup);
      } catch (error) {
        console.error('Fetching data failed', error);
      }
    };

    bringStamp();

    const bringMileage = async () => {
      try {
        const response = await fetch(
          'https://dodosae.shop/app/prof/mil?id=20',
          {
            method: 'GET',
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const body = await response.json();
        console.log(body.result[0][0].p_mil);
        setMileage(body.result[0][0].p_mil);
      } catch (error) {
        console.error('Fetching data failed', error);
      }
    };

    bringMileage();
  }, []);

  // const [showSplash, setShowSplash] = React.useState(true);

  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowSplash(false);
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // });

  return (
    <div className="container">
      <div className="header">
        <div className="title">Blood Wallet</div>
        <div className="blood-rate">
          <div className="blood-img">
            <img src={Blood} alt="" />
          </div>
          <div className="tot-blood">
            사랑 온도 : {36.5 + ((100 - 36.5) * 9) / 10}도
          </div>
        </div>
      </div>
      <div className="mileage">
        <div className="first-line">
          <span className="username">이재은</span>
          님의
        </div>
        <div className="second-line">
          적립된 마일리지는&nbsp;
          <span className="mileage-num">{mileage}</span>점 입니다
        </div>
        <div className="mileage-exchange">
          <div className="mileage-exchange-mileage">
            <img src={Mileage} alt="" />
            <div className="mileage-count">{mileage}점</div>
          </div>
          <img src={Arrow} alt="" />
          <div className="mileage-exchange-certificate">
            <img src={Certificate} alt="" />
            <div className="certificate-count">
              헌혈증서 {Math.floor(mileage / 22600)}개
            </div>
          </div>
        </div>
      </div>
      <div className="coupon">
        <div className="coupon-title">헌혈증 스탬프</div>
        <div className="coupon-list">
          {Array.from({ length: totalCount }, (_, index) => (
            <ImageComponent key={index} isRed={index < redCount} />
          ))}
        </div>
      </div>
      <div className="footer">
        <div className="home">
          <img src={HomeColored} alt="" />홈
        </div>
        <div className="wallet">
          <img src={Wallet} alt="" />
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

export default Main;
