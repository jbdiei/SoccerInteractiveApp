// File: src/pages/Programs.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { IAPIProgram } from '../../../backend/src/shared/APIProgramData';

export default function Programs({ authToken }: { authToken: string }) {
  const [programs, setPrograms] = useState<IAPIProgram[]>([]);

  useEffect(() => {
    fetch('/api/programs',
      {
        headers: {
        Authorization: `Bearer ${authToken}`,
    },
      
      }
    )
      .then(res => res.json())
      .then(data => setPrograms(data));
  }, []);

  return (
    <div className="container">
      {/* Page Header */}
      <header className="page-header">
        <h1 className="section-title">Training Programs</h1>
        <p>Choose a training program that matches your goals.</p>
      </header>

      {/* Program Cards */}
      <section className="section program-cards">
        {programs.map((p, i) => (
          <div key={p.id} className={`program-card animate-fade-in ${i > 0 ? 'delay-200' : ''}`}>
            <div
              className="program-card-header"
              style={i === 1
                ? { backgroundColor: 'var(--color-background-dayBut)' }
                : i === 2
                  ? { backgroundColor: 'var(--color-program3)' }
                  : {}
              }
            >
              <h2 className="program-card-title">{p.title}</h2>
              <p className="program-card-subtitle">{p.subtitle}</p>
            </div>

            <div className="program-card-body">
              <p>{p.subtitle}</p>

              <div className="program-features">
                {p.features.map((feat, idx) => (
                  <div key={idx} className="program-feature">
                    <i
                      className="fas fa-check-circle program-feature-icon"
                      style={
                        i === 1
                          ? { color: 'var(--color-background-dayBut)' }
                          : i === 2
                            ? { color: 'var(--color-program3)' }
                            : {}
                      }
                    />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <Link
                to={`/programs/${p.id}`}
                className={`btn ${
                  i === 0
                    ? 'btn-primary'
                    : i === 1
                      ? 'btn-secondary'
                      : 'btn-third'
                }`}
              >
                View Program
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
