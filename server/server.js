import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';
import config from './config.js';
import connect from './database/conn.js';
import router from './router/route.js';
import Recommendation from './model/Recommendation.model.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.status(200).json('Home GET request');
});

app.post('/api/recommendations', async (req, res) => {
  try {
    // Extract user data
    const { height, weight, age, gender, activity } = req.body;

    // Make a request to the Flask server
    const flaskResponse = await axios.post(`${config.FLASK_API_URL}/api/recommendations`, { 
      height, weight, age, gender, activity 
    });

    if (flaskResponse.status !== 200) {
      throw new Error(`Flask API Error: ${flaskResponse.data.error}`);
    }

    // Save recommendations (add bmi & calories if included in response)
    const newRecommendation = new Recommendation({
      height, weight, age, gender, activity,
      bmi: flaskResponse.data.bmi, // Add if available
      calories: flaskResponse.data.calories, // Add if available
      recommendations: flaskResponse.data.recommendations,
    });
    await newRecommendation.save();

    res.status(201).json({ recommendations: flaskResponse.data }); // Return recommendations
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Route to save recommendations
app.post('/api/save_recommendations', async (req, res) => {
  try {
    const { formData, recommendations } = req.body;

    const newRecommendation = new Recommendation({
      ...formData,
      recommendations,
    });
    await newRecommendation.save();

    res.status(201).json({ message: 'Recommendations saved successfully' });
  } catch (error) {
    console.error('Error saving recommendations:', error);
    res.status(500).json({ error: 'Error saving recommendations' });
  }
});

app.use('/api', router); // If you have additional routes

// Start server after database connection
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log('Invalid database connection', error);
  });
