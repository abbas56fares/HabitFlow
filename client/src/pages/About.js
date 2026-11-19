import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <header>
        <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
          About
        </span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-100 md:text-3xl lg:text-4xl">
          About HabitFlow
        </h1>
      </header>

      <div className="mt-6 flex flex-col gap-4">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20 sm:p-6 lg:p-8">
          <p className="text-base leading-relaxed text-slate-300 lg:text-lg">
            HabitFlow is a habit and productivity tracker built to help people form consistent
            routines through simple tracking and clear visual feedback. Pick the handful of things
            that matter, show up for them, and let the streak do the motivating.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20 sm:p-6 lg:p-8">
          <h2 className="flex items-center gap-3 text-lg font-semibold text-slate-200 lg:text-xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10">
              <i className="fa-solid fa-bullseye text-sm text-violet-400" aria-hidden="true"></i>
            </span>
            Mission
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-400">
            Make habit tracking approachable and elegant — a tool you actually enjoy opening every
            day, rather than one more thing to maintain.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20 sm:p-6 lg:p-8">
          <h2 className="flex items-center gap-3 text-lg font-semibold text-slate-200 lg:text-xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10">
              <i className="fa-solid fa-shield-halved text-sm text-violet-400" aria-hidden="true"></i>
            </span>
            How your data is stored
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-400">
            HabitFlow runs entirely in your browser. There is no account and no server — your
            habits are saved to this device's local storage and never leave it. Clearing your
            browser data clears your habits, and habits don't follow you to another device.
          </p>
        </section>
      </div>

      <Link
        to="/"
        className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-violet-600 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 hover:bg-violet-500 active:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
      >
        <i className="fa-solid fa-arrow-left text-xs" aria-hidden="true"></i>
        Back to habits
      </Link>
    </div>
  );
}
