// src/components/Navbar.tsx
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { DarkModeContext } from '../context/DarkModeContext';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Navbar() {
  const { dark, toggle } = useContext(DarkModeContext);
  const { pathname } = useLocation();

  const links = [
    { to: '/',       label: 'Dashboard' },
    { to: '/programs', label: 'Programs' },
    { to: '/history',  label: 'History' },
    { to: '/login',  label: 'Login' },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          SoccerSkills ⚽
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={pathname === l.to ? 'nav-link active' : 'nav-link'}
            >
              {l.label}
            </Link>
          ))}
          <button
            className="theme-toggle nav-link btn btn-sm btn-outline"
            onClick={toggle}
            aria-label="Toggle dark mode"
          >
            {dark ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div className="mobile-dropdown">
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" id="mobile-nav-dropdown">
              Menu
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {links.map(l => (
                <Dropdown.Item
                  as={Link}
                  to={l.to}
                  key={l.to}
                  onClick={() => {}}
                  active={pathname === l.to}
                >
                  {l.label}
                </Dropdown.Item>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item
                as="button"
                onClick={toggle}
              >
              {dark ? 'Light Mode☀️' : 'Dark Mode🌙'}

              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

