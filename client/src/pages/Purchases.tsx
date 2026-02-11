import { useEffect, useState } from 'react';
import { purchasesAPI, plantsAPI, suppliersAPI } from '../api/services';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const emptyForm = {
  plantId: '', plantName: '', plantSize: '', quantity: 0, unit: 'pcs',
  rate: 0, totalAmount: 0, supplierName: '', supplierAddress: '',
  deliveryAddress: '', amountToPaid: 0, modeOfPayment: '', paymentStatus: 'Pending'
};

export default function Purchases() {
  const [items, setItems] = useState<any[]>([]);
  const [plants, setPlants] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);

  const fetch = () => {
    purchasesAPI.getAll()
      .then(res => setItems(res.data.data))
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch();
    plantsAPI.getAll().then(res => setPlants(res.data.data)).catch(() => {});
    suppliersAPI.getAll().then(res => setSuppliers(res.data.data)).catch(() => {});
  }, []);

  const handlePlantSelect = (plantMongoId: string) => {
    const plant = plants.find(p => p._id === plantMongoId);
    if (plant) {
      setForm(f => ({ ...f, plantId: plant.plantId, plantName: plant.plantName, plantSize: plant.plantType || '' }));
    } else {
      setForm(f => ({ ...f, plantId: '', plantName: '', plantSize: '' }));
    }
  };

  const handleSupplierSelect = (suppMongoId: string) => {
    const supplier = suppliers.find(s => s._id === suppMongoId);
    if (supplier) {
      setForm(f => ({ ...f, supplierName: supplier.supplierName, supplierAddress: supplier.address || '' }));
    } else {
      setForm(f => ({ ...f, supplierName: '', supplierAddress: '' }));
    }
  };

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (p: any) => { setEditing(p); setForm(p); setModal(true); };

  const handleSave = async () => {
    try {
      const data = { ...form, totalAmount: form.quantity * form.rate };
      if (editing) { await purchasesAPI.update(editing._id, data); toast.success('Updated'); }
      else { await purchasesAPI.create(data); toast.success('Created'); }
      setModal(false); fetch();
    } catch (err: any) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    try { await purchasesAPI.delete(id); toast.success('Deleted'); fetch(); }
    catch { toast.error('Failed'); }
  };

  const filtered = items.filter(p =>
    p.plantName.toLowerCase().includes(search.toLowerCase()) ||
    p.supplierName.toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (s: string) => {
    const map: any = { Paid: 'green', Pending: 'orange', Partial: 'blue', Overdue: 'red' };
    return <span className={`badge ${map[s] || 'gray'}`}>{s}</span>;
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Purchases ({items.length})</h1>
        <button className="add-btn" onClick={openAdd}><FiPlus /> Add Purchase</button>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>All Purchases</h3>
          <input className="search-box" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Plant</th><th>Size</th><th>Qty</th><th>Rate</th><th>Total</th>
              <th>Supplier</th><th>Payment</th><th>Status</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p._id}>
                  <td><strong>{p.plantName}</strong></td>
                  <td>{p.plantSize}</td>
                  <td>{p.quantity}</td>
                  <td>₹{p.rate}</td>
                  <td>₹{p.totalAmount}</td>
                  <td>{p.supplierName}</td>
                  <td>{p.modeOfPayment}</td>
                  <td>{statusBadge(p.paymentStatus)}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon btn-edit" onClick={() => openEdit(p)}><FiEdit2 /></button>
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(p._id)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={9} className="empty-state">No purchases</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? 'Edit Purchase' : 'Add Purchase'}</h2>
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
                <div className="form-group"><label>Quantity</label><input type="number" min="1" value={form.quantity} onChange={e => setForm({...form, quantity: +e.target.value})} /></div>
                <div className="form-group"><label>Unit</label>
                  <select value={form.unit} onChange={e => setForm({...form, unit: e.target.value})}>
                    <option value="pcs">Pieces</option><option value="kg">Kg</option><option value="bunch">Bunch</option><option value="bag">Bag</option><option value="tray">Tray</option>
                  </select>
                </div>
                <div className="form-group"><label>Rate (₹)</label><input type="number" min="0" value={form.rate} onChange={e => setForm({...form, rate: +e.target.value})} /></div>
                <div className="form-group"><label>Total Amount</label><input value={`₹${form.quantity * form.rate}`} readOnly className="readonly-field" /></div>
                <div className="form-group">
                  <label>Select Supplier</label>
                  <select value={suppliers.find(s => s.supplierName === form.supplierName)?._id || ''} onChange={e => handleSupplierSelect(e.target.value)}>
                    <option value="">-- Choose a Supplier --</option>
                    {suppliers.map(s => <option key={s._id} value={s._id}>{s.supplierName} ({s.supplierId})</option>)}
                  </select>
                </div>
                <div className="form-group"><label>Supplier Address</label><input value={form.supplierAddress} readOnly className="readonly-field" /></div>
                <div className="form-group"><label>Delivery Address</label><input value={form.deliveryAddress} onChange={e => setForm({...form, deliveryAddress: e.target.value})} placeholder="Enter delivery address" /></div>
                <div className="form-group"><label>Amount to Pay (₹)</label><input type="number" min="0" value={form.amountToPaid} onChange={e => setForm({...form, amountToPaid: +e.target.value})} /></div>
                <div className="form-group"><label>Payment Mode</label>
                  <select value={form.modeOfPayment} onChange={e => setForm({...form, modeOfPayment: e.target.value})}>
                    <option value="">-- Select --</option><option>Cash</option><option>UPI</option>
                    <option>Bank Transfer</option><option>Cheque</option><option>Card</option>
                  </select>
                </div>
                <div className="form-group"><label>Payment Status</label>
                  <select value={form.paymentStatus} onChange={e => setForm({...form, paymentStatus: e.target.value})}>
                    <option>Pending</option><option>Partial</option><option>Paid</option><option>Overdue</option>
                  </select>
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
