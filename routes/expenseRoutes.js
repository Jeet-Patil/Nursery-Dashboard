const express = require('express');
const router = express.Router();
const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpensesByCategory
} = require('../controllers/expenseController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getExpenses)
  .post(protect, createExpense);

router.get('/category/:category', protect, getExpensesByCategory);

router.route('/:id')
  .get(protect, getExpense)
  .put(protect, updateExpense)
  .delete(protect, deleteExpense);

module.exports = router;
