import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [userData, setUserData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '',
    activity: '',
    recommendations: null, // Add state to store recommendations
  });

  // Added state for displaying feedback or errors
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(''); // Reset feedback
    setError(''); // Reset error

    console.log("Data being sent to backend:", userData);

    try {
      const response = await axios.post('/api/recommendations', userData); // Correct API endpoint
      // setUserData({ ...userData, recommendations: response.data }); // Store recommendations
      setUserData(prevState => ({
        ...prevState,
        recommendations: response.data.recommendations
      }));

      // Display recommendations in the UI
      console.log('Recommendations:', response.data);
      setFeedback('Recommendations received successfully.');

    } catch (error) {
      console.error('Error saving user data:', error);
      setError('Failed to save user data. Please try again.'); // Display error message to the user
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Height (cm):
          <input
            type="number"
            name="height"
            value={userData.height}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Weight (kg):
          <input
            type="number"
            name="weight"
            value={userData.weight}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={userData.age}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Gender:
          <select name="gender" value={userData.gender} onChange={handleInputChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label>
          Activity Level:
          <select name="activity" value={userData.activity} onChange={handleInputChange}>
            <option value="Sedentary">Sedentary</option>
            <option value="Moderately Active">Moderately Active</option>
            <option value="Active">Active</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>

      {error && <p className="error">{error}</p>}
      {feedback && <p className="feedback">{feedback}</p>}

      {/* Conditional rendering for recommendations */}
      {userData.recommendations && (
        <div>
          <h2>Your Recommendations</h2>
          <p><strong>Breakfast:</strong> {userData.recommendations.breakfast && userData.recommendations.breakfast.length > 0 ? userData.recommendations.breakfast.map(meal => `${meal.dish} (${meal.calories} calories, Ingredients: ${meal.ingredients})`).join(', ') : 'Not available'}</p>
          <p><strong>Lunch:</strong> {userData.recommendations.lunch && userData.recommendations.lunch.length > 0 ? userData.recommendations.lunch.map(meal => `${meal.dish} (${meal.calories} calories, Ingredients: ${meal.ingredients})`).join(', ') : 'Not available'}</p>
          <p><strong>Dinner:</strong> {userData.recommendations.dinner && userData.recommendations.dinner.length > 0 ? userData.recommendations.dinner.map(meal => `${meal.dish} (${meal.calories} calories, Ingredients: ${meal.ingredients})`).join(', ') : 'Not available'}</p>
        </div>
      )}


    </>
  );
};

export default UserForm;
