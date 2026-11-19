import React from "react";
import { Link } from "react-router-dom";

const FEATURES = [
  {
    icon: "fa-solid fa-plus",
    title: "Habit creation",
    text: "Give a habit a title, a category, and a description of what doing it well looks like.",
  },
  {
    icon: "fa-solid fa-check",
    title: "Completion tracking",
    text: "Mark a habit done for the day and watch the streak counter climb.",
  },
  {
    icon: "fa-solid fa-fire",
    title: "Streaks at a glance",
    text: "Every card carries its streak, and the dashboard surfaces your longest run.",
  },
  {
    icon: "fa-solid fa-magnifying-glass",
    title: "Instant search",
    text: "Filter by title or category as you type — no page reloads, no waiting.",
  },
  {
    icon: "fa-solid fa-mobile-screen",
    title: "Built for every screen",
    text: "A full dashboard on desktop, a thumb-friendly app layout on your phone.",
  },
  {
    icon: "fa-solid fa-lock",
    title: "Private by default",
    text: "Habits are saved in your browser's local storage. No account, no server, no tracking.",
  },
];

export default function Features() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <header className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
          Features
        </span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-100 md:text-3xl lg:text-4xl">
          Everything you need, nothing you don't
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-400 lg:text-lg">
          HabitFlow stays deliberately small: create a habit, show up for it, and keep the streak
          alive.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {FEATURES.map(({ icon, title, text }) => (
          <div
            key={title}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20 hover:border-slate-700 sm:p-6"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10">
              <i className={`${icon} text-violet-400`} aria-hidden="true"></i>
            </span>
            <h2 className="mt-4 text-lg font-semibold text-slate-200 lg:text-xl">{title}</h2>
            <p className="mt-2 text-base leading-relaxed text-slate-400">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center shadow-xl shadow-black/20 sm:p-8">
        <h2 className="text-xl font-semibold text-slate-100 lg:text-2xl">
          Ready to start a streak?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-base text-slate-400">
          No sign-up, no setup. Add your first habit and go.
        </p>
        <Link
          to="/"
          className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 hover:bg-violet-500 active:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
        >
          <i className="fa-solid fa-bolt text-xs" aria-hidden="true"></i>
          Open my habits
        </Link>
      </div>
    </div>
  );
}
