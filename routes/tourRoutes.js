const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

//middle ware for perticular routes
// router.param('id', tourController.checkId);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.addNewTour);
router
  .route('/:id')
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)
  .get(tourController.getTourById);

module.exports = router;
