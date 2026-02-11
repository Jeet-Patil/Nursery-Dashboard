const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  plantId: {
    type: String,
    required: [true, 'Plant ID is required'],
    trim: true
  },
  plantName: {
    type: String,
    required: [true, 'Plant name is required'],
    trim: true
  },
  plantSize: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: 0
  },
  unit: {
    type: String,
    default: 'pcs',
    trim: true
  },
  rate: {
    type: Number,
    required: [true, 'Rate is required'],
    min: 0
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: 0
  },
  supplierName: {
    type: String,
    required: [true, 'Supplier name is required'],
    trim: true
  },
  supplierBank: {
    type: String,
    trim: true
  },
  supplierBankBranch: {
    type: String,
    trim: true
  },
  supplierIfscCode: {
    type: String,
    trim: true
  },
  supplierAddress: {
    type: String,
    trim: true
  },
  deliveryAddress: {
    type: String,
    trim: true
  },
  amountToPaid: {
    type: Number,
    default: 0,
    min: 0
  },
  modeOfPayment: {
    type: String,
    enum: ['Cash', 'UPI', 'Bank Transfer', 'Cheque', 'Card', ''],
    default: ''
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Partial', 'Paid', 'Overdue'],
    default: 'Pending'
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
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

// Calculate total amount before saving
purchaseSchema.pre('save', function(next) {
  if (this.isModified('quantity') || this.isModified('rate')) {
    this.totalAmount = this.quantity * this.rate;
  }
  next();
});

// Index for faster queries
purchaseSchema.index({ plantId: 1 });
purchaseSchema.index({ supplierName: 1 });
purchaseSchema.index({ paymentStatus: 1 });

module.exports = mongoose.model('Purchase', purchaseSchema);
