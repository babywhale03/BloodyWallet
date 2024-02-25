import React from 'react';
import './Donate.css';
import Foundation from './components/Foundation';
import Mileage from './img/donate-mileage.png';
import Arrow from './img/donate-arrow.png';
import Certificate from './img/donate-certificate.png';
import Home from './img/footer-home.png'; // eslint-disable-line no-unused-vars
import Wallet from './img/footer-wallet.png'; // eslint-disable-line no-unused-vars
import DonateImg from './img/footer-donate.png'; // eslint-disable-line no-unused-vars
import Profile from './img/footer-profile.png'; // eslint-disable-line no-unused-vars
// import HomeColored from './img/footer-home-colored.png'; // eslint-disable-line no-unused-vars
import WalletColored from './img/footer-wallet-colored.png'; // eslint-disable-line no-unused-vars
import DonateColored from './img/footer-donate-colored.png'; // eslint-disable-line no-unused-vars
import ProfileColored from './img/footer-profile-colored.png'; // eslint-disable-line no-unused-vars
import Icon from './img/donate-icon.png';
import MileageComponent from './components/Mileage';
import MakeDonation from './components/MakeDonation';

function Donate() {
  const [mileage, setMileage] = React.useState(0);
  const [histories, setHistory] = React.useState([]);
  const [stamp, setStampCount] = React.useState(0);
  const [reducedStamp, setReducedStamp] = React.useState(0);

  React.useEffect(() => {
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

  React.useEffect(() => {
    const bringHistory = async () => {
      try {
        const response = await fetch(
          'https://dodosae.shop/app/used/bloodused?id=20',
          {
            method: 'GET',
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const body = await response.json();
        console.log(body.result);
        setHistory(body.result);
      } catch (error) {
        console.error('Fetching data failed', error);
      }
    };

    bringHistory();
  }, []);

  const bringStamp = async () => {
    try {
      const response = await fetch('https://dodosae.shop/app/prof/cup?id=20', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const body = await response.json();
      // console.log(body.result[0][0].p_cup);
      setStampCount(body.result[0][0].p_cup);
    } catch (error) {
      console.error('Fetching data failed', error);
    }
  };

  bringStamp();

  const sendMileageData = async () => {
    const mileageCount = mileage - 22600 * Math.floor(mileage / 22600);
    console.log(mileageCount);
    const stampCount = stamp + Math.floor(mileage / 22600);
    console.log(stampCount);

    try {
      const response = await fetch('https://dodosae.shop/app/prof/ex', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cup: stampCount,
          mil: mileageCount,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendStampData = async (countStamp) => {
    bringStamp();
    console.log('current Stamp', stamp);
    const stampCount = stamp - countStamp;
    console.log('parent', stampCount);
    setReducedStamp(countStamp);
    try {
      const response = await fetch('https://dodosae.shop/app/prof/don', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cup: stampCount,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="title">Blood Wallet</div>
      </div>
      <div className="foundation">
        <div className="foundation-title">재단</div>
        <div className="foundation-section">
          <Foundation
            img={Icon}
            title="초록우산"
            content="기증해 주신 헌혈증은 당장 수혈을 받아야 하는 환자들에게 지원됩니다."
          />
          <Foundation
            img={Icon}
            title="초록우산"
            content="기증해 주신 헌혈증은 당장 수혈을 받아야 하는 환자들에게 지원됩니다."
          />
        </div>
      </div>
      <div className="mileage">
        <div className="mileage-title">마일리지</div>
        <div className="mileage-exchange">
          <div className="mileage-exchange-content">
            <div className="mileage-exchange-mileage">
              <img src={Mileage} alt="" />
              <div className="mileage-count">{mileage}점</div>
            </div>
            <img src={Arrow} alt="" />
            <div className="mileage-exchange-certificate">
              <img src={Certificate} alt="" />
              <div className="certificate-title">헌혈증서</div>
              <div className="certificate-count">
                {Math.floor(mileage / 22600)}개
              </div>
            </div>
          </div>
          <div className="details">
            * 수혈 본임 부당비용 기준 : 22,600점 당 헌혈증서 1개
          </div>
          <div
            className="mileage-exchange-button"
            type="button"
            onClick={sendMileageData}
          >
            변환하기
          </div>
        </div>
        <div className="mileage-details">
          <div className="mileage-details-title">내역</div>
          <div className="mileage-list">
            {histories.map((history) => (
              <MileageComponent
                date={history.pi_date}
                detail={history.pi_content}
                mileage={history.pi_used}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="home">
          <img src={Home} alt="" />홈
        </div>
        <div className="wallet">
          <img src={Wallet} alt="" />
          지갑
        </div>
        <div className="donate">
          <img src={DonateColored} alt="" />
          기부
        </div>
        <div className="profile">
          <img src={Profile} alt="" />
          프로필
        </div>
      </div>
      {/* <MakeDonation updateState={sendStampData} /> */}
    </div>
  );
}

export default Donate;
