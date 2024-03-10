import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';  
import config from './config.js';
import connect from './database/conn.js';
import router from './router/route.js';
import UserModel from './model/User.model.js';
import Recommendation from './model/Recommendation.model.js';

const app = express();

/**middlewares */
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.disable('x-powered-by'); //so that less hackers know my stack

const port= process.env.PORT || 8000;

/**http get request*/
app.get('/', (req, res) => {
    res.status(200).json("Home GET request");
});

// Modify this route to handle user data and recommendations
app.post('/api/recommendations', async (req, res) => {
    try {
        // Extract user data
        const { height, weight, age, gender, activity } = req.body;

        // Create a new Recommendation instance
        const newRecommendation = new Recommendation({
            height, weight, age, gender, activity 
        });

         // Make a request to the Flask server
        const flaskResponse = await axios.post(`${config.FLASK_API_URL}/api/recommendations`, newRecommendation.toObject());

        if (flaskResponse.status !== 200) {
            // Handle Flask API error
            throw new Error(`Flask API Error: ${flaskResponse.data.error}`);
        }

        // Save recommendations to the database
        newRecommendation.recommendations = flaskResponse.data; 
        try {
            await newRecommendation.save();
        } catch (mongooseError) {
            throw new Error(`Database Error: ${mongooseError.message}`);
        }

        res.status(201).json({ recommendations: newRecommendation.recommendations });

    } catch (error) {
        console.error('Error:', error);
        // Decide on appropriate error code based on type of error
        res.status(500).json({ error: 'Internal Server Error', details: error.message }); 
    }
});

/** api routes */
app.use('/api', router)

/**start server only when we have valid connection*/  
connect().then(() => {
    try{

        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })

    } catch(error) { 
        console.log('Cannnot connect to database server');
    }
}).catch((error) => {   
    console.log('Invalid database connection');
})

