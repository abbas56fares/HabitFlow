import { useState } from "react";

import { useToast } from "../components/ToastProvider";

const EMPTY_FORM = { name: "", email: "", message: "" };

const inputClass =
  "w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50";

const labelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400";

const validate = ({ name, email, message }) => {
  const errors = {};

  if (!name.trim()) errors.name = "Tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = "Enter a valid email address.";
  if (message.trim().length < 10)
    errors.message = "Your message needs at least 10 characters.";

  return errors;
};

export default function Contact() {
  const showToast = useToast();

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const update = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const found = validate(form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      showToast("Please fix the highlighted fields.", "error");
      return;
    }

    setForm(EMPTY_FORM);
    showToast("Thanks — your message has been noted.");
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <header className="max-w-xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
          Contact
        </span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-100 md:text-3xl lg:text-4xl">
          Get in touch
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-400 lg:text-lg">
          Feedback, a bug, or an idea for the next feature — send it over.
        </p>
      </header>

      {/* <div className="mt-6 flex items-start gap-3 rounded-xl border border-violet-500/30 bg-violet-500/10 p-4"> */}
      {/* <i className="fa-solid fa-circle-info mt-0.5 text-violet-400" aria-hidden="true"></i> */}
      {/* </div> */}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20 sm:p-6 lg:p-8"
      >
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <div className="flex-1">
            <label htmlFor="contact-name" className={labelClass}>
              Name
            </label>
            <input
              id="contact-name"
              value={form.name}
              onChange={update("name")}
              placeholder="Your name"
              aria-invalid={Boolean(errors.name)}
              className={inputClass}
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          <div className="flex-1">
            <label htmlFor="contact-email" className={labelClass}>
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              className={inputClass}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-400">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="contact-message" className={labelClass}>
            Message
          </label>
          <textarea
            id="contact-message"
            rows="6"
            value={form.message}
            onChange={update("message")}
            placeholder="What's on your mind?"
            aria-invalid={Boolean(errors.message)}
            className={`${inputClass} resize-y`}
          />
          {errors.message && (
            <p className="mt-1.5 text-sm text-red-400">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-5 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 hover:bg-violet-500 active:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50 sm:w-auto"
        >
          <i className="fa-solid fa-paper-plane text-xs" aria-hidden="true"></i>
          Send message
        </button>
      </form>
    </div>
  );
}
