import React, { useEffect, useState } from 'react';
import './project-showcase.css';

const PROJECTS = [
  {
    id: 'elan',
    name: 'Élan Events',
    category: 'Websites',
    label: 'Event design & visual storytelling',
    url: 'https://elan-events-chi.vercel.app/',
    overview:
      'An event-design website that introduces celebration experiences through services, visual inspiration, and a gallery-led presentation.',
    features: [
      'Wedding, Nikah, and intimate-celebration sections',
      'Event design, floral artistry, planning, and bespoke styling',
      'Inspiration gallery with previous/next controls',
      'Services, gallery, and Design Your Event navigation',
    ],
    flow: [
      'Discover the brand',
      'Explore celebrations & services',
      'Browse inspiration',
      'Open event-design or contact pages',
    ],
  },
  {
    id: 'excuse',
    name: 'AI Excuse Generator',
    category: 'Applications',
    label: 'Configurable response-generation interface',
    url: 'https://ai-excuse-generator-omega.vercel.app/',
    overview:
      'An interactive excuse-generator interface with controls for a situation, audience category, tone, language, and response length.',
    features: [
      'School/college, office, friends, and family categories',
      'Serious, funny, and professional tones',
      'Roman Urdu and English language options',
      'Short, medium, and long response-length options',
      'Generate, copy, and regenerate controls',
    ],
    flow: [
      'Describe a situation',
      'Choose category & tone',
      'Set language & length',
      'Generate, then copy or regenerate',
    ],
    note: 'The public interface was reviewed; response generation was not tested.',
  },
  {
    id: 'dine',
    name: 'DineBot',
    category: 'Applications',
    label: 'Restaurant account & administrator entry',
    url: 'https://dine-bot-teal.vercel.app/',
    overview:
      'A restaurant-management entry point with administrator login and a restaurant account-registration flow.',
    features: [
      'Restaurant-name and password login fields',
      'Restaurant sign-up with location and email',
      'Password confirmation and password requirements',
      'Password visibility and recovery navigation',
    ],
    flow: [
      'Open the restaurant portal',
      'Create an account or log in',
      'Use password recovery if needed',
    ],
    note: 'The public login and sign-up pages were reviewed. The authenticated dashboard was not inspected.',
  },
  {
    id: 'blessings',
    name: 'D Blessings Events',
    category: 'Websites',
    label: 'Event planning & decoration collections',
    url: 'https://d-blessings-events.vercel.app/',
    overview:
      'An event-planning website presenting celebration services, decoration collections, portfolio work, and inspiration.',
    features: [
      'Wedding, birthday, and themed-celebration collections',
      'Portfolio and inspiration navigation',
      'Design Your Event entry points',
      'Contact and WhatsApp enquiry links',
    ],
    flow: [
      'Discover event services',
      'Explore decoration collections',
      'View portfolio & inspiration',
      'Open planning or contact options',
    ],
  },
];

export function LiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Karachi',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now);
  return (
    <div className="pakistan-clock" aria-label="Current time in Pakistan">
      <span className="clock-dot" aria-hidden="true" />
      <span>
        PKT <time dateTime={now.toISOString()}>{time}</time>
      </span>
    </div>
  );
}

function ProjectStory({ project, index }) {
  const [tab, setTab] = useState('Overview');
  const tabs = ['Overview', 'Features', 'User flow'];
  const [mountedPreview, setMountedPreview] = useState(true);
  return (
    <article className={`project-story ${index % 2 ? 'story-reverse' : ''}`}>
      <div className="story-preview">
        <div className="story-browser">
          <span className="browser-dots" aria-hidden="true">
            ● ● ●
          </span>
          <span>{new URL(project.url).hostname}</span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name}`}
          >
            ↗
          </a>
        </div>
        <div className="story-frame">
          {mountedPreview ? (
            <iframe
              src={project.url}
              title={`${project.name} actual website preview`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              referrerPolicy="no-referrer"
              tabIndex={-1}
            />
          ) : (
            <div className="preview-paused">
              Preview paused.
              <br />
              <span>Resume it or open the full website.</span>
            </div>
          )}
          <a
            className="story-preview-link"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name} live demo`}
          >
            <span>Open live website ↗</span>
          </a>
        </div>
        <div className="story-preview-footer">
          <span>{mountedPreview ? 'ACTUAL LIVE WEBSITE' : 'PREVIEW PAUSED'}</span>
          <button onClick={() => setMountedPreview((v) => !v)}>
            {mountedPreview ? 'Pause preview' : 'Resume preview'}
          </button>
        </div>
        <p className="preview-help">
          If the embedded preview is unavailable, use Live Demo to open the original site.
        </p>
      </div>
      <div className="story-content">
        <p className="story-number">
          SELECTED WORK / {String(index + 1).padStart(2, '0')}
        </p>
        <p className="story-label">{project.label}</p>
        <h3>{project.name}</h3>
        <div
          className="story-tabs"
          role="tablist"
          aria-label={`${project.name} information`}
        >
          {tabs.map((t) => (
            <button
              key={t}
              id={`${project.id}-tab-${t.replaceAll(' ', '-')}`}
              role="tab"
              aria-selected={tab === t}
              aria-controls={`${project.id}-panel`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div
          className="story-panel"
          id={`${project.id}-panel`}
          role="tabpanel"
          aria-labelledby={`${project.id}-tab-${tab.replaceAll(' ', '-')}`}
        >
          {tab === 'Overview' ? (
            <p>{project.overview}</p>
          ) : tab === 'Features' ? (
            <ul>
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          ) : (
            <ol>
              {project.flow.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ol>
          )}
        </div>
        <div className="story-buttons">
          <a
            className="button primary"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo ↗
          </a>
          <button
            className="button"
            onClick={() => setTab(tab === 'Features' ? 'Overview' : 'Features')}
          >
            {tab === 'Features' ? 'Read overview' : 'Explore features +'}
          </button>
        </div>
        {project.note && <p className="story-note">{project.note}</p>}
      </div>
    </article>
  );
}

export default function ProjectShowcase() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const shown = PROJECTS.filter(
    (p) =>
      (category === 'All' || p.category === category) &&
      `${p.name} ${p.overview} ${p.features.join(' ')}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <section id="work" className="case-studies">
      <div className="section-top">
        <div>
          <p className="eyebrow">Selected work / Websites & applications</p>
          <h2>
            Different ideas.
            <br />
            <span>Real experiences.</span>
          </h2>
        </div>
        <p>
          Explore what each project does, its visible features, and the journey through
          the live website.
        </p>
      </div>
      <div className="case-controls">
        <div className="case-filters">
          {['All', 'Applications', 'Websites'].map((c) => (
            <button
              className="filter"
              key={c}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label>
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a project or feature…"
          />
        </label>
      </div>
      <p className="case-count" role="status">
        {shown.length} of {PROJECTS.length} projects
      </p>
      <div className="project-stories">
        {shown.map((p) => (
          <ProjectStory key={p.id} project={p} index={PROJECTS.indexOf(p)} />
        ))}
      </div>
      {!shown.length && (
        <p className="empty">No matches. Try another project name or feature.</p>
      )}
    </section>
  );
}
