// File: src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { IAPIStat, IAPIProgram, IAPIHistoryItem } from '../../../backend/src/shared/APIProgramData';


export default function Dashboard() {
  const [stats, setStats] = useState<IAPIStat[]>([]);
  const [programs, setPrograms] = useState<IAPIProgram[]>([]);
  const [historyItems, setHistoryItems] = useState<IAPIHistoryItem[]>([]);

  const delayClasses = ['', 'delay-100', 'delay-200'];

  useEffect(() => {
    fetch('/api/dashboard-data')
      .then(res => res.json())
      .then(data => {
        setStats(data.stats);
        setPrograms(data.programs);
        setHistoryItems(data.history);
      });
  }, []);

  if (!programs.length) return <div>Loading...</div>;

  const currentProgram = {
    id: programs[0].id,
    title: programs[0].title,
    week: 2,
    progress: 65,
    startDate: 'May 15, 2025',
    daysLeft: 13,
  };

  const recentWorkouts = historyItems;

  return (
    <main className="main-content">
      <div className="container">
        {/* Page Header */}
        <header className="page-header">
          <h1 className="section-title">Welcome back, Player!</h1>
          <p>Track your progress and continue your soccer training journey.</p>
        </header>

        {/* Stats Section */}
        <section className="section">
          <h2>Stats</h2>
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`stat-card animate-fade-in ${delayClasses[idx]}`}
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Current Program Section */}
        <section className="section">
          <h2 className="section-title">Current Program</h2>
          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h2>{currentProgram.title}</h2>
                <span className="badge badge-primary">
                  Week {currentProgram.week}
                </span>
              </div>
            </div>
            <div className="card-body">
              <div className="program-progress">
                <div className="flex justify-between mb-1">
                  <span>Progress</span>
                  <span>{currentProgram.progress}%</span>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${currentProgram.progress}%` }}
                  />
                </div>
              </div>
              <div className="program-meta mb-3">
                <div>
                  <i className="fas fa-calendar-alt" />
                  <span> Started: {currentProgram.startDate}</span>
                </div>
                <div>
                  <i className="fas fa-stopwatch" />
                  <span> {currentProgram.daysLeft} days left</span>
                </div>
              </div>
              <Link
                to={`/programs/${currentProgram.id}`}
                className="btn btn-primary"
              >
                Continue Training
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Workouts Section */}
        <section className="section">
          <div className="flex justify-between items-center mb-3">
            <h2 className="section-title">Recent Workouts</h2>
            <Link to="/history" className=" btn btn-a btn-outline btn-sm">
              View All
            </Link>
          </div>
          <div className="list">
            {recentWorkouts.map((w, idx) => (
              <div
                key={w.id}
                className={`history-item animate-fade-in ${delayClasses[idx]}`}
              >
                <div className="history-item-info">
                  <span className="history-item-date">{w.date}</span>
                  <span className="history-item-title">{w.title}</span>
                </div>
                <span className="badge badge-success">
                  {w.program ?? 'Completed'}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
