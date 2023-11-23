const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'tour is missing'],
    unique: true,
    trim: true,
  },
  duration: { type: Number, required: [true, 'duration is missing'] },

  maxGroupSize: { type: Number, required: [true, 'maxGroup is missing'] },

  difficulty: { type: String, required: [true, 'difficulty is missing'] },

  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: { type: Number, required: [true, 'price is missing'] },
  priceDiscount: { type: Number },
  summery: { type: String, trim: true },
  description: {
    type: String,
    trim: true,
    required: [true, 'description is missing'],
  },
  imageCover: {
    type: String,
    required: [true, 'image is needed'],
  },
  image: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startData: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
