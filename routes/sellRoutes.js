const express = require('express');
const router = express.Router();
const {
  getSells,
  getSell,
  createSell,
  updateSell,
  deleteSell
} = require('../controllers/sellController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getSells)
  .post(protect, createSell);

router.route('/:id')
  .get(protect, getSell)
  .put(protect, updateSell)
  .delete(protect, deleteSell);

module.exports = router;
