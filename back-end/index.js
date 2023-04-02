const express = require('express');

const connectDB = require('./db/connect');
require('dotenv').config();

const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/auth');
const hotelRoute = require('./routes/hotels');
const userRoute = require('./routes/users');
const roomRoute = require('./routes/rooms');

const app = express();

// middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api/users', userRoute);
app.use('/api/rooms', roomRoute);

app.use((error, req, res, next) => {
   const errorStatus = error.status || 500;
   const errorMessage = error.message || 'Something went wrong!';
   return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: error.stack,
   });
});

const port = process.env.PORT || 8800;

const start = async () => {
   try {
      await connectDB();
      app.listen(port, console.log(`Server is listening on port ${port}`));
   } catch (error) {
      console.log(error);
   }
};

start();
