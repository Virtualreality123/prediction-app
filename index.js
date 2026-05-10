const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Prediction App',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      predict: '/api/predict'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Prediction endpoint
app.post('/api/predict', (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      error: 'Missing required field: data'
    });
  }

  res.json({
    input: data,
    prediction: 'pending',
    confidence: 0,
    timestamp: new Date().toISOString(),
    message: 'Add your prediction logic here'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Prediction App running on http://localhost:${PORT}`);
});
