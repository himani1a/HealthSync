import React, { useState } from 'react';
import axios from 'axios';
import supplementImage from '../assets/supplement.png'; // Make sure to import your image here
import Navbar1 from '../components/Navbar1'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import girlImage from '../assets/girl1.png'; // This assumes you have an image called "girl.png" in your assets folder
import Footer from '../components/Footer';

import '../style/SupplementRecommendations.css'; // Import your custom CSS

const SupplementRecommendations = () => {
    const questions = {
        bone_health: "Do you have a family history of osteoporosis or low bone density?",
        fatigue_low_energy: "Do you often feel tired and lacking in energy?",
        frequent_illness: "Do you seem to get sick more often than others?",
        digestive_issues: "Do you experience frequent bloating, gas, constipation, or diarrhea?",
        mental_health: "Do you experience low mood, anxiety, or difficulty concentrating?",
        joint_pain: "Do you have ongoing pain or stiffness in your joints?",
        vegan_vegetarian: "Do you follow a vegan or vegetarian diet?",
        lactose_intolerant: "Do you have difficulty digesting dairy products?",
        limited_dietary_variety: "Do you have a picky or restricted diet?",
        age_50_plus: "Are you over the age of 50?",
        pregnant_breastfeeding: "Are you pregnant, trying to conceive, or breastfeeding?",
        athlete_highly_active: "Do you engage in intense or frequent physical activity?",
        // stressful_lifestyle: "Do you experience high levels of stress?"
    };

    const [answers, setAnswers] = useState({});
    const [recommendations, setRecommendations] = useState({});

    const handleSelection = async (key, value) => {
        setAnswers({ ...answers, [key]: value });

        if (value) {
            try {
                const response = await axios.post('http://localhost:5000/api/supplements', { selections: { [key]: true } });
                // Assuming the backend sends data in the structure: { "supplements": { "Calcium": "Supports bone density and health.", ... } }
                setRecommendations(prev => ({ ...prev, [key]: response.data[key] }));
            } catch (error) {
                console.error('Error fetching supplement recommendations', error);
            }
        } else {
            // Remove the recommendations for the unselected key
            setRecommendations(prev => {
                const newRecs = { ...prev };
                delete newRecs[key];
                return newRecs;
            });
        }
    };

    return (
        <div>
            <div><Navbar1 /></div>
            <div className="container py-4 ">
                <h1 className="mb-4 text-center">Supplement Recommendations</h1>
              
                <div className="card mb-4 no-hover-effect">
                    <div className="row g-0">

                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title big-text ">The Importance of Supplements</h5>
                                <p className="card-text">
                                    Our goal is to educate individuals about the role of dietary supplements in promoting overall health and well-being. Taking dietary supplements can be an important way for many people to maintain or improve their overall health.  It's especially critical for those who don't get a full range of vitamins and minerals from their diet.  Supplements can help to fill these gaps and provide essential nutrients that may be missing.<br></br>

                                    <b>Important Notes:</b><br></br>

                                    -<u>Supplements complement, not replace:</u> Dietary supplements are designed to enhance a healthy diet, not substitute for it. Always prioritize consuming a variety of whole foods rich in essential nutrients.<br></br>
                                    -<u>Nutritional deficiencies:</u> Supplements can be valuable tools to correct vitamin and mineral deficiencies and ensure that you get “enough” micronutrients each day.<br></br>
                                    -<u>Modern challenges:</u> In today's fast-paced world with increased consumption of fast food and exposure to pollution, there is a risk of not getting adequate nutrition from our diets alone. Supplements can provide support in these circumstances.
                                </p>
                                <p className="card-text">
                                    <small className="text-muted">But is always advised to consult a healthcare provider before starting any new supplement regimen.</small>
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <img src={supplementImage} className="img-fluid rounded-start" alt="Supplements" />
                        </div>
                    </div>
                </div>
                <div className="supplement-container">

                <div className="info-box">
                    <div className="info-image">
                        <img src={girlImage} alt="Girl" /> {/* Image of the girl */}
                    </div>
                    <div className="info-content">
                        <h2>Did You Know?</h2>
                        <p>No matter what your goal is when taking supplements, one thing is certain: They aren't a replacement for a nutrient-dense, healthy diet.</p>
                    </div>
                </div>
                </div>
                {Object.entries(questions).map(([key, question]) => (
                    <div key={key} className="card mb-4 no-hover-effect">
                        <div className="card-body">
                            <h5 className="card-title">{question}</h5>
                            <div className="d-flex flex-row justify-content-start">
                                <button className="btn btn-success me-2" onClick={() => handleSelection(key, true)}>Yes</button>
                                <button className="btn btn-danger" onClick={() => handleSelection(key, false)}>No</button>
                            </div>
                            {answers[key] && recommendations[key] && (
                                <div className="recommendation mt-3">
                                    <h6>Supplement Recommendations:</h6>
                                    <ul className="list-unstyled">
                                        {recommendations[key].supplements.map((supplement, index) => (
                                            <li key={index} className="mb-2">
                                                <strong>{supplement}</strong>
                                            </li>
                                        ))}
                                    </ul>
                                    <p>{recommendations[key].description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div><Footer /></div>
        </div>
    );
};

export default SupplementRecommendations;