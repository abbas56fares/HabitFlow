import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-800 bg-slate-900">
        <i className="fa-solid fa-compass text-xl text-slate-500" aria-hidden="true"></i>
      </span>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-violet-400">
        Error 404
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-100 md:text-3xl lg:text-4xl">
        This page doesn't exist
      </h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-slate-400">
        The link may be out of date. HabitFlow no longer has sign-in or account pages — everything
        lives on your habit dashboard.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 hover:bg-violet-500 active:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
      >
        <i className="fa-solid fa-arrow-left text-xs" aria-hidden="true"></i>
        Back to habits
      </Link>
    </div>
  );
}
