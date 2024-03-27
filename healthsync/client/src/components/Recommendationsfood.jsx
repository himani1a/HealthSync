import React from 'react';
import { useLocation } from 'react-router-dom';

const Recommendationsfood = () => {
  const location = useLocation();
  const dietDetails = location.state?.dietDetails;
  const dietRecommendation = location.state?.dietRecommendation;


  if (!dietRecommendation) {
    return <div>No recommendations found</div>;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      {dietDetails && (
        <div>
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
    </div>
  );
};

export default Recommendationsfood;
