const Plant = require('../models/Plant');

// @desc    Get all plants
// @route   GET /api/plants
// @access  Private
exports.getPlants = async (req, res) => {
  try {
    const plants = await Plant.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: plants.length,
      data: plants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single plant
// @route   GET /api/plants/:id
// @access  Private
exports.getPlant = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    
    if (!plant) {
      return res.status(404).json({
        success: false,
        message: 'Plant not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: plant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new plant
// @route   POST /api/plants
// @access  Private
exports.createPlant = async (req, res) => {
  try {
    const plant = await Plant.create(req.body);
    
    res.status(201).json({
      success: true,
      data: plant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update plant
// @route   PUT /api/plants/:id
// @access  Private
exports.updatePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!plant) {
      return res.status(404).json({
        success: false,
        message: 'Plant not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: plant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete plant
// @route   DELETE /api/plants/:id
// @access  Private
exports.deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    
    if (!plant) {
      return res.status(404).json({
        success: false,
        message: 'Plant not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Plant deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
