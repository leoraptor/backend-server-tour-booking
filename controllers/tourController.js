const Tour = require('./../models/tourModels');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//route handler functions

// check id middleware
// exports.checkId = (req, res, next, val) => {
//   if (req.params.id * 1 > tours.length || !req.params.id) {
//     console.log('id checking');
//     return res.status(404).json({
//       status: 'fail',
//       message: 'missing creadentials',
//     });
//   }
//   next();
// };

//check body for post
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'missing name or price',
//     });
//   }
//   next();
// };

//get all tours
exports.getAllTours = async (req, res) => {
  try {
    const allTour = await Tour.find();
    res.status(200).json({
      status: 'success',
      results: allTour.length,
      data: { allTour },
    });
  } catch (err) {
    res.status(404), json({ status: 'fail', message: err });
  }
};

//get tour by id
exports.getTourById = async (req, res) => {
  try {
    const getByid = await Tour.findById(req.params.id);
    res.status(200).json({ status: 'success', data: { getByid } });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

//create tour
exports.addNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newTour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'invalid data sent!',
    });
  }
};

//update tour
exports.updateTour = async (req, res) => {
  try {
    const addNewTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: { addNewTour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

//delete tour
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
