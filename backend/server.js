require('dotenv').config({ quiet: true });

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

// import dependencies
const express = require('express');
const mongoose = require('mongoose');
const exampleRoute = require('./routes/example');
const userRoute = require('./routes/User');

// initialize express app
const app = express();



// middleware to log requests
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


// use routes
app.use('/api/examples', exampleRoute);
app.use('/api/user', userRoute);


// connect to mongodb
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to MongoDB and server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

