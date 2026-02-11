import { useEffect, useState } from 'react';
import { usersAPI } from '../api/services';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const emptyForm = {
  fullName: '', mobileNumber: '', address: '', email: '', bloodGroup: '',
  bankDetails: { bankName: '', upiId: '', ifscCode: '', branchName: '' }
};

export default function Users() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(emptyForm);

  const fetch = () => {
    usersAPI.getAll()
      .then(res => setItems(res.data.data))
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (p: any) => { setEditing(p); setForm({ ...p, bankDetails: p.bankDetails || {} }); setModal(true); };

  const handleSave = async () => {
    try {
      if (editing) { await usersAPI.update(editing._id, form); toast.success('Updated'); }
      else { await usersAPI.create(form); toast.success('Created'); }
      setModal(false); fetch();
    } catch (err: any) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    try { await usersAPI.delete(id); toast.success('Deleted'); fetch(); }
    catch { toast.error('Failed'); }
  };

  const filtered = items.filter(u =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.mobileNumber.includes(search)
  );

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Users ({items.length})</h1>
        <button className="add-btn" onClick={openAdd}><FiPlus /> Add User</button>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>All Users</h3>
          <input className="search-box" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Name</th><th>Mobile</th><th>Email</th>
              <th>Blood Group</th><th>Bank</th><th>UPI</th><th>Status</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u._id}>
                  <td><strong>{u.fullName}</strong></td>
                  <td>{u.mobileNumber}</td>
                  <td>{u.email}</td>
                  <td>{u.bloodGroup && <span className="badge red">{u.bloodGroup}</span>}</td>
                  <td>{u.bankDetails?.bankName}</td>
                  <td>{u.bankDetails?.upiId}</td>
                  <td><span className={`badge ${u.status === 'active' ? 'green' : 'red'}`}>{u.status}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon btn-edit" onClick={() => openEdit(u)}><FiEdit2 /></button>
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(u._id)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={8} className="empty-state">No users</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? 'Edit User' : 'Add User'}</h2>
              <button className="modal-close" onClick={() => setModal(false)}><FiX /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group"><label>Full Name</label><input value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} /></div>
                <div className="form-group"><label>Mobile Number</label><input value={form.mobileNumber} onChange={e => setForm({...form, mobileNumber: e.target.value})} /></div>
                <div className="form-group"><label>Email</label><input value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
                <div className="form-group"><label>Blood Group</label>
                  <select value={form.bloodGroup} onChange={e => setForm({...form, bloodGroup: e.target.value})}>
                    <option value="">Select</option>
                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                    <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                  </select>
                </div>
                <div className="form-group full"><label>Address</label><textarea rows={2} value={form.address} onChange={e => setForm({...form, address: e.target.value})} /></div>
                <div className="form-group"><label>Bank Name</label><input value={form.bankDetails?.bankName || ''} onChange={e => setForm({...form, bankDetails: {...form.bankDetails, bankName: e.target.value}})} /></div>
                <div className="form-group"><label>UPI ID</label><input value={form.bankDetails?.upiId || ''} onChange={e => setForm({...form, bankDetails: {...form.bankDetails, upiId: e.target.value}})} /></div>
                <div className="form-group"><label>IFSC Code</label><input value={form.bankDetails?.ifscCode || ''} onChange={e => setForm({...form, bankDetails: {...form.bankDetails, ifscCode: e.target.value}})} /></div>
                <div className="form-group"><label>Branch Name</label><input value={form.bankDetails?.branchName || ''} onChange={e => setForm({...form, bankDetails: {...form.bankDetails, branchName: e.target.value}})} /></div>
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
