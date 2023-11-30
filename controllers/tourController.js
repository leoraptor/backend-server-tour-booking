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
    const queryObj = { ...req.query };
    const excludeThis = ['page', 'sort', 'limit', 'feilds'];

    excludeThis.forEach((el) => delete queryObj[el]);

    //1. advance filter > or <
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    //2. build the query
    let query = Tour.find(JSON.parse(queryStr));

    //3. sorting - use this till sorting 127.0.0.1:3000/api/v1/tours?duration[gte]=5&page=2&sort=price&limit=10
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //4. limiting - use this for limiting 27.0.0.1:3000/api/v1/tours?feilds=name,duration,price
    if (req.query.feilds) {
      const feilds = req.query.feilds.split(',').join(' ');
      query = query.select(feilds);
    } else {
      query = query.select('-__v');
    }

    //pagination and limit - 127.0.0.1:3000/api/v1/tours?page=20&limit=78
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    //no page
    if (req.query.page) {
      const numofpage = await Tour.countDocuments();
      if (skip >= numofpage) throw new Error('Page not found');
    }

    //run the query
    const allTour = await query;

    res.status(200).json({
      status: 'success',
      results: allTour.length,
      data: { allTour },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
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
      message: err,
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
