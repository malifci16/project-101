const express = require('express');
const path = require('path');
const morgan = require('morgan');  // Import morgan
const cors = require('cors');  // Import the cors package

const app = express();

// Enable CORS for requests from http://localhost:30002
app.use(cors({
  origin: 'http://localhost:30002',  // Frontend origin
  credentials: true  // Allow credentials (if using cookies or auth headers)
}));

// Enable detailed HTTP request logging with morgan
app.use(morgan('combined'));  // You can also use 'dev', 'short', or custom formats

// Serve static files from the "static" directory
app.use(express.static(path.join(__dirname, 'static')));

// Custom format example
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

// Catch-all route to serve index.html for Angular's routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static//budget-tracker/index.html'));
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
