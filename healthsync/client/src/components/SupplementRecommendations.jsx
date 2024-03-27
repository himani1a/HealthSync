import React, { useState } from 'react';
import axios from 'axios';

const SupplementRecommendations = () => {
    const [formData, setFormData] = useState({
        medical_conditions: [],
        dietary_restrictions: [],
        life_stage: '',
        medications: []
    });
    const [supplementRecommendations, setSupplementRecommendations] = useState([]); // Initialize as an empty array

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: checked
                    ? [...prevFormData[name], value]
                    : prevFormData[name].filter(item => item !== value)
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/supplements', formData);
            setSupplementRecommendations(response.data.supplements || []); // Set to empty array if undefined
        } catch (error) {
            console.error('Error fetching supplement recommendations', error);
        }
    };

    return (
        <div>
            <h1>Supplement Recommendations</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <input type="checkbox" name="medical_conditions" value="diagnosed_deficiency" onChange={handleChange} />
                        Diagnosed Deficiency
                    </label>
                    <label>
                        <input type="checkbox" name="medical_conditions" value="celiac_disease" onChange={handleChange} />
                        Celiac Disease
                    </label>
                    {/* Add other checkboxes for medical conditions as needed */}
                </div>
                <div>
                    <label>
                        <input type="checkbox" name="dietary_restrictions" value="vegan" onChange={handleChange} />
                        Vegan
                    </label>
                    {/* Add other checkboxes for dietary restrictions as needed */}
                </div>
                <div>
                    <label>Life Stage:</label>
                    <select name="life_stage" onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="pregnant">Pregnant</option>
                        <option value="breastfeeding">Breastfeeding</option>
                        <option value="older_adult">Older Adult</option>
                        {/* Add other options as needed */}
                    </select>
                </div>
                <div>
                    <label>
                        <input type="checkbox" name="medications" value="medication_that_depletes_nutrients" onChange={handleChange} />
                        Medication that Depletes Nutrients
                    </label>
                    {/* Add other checkboxes for medications as needed */}
                </div>
                <button type="submit">Get Recommendations</button>
            </form>

            {supplementRecommendations.length > 0 && (
                <div>
                    <h2>Recommended Supplements</h2>
                    <ul>
                        {supplementRecommendations.map((supplement, index) => (
                            <li key={index}>{supplement}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SupplementRecommendations;
