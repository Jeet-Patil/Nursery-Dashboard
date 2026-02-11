import { useEffect, useState } from 'react';
import { plantsAPI, purchasesAPI, sellsAPI, inventoryAPI, suppliersAPI, expensesAPI, damagesAPI } from '../api/services';
import { GiPlantRoots } from 'react-icons/gi';
import { FiShoppingCart, FiDollarSign, FiPackage, FiTruck, FiAlertTriangle, FiDatabase } from 'react-icons/fi';

export default function Dashboard() {
  const [stats, setStats] = useState({
    plants: 0, purchases: 0, sales: 0,
    inventory: 0, suppliers: 0, expenses: 0, damages: 0,
    lowStock: 0
  });
  const [recentSales, setRecentSales] = useState<any[]>([]);
  const [lowStockItems, setLowStockItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      plantsAPI.getAll(),
      purchasesAPI.getAll(),
      sellsAPI.getAll(),
      inventoryAPI.getAll(),
      suppliersAPI.getAll(),
      expensesAPI.getAll(),
      damagesAPI.getAll(),
      inventoryAPI.getLowStock(),
    ]).then(([plants, purchases, sales, inventory, suppliers, expenses, damages, lowStock]) => {
      setStats({
        plants: plants.data.count,
        purchases: purchases.data.count,
        sales: sales.data.count,
        inventory: inventory.data.count,
        suppliers: suppliers.data.count,
        expenses: expenses.data.count,
        damages: damages.data.count,
        lowStock: lowStock.data.count,
      });
      setRecentSales(sales.data.data.slice(0, 5));
      setLowStockItems(lowStock.data.data);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  const cards = [
    { label: 'Total Plants', value: stats.plants, icon: <GiPlantRoots />, color: 'green' },
    { label: 'Purchases', value: stats.purchases, icon: <FiShoppingCart />, color: 'blue' },
    { label: 'Sales', value: stats.sales, icon: <FiDollarSign />, color: 'teal' },
    { label: 'Inventory Items', value: stats.inventory, icon: <FiPackage />, color: 'purple' },
    { label: 'Suppliers', value: stats.suppliers, icon: <FiTruck />, color: 'orange' },
    { label: 'Expenses', value: stats.expenses, icon: <FiDatabase />, color: 'blue' },
    { label: 'Low Stock', value: stats.lowStock, icon: <FiAlertTriangle />, color: 'orange' },
    { label: 'Damages', value: stats.damages, icon: <FiAlertTriangle />, color: 'red' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>

      <div className="stats-grid">
        {cards.map((c) => (
          <div className="stat-card" key={c.label}>
            <div className={`stat-icon ${c.color}`}>{c.icon}</div>
            <div className="stat-info">
              <h3>{c.value}</h3>
              <p>{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Recent Sales */}
        <div className="table-container">
          <div className="table-header"><h3>Recent Sales</h3></div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Plant</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((s: any) => (
                  <tr key={s._id}>
                    <td>{s.plantName}</td>
                    <td>{s.orderedQuantity}</td>
                    <td>₹{s.totalPaidAmount}</td>
                    <td><span className={`badge ${s.sellType === 'Online' ? 'blue' : 'green'}`}>{s.sellType}</span></td>
                  </tr>
                ))}
                {recentSales.length === 0 && <tr><td colSpan={4} style={{ textAlign: 'center' }}>No sales yet</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock */}
        <div className="table-container">
          <div className="table-header"><h3>Low Stock Alerts</h3></div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Plant</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((i: any) => (
                  <tr key={i._id}>
                    <td>{i.plantName}</td>
                    <td>{i.closingBalance}</td>
                    <td><span className="badge orange">{i.status}</span></td>
                  </tr>
                ))}
                {lowStockItems.length === 0 && <tr><td colSpan={3} style={{ textAlign: 'center' }}>All stock levels are OK</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
