
# SplitEase - Bill Splitting App

SplitEase is a web application for splitting expenses with friends.

## Features
- Add friends via email invitations
- Create expense groups with friends
- Add and split expenses within groups
- Track who owes what and to whom
- Dashboard showing financial summary

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB installed locally or MongoDB Atlas account

### Installation
1. Clone the repository
2. Install dependencies for the frontend:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add:
   ```
   MONGODB_URI=mongodb://localhost:27017/splitease
   PORT=5000
   ```
   (Replace with your MongoDB connection string if using Atlas)
4. Start the server:
   ```
   node server.js
   ```
5. In a separate terminal, start the React app:
   ```
   npm run dev
   ```

### MongoDB Setup
1. Install MongoDB locally or create an account on MongoDB Atlas
2. If using local MongoDB:
   - Start the MongoDB service
   - The application will automatically create the 'splitease' database
3. If using MongoDB Atlas:
   - Create a new cluster
   - Create a database user
   - Get your connection string and add it to the .env file

## Project Structure
- `/src` - Frontend React application
- `/src/api` - Backend API models and routes
- `/src/components` - Reusable React components
- `/src/services` - API service layer for frontend
- `server.js` - Express server entry point
