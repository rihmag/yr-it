const express = require('express');
const db = require('./connectdb');
const routes = require('./routes');
const authRoutes = require('./authroutes');
const courseroutes = require('./courseroutes');
const cors = require('cors');
const setupCompilerRoute = require("./server");
const env = require("dotenv");
env.config();
const path = require('path');

const app = express();

// Initialize database connection
db();

// Middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.use('/api/auth', authRoutes);
app.use('/api/course', courseroutes)

setupCompilerRoute(app)

// Serve static files from the React build directory


// The "catchall" handler: for any request that doesn't
// match one of the API routes, send back React's index.html file.


// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
