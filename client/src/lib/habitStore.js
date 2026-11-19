/**
 * habitStore — the single source of truth for habit persistence.
 *
 * The app is deployed as a static bundle with no backend, so habits live in
 * localStorage. Rows deliberately mirror the `habits` table in habitflow.sql
 * ({ id, user_id, title, description, category, streak, created_at, updated_at })
 * so the Express/MySQL server in /server can be reattached later by swapping
 * the internals of this module and nothing else.
 */

const STORAGE_KEY = "habitflow.habits";

// Single-user app: no auth, but the row shape keeps its user_id column.
export const CURRENT_USER_ID = 1;

const now = () => new Date().toISOString();

const seedHabits = () => [
  {
    id: 1,
    user_id: CURRENT_USER_ID,
    title: "Morning Run",
    description: "Thirty minutes outdoors before the day starts.",
    category: "Fitness",
    streak: 4,
    created_at: now(),
    updated_at: now(),
  },
  {
    id: 2,
    user_id: CURRENT_USER_ID,
    title: "Read 20 Pages",
    description: "Any book, any genre — just keep the pages turning.",
    category: "Learning",
    streak: 11,
    created_at: now(),
    updated_at: now(),
  },
];

/** Reads the habit list, tolerating absent, unreadable, or corrupt storage. */
function readAll() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (raw === null) {
      const seeded = seedHabits();
      writeAll(seeded);
      return seeded;
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Could not read habits from storage:", error);
    return [];
  }
}

/** Persists the habit list. Returns false when storage is unavailable or full. */
function writeAll(habits) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    return true;
  } catch (error) {
    console.error("Could not save habits to storage:", error);
    return false;
  }
}

export function getHabits() {
  return readAll().sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function getHabit(id) {
  return readAll().find((habit) => habit.id === Number(id)) || null;
}

export function createHabit({ title, description = "", category = "" }) {
  const habit = {
    id: Date.now(),
    user_id: CURRENT_USER_ID,
    title: title.trim(),
    description: description.trim(),
    category: category.trim(),
    streak: 0,
    created_at: now(),
    updated_at: now(),
  };

  const saved = writeAll([habit, ...readAll()]);
  return saved ? habit : null;
}

export function updateHabit(id, patch) {
  const habits = readAll();
  const index = habits.findIndex((habit) => habit.id === Number(id));

  if (index === -1) return null;

  const updated = { ...habits[index], ...patch, updated_at: now() };
  habits[index] = updated;

  return writeAll(habits) ? updated : null;
}

export function deleteHabit(id) {
  const habits = readAll();
  const remaining = habits.filter((habit) => habit.id !== Number(id));

  if (remaining.length === habits.length) return false;

  return writeAll(remaining);
}
