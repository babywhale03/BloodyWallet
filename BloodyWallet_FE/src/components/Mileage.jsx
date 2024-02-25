import React from 'react';
import './Mileage.css';

function Mileage(props) {
  return (
    <div className="mileage-container">
      {/* <input type="checkbox" checked={props.check === 'true'} readOnly /> */}
      <div className="date">{props.date}</div>
      <div className="detail">{props.detail}</div>
      <div className="mileage">{props.mileage}점</div>
    </div>
  );
}

export default Mileage;
