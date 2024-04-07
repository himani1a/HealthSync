import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/PaymentPage.css'; // Your custom styles

const PaymentPage = () => {
  const handlePayment = async() => {
    // Redirecting to Khalti payment gateway or invoke the API call
    console.log('Redirecting to payment gateway...');
    const payload = {
        "return_url": "http://localhost:5173/SuccessPage",
        "website_url": "http://localhost:5173",
        "amount": parseInt(10000),
        "purchase_order_id": "test12",
        "purchase_order_name": "test",
        "customer_info": {
            "name": "Khalti Bahadur",
            "email": "example@gmail.com",
            "phone": "9800000123"
        },
    };

    const response = await axios.post('http://localhost:8000/api/khalti',
    payload);
    console.log('Khalti response:', response.data);
    if (response) {
       window.location.href = response.data.data.payment_url;
    }

        
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="card payment-card">
          <div className="card-body text-center">
            <h5 className="card-title">Payment for Classes</h5>
            <p className="card-text">
              Click the button below to pay for your classes and secure your spot.
            </p>
            <button onClick={handlePayment} className="btn btn-primary">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
