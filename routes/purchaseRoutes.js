const express = require('express');
const router = express.Router();
const {
  getPurchases,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase
} = require('../controllers/purchaseController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getPurchases)
  .post(protect, createPurchase);

router.route('/:id')
  .get(protect, getPurchase)
  .put(protect, updatePurchase)
  .delete(protect, deletePurchase);

module.exports = router;
