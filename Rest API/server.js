 // Importing the 'http' module which will be used to create the server
const http=require('http'); 

// Import the app.js (app module)
const app=require('./app');

// Port number
const port=process.env.PORT || 3000;

// Create Server
const server=http.createServer(app);

// Starts the server
// Listen to the port number
server.listen(port);
