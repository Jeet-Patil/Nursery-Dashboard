import { useEffect, useState } from 'react';
import { expensesAPI } from '../api/services';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const emptyForm = {
  category: '', itemName: '', quantity: 1, amount: 0,
  modeOfPayment: '', paymentStatus: 'Pending', vendorName: '',
  vendorAddress: '', shoppingCategory: '', productOrService: ''
};

export default function Expenses() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);

  const fetch = () => {
    expensesAPI.getAll()
      .then(res => setItems(res.data.data))
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (p: any) => { setEditing(p); setForm(p); setModal(true); };

  const handleSave = async () => {
    try {
      if (editing) { await expensesAPI.update(editing._id, form); toast.success('Updated'); }
      else { await expensesAPI.create(form); toast.success('Created'); }
      setModal(false); fetch();
    } catch (err: any) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    try { await expensesAPI.delete(id); toast.success('Deleted'); fetch(); }
    catch { toast.error('Failed'); }
  };

  const filtered = items.filter(e =>
    e.itemName.toLowerCase().includes(search.toLowerCase()) ||
    e.category.toLowerCase().includes(search.toLowerCase())
  );

  const total = items.reduce((acc, e) => acc + e.amount, 0);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Expenses ({items.length})</h1>
        <button className="add-btn" onClick={openAdd}><FiPlus /> Add Expense</button>
      </div>

      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card"><div className="stat-icon red">💰</div><div className="stat-info"><h3>₹{total.toLocaleString()}</h3><p>Total Expenses</p></div></div>
        <div className="stat-card"><div className="stat-icon green">✅</div><div className="stat-info"><h3>{items.filter(e => e.paymentStatus === 'Paid').length}</h3><p>Paid</p></div></div>
        <div className="stat-card"><div className="stat-icon orange">⏳</div><div className="stat-info"><h3>{items.filter(e => e.paymentStatus === 'Pending').length}</h3><p>Pending</p></div></div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>All Expenses</h3>
          <input className="search-box" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Category</th><th>Item</th><th>Qty</th><th>Amount</th>
              <th>Vendor</th><th>Payment</th><th>Status</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(e => (
                <tr key={e._id}>
                  <td><span className="badge blue">{e.category}</span></td>
                  <td><strong>{e.itemName}</strong></td>
                  <td>{e.quantity}</td>
                  <td>₹{e.amount.toLocaleString()}</td>
                  <td>{e.vendorName}</td>
                  <td>{e.modeOfPayment}</td>
                  <td><span className={`badge ${e.paymentStatus === 'Paid' ? 'green' : e.paymentStatus === 'Partial' ? 'orange' : 'red'}`}>{e.paymentStatus}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon btn-edit" onClick={() => openEdit(e)}><FiEdit2 /></button>
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(e._id)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={8} className="empty-state">No expenses</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? 'Edit Expense' : 'Add Expense'}</h2>
              <button className="modal-close" onClick={() => setModal(false)}><FiX /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group"><label>Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    <option value="">-- Select Category --</option>
                    <option>Fertilizer</option><option>Pesticide</option><option>Tools & Equipment</option>
                    <option>Seeds & Saplings</option><option>Soil & Compost</option><option>Irrigation</option>
                    <option>Transport</option><option>Labour</option><option>Packaging</option>
                    <option>Utilities</option><option>Rent</option><option>Maintenance</option>
                    <option>Marketing</option><option>Office Supplies</option><option>Miscellaneous</option>
                  </select>
                </div>
                <div className="form-group"><label>Item Name</label><input value={form.itemName} onChange={e => setForm({...form, itemName: e.target.value})} /></div>
                <div className="form-group"><label>Quantity</label><input type="number" value={form.quantity} onChange={e => setForm({...form, quantity: +e.target.value})} /></div>
                <div className="form-group"><label>Amount (₹)</label><input type="number" value={form.amount} onChange={e => setForm({...form, amount: +e.target.value})} /></div>
                <div className="form-group"><label>Vendor Name</label><input value={form.vendorName} onChange={e => setForm({...form, vendorName: e.target.value})} /></div>
                <div className="form-group"><label>Vendor Address</label><input value={form.vendorAddress} onChange={e => setForm({...form, vendorAddress: e.target.value})} /></div>
                <div className="form-group"><label>Payment Mode</label>
                  <select value={form.modeOfPayment} onChange={e => setForm({...form, modeOfPayment: e.target.value})}>
                    <option value="">Select</option><option>Cash</option><option>UPI</option>
                    <option>Bank Transfer</option><option>Cheque</option><option>Card</option>
                  </select>
                </div>
                <div className="form-group"><label>Payment Status</label>
                  <select value={form.paymentStatus} onChange={e => setForm({...form, paymentStatus: e.target.value})}>
                    <option>Pending</option><option>Partial</option><option>Paid</option>
                  </select>
                </div>
                <div className="form-group"><label>Shopping Type</label>
                  <select value={form.shoppingCategory} onChange={e => setForm({...form, shoppingCategory: e.target.value})}>
                    <option value="">Select</option><option>Online</option><option>Offline</option>
                  </select>
                </div>
                <div className="form-group"><label>Product/Service</label>
                  <select value={form.productOrService} onChange={e => setForm({...form, productOrService: e.target.value})}>
                    <option value="">Select</option><option>Product</option><option>Service</option>
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
