const express = require('express');
const router = express.Router();
const {
  getInventory,
  getInventoryItem,
  getInventoryByPlantId,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getLowStockItems
} = require('../controllers/inventoryController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getInventory)
  .post(protect, createInventoryItem);

router.get('/low-stock', protect, getLowStockItems);
router.get('/plant/:plantId', protect, getInventoryByPlantId);

router.route('/:id')
  .get(protect, getInventoryItem)
  .put(protect, updateInventoryItem)
  .delete(protect, deleteInventoryItem);

module.exports = router;
