// Sample data for seeding the database

const admins = [
  {
    username: 'admin',
    password: 'admin123', // Will be hashed automatically
    hint: 'Default admin',
    securityQuestion: 'What is your favorite plant?',
    securityAnswer: 'Rose',
    status: 'active',
    createdBy: 'System'
  }
];

const users = [
  {
    fullName: 'Rajesh Kumar',
    mobileNumber: '9876543210',
    address: '123 MG Road, Bangalore, Karnataka',
    email: 'rajesh.kumar@email.com',
    bloodGroup: 'A+',
    bankDetails: {
      bankName: 'HDFC Bank',
      upiId: 'rajesh@paytm',
      ifscCode: 'HDFC0001234',
      branchName: 'Bangalore Branch'
    },
    status: 'active',
    createdBy: 'admin'
  },
  {
    fullName: 'Priya Sharma',
    mobileNumber: '9876543211',
    address: '456 Park Street, Mumbai, Maharashtra',
    email: 'priya.sharma@email.com',
    bloodGroup: 'B+',
    bankDetails: {
      bankName: 'ICICI Bank',
      upiId: 'priya@gpay',
      ifscCode: 'ICIC0001234',
      branchName: 'Mumbai Branch'
    },
    status: 'active',
    createdBy: 'admin'
  },
  {
    fullName: 'Amit Patel',
    mobileNumber: '9876543212',
    address: '789 Gandhi Road, Ahmedabad, Gujarat',
    email: 'amit.patel@email.com',
    bloodGroup: 'O+',
    status: 'active',
    createdBy: 'admin'
  }
];

const plants = [
  {
    plantId: 'PLT001',
    plantName: 'Money Plant',
    scientificName: 'Epipremnum aureum',
    plantType: 'Indoor',
    petFriendly: false,
    nakshatraPlant: false,
    airPurifierPlant: true,
    specificRequirement: 'Low maintenance, grows in water or soil',
    wateringFrequency: 'Weekly',
    sunlight: 'Indirect Light',
    environment: 'Indoor',
    status: 'active',
    createdBy: 'admin'
  },
  {
    plantId: 'PLT002',
    plantName: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    plantType: 'Indoor',
    petFriendly: false,
    nakshatraPlant: false,
    airPurifierPlant: true,
    specificRequirement: 'Very low maintenance, drought tolerant',
    wateringFrequency: 'Bi-weekly',
    sunlight: 'Indirect Light',
    environment: 'Indoor',
    status: 'active',
    createdBy: 'admin'
  },
  {
    plantId: 'PLT003',
    plantName: 'Aloe Vera',
    scientificName: 'Aloe barbadensis miller',
    plantType: 'Succulent',
    petFriendly: false,
    nakshatraPlant: false,
    airPurifierPlant: true,
    specificRequirement: 'Medicinal plant, needs well-drained soil',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial Sun',
    environment: 'Both',
    status: 'active',
    createdBy: 'admin'
  },
  {
    plantId: 'PLT004',
    plantName: 'Tulsi (Holy Basil)',
    scientificName: 'Ocimum sanctum',
    plantType: 'Herb',
    petFriendly: true,
    nakshatraPlant: true,
    airPurifierPlant: true,
    specificRequirement: 'Sacred plant, needs regular watering',
    wateringFrequency: 'Daily',
    sunlight: 'Full Sun',
    environment: 'Outdoor',
    status: 'active',
    createdBy: 'admin'
  },
  {
    plantId: 'PLT005',
    plantName: 'Spider Plant',
    scientificName: 'Chlorophytum comosum',
    plantType: 'Indoor',
    petFriendly: true,
    nakshatraPlant: false,
    airPurifierPlant: true,
    specificRequirement: 'Easy to grow, produces baby plants',
    wateringFrequency: 'Twice a week',
    sunlight: 'Indirect Light',
    environment: 'Indoor',
    status: 'active',
    createdBy: 'admin'
  },
  {
    plantId: 'PLT006',
    plantName: 'Peace Lily',
    scientificName: 'Spathiphyllum',
    plantType: 'Flowering',
    petFriendly: false,
    nakshatraPlant: false,
    airPurifierPlant: true,
    specificRequirement: 'Prefers humid conditions',
    wateringFrequency: 'Weekly',
    sunlight: 'Shade',
    environment: 'Indoor',
    status: 'active',
    createdBy: 'admin'
  },
  {
    plantId: 'PLT007',
    plantName: 'Rose',
    scientificName: 'Rosa',
    plantType: 'Flowering',
    petFriendly: true,
    nakshatraPlant: false,
    airPurifierPlant: false,
    specificRequirement: 'Needs pruning and fertilization',
    wateringFrequency: 'Daily',
    sunlight: 'Full Sun',
    environment: 'Outdoor',
    status: 'active',
    createdBy: 'admin'
  },
  {
    plantId: 'PLT008',
    plantName: 'Rubber Plant',
    scientificName: 'Ficus elastica',
    plantType: 'Indoor',
    petFriendly: false,
    nakshatraPlant: false,
    airPurifierPlant: true,
    specificRequirement: 'Large glossy leaves, needs space',
    wateringFrequency: 'Weekly',
    sunlight: 'Indirect Light',
    environment: 'Indoor',
    status: 'active',
    createdBy: 'admin'
  }
];

