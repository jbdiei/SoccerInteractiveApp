// File: src/pages/Programs.tsx
import { useState } from 'react';
import type { FormEvent } from 'react';

import { programs } from '../utils/mockData';
import { Link } from 'react-router-dom';

export default function Programs() {
  // ---- assessment form state ----
  const [position, setPosition] = useState('');
  const [experience, setExperience] = useState('');
  const [focus, setFocus] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // You could filter / suggest programs here.
    // For now we'll just pop an alert:
    alert(
      `Position: ${position}\n` +
      `Experience: ${experience}\n` +
      `Focus: ${focus}`
    );
  };

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

      {/* Quick Assessment */}
      <section className="section">
        <div className="card">
          <div className="card-header">
            <h2>Not sure which program to choose?</h2>
          </div>
          <div className="card-body">
            <p>
              Take our quick assessment to find the perfect training program
              for your position and skill level.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="position" className="form-label">
                  What's your position?
                </label>
                <select
                  id="position"
                  className="form-select"
                  value={position}
                  onChange={e => setPosition(e.target.value)}
                >
                  <option value="">Select your position</option>
                  <option value="forward">Forward</option>
                  <option value="midfielder">Midfielder</option>
                  <option value="defender">Defender</option>
                  <option value="goalkeeper">Goalkeeper</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="experience" className="form-label">
                  Your experience level
                </label>
                <select
                  id="experience"
                  className="form-select"
                  value={experience}
                  onChange={e => setExperience(e.target.value)}
                >
                  <option value="">Select your level</option>
                  <option value="beginner">Beginner (0-1 years)</option>
                  <option value="intermediate">Intermediate (1-3 years)</option>
                  <option value="advanced">Advanced (3+ years)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="focus" className="form-label">
                  What do you want to improve most?
                </label>
                <select
                  id="focus"
                  className="form-select"
                  value={focus}
                  onChange={e => setFocus(e.target.value)}
                >
                  <option value="">Select your focus</option>
                  <option value="shooting">Shooting</option>
                  <option value="passing">Passing</option>
                  <option value="dribbling">Dribbling</option>
                  <option value="defense">Defensive skills</option>
                  <option value="fitness">Fitness &amp; Stamina</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Find My Program
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
