const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load env vars
dotenv.config();

// Load models
const Admin = require('../models/Admin');
const User = require('../models/User');
const Plant = require('../models/Plant');
const Supplier = require('../models/Supplier');
const Purchase = require('../models/Purchase');
const Sell = require('../models/Sell');
const Damage = require('../models/Damage');
const Inventory = require('../models/Inventory');
const Expense = require('../models/Expense');

// Load data
const {
  admins,
  users,
  plants,
  suppliers,
  purchases,
  sells,
  damages,
  inventory,
  expenses
} = require('./seedData');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

// Import data into DB
const importData = async () => {
  try {
    await Admin.create(admins);
    console.log('✓ Admins imported'.green.inverse);

    await User.create(users);
    console.log('✓ Users imported'.green.inverse);

    await Plant.create(plants);
    console.log('✓ Plants imported'.green.inverse);

    await Supplier.create(suppliers);
    console.log('✓ Suppliers imported'.green.inverse);

    await Purchase.create(purchases);
    console.log('✓ Purchases imported'.green.inverse);

    await Sell.create(sells);
    console.log('✓ Sells imported'.green.inverse);

    await Damage.create(damages);
    console.log('✓ Damages imported'.green.inverse);

    await Inventory.create(inventory);
    console.log('✓ Inventory imported'.green.inverse);

    await Expense.create(expenses);
    console.log('✓ Expenses imported'.green.inverse);

    console.log('\n✓✓✓ All data imported successfully! ✓✓✓'.green.bold);
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await Admin.deleteMany();
    console.log('✓ Admins deleted'.red.inverse);

    await User.deleteMany();
    console.log('✓ Users deleted'.red.inverse);

    await Plant.deleteMany();
    console.log('✓ Plants deleted'.red.inverse);

    await Supplier.deleteMany();
    console.log('✓ Suppliers deleted'.red.inverse);

    await Purchase.deleteMany();
    console.log('✓ Purchases deleted'.red.inverse);

    await Sell.deleteMany();
    console.log('✓ Sells deleted'.red.inverse);

    await Damage.deleteMany();
    console.log('✓ Damages deleted'.red.inverse);

    await Inventory.deleteMany();
    console.log('✓ Inventory deleted'.red.inverse);

    await Expense.deleteMany();
    console.log('✓ Expenses deleted'.red.inverse);

    console.log('\n✓✓✓ All data deleted successfully! ✓✓✓'.red.bold);
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

// Run based on command line argument
if (process.argv[2] === '-i' || process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '-d' || process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Please provide a flag:'.yellow);
  console.log('  -i or --import : Import sample data'.green);
  console.log('  -d or --delete : Delete all data'.red);
  process.exit(1);
}
