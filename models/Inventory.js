const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  plantId: {
    type: String,
    required: [true, 'Plant ID is required'],
    unique: true,
    trim: true
  },
  plantName: {
    type: String,
    required: [true, 'Plant name is required'],
    trim: true
  },
  plantQuantity: {
    type: Number,
    default: 0,
    min: 0
  },
  openingBalance: {
    type: Number,
    default: 0,
    min: 0
  },
  closingBalance: {
    type: Number,
    default: 0,
    min: 0
  },
  purchase: {
    type: Number,
    default: 0,
    min: 0
  },
  sell: {
    type: Number,
    default: 0,
    min: 0
  },
  damageStock: {
    type: Number,
    default: 0,
    min: 0
  },
  lastUpdatedOn: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['in-stock', 'low-stock', 'out-of-stock'],
    default: 'in-stock'
  }
}, {
  timestamps: true
});

// Calculate closing balance before saving
inventorySchema.pre('save', function(next) {
  this.closingBalance = this.openingBalance + this.purchase - this.sell - this.damageStock;
  this.plantQuantity = this.closingBalance;
  
  // Update stock status
  if (this.closingBalance === 0) {
    this.status = 'out-of-stock';
  } else if (this.closingBalance < 10) {
    this.status = 'low-stock';
  } else {
    this.status = 'in-stock';
  }
  
  this.lastUpdatedOn = Date.now();
  next();
});

// Index for faster queries
inventorySchema.index({ status: 1 });

module.exports = mongoose.model('Inventory', inventorySchema);
