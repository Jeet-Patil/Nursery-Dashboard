const Damage = require('../models/Damage');
const Inventory = require('../models/Inventory');

// @desc    Get all damages
// @route   GET /api/damages
// @access  Private
exports.getDamages = async (req, res) => {
  try {
    const damages = await Damage.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: damages.length,
      data: damages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single damage
// @route   GET /api/damages/:id
// @access  Private
exports.getDamage = async (req, res) => {
  try {
    const damage = await Damage.findById(req.params.id);
    
    if (!damage) {
      return res.status(404).json({
        success: false,
        message: 'Damage record not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: damage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new damage
// @route   POST /api/damages
// @access  Private
exports.createDamage = async (req, res) => {
  try {
    const damage = await Damage.create(req.body);
    
    // Update inventory
    await updateInventoryOnDamage(damage.plantId, damage.quantity);
    
    res.status(201).json({
      success: true,
      data: damage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update damage
// @route   PUT /api/damages/:id
// @access  Private
exports.updateDamage = async (req, res) => {
  try {
    const oldDamage = await Damage.findById(req.params.id);
    
    if (!oldDamage) {
      return res.status(404).json({
        success: false,
        message: 'Damage record not found'
      });
    }
    
    const damage = await Damage.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    // Update inventory if quantity changed
    if (oldDamage.quantity !== damage.quantity) {
      const diff = damage.quantity - oldDamage.quantity;
      await updateInventoryOnDamage(damage.plantId, diff);
    }
    
    res.status(200).json({
      success: true,
      data: damage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete damage
// @route   DELETE /api/damages/:id
// @access  Private
exports.deleteDamage = async (req, res) => {
  try {
    const damage = await Damage.findByIdAndDelete(req.params.id);
    
    if (!damage) {
      return res.status(404).json({
        success: false,
        message: 'Damage record not found'
      });
    }
    
    // Update inventory
    await updateInventoryOnDamage(damage.plantId, -damage.quantity);
    
    res.status(200).json({
      success: true,
      message: 'Damage record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Helper function to update inventory
async function updateInventoryOnDamage(plantId, quantity) {
  let inventory = await Inventory.findOne({ plantId });
  
  if (!inventory) {
    inventory = await Inventory.create({
      plantId,
      plantName: 'Unknown', // Should be updated separately
      damageStock: quantity,
      openingBalance: 0
    });
  } else {
    inventory.damageStock += quantity;
    await inventory.save();
  }
}
