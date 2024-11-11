const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

// Middleware to parse JSON requests and handle cors
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT'],
  allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version'],
  credentials: true
}));

// Load mongo config 
require("../config");

// Load routes
const blogRoutes = require('./routes/blog')
const userRoutes = require('./routes/user')
const authenticateRoute = require('./routes/authenticate')

// Routes
app.use('/blog', blogRoutes)
app.use('/user', userRoutes)
app.use("/authenticate", authenticateRoute);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
