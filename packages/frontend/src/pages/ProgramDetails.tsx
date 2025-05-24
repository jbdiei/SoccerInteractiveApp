// File: src/pages/ProgramDetails.tsx

// import { useParams, Link } from 'react-router-dom';
import {  Link } from 'react-router-dom';

import type { ProgramDetail } from '../utils/mockData';
import { programDetails } from '../utils/mockData';

export default function ProgramDetails() {
//   const { id } = useParams<{ id: string }>();
  const program: ProgramDetail | undefined = programDetails.find(p => p.id === "1");

  if (!program) {
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

  // for animation delays
  const delayClasses = ['', 'delay-100', 'delay-200'];

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

        {/* Progress */}
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

        {/* This Week’s Training Plan */}
        <section className="section">
          <h2 className="section-title">This Week’s Training Plan</h2>
          {dayPlans.map((day, idx) => (
            <div
              key={day.id}
              className={`day-card ${
                day.status === 'Completed' ? 'completed' : ''
              } animate-fade-in ${delayClasses[idx]}`}
            >
              <div className="day-card-header">
                <div className="flex justify-between items-center">
                  <h3>{day.label}</h3>
                  <span
                    className={`badge ${
                      day.status === 'Completed' ? 'badge-success' : 'badge-outline'
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
              </div>
            </div>
          ))}
        </section>

        {/* Training Tips */}
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
