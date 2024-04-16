import React, { useState } from 'react';
import axios from 'axios';
import Navbar1 from './Navbar1';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import '../style/Calorietrack.css'; // Import your custom CSS

function Calorietrack() {
  const [foodName, setFoodName] = useState('');
  const [foodData, setFoodData] = useState({});
  const [isValid, setIsValid] = useState(true);

  const fetchCalorieData = async () => {
    if (!foodName.trim()) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/calorie/${foodName}`);
      setFoodData(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setFoodData({});
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar1 />
      <div className="container mt-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group mb-3">
              <input
                type="text"
                className={`form-control ${!isValid ? 'is-invalid' : ''}`}
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="Enter food name"
              />
              <div className="input-group-append">
                <button className="btn btn-primary" onClick={fetchCalorieData}>Get Calorie Info</button>
              </div>
              {!isValid && <div className="invalid-feedback">Please enter a food name.</div>}
            </div>
            {foodData.Calories && (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Calorie Information</h5>
                  <p className="card-text">Serving: {foodData.Serving}</p>
                  <p className="card-text">Calories: {foodData.Calories}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Calorietrack;
