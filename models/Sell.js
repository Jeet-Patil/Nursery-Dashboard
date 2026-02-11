const mongoose = require('mongoose');

const sellSchema = new mongoose.Schema({
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
  paymentTransactionId: {
    type: String,
    trim: true
  },
  deliveryAddress: {
    type: String,
    trim: true
  },
  orderedQuantity: {
    type: Number,
    required: [true, 'Ordered quantity is required'],
    min: 0
  },
  orderDateTime: {
    type: Date,
    default: Date.now
  },
  rate: {
    type: Number,
    required: [true, 'Rate is required'],
    min: 0
  },
  totalPaidAmount: {
    type: Number,
    required: [true, 'Total paid amount is required'],
    min: 0
  },
  typeOfSell: {
    type: String,
    enum: ['Retail', 'Wholesale', 'Online', ''],
    default: ''
  },
  sellType: {
    type: String,
    enum: ['Online', 'Offline'],
    default: 'Offline'
  },
  truckLoaded: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
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

// Calculate total paid amount before saving
sellSchema.pre('save', function(next) {
  if (this.isModified('orderedQuantity') || this.isModified('rate')) {
    this.totalPaidAmount = this.orderedQuantity * this.rate;
  }
  next();
});

// Index for faster queries
sellSchema.index({ plantId: 1 });
sellSchema.index({ orderDateTime: -1 });
sellSchema.index({ sellType: 1 });

module.exports = mongoose.model('Sell', sellSchema);
