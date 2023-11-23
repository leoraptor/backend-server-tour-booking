const express = require('express');
const userController = require('./../controllers/userController');

//users route handelers
//get all tours

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.addNewUsers);
router
  .route('/:id')
  .patch(userController.updateUsers)
  .delete(userController.deleteUsers)
  .get(userController.getUserById);

module.exports = router;
