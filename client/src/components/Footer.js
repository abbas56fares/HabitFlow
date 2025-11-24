import React from 'react';
import '../styles/custom.css';

function Footer() {
  return (
    <footer className="py-4 mt-auto glass-footer">
      <div className="container d-flex justify-content-between flex-column flex-md-row align-items-center">
        <div><strong>HabitFlow</strong> &mdash; Build your habits daily</div>
        <div className="text-white">© {new Date().getFullYear()} HabitFlow Demo</div>
      </div>
    </footer>
  );
}

export default Footer;
