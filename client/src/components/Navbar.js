import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/custom.css';

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(prev => !prev);

 
  const handleNavClick = () => setOpen(false);

  return (
    <nav className="navbar navbar-expand-lg bg-transparent glass-nav">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/" onClick={handleNavClick}>
          HabitFlow
        </NavLink>

        
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNav"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={toggle}
        >
         
          <span className="navbar-toggler-icon"></span>
        </button>

       
        <div className={`collapse navbar-collapse ${open ? 'show' : ''}`} id="mainNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={handleNavClick}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={handleNavClick}>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/features" onClick={handleNavClick}>Features</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" onClick={handleNavClick}>Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
