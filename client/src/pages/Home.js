import React, { useEffect, useMemo, useState } from "react";

import HabitCard from "../components/HabitCard";
import Modal from "../components/Modal";
import { useToast } from "../components/ToastProvider";
import { createHabit, deleteHabit, getHabits, updateHabit } from "../lib/habitStore";

const EMPTY_FORM = { title: "", description: "", category: "" };

const inputClass =
  "w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-base text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50";

const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400";

const secondaryButtonClass =
  "min-h-[44px] rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 hover:bg-slate-700/60 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50";

const primaryButtonClass =
  "min-h-[44px] rounded-lg bg-violet-600 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 hover:bg-violet-500 active:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50";

export default function Home() {
  const showToast = useToast();

  const [habits, setHabits] = useState([]);
  const [search, setSearch] = useState("");

  const [addForm, setAddForm] = useState(EMPTY_FORM);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    setHabits(getHabits());
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return habits;

    return habits.filter(
      (habit) =>
        habit.title.toLowerCase().includes(query) ||
        habit.category.toLowerCase().includes(query)
    );
  }, [habits, search]);

  const longestStreak = habits.reduce((best, habit) => Math.max(best, habit.streak), 0);

  const handleAdd = (event) => {
    event.preventDefault();

    if (!addForm.title.trim()) {
      showToast("A habit needs a title.", "error");
      return;
    }

    if (!createHabit(addForm)) {
      showToast("Could not save the habit — browser storage is unavailable.", "error");
      return;
    }

    setHabits(getHabits());
    setAddForm(EMPTY_FORM);
    setAddOpen(false);
    showToast("Habit created.");
  };

  const handleEdit = (event) => {
    event.preventDefault();

    if (!editing.title.trim()) {
      showToast("A habit needs a title.", "error");
      return;
    }

    const saved = updateHabit(editing.id, {
      title: editing.title.trim(),
      description: editing.description.trim(),
      category: editing.category.trim(),
    });

    if (!saved) {
      showToast("Could not update the habit.", "error");
      return;
    }

    setHabits(getHabits());
    setEditing(null);
    showToast("Habit updated.");
  };

  const handleDelete = () => {
    if (!deleteHabit(deleting.id)) {
      showToast("Could not delete the habit.", "error");
      return;
    }

    setHabits(getHabits());
    setDeleting(null);
    showToast("Habit deleted.");
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <header className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-100 md:text-3xl lg:text-4xl">
              Your habits
            </h1>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-slate-400 lg:text-lg">
              Track what you do daily, build streaks, and watch consistency compound.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className={`${primaryButtonClass} flex w-full items-center justify-center gap-2 lg:w-auto`}
          >
            <i className="fa-solid fa-plus text-xs" aria-hidden="true"></i>
            Add habit
          </button>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Habits
            </dt>
            <dd className="mt-1 text-2xl font-bold text-slate-100">{habits.length}</dd>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Longest streak
            </dt>
            <dd className="mt-1 text-2xl font-bold text-violet-400">{longestStreak}</dd>
          </div>

          <div className="col-span-2 rounded-xl border border-slate-800 bg-slate-950 p-4 md:col-span-1">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Active today
            </dt>
            <dd className="mt-1 text-2xl font-bold text-emerald-400">
              {habits.filter((habit) => habit.streak > 0).length}
            </dd>
          </div>
        </dl>

        <div className="relative mt-5">
          <i
            className="fa-solid fa-magnifying-glass pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500"
            aria-hidden="true"
          ></i>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title or category..."
            aria-label="Search habits"
            className={`${inputClass} pl-11`}
          />
        </div>
      </header>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 px-6 py-14 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-slate-800 bg-slate-900">
            <i
              className={`fa-solid ${
                habits.length === 0 ? "fa-seedling" : "fa-magnifying-glass"
              } text-xl text-slate-500`}
              aria-hidden="true"
            ></i>
          </span>

          <h2 className="mt-4 text-xl font-semibold text-slate-200">
            {habits.length === 0 ? "No habits yet" : "Nothing matches that search"}
          </h2>

          <p className="mx-auto mt-2 max-w-md text-base text-slate-400">
            {habits.length === 0
              ? "Add your first habit and start a streak today."
              : "Try a different title or category."}
          </p>

          {habits.length === 0 && (
            <button
              type="button"
              onClick={() => setAddOpen(true)}
              className={`${primaryButtonClass} mt-6 inline-flex items-center gap-2 px-6`}
            >
              <i className="fa-solid fa-plus text-xs" aria-hidden="true"></i>
              Add habit
            </button>
          )}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {filtered.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onEdit={setEditing}
              onDelete={setDeleting}
            />
          ))}
        </div>
      )}

      {addOpen && (
        <Modal title="Add habit" onClose={() => setAddOpen(false)}>
          <form onSubmit={handleAdd} className="flex flex-col gap-4">
            <div>
              <label htmlFor="add-title" className={labelClass}>
                Title
              </label>
              <input
                id="add-title"
                autoFocus
                className={inputClass}
                value={addForm.title}
                onChange={(event) => setAddForm({ ...addForm, title: event.target.value })}
                placeholder="Morning run"
              />
            </div>

            <div>
              <label htmlFor="add-category" className={labelClass}>
                Category
              </label>
              <input
                id="add-category"
                className={inputClass}
                value={addForm.category}
                onChange={(event) => setAddForm({ ...addForm, category: event.target.value })}
                placeholder="Fitness"
              />
            </div>

            <div>
              <label htmlFor="add-description" className={labelClass}>
                Description
              </label>
              <textarea
                id="add-description"
                rows="4"
                className={`${inputClass} resize-y`}
                value={addForm.description}
                onChange={(event) =>
                  setAddForm({ ...addForm, description: event.target.value })
                }
                placeholder="What does doing this well look like?"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setAddOpen(false)}
                className={secondaryButtonClass}
              >
                Cancel
              </button>
              <button type="submit" className={primaryButtonClass}>
                Save habit
              </button>
            </div>
          </form>
        </Modal>
      )}

      {editing && (
        <Modal title="Edit habit" onClose={() => setEditing(null)}>
          <form onSubmit={handleEdit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="edit-title" className={labelClass}>
                Title
              </label>
              <input
                id="edit-title"
                autoFocus
                className={inputClass}
                value={editing.title}
                onChange={(event) => setEditing({ ...editing, title: event.target.value })}
              />
            </div>

            <div>
              <label htmlFor="edit-category" className={labelClass}>
                Category
              </label>
              <input
                id="edit-category"
                className={inputClass}
                value={editing.category}
                onChange={(event) => setEditing({ ...editing, category: event.target.value })}
              />
            </div>

            <div>
              <label htmlFor="edit-description" className={labelClass}>
                Description
              </label>
              <textarea
                id="edit-description"
                rows="4"
                className={`${inputClass} resize-y`}
                value={editing.description}
                onChange={(event) =>
                  setEditing({ ...editing, description: event.target.value })
                }
              />
            </div>

            <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className={secondaryButtonClass}
              >
                Cancel
              </button>
              <button type="submit" className={primaryButtonClass}>
                Save changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleting && (
        <Modal
          title="Delete habit"
          onClose={() => setDeleting(null)}
          footer={
            <>
              <button
                type="button"
                onClick={() => setDeleting(null)}
                className={secondaryButtonClass}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="min-h-[44px] rounded-lg bg-red-600 px-5 text-sm font-semibold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/50"
              >
                Delete habit
              </button>
            </>
          }
        >
          <p className="text-base leading-relaxed text-slate-300">
            Delete <span className="font-semibold text-slate-100">{deleting.title}</span> and its
            streak of {deleting.streak}? This cannot be undone.
          </p>
        </Modal>
      )}
    </div>
  );
}
