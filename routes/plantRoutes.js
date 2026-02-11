const express = require('express');
const router = express.Router();
const {
  getPlants,
  getPlant,
  createPlant,
  updatePlant,
  deletePlant
} = require('../controllers/plantController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getPlants)
  .post(protect, createPlant);

router.route('/:id')
  .get(protect, getPlant)
  .put(protect, updatePlant)
  .delete(protect, deletePlant);

module.exports = router;
