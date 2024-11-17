const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// CORS Middleware
app.use(cors({
  origin: 'https://blog-frontend-virid-six.vercel.app/', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
  allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version'],
  credentials: true, // Include cookies or authentication headers if needed
}));

// Optional: Handle OPTIONS requests explicitly (not strictly required)
app.options('*', cors());

// Load MongoDB config
require("../config");

// Load routes
const blogRoutes = require('./routes/blog');
const userRoutes = require('./routes/user');
const authenticateRoute = require('./routes/authenticate');

// Routes
app.use('/blog', blogRoutes);
app.use('/user', userRoutes);
app.use('/authenticate', authenticateRoute);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