const suppliers = [
  {
    supplierId: 'SUP001',
    supplierName: 'Green Valley Nursery',
    aliasName: 'GVN',
    contactNo: '9876543220',
    email: 'contact@greenvalley.com',
    address: 'Plot 45, Nursery Road, Pune, Maharashtra',
    bankDetails: {
      bankName: 'State Bank of India',
      ifscCode: 'SBIN0001234',
      upiId: 'greenvalley@sbi'
    },
    status: 'active',
    createdBy: 'admin'
  },
  {
    supplierId: 'SUP002',
    supplierName: 'Flora Wholesale',
    aliasName: 'Flora',
    contactNo: '9876543221',
    email: 'sales@florawholesale.com',
    address: '78 Garden Street, Delhi',
    bankDetails: {
      bankName: 'Punjab National Bank',
      ifscCode: 'PUNB0001234',
      upiId: 'flora@pnb'
    },
    status: 'active',
    createdBy: 'admin'
  },
  {
    supplierId: 'SUP003',
    supplierName: 'Nature\'s Best Plants',
    aliasName: 'NBP',
    contactNo: '9876543222',
    email: 'info@naturesbest.com',
    address: 'Sector 12, Gurugram, Haryana',
    bankDetails: {
      bankName: 'Axis Bank',
      ifscCode: 'UTIB0001234',
      upiId: 'naturesbest@axis'
    },
    status: 'active',
    createdBy: 'admin'
  }
];

const purchases = [
  {
    plantId: 'PLT001',
    plantName: 'Money Plant',
    plantSize: 'Small',
    quantity: 50,
    unit: 'pcs',
    rate: 30,
    totalAmount: 1500,
    supplierName: 'Green Valley Nursery',
    supplierBank: 'State Bank of India',
    supplierBankBranch: 'Pune Branch',
    supplierIfscCode: 'SBIN0001234',
    supplierAddress: 'Plot 45, Nursery Road, Pune',
    deliveryAddress: 'Main Warehouse',
    amountToPaid: 1500,
    modeOfPayment: 'Bank Transfer',
    paymentStatus: 'Paid',
    status: 'completed',
    createdBy: 'admin'
  },
  {
    plantId: 'PLT002',
    plantName: 'Snake Plant',
    plantSize: 'Medium',
    quantity: 30,
    unit: 'pcs',
    rate: 80,
    totalAmount: 2400,
    supplierName: 'Flora Wholesale',
    supplierBank: 'Punjab National Bank',
    supplierBankBranch: 'Delhi Branch',
    supplierIfscCode: 'PUNB0001234',
    deliveryAddress: 'Main Warehouse',
    amountToPaid: 2400,
    modeOfPayment: 'UPI',
    paymentStatus: 'Paid',
    status: 'completed',
    createdBy: 'admin'
  },
  {
    plantId: 'PLT004',
    plantName: 'Tulsi (Holy Basil)',
    plantSize: 'Small',
    quantity: 100,
    unit: 'pcs',
    rate: 25,
    totalAmount: 2500,
    supplierName: 'Nature\'s Best Plants',
    supplierBank: 'Axis Bank',
    supplierIfscCode: 'UTIB0001234',
    deliveryAddress: 'Main Warehouse',
    amountToPaid: 1500,
    modeOfPayment: 'Cash',
    paymentStatus: 'Partial',
    status: 'active',
    createdBy: 'admin'
  }
];

const sells = [
  {
    plantId: 'PLT001',
    plantName: 'Money Plant',
    plantSize: 'Small',
    paymentTransactionId: 'TXN001',
    deliveryAddress: '123 MG Road, Bangalore',
    orderedQuantity: 5,
    rate: 50,
    totalPaidAmount: 250,
    typeOfSell: 'Retail',
    sellType: 'Online',
    truckLoaded: false,
    status: 'delivered',
    createdBy: 'admin'
  },
  {
    plantId: 'PLT002',
    plantName: 'Snake Plant',
    plantSize: 'Medium',
    paymentTransactionId: 'TXN002',
    deliveryAddress: '456 Park Street, Mumbai',
    orderedQuantity: 3,
    rate: 120,
    totalPaidAmount: 360,
    typeOfSell: 'Retail',
    sellType: 'Offline',
    truckLoaded: false,
    status: 'delivered',
    createdBy: 'admin'
  },
  {
    plantId: 'PLT007',
    plantName: 'Rose',
    plantSize: 'Medium',
    paymentTransactionId: 'TXN003',
    deliveryAddress: 'Local Customer',
    orderedQuantity: 20,
    rate: 40,
    totalPaidAmount: 800,
    typeOfSell: 'Wholesale',
    sellType: 'Offline',
    truckLoaded: false,
    status: 'delivered',
    createdBy: 'admin'
  }
];

