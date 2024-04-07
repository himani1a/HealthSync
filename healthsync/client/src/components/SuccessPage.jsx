import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import '../style/SuccessPage.css'; // Make sure you have the CSS file

const SuccessPage = () => {
  useEffect(() => {
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

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
        <p>Thank you for processing your most recent payment. Your premium subscription will expire on June 2, 2024.</p>
        <button className="dashboard-button">Your dashboard</button>
      </div>
    </div>
  );
};

export default SuccessPage;
