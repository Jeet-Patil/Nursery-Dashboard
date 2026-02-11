import { useEffect, useState } from 'react';
import { plantsAPI } from '../api/services';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const emptyPlant = {
  plantId: '', plantName: '', scientificName: '', plantType: '',
  petFriendly: false, nakshatraPlant: false, airPurifierPlant: false,
  specificRequirement: '', wateringFrequency: '', sunlight: '', environment: ''
};

export default function Plants() {
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyPlant);

  const fetchPlants = () => {
    plantsAPI.getAll()
      .then(res => setPlants(res.data.data))
      .catch(() => toast.error('Failed to load plants'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPlants(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyPlant); setModal(true); };
  const openEdit = (p: any) => { setEditing(p); setForm(p); setModal(true); };

  const handleSave = async () => {
    try {
      if (editing) {
        await plantsAPI.update(editing._id, form);
        toast.success('Plant updated');
      } else {
        await plantsAPI.create(form);
        toast.success('Plant created');
      }
      setModal(false);
      fetchPlants();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error saving plant');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this plant?')) return;
    try {
      await plantsAPI.delete(id);
      toast.success('Plant deleted');
      fetchPlants();
    } catch { toast.error('Failed to delete'); }
  };

  const filtered = plants.filter(p =>
    p.plantName.toLowerCase().includes(search.toLowerCase()) ||
    p.plantId.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading">Loading plants...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Plants ({plants.length})</h1>
        <button className="add-btn" onClick={openAdd}><FiPlus /> Add Plant</button>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>All Plants</h3>
          <input className="search-box" placeholder="Search plants..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Scientific Name</th><th>Type</th>
                <th>Pet Friendly</th><th>Air Purifier</th><th>Sunlight</th>
                <th>Environment</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p._id}>
                  <td>{p.plantId}</td>
                  <td><strong>{p.plantName}</strong></td>
                  <td><em>{p.scientificName}</em></td>
                  <td>{p.plantType}</td>
                  <td>{p.petFriendly ? '✅' : '❌'}</td>
                  <td>{p.airPurifierPlant ? '✅' : '❌'}</td>
                  <td>{p.sunlight}</td>
                  <td>{p.environment}</td>
                  <td><span className={`badge ${p.status === 'active' ? 'green' : 'red'}`}>{p.status}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon btn-edit" onClick={() => openEdit(p)}><FiEdit2 /></button>
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(p._id)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={10} className="empty-state">No plants found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? 'Edit Plant' : 'Add Plant'}</h2>
              <button className="modal-close" onClick={() => setModal(false)}><FiX /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Plant ID</label>
                  <input value={form.plantId} onChange={e => setForm({...form, plantId: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Plant Name</label>
                  <input value={form.plantName} onChange={e => setForm({...form, plantName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Scientific Name</label>
                  <input value={form.scientificName} onChange={e => setForm({...form, scientificName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Plant Type</label>
                  <select value={form.plantType} onChange={e => setForm({...form, plantType: e.target.value})}>
                    <option value="">Select</option>
                    <option>Flowering</option><option>Medicinal</option><option>Ornamental</option>
                    <option>Succulent</option><option>Herb</option><option>Shrub</option>
                    <option>Tree</option><option>Climber</option><option>Creeper</option>
                    <option>Fern</option><option>Cactus</option><option>Aquatic</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Watering Frequency</label>
                  <select value={form.wateringFrequency} onChange={e => setForm({...form, wateringFrequency: e.target.value})}>
                    <option value="">Select</option>
                    <option>Daily</option><option>Twice a Week</option><option>Weekly</option>
                    <option>Bi-Weekly</option><option>Monthly</option><option>As Needed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Sunlight</label>
                  <select value={form.sunlight} onChange={e => setForm({...form, sunlight: e.target.value})}>
                    <option value="">Select</option>
                    <option>Full Sun</option><option>Partial Sun</option>
                    <option>Shade</option><option>Indirect Light</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Environment</label>
                  <select value={form.environment} onChange={e => setForm({...form, environment: e.target.value})}>
                    <option value="">Select</option>
                    <option>Indoor</option><option>Outdoor</option><option>Both</option>
                  </select>
                </div>
                <div className="form-group full" style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input type="checkbox" checked={form.petFriendly} onChange={e => setForm({...form, petFriendly: e.target.checked})} /> Pet Friendly
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input type="checkbox" checked={form.nakshatraPlant} onChange={e => setForm({...form, nakshatraPlant: e.target.checked})} /> Nakshatra Plant
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input type="checkbox" checked={form.airPurifierPlant} onChange={e => setForm({...form, airPurifierPlant: e.target.checked})} /> Air Purifier
                  </label>
                </div>
                <div className="form-group full">
                  <label>Specific Requirement</label>
                  <textarea rows={2} value={form.specificRequirement} onChange={e => setForm({...form, specificRequirement: e.target.value})} />
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
