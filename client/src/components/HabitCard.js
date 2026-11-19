import React from "react";
import { Link } from "react-router-dom";

export default function HabitCard({ habit, onEdit, onDelete }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20 hover:border-slate-700">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold leading-snug text-slate-100">{habit.title}</h3>

        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-xs font-semibold text-violet-300">
          <i className="fa-solid fa-fire text-[0.7rem]" aria-hidden="true"></i>
          {habit.streak}
        </span>
      </div>

      {habit.category && (
        <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          {habit.category}
        </span>
      )}

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
        {habit.description || "No description yet."}
      </p>

      <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-800 pt-4">
        <Link
          to={`/habit/${habit.id}`}
          className="flex min-h-[44px] items-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-medium text-white shadow-lg shadow-violet-600/30 hover:bg-violet-500 active:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
        >
          <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
          View
        </Link>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(habit)}
            aria-label={`Edit ${habit.title}`}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          >
            <i className="fa-solid fa-pen" aria-hidden="true"></i>
          </button>

          <button
            type="button"
            onClick={() => onDelete(habit)}
            aria-label={`Delete ${habit.title}`}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          >
            <i className="fa-solid fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </article>
  );
}
