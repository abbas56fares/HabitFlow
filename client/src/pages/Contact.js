import React, { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [sent, setSent] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="container my-4">
      <div className="glass-card p-4">
        <h2>Contact</h2>
        <p>Feedback demo — local-only, no backend.</p>
        {sent && <div className="alert alert-success">Message saved locally (demo only).</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" className="form-control mb-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          <input type="email" className="form-control mb-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
          <textarea className="form-control mb-2" rows="5" placeholder="Message" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} required />
          <button className="btn text-white" style={{ backgroundColor: '#764ba2' }} type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
