import { useEffect, useState } from 'react';
import type { IAPIHistoryItem } from '../../../backend/src/shared/APIProgramData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function History({ authToken }: { authToken: string }) {
  const [items, setItems] = useState<IAPIHistoryItem[]>([]);

  useEffect(() => {
    fetch('/api/history',
    {
      headers: {
      Authorization: `Bearer ${authToken}`,
    },
    
    })
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const groups = items.reduce<Record<string, IAPIHistoryItem[]>>((acc, item) => {
    const dateObj = new Date(item.date);
    const monthYear = dateObj.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(item);
    return acc;
  }, {});

  const totalWorkouts = items.length;
  const programsStarted = new Set(items.map(i => i.program)).size;
  const avgHours = 5.8;

  return (
    <main className="main-content">
      <div className="container">
        <header className="page-header">
          <h1 className="section-title">Workout History</h1>
          <p>Review all your past training sessions.</p>
        </header>

        <section className="section">
          <h2 className="section-title">All Workouts</h2>
          {Object.entries(groups).map(([monthYear, workouts]) => (
            <div key={monthYear} className="mb-4">
              <h3 className="mb-2">{monthYear}</h3>
              {workouts.map(workout => (
                <div key={workout.id} className="history-item animate-fade-in">
                  <div className="history-item-info">
                    <span className="history-item-date">{workout.date}</span>
                    <span className="history-item-title">{workout.title}</span>
                    {workout.program && (
                      <span className="badge badge-secondary">{workout.program}</span>
                    )}
                  </div>
                  <div className="history-item-actions">
                    <button
                      onClick={() => handleDelete(workout.id)}
                      className="btn btn-sm btn-outline"
                      aria-label="Delete workout"
                    >
                      <FontAwesomeIcon title="Trash" icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>

        <section className="section">
          <div className="card">
            <div className="card-header">
              <h2>Workout Summary</h2>
            </div>
            <div className="card-body">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">{totalWorkouts}</div>
                  <div className="stat-label">Total Workouts</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{programsStarted}</div>
                  <div className="stat-label">Programs Started</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{avgHours}</div>
                  <div className="stat-label">Avg. Hours/Week</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
