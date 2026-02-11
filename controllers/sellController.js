const Sell = require('../models/Sell');
const Inventory = require('../models/Inventory');

// @desc    Get all sells
// @route   GET /api/sells
// @access  Private
exports.getSells = async (req, res) => {
  try {
    const sells = await Sell.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: sells.length,
      data: sells
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single sell
// @route   GET /api/sells/:id
// @access  Private
exports.getSell = async (req, res) => {
  try {
    const sell = await Sell.findById(req.params.id);
    
    if (!sell) {
      return res.status(404).json({
        success: false,
        message: 'Sell record not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: sell
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new sell
// @route   POST /api/sells
// @access  Private
exports.createSell = async (req, res) => {
  try {
    const sell = await Sell.create(req.body);
    
    // Update inventory
    await updateInventoryOnSell(sell.plantId, sell.orderedQuantity);
    
    res.status(201).json({
      success: true,
      data: sell
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update sell
// @route   PUT /api/sells/:id
// @access  Private
exports.updateSell = async (req, res) => {
  try {
    const oldSell = await Sell.findById(req.params.id);
    
    if (!oldSell) {
      return res.status(404).json({
        success: false,
        message: 'Sell record not found'
      });
    }
    
    const sell = await Sell.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    // Update inventory if quantity changed
    if (oldSell.orderedQuantity !== sell.orderedQuantity) {
      const diff = sell.orderedQuantity - oldSell.orderedQuantity;
      await updateInventoryOnSell(sell.plantId, diff);
    }
    
    res.status(200).json({
      success: true,
      data: sell
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete sell
// @route   DELETE /api/sells/:id
// @access  Private
exports.deleteSell = async (req, res) => {
  try {
    const sell = await Sell.findByIdAndDelete(req.params.id);
    
    if (!sell) {
      return res.status(404).json({
        success: false,
        message: 'Sell record not found'
      });
    }
    
    // Update inventory
    await updateInventoryOnSell(sell.plantId, -sell.orderedQuantity);
    
    res.status(200).json({
      success: true,
      message: 'Sell record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Helper function to update inventory
async function updateInventoryOnSell(plantId, quantity) {
  let inventory = await Inventory.findOne({ plantId });
  
  if (!inventory) {
    inventory = await Inventory.create({
      plantId,
      plantName: 'Unknown', // Should be updated separately
      sell: quantity,
      openingBalance: 0
    });
  } else {
    inventory.sell += quantity;
    await inventory.save();
  }
}
