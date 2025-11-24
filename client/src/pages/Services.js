
import React from "react";

function Services() {
  const features = [
    {
      id: 1,
      title: "Habit Tracking",
      text: "Create and view habits, check streaks and history.",
    },
    {
      id: 2,
      title: "Progress Insights",
      text: "See daily/weekly progress and streak details (demo).",
    },
    {
      id: 3,
      title: "Mobile Friendly",
      text: "Responsive layout that works on phone and desktop.",
    },
    {
      id: 4,
      title: "No Backend Required",
      text: "Frontend-only demo using static data for the course.",
    },
  ];

  return (
    <div>
      <h2>Features</h2>
      <div className="row">
        {features.map((f) => (
          <div className="col-md-6" key={f.id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5>{f.title}</h5>
                <p className="mb-0">{f.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
