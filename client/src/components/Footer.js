import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-4 py-6 text-center sm:px-6 md:flex-row md:justify-between md:text-left lg:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-600">
            <i className="fa-solid fa-bolt text-xs text-white" aria-hidden="true"></i>
          </span>
          <span className="text-sm font-semibold text-slate-200">
            HabitFlow — build your habits daily
          </span>
        </div>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} HabitFlow. Your habits stay on this device.
        </p>
      </div>
    </footer>
  );
}
