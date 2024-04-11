import React from 'react';
import axios from 'axios';
import Navbar1 from '../components/Navbar1';
import useFetch from '../hooks/fetch.hook';

// Import your custom styles if necessary

import '../style/PaymentPage.css'; 

const TrainingPrograms = () => {
    return (
      <div className="training-programs-container">
        <h3 className="training-programs-title">Programs We Offer For You</h3>
        <div className="training-program-list">
          <div className="training-program-item">
            <div className="training-program-icon"><i className="fas fa-om"></i></div>
            <h4>Yoga</h4>
            <p>Enjoy yoga classes for all levels, body types, body weight workouts, tone, pilates, and more.</p>
          </div>
          <div className="training-program-item">
            <div className="training-program-icon"><i className="fas fa-dumbbell"></i></div>
            <h4>Muscles</h4>
            <p>Regular strength training improves the health of your bones, muscles, and connective tissue.</p>
          </div>
          <div className="training-program-item">
            <div className="training-program-icon"><i className="fas fa-running"></i></div>
            <h4>Fitness</h4>
            <p>Your tailored program and show you will workouts designed to meet your fitness level and goals.</p>
          </div>
        </div>
      </div>
    );
  };
  
const PaymentPage = () => {
    const [{ isLoading, apiData, serverError }] = useFetch(); // Use the correct endpoint

    // const containerStyle = {
    //     backgroundImage: `url(${backgroundImage})`,
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     overflow: 'hidden'
    // };

    const handlePayment = async () => {
        if (isLoading) {
            console.log('User data is loading...');
            return;
        }

        if (serverError) {
            console.error('Error fetching user data:', serverError.message);
            return;
        }

        const payload = {
            "return_url": "http://localhost:5173/SuccessPage",
            "website_url": "http://localhost:5173",
            "amount": parseInt(35000),
            "purchase_order_id": "test12",
            "purchase_order_name": "test",
            "customer_info": {
                "name": apiData?.username || "Default Name",
                "email": apiData?.email || "default@example.com",
                "phone": apiData?.phonenumber || "9800000000"
            },
        };

        const response = await axios.post('http://localhost:8000/api/khalti', payload);
        console.log('Khalti response:', response.data);
        if (response) {
           window.location.href = response.data.data.payment_url;
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (serverError) return <div>Error: {serverError.message}</div>;

    return (
        <div className='container' >
            <Navbar1 />
            <TrainingPrograms />

            <div className="container mt-3">
                <div className="d-flex justify-content-center">
                    <div className="card payment-card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Payment for Classes</h5>
                            <p className="card-text">
                                Each session costs Nrps. 350.
                                Click the button below to pay for your classes and secure your spot.
                            </p>
                            <button onClick={handlePayment} className="btn btn-primary">
                                Pay Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
