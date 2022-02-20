const cors = require('cors');
const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
require('dotenv').config();
require('colors');

connectDB();

const app = express();

app.get('/', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Goalsetter API',
            routes: {
                goals: '/api/goals',
                users: '/api/users'
            },
            status: 'UP',
            updated: `${new Date().toLocaleString('en-US', {
                timeZone: 'America/New_York'
            })}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
            status: 'DOWN',
            updated: `${new Date().toLocaleString('en-US', {
                timeZone: 'America/New_York'
            })}`
        });
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
    console.log(`Server is now running on port: ${PORT}`.yellow)
);