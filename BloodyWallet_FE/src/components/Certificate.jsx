import React from 'react';
import './Certificate.css';

function Certificate(props) {
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-title">헌혈증서</div>
        <div className="card-num">
          증서번호&nbsp;
          {props.id}
        </div>
      </div>
      <div className="card-content">
        <div className="card-content-box">
          <div className="card-content-title">헌혈종류</div>
          <div className="card-content">{props.type}</div>
        </div>
        <div className="card-content-box">
          <div className="card-content-title">헌혈일자</div>
          <div className="card-content">{props.date}</div>
        </div>
        <div className="card-content-box">
          <div className="card-content-title">혈액원명</div>
          <div className="card-content">{props.name}</div>
        </div>
      </div>
    </div>
  );
}

export default Certificate;
