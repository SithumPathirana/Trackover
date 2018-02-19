// Importing the express module
const express=require('express');

// Spins the express application
const app=express();

// Importing the users route
const userRoute=require('./api/routes/users');

// Acts as the middleware
// Requests go throgh here
// 'next' is also a function, which might be used to direct the request to the next middleware
app.use('',userRoute);

module.exports=app;
