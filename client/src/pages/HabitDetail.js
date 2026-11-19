import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useToast } from "../components/ToastProvider";
import { getHabit, updateHabit } from "../lib/habitStore";

const formatDate = (value) => {
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "—";
  }
};

export default function HabitDetail() {
  const { id } = useParams();
  const showToast = useToast();

  const [habit, setHabit] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setHabit(getHabit(id));
    setLoaded(true);
  }, [id]);

  const changeStreak = (nextStreak, message) => {
    const saved = updateHabit(habit.id, { streak: nextStreak });

    if (!saved) {
      showToast("Could not update the streak.", "error");
      return;
    }

    setHabit(saved);
    showToast(message);
  };

  if (!loaded) return null;

  if (!habit) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-slate-800 bg-slate-900">
          <i className="fa-solid fa-circle-question text-xl text-slate-500" aria-hidden="true"></i>
        </span>
        <h1 className="mt-4 text-2xl font-bold text-slate-100 md:text-3xl">Habit not found</h1>
        <p className="mt-2 text-base text-slate-400">
          It may have been deleted, or the link points at a habit from another device.
        </p>
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

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link
        to="/"
        className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-1 text-sm font-medium text-slate-400 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
      >
        <i className="fa-solid fa-arrow-left text-xs" aria-hidden="true"></i>
        Back to habits
      </Link>

      <article className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {habit.category && (
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {habit.category}
              </span>
            )}
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-100 md:text-3xl lg:text-4xl">
              {habit.title}
            </h1>
          </div>

          <span className="flex shrink-0 items-center gap-2 self-start rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-300">
            <i className="fa-solid fa-fire" aria-hidden="true"></i>
            {habit.streak} {habit.streak === 1 ? "day" : "days"}
          </span>
        </div>

        <p className="mt-5 text-base leading-relaxed text-slate-300 lg:text-lg">
          {habit.description || "No description yet — edit this habit to add one."}
        </p>

        <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Created
            </dt>
            <dd className="mt-1 text-base font-medium text-slate-200">
              {formatDate(habit.created_at)}
            </dd>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Last updated
            </dt>
            <dd className="mt-1 text-base font-medium text-slate-200">
              {formatDate(habit.updated_at)}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row">
          <button
            type="button"
            onClick={() => changeStreak(habit.streak + 1, "Nice work — streak extended.")}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 active:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <i className="fa-solid fa-check text-xs" aria-hidden="true"></i>
            Mark complete today
          </button>

          <button
            type="button"
            onClick={() => changeStreak(0, "Streak reset to zero.")}
            disabled={habit.streak === 0}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <i className="fa-solid fa-rotate-left text-xs" aria-hidden="true"></i>
            Reset streak
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          Keep going — every completed day adds one to your streak.
        </p>
      </article>
    </div>
  );
}
