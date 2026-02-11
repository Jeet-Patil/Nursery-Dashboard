import { useEffect, useState } from 'react';
import { suppliersAPI } from '../api/services';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const emptyForm = {
  supplierId: '', supplierName: '', aliasName: '', contactNo: '',
  email: '', address: '', bankDetails: { bankName: '', ifscCode: '', upiId: '' }
};

export default function Suppliers() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(emptyForm);

  const fetch = () => {
    suppliersAPI.getAll()
      .then(res => setItems(res.data.data))
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (p: any) => { setEditing(p); setForm({ ...p, bankDetails: p.bankDetails || {} }); setModal(true); };

  const handleSave = async () => {
    try {
      if (editing) { await suppliersAPI.update(editing._id, form); toast.success('Updated'); }
      else { await suppliersAPI.create(form); toast.success('Created'); }
      setModal(false); fetch();
    } catch (err: any) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    try { await suppliersAPI.delete(id); toast.success('Deleted'); fetch(); }
    catch { toast.error('Failed'); }
  };

  const filtered = items.filter(s =>
    s.supplierName.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Suppliers ({items.length})</h1>
        <button className="add-btn" onClick={openAdd}><FiPlus /> Add Supplier</button>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>All Suppliers</h3>
          <input className="search-box" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>ID</th><th>Name</th><th>Alias</th><th>Contact</th>
              <th>Email</th><th>Bank</th><th>UPI</th><th>Status</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s._id}>
                  <td>{s.supplierId}</td>
                  <td><strong>{s.supplierName}</strong></td>
                  <td>{s.aliasName}</td>
                  <td>{s.contactNo}</td>
                  <td>{s.email}</td>
                  <td>{s.bankDetails?.bankName}</td>
                  <td>{s.bankDetails?.upiId}</td>
                  <td><span className={`badge ${s.status === 'active' ? 'green' : 'red'}`}>{s.status}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon btn-edit" onClick={() => openEdit(s)}><FiEdit2 /></button>
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(s._id)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={9} className="empty-state">No suppliers</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? 'Edit Supplier' : 'Add Supplier'}</h2>
              <button className="modal-close" onClick={() => setModal(false)}><FiX /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group"><label>Supplier ID</label><input value={form.supplierId} onChange={e => setForm({...form, supplierId: e.target.value})} /></div>
                <div className="form-group"><label>Name</label><input value={form.supplierName} onChange={e => setForm({...form, supplierName: e.target.value})} /></div>
                <div className="form-group"><label>Alias</label><input value={form.aliasName} onChange={e => setForm({...form, aliasName: e.target.value})} /></div>
                <div className="form-group"><label>Contact</label><input value={form.contactNo} onChange={e => setForm({...form, contactNo: e.target.value})} /></div>
                <div className="form-group"><label>Email</label><input value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
                <div className="form-group full"><label>Address</label><input value={form.address} onChange={e => setForm({...form, address: e.target.value})} /></div>
                <div className="form-group"><label>Bank Name</label><input value={form.bankDetails?.bankName || ''} onChange={e => setForm({...form, bankDetails: {...form.bankDetails, bankName: e.target.value}})} /></div>
                <div className="form-group"><label>IFSC</label><input value={form.bankDetails?.ifscCode || ''} onChange={e => setForm({...form, bankDetails: {...form.bankDetails, ifscCode: e.target.value}})} /></div>
                <div className="form-group"><label>UPI ID</label><input value={form.bankDetails?.upiId || ''} onChange={e => setForm({...form, bankDetails: {...form.bankDetails, upiId: e.target.value}})} /></div>
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
