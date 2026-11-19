import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Habits", icon: "fa-solid fa-list-check", end: true },
  { to: "/features", label: "Features", icon: "fa-solid fa-wand-magic-sparkles" },
  { to: "/about", label: "About", icon: "fa-solid fa-circle-info" },
  { to: "/contact", label: "Contact", icon: "fa-solid fa-envelope" },
];

const desktopLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
    isActive
      ? "bg-violet-500/10 text-violet-300"
      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
  }`;

const drawerLinkClass = ({ isActive }) =>
  `flex min-h-[44px] items-center gap-3 rounded-lg px-4 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
    isActive
      ? "bg-violet-500/10 text-violet-300"
      : "text-slate-300 hover:bg-slate-800 hover:text-slate-100"
  }`;

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  // Close the drawer whenever navigation lands on a new route.
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo: alone at its end of the row */}
          <NavLink
            to="/"
            className="flex items-center gap-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 shadow-lg shadow-violet-600/30">
              <i className="fa-solid fa-bolt text-sm text-white" aria-hidden="true"></i>
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-100">HabitFlow</span>
          </NavLink>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {LINKS.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={desktopLinkClass}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Drawer trigger: opposite corner from the logo */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 lg:hidden"
          >
            <i className="fa-solid fa-bars" aria-hidden="true"></i>
          </button>
        </div>
      </header>

      {/* Overlay + right-side drawer (scripted, user-triggered transition) */}
      <div
        className={`fixed inset-0 z-50 transition-[visibility] duration-0 lg:hidden ${
          drawerOpen ? "visible" : "invisible delay-200"
        }`}
        aria-hidden={!drawerOpen}
      >
        <div
          className={`absolute inset-0 bg-slate-950/80 transition-opacity duration-200 ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setDrawerOpen(false)}
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-[min(20rem,85vw)] flex-col border-l border-slate-800 bg-slate-900 shadow-2xl shadow-black/50 transition-transform duration-200 ease-out ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation menu"
              className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            >
              <i className="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </div>

          <nav className="flex flex-col gap-1 p-3">
            {LINKS.map(({ to, label, icon, end }) => (
              <NavLink key={to} to={to} end={end} className={drawerLinkClass}>
                <i className={`${icon} w-5 text-center text-sm`} aria-hidden="true"></i>
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
}
