import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';
import UserModel from './model/User.model.js';

const app = express();

/**middlewares */
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.disable('x-powered-by'); //so that less hackers know my stack


const port= process.env.PORT || 8000;

/**http get request*/
app.get('/', (req, res) => {
    res.status(201).json("Home GET request");
});

// Modify this route to handle user data and recommendations
app.post('/api/user', async (req, res) => {
    try {
        // Create a new User instance with the received data
        const newUser = new UserModel(req.body);

        // Save the user data to MongoDB
        await newUser.save();

        // Extract height, weight, age, gender, and activity from user data
        const { height, weight, age, gender, activity } = req.body;

        // Make a request to the Flask server with the additional user data
        const flaskResponse = await axios.post('http://localhost:8000/api/get_recommendations', { height, weight, age, gender, activity });

        // Add the recommendations to the user document in MongoDB
        newUser.recommendations = flaskResponse.data;
        await newUser.save();

        // Send a response with the saved user data and recommendations
        res.status(201).json({ user: newUser, recommendations: flaskResponse.data });
    } catch (error) {
        console.error('Error saving user data:', error);
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

