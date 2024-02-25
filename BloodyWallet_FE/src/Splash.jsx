import React from 'react';
import './Splash.css';
import SplashImg from './img/splash-blood.png';
// import { useNavigate } from 'react-router-dom';

function Splash() {
  // const navigate = useNavigate();

  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate('/main');
  //   }, 3000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [navigate]);

  return (
    <div className="container">
      <div className="app-name">Blood Bank</div>
      <div className="app-description">
        당신의 잠들어 있는
        <br />
        헌혈증서를 깨워주세요
      </div>
      <div className="image">
        <img src={SplashImg} alt="이미지" />
      </div>
    </div>
  );
}

export default Splash;
