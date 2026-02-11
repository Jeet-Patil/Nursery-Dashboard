const mongoose = require('mongoose');

const damageSchema = new mongoose.Schema({
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
  cause: {
    type: String,
    required: [true, 'Cause is required'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: 0
  },
  dateTime: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['reported', 'verified', 'disposed'],
    default: 'reported'
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
damageSchema.index({ plantId: 1 });
damageSchema.index({ dateTime: -1 });

module.exports = mongoose.model('Damage', damageSchema);
