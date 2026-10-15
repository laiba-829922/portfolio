import React, { useEffect, useRef, useState } from 'react';

export function LiveType({ motion }) {
  const words = [
    'thoughtful websites.',
    'conversational experiences.',
    'my next big idea.',
  ];

  const [word, setWord] = useState(0);
  const [count, setCount] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (!motion) return;

    const delay =
      count === words[word].length && !reverse
        ? 1600
        : count === 0 && reverse
          ? 350
          : reverse
            ? 35
            : 80;

    const timer = setTimeout(() => {
      if (!reverse && count === words[word].length) {
        setReverse(true);
      } else if (reverse && count === 0) {
        setReverse(false);
        setWord((current) => (current + 1) % words.length);
      } else {
        setCount((current) => current + (reverse ? -1 : 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [motion, word, count, reverse]);

  return (
    <div className="live-type">
      <span>I’m building</span>

      <strong aria-hidden="true">
        {motion ? words[word].slice(0, count) : words[0]}
        <i className="type-cursor" />
      </strong>

      <span className="sr-only">
        thoughtful websites, conversational experiences, and my next big idea.
      </span>
    </div>
  );
}

export function DeveloperDesk({ motion }) {
  const [tab, setTab] = useState('Profile');

  const contents = {
    Profile: [
      ['const', ' developer = {'],
      ['name:', ' "Laiba Fatima",'],
      ['studying:', ' "Computer Science",'],
      ['semester:', ' 5,'],
      ['mindset:', ' "Learn. Build. Repeat."'],
      ['', '};'],
    ],

    Toolkit: [
      ['web:', ' ["HTML", "CSS"],'],
      ['backend:', ' ["Python", "Django"],'],
      ['languages:', ' ["Java", "C++"],'],
      ['exploring:', ' "TypeScript",'],
      ['approach:', ' "Hands-on projects"'],
    ],

    Now: [
      ['const', ' currentProject = {'],
      ['name:', ' "BizPilot AI",'],
      ['status:', ' "In progress",'],
      ['next:', ' "Keep learning"'],
      ['', '};'],
    ],
  };

  return (
    <div className="developer-desk">
      <div className="desk-aura" aria-hidden="true" />

      <div className="desk-note top-note">
        ✧ a work in progress
      </div>

      <div className="desk-window">
        <div className="desk-toolbar">
          <span className="window-dots">
            <i />
            <i />
            <i />
          </span>

          <span>laiba / creative-workspace</span>

          <span className="desk-live">
            LIVE
          </span>
        </div>

        <div
          className="desk-tabs"
          role="tablist"
          aria-label="Developer desk"
        >
          {Object.keys(contents).map((item) => (
            <button
              key={item}
              role="tab"
              aria-selected={tab === item}
              aria-controls="desk-panel"
              id={`desk-${item}`}
              className={tab === item ? 'active' : ''}
              onClick={() => setTab(item)}
            >
              {item}
              <span>.js</span>
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id="desk-panel"
          aria-labelledby={`desk-${tab}`}
          className="desk-code"
        >
          {contents[tab].map(([keyword, text], index) => (
            <div
              key={tab + index}
              className="code-row"
              style={{
                animationDelay: motion
                  ? `${index * 60}ms`
                  : '0ms',
              }}
            >
              <span className="line-no">
                {String(index + 1).padStart(2, '0')}
              </span>

              <code>
                <b>{keyword}</b>
                {text}
              </code>
            </div>
          ))}
        </div>

        <div className="desk-status">
          <span>
            <span className="live-dot" />
            Curiosity is compiling.
          </span>

          <span>UTF-8 · LF</span>
        </div>
      </div>

      <div className="desk-note bottom-note">
        <span>↗</span> small steps, real projects.
      </div>

      <div className="desk-symbol" aria-hidden="true">
        ✦
      </div>
    </div>
  );
}

export function AmbientGlow({ motion }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!motion) return;

    let raf = 0;

    const move = (event) => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.setProperty(
            '--pointer-x',
            `${event.clientX}px`,
          );

          ref.current.style.setProperty(
            '--pointer-y',
            `${event.clientY}px`,
          );
        }
      });
    };

    addEventListener('pointermove', move, {
      passive: true,
    });

    return () => {
      removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, [motion]);

  return (
    <div
      ref={ref}
      className={`ambient-glow ${!motion ? 'disabled' : ''}`}
      aria-hidden="true"
    />
  );
}