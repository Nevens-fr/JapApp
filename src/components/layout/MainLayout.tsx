import { Outlet, NavLink } from 'react-router-dom';
import './MainLayout.css';

function MainLayout() {
  const navItems = [
    { to: '/', label: 'Accueil', icon: '🏠' },
    { to: '/learning-path', label: 'Parcours', icon: '📚' },
    { to: '/reviews', label: 'Révisions', icon: '🔄' },
    { to: '/dictionary', label: 'Dico', icon: '📖' },
    { to: '/statistics', label: 'Stats', icon: '📊' },
    { to: '/settings', label: 'Réglages', icon: '⚙️' },
  ];

  return (
    <div className="app-layout">
      <main className="main-content">
        <Outlet />
      </main>
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default MainLayout;
