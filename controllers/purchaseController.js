const Purchase = require('../models/Purchase');
const Inventory = require('../models/Inventory');

// @desc    Get all purchases
// @route   GET /api/purchases
// @access  Private
exports.getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: purchases.length,
      data: purchases
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single purchase
// @route   GET /api/purchases/:id
// @access  Private
exports.getPurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    
    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: 'Purchase not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: purchase
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new purchase
// @route   POST /api/purchases
// @access  Private
exports.createPurchase = async (req, res) => {
  try {
    const purchase = await Purchase.create(req.body);
    
    // Update inventory
    await updateInventoryOnPurchase(purchase.plantId, purchase.quantity);
    
    res.status(201).json({
      success: true,
      data: purchase
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update purchase
// @route   PUT /api/purchases/:id
// @access  Private
exports.updatePurchase = async (req, res) => {
  try {
    const oldPurchase = await Purchase.findById(req.params.id);
    
    if (!oldPurchase) {
      return res.status(404).json({
        success: false,
        message: 'Purchase not found'
      });
    }
    
    const purchase = await Purchase.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    // Update inventory if quantity changed
    if (oldPurchase.quantity !== purchase.quantity) {
      const diff = purchase.quantity - oldPurchase.quantity;
      await updateInventoryOnPurchase(purchase.plantId, diff);
    }
    
    res.status(200).json({
      success: true,
      data: purchase
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete purchase
// @route   DELETE /api/purchases/:id
// @access  Private
exports.deletePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndDelete(req.params.id);
    
    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: 'Purchase not found'
      });
    }
    
    // Update inventory
    await updateInventoryOnPurchase(purchase.plantId, -purchase.quantity);
    
    res.status(200).json({
      success: true,
      message: 'Purchase deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Helper function to update inventory
async function updateInventoryOnPurchase(plantId, quantity) {
  let inventory = await Inventory.findOne({ plantId });
  
  if (!inventory) {
    inventory = await Inventory.create({
      plantId,
      plantName: 'Unknown', // Should be updated separately
      purchase: quantity,
      openingBalance: 0
    });
  } else {
    inventory.purchase += quantity;
    await inventory.save();
  }
}
