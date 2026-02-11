const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
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
  scientificName: {
    type: String,
    trim: true
  },
  plantType: {
    type: String,
    trim: true
  },
  petFriendly: {
    type: Boolean,
    default: false
  },
  nakshatraPlant: {
    type: Boolean,
    default: false
  },
  airPurifierPlant: {
    type: Boolean,
    default: false
  },
  specificRequirement: {
    type: String,
    trim: true
  },
  wateringFrequency: {
    type: String,
    trim: true
  },
  sunlight: {
    type: String,
    enum: ['Full Sun', 'Partial Sun', 'Shade', 'Indirect Light', ''],
    default: ''
  },
  environment: {
    type: String,
    enum: ['Indoor', 'Outdoor', 'Both', ''],
    default: ''
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'discontinued'],
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
plantSchema.index({ plantName: 1 });
plantSchema.index({ plantType: 1 });

module.exports = mongoose.model('Plant', plantSchema);
