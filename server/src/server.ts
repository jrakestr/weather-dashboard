import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;

// Serve static files from the client build directory
const clientPath = process.env.NODE_ENV === 'production' 
  ? path.join(__dirname, '../client/dist')
  : path.join(__dirname, '../../client/dist');

app.use(express.static(clientPath));

// Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Implement middleware to connect the routes
app.use(routes);

// Serve index.html for any unknown routes (client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// Start the server on the port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
