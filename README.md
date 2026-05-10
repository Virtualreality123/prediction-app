# Prediction App

A Node.js-based prediction application built with Express.js.

## Features

- RESTful API endpoints
- Health check endpoint
- Prediction API with input validation
- Error handling middleware
- Development and production modes

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Virtualreality123/prediction-app.git
cd prediction-app
```

2. Install dependencies:
```bash
npm install
```

### Running the App

**Development mode** (with file watching):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The app will run on `http://localhost:3000` by default.

## API Endpoints

### GET `/`
Returns welcome message and app status.

### GET `/api/health`
Health check endpoint that returns server status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-05-10T12:00:00.000Z",
  "uptime": 123.456
}
```

### POST `/api/predict`
Submit data for prediction.

**Request Body:**
```json
{
  "data": "your prediction input"
}
```

**Response:**
```json
{
  "input": "your prediction input",
  "prediction": "pending",
  "confidence": 0,
  "timestamp": "2026-05-10T12:00:00.000Z",
  "message": "Add your prediction logic here"
}
```

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
NODE_ENV=development
```

## Project Structure

```
prediction-app/
├── index.js           # Main application file
├── package.json       # Project dependencies
├── README.md          # Documentation
└── .gitignore         # Git ignore rules
```

## Development

To add new features:

1. Create new route handlers in `index.js`
2. Test endpoints using curl, Postman, or similar tools
3. Update documentation accordingly

## License

MIT

## Author

Virtualreality123
