import { useEffect, useState } from 'react';
import { sellsAPI, plantsAPI } from '../api/services';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const emptyForm = {
  plantId: '', plantName: '', plantSize: '', orderedQuantity: 0,
  rate: 0, totalPaidAmount: 0, paymentTransactionId: '', deliveryAddress: '',
  sellType: 'Offline', truckLoaded: false
};

export default function Sales() {
  const [items, setItems] = useState<any[]>([]);
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);

  const fetch = () => {
    sellsAPI.getAll()
      .then(res => setItems(res.data.data))
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch();
    plantsAPI.getAll().then(res => setPlants(res.data.data)).catch(() => {});
  }, []);

  const handlePlantSelect = (plantMongoId: string) => {
    const plant = plants.find(p => p._id === plantMongoId);
    if (plant) {
      setForm(f => ({ ...f, plantId: plant.plantId, plantName: plant.plantName, plantSize: plant.plantType || '' }));
    } else {
      setForm(f => ({ ...f, plantId: '', plantName: '', plantSize: '' }));
    }
  };

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (p: any) => { setEditing(p); setForm(p); setModal(true); };

  const handleSave = async () => {
    try {
      const data = { ...form, totalPaidAmount: form.orderedQuantity * form.rate };
      if (editing) { await sellsAPI.update(editing._id, data); toast.success('Updated'); }
      else { await sellsAPI.create(data); toast.success('Created'); }
      setModal(false); fetch();
    } catch (err: any) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    try { await sellsAPI.delete(id); toast.success('Deleted'); fetch(); }
    catch { toast.error('Failed'); }
  };

  const filtered = items.filter(p =>
    p.plantName.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Sales ({items.length})</h1>
        <button className="add-btn" onClick={openAdd}><FiPlus /> Add Sale</button>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>All Sales</h3>
          <input className="search-box" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Plant</th><th>Size</th><th>Qty</th><th>Rate</th><th>Total</th>
              <th>Type</th><th>Truck</th><th>Status</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s._id}>
                  <td><strong>{s.plantName}</strong></td>
                  <td>{s.plantSize}</td>
                  <td>{s.orderedQuantity}</td>
                  <td>₹{s.rate}</td>
                  <td>₹{s.totalPaidAmount}</td>
                  <td><span className={`badge ${s.sellType === 'Online' ? 'blue' : 'green'}`}>{s.sellType}</span></td>
                  <td>{s.truckLoaded ? '✅' : '❌'}</td>
                  <td><span className={`badge ${s.status === 'delivered' ? 'green' : s.status === 'cancelled' ? 'red' : 'orange'}`}>{s.status}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon btn-edit" onClick={() => openEdit(s)}><FiEdit2 /></button>
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(s._id)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={9} className="empty-state">No sales</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? 'Edit Sale' : 'Add Sale'}</h2>
              <button className="modal-close" onClick={() => setModal(false)}><FiX /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Select Plant</label>
                  <select value={plants.find(p => p.plantId === form.plantId)?._id || ''} onChange={e => handlePlantSelect(e.target.value)}>
                    <option value="">-- Choose a Plant --</option>
                    {plants.map(p => <option key={p._id} value={p._id}>{p.plantName} ({p.plantId})</option>)}
                  </select>
                </div>
                <div className="form-group"><label>Plant Size</label><input value={form.plantSize} onChange={e => setForm({...form, plantSize: e.target.value})} placeholder="e.g. Small, Medium, Large" /></div>
                <div className="form-group"><label>Quantity</label><input type="number" min="1" value={form.orderedQuantity} onChange={e => setForm({...form, orderedQuantity: +e.target.value})} /></div>
                <div className="form-group"><label>Rate (₹)</label><input type="number" min="0" value={form.rate} onChange={e => setForm({...form, rate: +e.target.value})} /></div>
                <div className="form-group"><label>Total Amount</label><input value={`₹${form.orderedQuantity * form.rate}`} readOnly className="readonly-field" /></div>
                <div className="form-group"><label>Transaction ID</label><input value={form.paymentTransactionId} onChange={e => setForm({...form, paymentTransactionId: e.target.value})} placeholder="Optional" /></div>
                <div className="form-group"><label>Delivery Address</label><input value={form.deliveryAddress} onChange={e => setForm({...form, deliveryAddress: e.target.value})} placeholder="Enter delivery address" /></div>
                <div className="form-group"><label>Sell Type</label>
                  <select value={form.sellType} onChange={e => setForm({...form, sellType: e.target.value})}>
                    <option>Online</option><option>Offline</option>
                  </select>
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', paddingTop: 24 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.truckLoaded} onChange={e => setForm({...form, truckLoaded: e.target.checked})} /> Truck Loaded
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-cancel" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
