import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// Serve static files of entire client dist folder
app.use(express.static('client/dist'));

// Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
