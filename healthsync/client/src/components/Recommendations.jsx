import React, { useState } from 'react';
import axios from 'axios';
import Navbar1 from '../components/Navbar'
import style from "../style/Username.css?inline";



import { Card, Button, Row, Col, Container, Modal  } from 'react-bootstrap';
import PropTypes from 'prop-types';
import breakfastImage from '../assets/1.png';
import lunchImage from '../assets/3.png';
import dinnerImage from '../assets/4.png';


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
  const [formError, setFormError] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.height || !formData.weight || !formData.age || !formData.gender || !formData.activity) {
      setFormError('Please fill in all details');
      return; // Prevent the form from submitting
    } else {
      setFormError(''); // Clear any existing error messages
    }
    try {
      const response = await axios.post('http://localhost:5000/api/recommendations', formData);
      setDietRecommendation(response.data);
      setDietDetails(response.data);
      setShowModal(true);
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
 



  const MealCard = ({ meal, mealType }) => {
    let imageSrc;

    switch (mealType) {
      case 'breakfast':
        imageSrc = breakfastImage;
        break;
      case 'lunch':
        imageSrc = lunchImage;
        break;
      case 'dinner':
        imageSrc = dinnerImage;
      //   break;
      // default:
      //   imageSrc = defaultImage; // Replace with your default image if any
    }

    return (
      <Card className="h-100 shadow-sm">
        <Card.Img variant="top" src={imageSrc} />

        <Card.Body className="d-flex flex-column">
          <Card.Title className="big-text">{meal.dish}</Card.Title>
          <hr style={{ margin: '0.5rem 0' }} />

          <Card.Text className="small-text">
            <b>Calories:</b> {meal.calories}
            <br />
            <b>Category:</b> {meal.category.toLowerCase()}
            <br />
            <b>Ingredients:</b> {meal.ingredients}
          </Card.Text>

          {/* <Button variant="primary" className="mt-auto">
            Add
          </Button> */}
        </Card.Body>
      </Card>
    );
  };

  MealCard.propTypes = {
    meal: PropTypes.shape({
      dish: PropTypes.string.isRequired,
      calories: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      ingredients: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }),
    mealType: PropTypes.oneOf(['breakfast', 'lunch', 'dinner']).isRequired,
  };



  return (
    <div>


      <div><Navbar1 /></div>

      <div className="container"> {/* Use 'container' for a responsive fixed width container */}
        <div className="row justify-content-center"> {/* Centers the form in the middle of the page */}
          <div className="col-md-8 col-lg-6"> {/* This will size the form to use 8 columns on medium screens, and 6 on large screens */}
            <form onSubmit={handleSubmit} className="bg-light shadow rounded-3 p-4 form-background">

              <h1 className="text-center mb-4 fs-4">Please fill in the details:</h1>

              <div className="mb-3"> {/* Bootstrap class for margin bottom */}
                <label htmlFor="height" className="form-label">Height (cm):</label>
                <input type="number" name="height" id="height" className="form-control" placeholder="Height in cm" value={formData.height} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label htmlFor="weight" className="form-label">Weight (kg):</label>
                <input type="number" name="weight" id="weight" className="form-control" placeholder="Weight in kg" value={formData.weight} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label htmlFor="age" className="form-label">Age:</label>
                <input type="number" name="age" id="age" className="form-control" placeholder="Your age" value={formData.age} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label htmlFor="gender" className="form-label">Gender:</label>
                <select name="gender" id="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="activity" className="form-label">Activity Level:</label>
                <select name="activity" id="activity" className="form-select" value={formData.activity} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Sedentary">Sedentary</option>
                  <option value="Moderately Active">Moderately Active</option>
                  <option value="Active">Active</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="goals" className="form-label">Health Goals:</label>
                <select name="goals" id="goals" className="form-select" value={formData.goals} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Weight Gain">Weight Gain</option>
                  <option value="Improve general health">Improve general health</option>
                </select>
              </div>

              {formError && <div className="alert alert-danger" role="alert">{formError}</div>}

              <button type="submit" className="btn1">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <section id="story" >
        <div className="story-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="text-content">
                  <h2>When your plate is mindful, richness lies in balance, not in indulgence. </h2>
                  <p>In hyperthyroidism, beware: what you avoid on your plate can
                    be as vital as what you consume. Guard your health with conscious choices.</p>
                  <button onClick={() => navigate('/BlogList')} className="main-btn mt-3">Read More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {dietRecommendation && (
        <Container className="recommendation-background" >

          <h2>Recommendations</h2>
          <p><b>BMI:</b> Your Bmi is,  {dietDetails.bmi}</p>
          <p><b>Calorie Needs: </b>As per the calculation your total calorie is {dietDetails.calories}.</p>

          {['breakfast', 'lunch', 'dinner'].map((mealType) => (
            <div key={mealType} className="meal-recommendation">
              <h3>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h3>
              <Row xs={1} md={3} lg={5} className="g-4">
                {dietRecommendation.recommendations[mealType].map((meal, idx) => (
                  <Col key={idx} className="d-flex align-items-stretch">
                    <MealCard meal={meal} mealType={mealType} />
                  </Col>
                ))}
              </Row>
            </div>
          ))}
          <button onClick={() => navigate('/SupplementRecommendations')} className="btn1">Supplement Recommendations</button>
        </Container>
      )}
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Success!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Scroll down to view the recommendations!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>


    </div>

  );
};

// In DietForm component or wherever you display the diet recommendations



export default DietForm;

