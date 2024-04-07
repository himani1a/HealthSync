import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'
import style from "../style/Username.css?inline";
import backgroundImage from '../assets/back1.jpg';
import '../style/DietForm.css'; // Assume a CSS file for styling
import { useNavigate } from 'react-router-dom';


const DietForm = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '',
    activity: '',
  });

  const [dietRecommendation, setDietRecommendation] = useState(null);
  const [dietDetails, setDietDetails] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/recommendations', formData);
      setDietRecommendation(response.data);
      setDietDetails(response.data);
      const saveResponse = await axios.post('http://localhost:5000/api/save_recommendations', {
        formData, // User input data
        recommendations: dietRecommendation // Diet recommendations
      });

      // Assuming your save endpoint returns a success message:
      console.log(saveResponse.data);
      // You may want to handle displaying the recommendation in the UI here
    } catch (error) {
      console.error('Error submitting form', error);
      // Handle any errors here
    }
  };
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div>
      <div className={`container-fluid ${style['background-container']}`} style={containerStyle}></div>
      <div><Navbar /></div>

      <div className="container mt-5">
      <form onSubmit={handleSubmit} className="user-input-form mb-4">
          <div className="form-group">
            <label>Height (cm):</label>
            <input type="number" name="height" value={formData.height} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Weight (kg):</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Activity Level:</label>
            <select name="activity" value={formData.activity} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Sedentary">Sedentary</option>
              <option value="Moderately Active">Moderately Active</option>
              <option value="Active">Active</option>
            </select>
          </div>
          <button type="submit" className="btn1">Submit</button>
        </form>
        {dietDetails && (
          <div className="recommendations">
            <h2>Recommendations</h2>
            <p>BMI: {dietDetails.bmi}</p>
            <p>Calorie Needs: {dietDetails.calories}</p>

          </div>
        )}
        {dietRecommendation && (
          <div className="recommendation-section">


            <div className="meal-recommendation">
              <h3>Breakfast</h3>
              {dietRecommendation.recommendations.breakfast.map((meal, index) => (
                <div key={index} className="meal-card">
                  <p>{meal.dish} - {meal.calories} calories, {meal.ingredients} [{meal.category}]</p>
                </div>
              ))}
            </div>
            <div className="meal-recommendation">
              <h3>Lunch</h3>
              {dietRecommendation.recommendations.lunch.map((meal, index) => (
                <div key={index} className="meal-card">
                  <p>{meal.dish} - {meal.calories} calories, {meal.ingredients} [{meal.category}]</p>
                </div>
              ))}
            </div>
            <div className="meal-recommendation">
              <h3>Dinner</h3>
              {dietRecommendation.recommendations.dinner.map((meal, index) => (
                <div key={index} className="meal-card">
                  <p>{meal.dish} - {meal.calories} calories, {meal.ingredients} [{meal.category}]</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <button onClick={() => navigate('/SupplementRecommendations')} className="btn1">Supplement Recommendations</button>
      </div>
    </div>

    );
};



// In DietForm component or wherever you display the diet recommendations



export default DietForm;