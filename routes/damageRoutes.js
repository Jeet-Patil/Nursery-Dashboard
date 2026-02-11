const express = require('express');
const router = express.Router();
const {
  getDamages,
  getDamage,
  createDamage,
  updateDamage,
  deleteDamage
} = require('../controllers/damageController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getDamages)
  .post(protect, createDamage);

router.route('/:id')
  .get(protect, getDamage)
  .put(protect, updateDamage)
  .delete(protect, deleteDamage);

module.exports = router;
