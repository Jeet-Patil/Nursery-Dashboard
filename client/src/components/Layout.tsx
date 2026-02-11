import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiHome, FiUsers, FiShoppingCart, FiDollarSign,
  FiPackage, FiTruck, FiAlertTriangle, FiLogOut, FiDatabase
} from 'react-icons/fi';
import { GiPlantRoots } from 'react-icons/gi';

const navItems = [
  { to: '/', icon: <FiHome />, label: 'Dashboard', end: true },
  { to: '/plants', icon: <GiPlantRoots />, label: 'Plants' },
  { to: '/inventory', icon: <FiPackage />, label: 'Inventory' },
  { to: '/purchases', icon: <FiShoppingCart />, label: 'Purchases' },
  { to: '/sales', icon: <FiDollarSign />, label: 'Sales' },
  { to: '/suppliers', icon: <FiTruck />, label: 'Suppliers' },
  { to: '/expenses', icon: <FiDatabase />, label: 'Expenses' },
  { to: '/damages', icon: <FiAlertTriangle />, label: 'Damages' },
  { to: '/users', icon: <FiUsers />, label: 'Users' },
];

export default function Layout() {
  const { admin, logout } = useAuth();

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>AyuNext</h2>
          <p>Plant Management System</p>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div style={{ marginBottom: 10, fontSize: '0.8rem' }}>
            Logged in as <strong>{admin?.username || 'Admin'}</strong>
          </div>
          <button className="logout-btn" onClick={logout}>
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
