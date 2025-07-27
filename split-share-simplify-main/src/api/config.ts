
// MongoDB connection configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/splitease';
const PORT = process.env.PORT || 5000;

export { MONGODB_URI, PORT };
