import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';
import '../style/SuccessPage.css';


const SuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const roomId = location.state?.roomId;

  useEffect(() => {
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);
  
  const handleJoinRoom = () => {
    if (roomId) {
        navigate(`/room/${roomId}`);
    } else {
        navigate("/room");
    }
};


  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
            <div className="icon-circle"></div>
            <div className="icon-fix"></div>
          </div>
        </div>
        <h2>Payment succeeded!</h2>
        <p>Thank you for processing your most recent payment. You can now join the session.</p>
        <button onClick={handleJoinRoom} className="dashboard-button">Join class now!</button>
      </div>
    </div>
  );

};

export default SuccessPage;
