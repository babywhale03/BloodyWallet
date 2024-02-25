import React from 'react';
import './MakeDonation.css';
import Close from '../img/makedonation-close.png';

function MakeDonation({ updateState }) {
  const [count, setCount] = React.useState(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => {
      if (prevCount > 0) {
        return prevCount - 1;
      } else {
        return prevCount;
      }
    });
  };

  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-title">기부하기</div>
        <img src={Close} alt="" />
      </div>
      <div className="card-content">
        <div className="card-controller">
          <button type="button" onClick={handleDecrement}>
            -
          </button>
          <span>{count}</span>
          <button type="button" onClick={handleIncrement}>
            +
          </button>
        </div>
        <div className="card-content-detail">
          선택하신 초록우산 재단에
          <br />
          헌혈증서&nbsp;
          {count}
          개를 기부하시겠습니까?
        </div>
      </div>
      <div className="card-button">
        <div className="card-button-cancel">취소하기</div>
        <div
          className="card-button-donate"
          onClick={() => {
            updateState(count);
            console.log('child', count);
          }}
        >
          기부하기
        </div>
      </div>
    </div>
  );
}

export default MakeDonation;
