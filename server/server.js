const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./config/mongoose.config');
const router = express.Router(); // Create a router
const port = process.env.PORT || 8000; // Use 8000 as the default port
const frontEndDomain = process.env.FRONTEND_DOMAIN;

// Middleware
app.use(cors(), express.json({ limit: '50mb' }), express.urlencoded({ limit: '50mb', extended: true }));

// Define an API route using the router
router.get('/data', (req, res) => {
    try {
        // Fetch data from your database or any source
        const data = { message: 'Hello from the API!' };

        // Send the data as a JSON response
        res.json(data);
    } catch (error) {
        console.error('Error handling /api/data route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Mount the router at the base path '/api'
app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
