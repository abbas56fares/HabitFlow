import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/custom.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-transparent glass-nav">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">HabitFlow</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/features">Features</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