const damages = [
  {
    plantId: 'PLT001',
    plantName: 'Money Plant',
    cause: 'Overwatering and root rot',
    quantity: 3,
    status: 'verified',
    createdBy: 'admin'
  },
  {
    plantId: 'PLT004',
    plantName: 'Tulsi (Holy Basil)',
    cause: 'Pest infestation',
    quantity: 5,
    status: 'disposed',
    createdBy: 'admin'
  }
];

const inventory = [
  {
    plantId: 'PLT001',
    plantName: 'Money Plant',
    openingBalance: 0,
    purchase: 50,
    sell: 5,
    damageStock: 3,
    plantQuantity: 42,
    closingBalance: 42,
    status: 'in-stock'
  },
  {
    plantId: 'PLT002',
    plantName: 'Snake Plant',
    openingBalance: 0,
    purchase: 30,
    sell: 3,
    damageStock: 0,
    plantQuantity: 27,
    closingBalance: 27,
    status: 'in-stock'
  },
  {
    plantId: 'PLT003',
    plantName: 'Aloe Vera',
    openingBalance: 0,
    purchase: 0,
    sell: 0,
    damageStock: 0,
    plantQuantity: 0,
    closingBalance: 0,
    status: 'out-of-stock'
  },
  {
    plantId: 'PLT004',
    plantName: 'Tulsi (Holy Basil)',
    openingBalance: 0,
    purchase: 100,
    sell: 0,
    damageStock: 5,
    plantQuantity: 95,
    closingBalance: 95,
    status: 'in-stock'
  },
  {
    plantId: 'PLT005',
    plantName: 'Spider Plant',
    openingBalance: 0,
    purchase: 0,
    sell: 0,
    damageStock: 0,
    plantQuantity: 0,
    closingBalance: 0,
    status: 'out-of-stock'
  },
  {
    plantId: 'PLT006',
    plantName: 'Peace Lily',
    openingBalance: 0,
    purchase: 0,
    sell: 0,
    damageStock: 0,
    plantQuantity: 8,
    closingBalance: 8,
    status: 'low-stock'
  },
  {
    plantId: 'PLT007',
    plantName: 'Rose',
    openingBalance: 50,
    purchase: 0,
    sell: 20,
    damageStock: 0,
    plantQuantity: 30,
    closingBalance: 30,
    status: 'in-stock'
  },
  {
    plantId: 'PLT008',
    plantName: 'Rubber Plant',
    openingBalance: 0,
    purchase: 0,
    sell: 0,
    damageStock: 0,
    plantQuantity: 0,
    closingBalance: 0,
    status: 'out-of-stock'
  }
];

const expenses = [
  {
    category: 'Equipment',
    itemName: 'Garden Tools Set',
    quantity: 1,
    amount: 2500,
    modeOfPayment: 'Cash',
    paymentStatus: 'Paid',
    vendorName: 'Agriculture Store',
    vendorAddress: 'Market Road, Bangalore',
    shoppingCategory: 'Offline',
    productOrService: 'Product',
    status: 'active',
    createdBy: 'admin'
  },
  {
    category: 'Utilities',
    itemName: 'Electricity Bill',
    quantity: 1,
    amount: 3500,
    modeOfPayment: 'UPI',
    paymentStatus: 'Paid',
    vendorName: 'BESCOM',
    bankName: 'State Bank of India',
    shoppingCategory: 'Online',
    productOrService: 'Service',
    status: 'active',
    createdBy: 'admin'
  },
  {
    category: 'Fertilizers',
    itemName: 'Organic Compost',
    quantity: 50,
    amount: 5000,
    modeOfPayment: 'Bank Transfer',
    paymentStatus: 'Paid',
    vendorName: 'Organic Suppliers',
    vendorAddress: 'Wholesale Market, Pune',
    vendorBankName: 'HDFC Bank',
    vendorAccount: '12345678901234',
    shoppingCategory: 'Offline',
    productOrService: 'Product',
    status: 'active',
    createdBy: 'admin'
  },
  {
    category: 'Transport',
    itemName: 'Delivery Charges',
    quantity: 1,
    amount: 1500,
    modeOfPayment: 'Cash',
    paymentStatus: 'Paid',
    vendorName: 'Local Transport',
    shoppingCategory: 'Offline',
    productOrService: 'Service',
    status: 'active',
    createdBy: 'admin'
  },
  {
    category: 'Maintenance',
    itemName: 'Nursery Shed Repair',
    quantity: 1,
    amount: 8000,
    modeOfPayment: 'UPI',
    paymentStatus: 'Partial',
    vendorName: 'Construction Services',
    vendorAddress: 'Local Area',
    vendorUpiId: 'construction@paytm',
    shoppingCategory: 'Offline',
    productOrService: 'Service',
    status: 'active',
    createdBy: 'admin'
  }
];

module.exports = {
  admins,
  users,
  plants,
  suppliers,
  purchases,
  sells,
  damages,
  inventory,
  expenses
};
