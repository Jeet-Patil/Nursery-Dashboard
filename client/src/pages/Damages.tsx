import { useEffect, useState } from 'react';
import { damagesAPI, plantsAPI } from '../api/services';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const predefinedCauses = ['Pest Attack', 'Disease', 'Weather', 'Mishandling', 'Overwatering', 'Underwatering'];

const emptyForm = {
  plantId: '', plantName: '', cause: '', quantity: 0, _customCause: false
};

export default function Damages() {
  const [items, setItems] = useState<any[]>([]);
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);

  const fetch = () => {
    damagesAPI.getAll()
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
      setForm(f => ({ ...f, plantId: plant.plantId, plantName: plant.plantName }));
    } else {
      setForm(f => ({ ...f, plantId: '', plantName: '' }));
    }
  };

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (p: any) => {
    const isCustom = !predefinedCauses.includes(p.cause);
    setEditing(p);
    setForm({ ...p, _customCause: isCustom });
    setModal(true);
  };

  const handleSave = async () => {
    try {
      const { _customCause, ...data } = form;
      if (editing) { await damagesAPI.update(editing._id, data); toast.success('Updated'); }
      else { await damagesAPI.create(data); toast.success('Created'); }
      setModal(false); fetch();
    } catch (err: any) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    try { await damagesAPI.delete(id); toast.success('Deleted'); fetch(); }
    catch { toast.error('Failed'); }
  };

  const filtered = items.filter(d =>
    d.plantName.toLowerCase().includes(search.toLowerCase()) ||
    d.cause.toLowerCase().includes(search.toLowerCase())
  );

  const totalDamaged = items.reduce((acc, d) => acc + d.quantity, 0);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Damages ({items.length})</h1>
        <button className="add-btn" onClick={openAdd}><FiPlus /> Report Damage</button>
      </div>

      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card"><div className="stat-icon red">🚨</div><div className="stat-info"><h3>{totalDamaged}</h3><p>Total Damaged Plants</p></div></div>
        <div className="stat-card"><div className="stat-icon orange">📋</div><div className="stat-info"><h3>{items.filter(d => d.status === 'reported').length}</h3><p>Reported</p></div></div>
        <div className="stat-card"><div className="stat-icon green">✅</div><div className="stat-info"><h3>{items.filter(d => d.status === 'disposed').length}</h3><p>Disposed</p></div></div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>Damage Records</h3>
          <input className="search-box" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Plant ID</th><th>Plant Name</th><th>Cause</th><th>Quantity</th>
              <th>Date</th><th>Status</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d._id}>
                  <td>{d.plantId}</td>
                  <td><strong>{d.plantName}</strong></td>
                  <td>{d.cause}</td>
                  <td style={{ color: '#c62828' }}>{d.quantity}</td>
                  <td>{new Date(d.dateTime || d.createdAt).toLocaleDateString()}</td>
                  <td><span className={`badge ${d.status === 'disposed' ? 'green' : d.status === 'verified' ? 'blue' : 'orange'}`}>{d.status}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon btn-edit" onClick={() => openEdit(d)}><FiEdit2 /></button>
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(d._id)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={7} className="empty-state">No damage records</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? 'Edit Damage' : 'Report Damage'}</h2>
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
                <div className="form-group"><label>Quantity Damaged</label><input type="number" min="1" value={form.quantity} onChange={e => setForm({...form, quantity: +e.target.value})} /></div>
                <div className="form-group full"><label>Cause of Damage</label>
                  <select value={form._customCause ? '__custom__' : form.cause} onChange={e => {
                    if (e.target.value === '__custom__') setForm({...form, cause: '', _customCause: true});
                    else setForm({...form, cause: e.target.value, _customCause: false});
                  }}>
                    <option value="">-- Select Cause --</option>
                    <option>Pest Attack</option><option>Disease</option><option>Weather</option>
                    <option>Mishandling</option><option>Overwatering</option><option>Underwatering</option>
                    <option value="__custom__">Other (type below)</option>
                  </select>
                </div>
                {form._customCause && (
                  <div className="form-group full"><label>Describe Cause</label><textarea rows={3} value={form.cause} onChange={e => setForm({...form, cause: e.target.value})} placeholder="Describe the cause of damage..." /></div>
                )}
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
