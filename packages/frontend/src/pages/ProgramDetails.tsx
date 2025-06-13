// File: src/pages/ProgramDetails.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { IAPIProgramDetail } from "../../../backend/src/shared/APIProgramData";

interface ProgramDetailsProps {
  authToken: string;
}

export default function ProgramDetails({ authToken }: ProgramDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<IAPIProgramDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ─── Mark a day as completed ───
  function handleCompleteDay(dayId: string) {
    setProgram((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        dayPlans: prev.dayPlans.map((day) =>
          day.id === dayId ? { ...day, status: "Completed" } : day
        ),
      };
    });
  }

  useEffect(() => {
    if (!id) return;

    fetch(`/api/programs/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Program not found");
        return res.json();
      })
      .then((data) => setProgram(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, authToken]);

  if (loading) return <div className="container">Loading...</div>;
  if (error || !program) {
    return (
      <div className="container">
        <p>Sorry, we couldn’t find that program.</p>
        <Link to="/programs" className="btn btn-outline">
          ← Back to Programs
        </Link>
      </div>
    );
  }

  const {
    title,
    week,
    totalWeeks,
    progress,
    startDate,
    daysLeft,
    dayPlans,
    tips,
  } = program;

  const delayClasses = ["", "delay-100", "delay-200"];

  return (
    <main className="main-content">
      <div className="container">
        {/* Header */}
        <div className="program-details-header">
          <h1 className="section-title">{title}</h1>
          <p>
            Week {week} of {totalWeeks}
          </p>
          <div>
            <Link to="/programs" className="btn btn-outline btn-sm">
              <i className="fas fa-arrow-left" /> Back to Programs
            </Link>
          </div>
        </div>

        {/* Progress Section */}
        <section className="section">
          <h2>Progress</h2>
          <div className="card">
            <div className="card-body">
              <div className="program-progress">
                <div className="flex justify-between mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="program-meta mb-3">
                <div>
                  <i className="fas fa-calendar-alt" />
                  <span> Started: {startDate}</span>
                </div>
                <div>
                  <i className="fas fa-stopwatch" />
                  <span> {daysLeft} days left</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Day Plans Section */}
        <section className="section">
          <h2 className="section-title">This Week’s Training Plan</h2>
          {dayPlans.map((day, idx) => (
            <div
              key={day.id}
              className={`day-card ${
                day.status === "Completed" ? "completed" : ""
              } animate-fade-in ${delayClasses[idx]}`}
            >
              <div className="day-card-header">
                <div className="flex justify-between items-center">
                  <h3>{day.label}</h3>
                  <span
                    className={`badge ${
                      day.status === "Completed"
                        ? "badge-success"
                        : "badge-outline"
                    }`}
                  >
                    {day.status}
                  </span>
                </div>
              </div>
              <div className="day-card-body">
                {day.drills.map((drill, i) => (
                  <div key={i} className="drill">
                    <h4 className="drill-title">{drill.title}</h4>
                    <p className="drill-description">{drill.description}</p>
                  </div>
                ))}
                {day.status !== "Completed" ? (
                    <button
                      className="btn btn-success mt-2"
                      onClick={() => handleCompleteDay(day.id)}
                    >
                      Mark as Completed
                    </button>
                  ) : (
                    <button className="btn btn-disabled mt-2" disabled>
                      Completed
                    </button>
                  )}
              </div>
            </div>
          ))}
        </section>

        {/* Tips Section */}
        <section className="section">
          <div className="card">
            <div className="card-header">
              <h2>Training Tips</h2>
            </div>
            <div className="card-body">
              <ul className="list">
                {tips.map((tip, i) => (
                  <li key={i} className="list-item">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
