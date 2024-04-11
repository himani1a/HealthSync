import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';
import config from './config.js';
import connect from './database/conn.js';
import router from './router/route.js';
import Recommendation from './model/Recommendation.model.js';

import adminRoute from './router/admin-route.js';

import blogRoute from './router/Blogroute.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.disable('x-powered-by');



const port = process.env.PORT || 8000;

app.use('/api', router);

app.use(express.json({ limit: '10mb' })); // Adjust the limit as per your needs

// Increase the size limit for URL-encoded payloads
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Adjust the limit as per your needs

app.use('/api', blogRoute);


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

app.use('/api/admin', adminRoute); // If you have additional routes


app.use(cors({ origin: true }));

// app.post("/authenticate", async (req, res) => {
//   const { username } = req.body;
//   try {
//     const r = await axios.post(
//       "https://api.chatengine.io/users/",
//       { username:username, secret:username, first_name:username},
//       { headers: { "Private-Key": "93acfb90-9712-48ae-8907-f04f1c0e79d7" } }
//     );
//     return res.status(r.status).json(r.data);
//   } catch (e) {
//     return res.status(e.response.status).json(e.response.data);
//   }
// });
app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  
  try {
    // Check if the user already exists
    // Assuming the Chat Engine has an endpoint to get user by username
    const userRes = await axios.get(`https://api.chatengine.io/users/`, {
      headers: { "Private-Key": '93acfb90-9712-48ae-8907-f04f1c0e79d7' }
    });

    // If the user exists, respond with user data
    return res.status(200).json(userRes.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // If user does not exist, create the user
      try {
        const newUserRes = await axios.post(
          "https://api.chatengine.io/users/",
          { username: username, secret: username, first_name: username },
          { headers: { "Private-Key": '93acfb90-9712-48ae-8907-f04f1c0e79d7' } }
        );
        return res.status(201).json(newUserRes.data);
      } catch (createError) {
        // Handle user creation error
        return res.status(createError.response.status).json(createError.response.data);
      }
    } else {
      // Handle other errors
      return res.status(error.response.status).json(error.response.data);
    }
  }
});



app.post('/api/khalti', async (req, res) => {
  const payload = req.body;
  const khaltiResponse = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/',
    payload,
    {
      'headers': {
        'Authorization': 'Key 4409a69ade9e4eb3a490b2c06718d0ad',
      },
    }

  );

  if (khaltiResponse) {
    res.json({
      success: true,
      message: 'Payment initiated successfully',
      data: khaltiResponse.data,
    });
  } else {
    res.json({
      status: 'error',
      message: 'Payment initiation failed',
    });
  }


});

app.use('/api/admin', adminRoute);


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
