const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const { dirname } = require('path');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//creating our own middleware custom
// app.use((req, res, next) => {
//   console.log('helo form middelware');
//   next();
// });

app.use(morgan('dev'));

//get api route
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTourById);
// app.post('/api/v1/tours', addNewTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//better app route for tours

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
