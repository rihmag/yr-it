const express = require('express');
const db = require('./connectdb');
const routes = require('./routes');
const authRoutes = require('./authroutes');
const cors = require('cors');
const setupCompilerRoute = require("./server");

const app = express();

// Initialize database connection
db();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api', routes);
app.use('/api/auth', authRoutes);

setupCompilerRoute(app)
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

