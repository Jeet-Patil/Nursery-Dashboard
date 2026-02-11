const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  itemName: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true
  },
  quantity: {
    type: Number,
    default: 1,
    min: 0
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: 0
  },
  modeOfPayment: {
    type: String,
    enum: ['Cash', 'UPI', 'Bank Transfer', 'Cheque', 'Card', ''],
    default: ''
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Partial'],
    default: 'Pending'
  },
  bankName: {
    type: String,
    trim: true
  },
  vendorName: {
    type: String,
    trim: true
  },
  vendorAddress: {
    type: String,
    trim: true
  },
  vendorBankName: {
    type: String,
    trim: true
  },
  vendorAccount: {
    type: String,
    trim: true
  },
  vendorUpiId: {
    type: String,
    trim: true
  },
  shoppingCategory: {
    type: String,
    enum: ['Online', 'Offline', ''],
    default: ''
  },
  deliveryAddress: {
    type: String,
    trim: true
  },
  productOrService: {
    type: String,
    enum: ['Product', 'Service', ''],
    default: ''
  },
  expenseDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'cancelled'],
    default: 'active'
  },
  createdBy: {
    type: String,
    trim: true
  },
  lastModifiedBy: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for faster queries
expenseSchema.index({ category: 1 });
expenseSchema.index({ expenseDate: -1 });
expenseSchema.index({ paymentStatus: 1 });

module.exports = mongoose.model('Expense', expenseSchema);
