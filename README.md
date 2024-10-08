# Project 1 - ITDEV-161

## Project Description
This project is a web application using MongoDB, Express, and Node.js with API endpoints for managing items.

## Feature List
1. MongoDB database connection
2. Express server setup
3. API endpoints for item retrieval and creation
4. Data model for items

## Technical Tasks
1. Set up Node.js project and install dependencies
2. Configure MongoDB Atlas connection
3. Create Express server and API routes
4. Implement item data model using Mongoose
5. Develop API endpoints for getting and creating items
6. Test API endpoints

## Setup Instructions
1. Clone this repository
2. Navigate to the backend directory
3. Run `npm install` to install dependencies
4. Create a `.env` file and add your MongoDB connection string: `MONGODB_URI=your_connection_string`
5. Run `node server.js` to start the server

## API Documentation
- GET /api/items: Retrieve all items
- POST /api/items: Create a new item
  - Body: { "name": "Item Name", "description": "Item Description" }