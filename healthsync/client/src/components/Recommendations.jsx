// UserForm.js
import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
    const [userData, setUserData] = useState({
        height: '',
        weight: '',
        age: '',
        gender: '',
        activity: ''
    });

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/user', userData);
            console.log('User data saved:', response.data);
            // Update your logic to display recommendations or redirect to another page
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Add input fields for username, password, email, etc. */}
            <label>
                Height:
                <input type="text" name="height" value={userData.height} onChange={handleInputChange} />
            </label>
            <label>
                Weight:
                <input type="text" name="weight" value={userData.weight} onChange={handleInputChange} />
            </label>
            <label>
                Age:
                <input type="text" name="age" value={userData.age} onChange={handleInputChange} />
            </label>
            <label>
                Gender:
                <input type="text" name="gender" value={userData.gender} onChange={handleInputChange} />
            </label>
            <label>
                Activity:
                <input type="text" name="activity" value={userData.activity} onChange={handleInputChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;
