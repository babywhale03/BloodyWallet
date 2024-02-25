import React from 'react';
import './Foundation.css';

function Foundation(props) {
  return (
    <div className="card-container">
      <div className="card-header">
        <img src={props.img} alt="" />
        <div className="card-header-title">{props.title}</div>
      </div>
      <hr />
      <div className="card-content">{props.content}</div>
      <div className="card-footer">
        모인 헌혈증
        <span>4/100</span>
      </div>
      <div className="donate-button">
        기부하기
      </div>
    </div>
  );
}

export default Foundation;
