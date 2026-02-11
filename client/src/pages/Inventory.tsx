import { useEffect, useState } from 'react';
import { inventoryAPI } from '../api/services';
import { toast } from 'react-toastify';

export default function Inventory() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    inventoryAPI.getAll()
      .then(res => setItems(res.data.data))
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = items.filter(i =>
    i.plantName.toLowerCase().includes(search.toLowerCase()) ||
    i.plantId.toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (s: string) => {
    const map: any = { 'in-stock': 'green', 'low-stock': 'orange', 'out-of-stock': 'red' };
    return <span className={`badge ${map[s] || 'gray'}`}>{s}</span>;
  };

  if (loading) return <div className="loading">Loading...</div>;

  // Summary stats
  const inStock = items.filter(i => i.status === 'in-stock').length;
  const lowStock = items.filter(i => i.status === 'low-stock').length;
  const outOfStock = items.filter(i => i.status === 'out-of-stock').length;

  return (
    <div>
      <div className="page-header">
        <h1>Inventory ({items.length})</h1>
      </div>

      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card"><div className="stat-icon green">📦</div><div className="stat-info"><h3>{inStock}</h3><p>In Stock</p></div></div>
        <div className="stat-card"><div className="stat-icon orange">⚠️</div><div className="stat-info"><h3>{lowStock}</h3><p>Low Stock</p></div></div>
        <div className="stat-card"><div className="stat-icon red">❌</div><div className="stat-info"><h3>{outOfStock}</h3><p>Out of Stock</p></div></div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>Inventory Details</h3>
          <input className="search-box" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Plant ID</th><th>Plant Name</th><th>Opening</th><th>Purchase</th>
              <th>Sell</th><th>Damage</th><th>Closing</th><th>Status</th>
            </tr></thead>
            <tbody>
              {filtered.map(i => (
                <tr key={i._id}>
                  <td>{i.plantId}</td>
                  <td><strong>{i.plantName}</strong></td>
                  <td>{i.openingBalance}</td>
                  <td style={{ color: '#2e7d32' }}>+{i.purchase}</td>
                  <td style={{ color: '#1565c0' }}>-{i.sell}</td>
                  <td style={{ color: '#c62828' }}>-{i.damageStock}</td>
                  <td><strong>{i.closingBalance}</strong></td>
                  <td>{statusBadge(i.status)}</td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={8} className="empty-state">No inventory records</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
