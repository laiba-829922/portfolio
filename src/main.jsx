import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import ProjectShowcase from './ProjectShowcase.jsx';

import {
  LiveType,
  DeveloperDesk,
  
} from './FinalDetails.jsx';

import {
  Overview,
  StudioControls,
  StudioFooter,
} from './Studio.jsx';

import './styles.css';
import './dark.css';
import './neutral.css';
import './studio.css';
import './final.css';
import './signature-priestacy.css';
import ParticleBackground from './ParticleBackground.jsx';

const GITHUB_URL = 'https://github.com/laiba-829922';
const EMAIL = 'laiba.829922@gmail.com';

const SKILLS = {
  Web: ['HTML', 'CSS', 'TypeScript'],
  Backend: ['Python', 'Django'],
  Foundations: ['Java', 'C++', 'SRS documents'],
};

function App() {
  const [skill, setSkill] = useState('Web');
  const [modal, setModal] = useState(null);
  const [copied, setCopied] = useState('');
  const [progress, setProgress] = useState(0);

  const dialog = useRef(null);
  const previousFocus = useRef(null);

  // Fixed appearance: no mood selector or movement button.
  const motion = true;
  const theme = 'lavender';

  useEffect(() => {
    function updateProgress() {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const percentage =
        scrollableHeight > 0
          ? (window.scrollY / scrollableHeight) * 100
          : 0;

      setProgress(Math.min(100, Math.max(0, percentage)));
    }

    window.addEventListener('scroll', updateProgress, {
      passive: true,
    });

    window.addEventListener('resize', updateProgress);

    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useEffect(() => {
    const element = dialog.current;

    if (!element) {
      return;
    }

    if (modal && !element.open) {
      previousFocus.current = document.activeElement;
      element.showModal();
    } else if (!modal && element.open) {
      element.close();
      previousFocus.current?.focus();
    }
  }, [modal]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied('Email copied — say hello!');
    } catch {
      setCopied(`Copy this address: ${EMAIL}`);
    }
  }

  function closeModal() {
    setModal(null);
  }

  function handleBackdropClick(event) {
    if (event.target !== dialog.current) {
      return;
    }

    const bounds = dialog.current.getBoundingClientRect();

    const outsideDialog =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (outsideDialog) {
      closeModal();
    }
  }

  return (
    <div
      data-theme={theme}
      className="portfolio"
    >
     <ParticleBackground />

      <div
        className="scroll-progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      {/* Header */}
      <header className="site-header">
  <nav className="site-nav" aria-label="Main navigation">
    <a
      href="#home"
      className="site-signature"
      aria-label="Laiba faTima home"
    >
      Laiba faTima
    </a>

    <div className="site-links">
      <a href="#work">Work</a>
      <a href="#overview">Overview</a>
      <a href="#about">About</a>
      <a href="#lab">My lab</a>
    </div>

    <a href="#contact" className="site-contact">
      Say hello ↗
    </a>
  </nav>
</header>

      <main className="shell">
        {/* Introduction */}
        <section
          id="home"
          className="hero grid md:grid-cols-[1.2fr_1fr] gap-12 items-center"
        >
          <div>
            <div className="pill">
              <span
                className="live-dot"
                aria-hidden="true"
              />
              CS student · 5th semester
            </div>

            <p className="intro-label">
              LAIBA FATIMA /{' '}
              <strong>DEVELOPER IN THE MAKING</strong>
            </p>

            <h1>
              Ideas with purpose.
              <br />
              Code with
              <br />
              <span className="hero-accent">
                personality.
              </span>
            </h1>

            <p className="lead">
              A student developer turning ideas into websites,
              chatbot projects, and little experiments.
              Welcome to my corner of the internet.
            </p>

            <div className="flex gap-3 flex-wrap mt-7">
              <a
                href="#work"
                className="button primary"
              >
                Explore my work ↗
              </a>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button"
              >
                GitHub ↗
              </a>
            </div>

            <LiveType motion={motion} />
          </div>

          <DeveloperDesk motion={motion} />
        </section>

        {/* Projects */}
        <ProjectShowcase />

        {/* Interactive overview */}
        <Overview />

        {/* About */}
        <section
          id="about"
          className="grid md:grid-cols-2 gap-10 md:gap-20"
        >
          <div>
            <p className="eyebrow">
              02 / The person behind the projects
            </p>

            <h2>
              Learning out loud.
              <br />
              Building along
              <br />
              <span>the way.</span>
            </h2>

            <div className="about-sticker">
              CS student
              <br />
              <strong>semester 05</strong>
            </div>
          </div>

          <div>
            <p className="about-text">
              I’m Laiba Fatima, a fifth-semester Computer
              Science student working towards a future
              in development.
            </p>

            <p className="muted">
              I’ve built web projects, worked on two chatbot
              projects, coded a text-mode game in C++, and
              prepared SRS documents for college.
              Every project is another chance to learn
              something new.
            </p>

            <p className="muted">
              My experience includes HTML, CSS, Java,
              Python, Django, and C++. I’ve also explored
              TypeScript through AI-assisted projects.
              This portfolio is built with React and
              Tailwind CSS.
            </p>

            <h3 className="mt-7 mb-4">
              My growing toolkit
            </h3>

            <div className="flex gap-2 mb-4">
              {Object.keys(SKILLS).map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`filter ${
                    skill === category ? 'selected' : ''
                  }`}
                  aria-pressed={skill === category}
                  onClick={() => setSkill(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="skills flex flex-wrap gap-3">
              {SKILLS[skill].map((item) => (
                <span key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Academic work */}
        <section id="lab">
          <div className="section-top">
            <div>
              <p className="eyebrow">
                03 / My learning lab
              </p>

              <h2>
                Beyond the browser<span>.</span>
              </h2>
            </div>

            <p>
              College projects, software fundamentals,
              and the next idea on my desk.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <article className="lab-card">
              <div className="terminal">
                <span>laiba@college:~$ ./my-game</span>

                <br />
                <br />

                ╭──────────────────────╮
                <br />
                │ &nbsp; C++ TEXT-MODE GAME &nbsp;│
                <br />
                ╰──────────────────────╯

                <br />
                <br />

                &gt; A game built through code.

                <br />

                <small>
                  Illustration · original preview pending
                </small>
              </div>

              <h3>C++ text-mode game</h3>

              <p>
                A college project programmed in C++ and
                played in text mode. Gameplay, source code,
                and an interactive preview will be added
                after the original files are shared.
              </p>

              <button
                type="button"
                className="detail-button"
                onClick={() =>
                  setModal({
                    name: 'C++ text-mode game',
                    type: 'College project',
                    desc:
                      'A game programmed in C++ using a text-mode interface.',
                    note:
                      'The original code is needed to confirm gameplay and create a faithful preview. The illustration is not a live game.',
                  })
                }
              >
                Game preview info +
              </button>
            </article>

            <article className="lab-card">
              <div className="document-art">
                <span>SOFTWARE ENGINEERING</span>

                <strong>
                  From ideas
                  <br />
                  to requirements.
                </strong>

                <div aria-hidden="true">
                  ▰ ▰ ▰
                  <br />
                  ▰ ▰
                  <br />
                  ▰ ▰ ▰
                </div>
              </div>

              <h3>SRS documents</h3>

              <p>
                Software Requirements Specification documents
                prepared for college coursework. Original
                documents, previews, and GitHub links
                will be added once available.
              </p>

              <button
                type="button"
                className="detail-button"
                onClick={() =>
                  setModal({
                    name: 'SRS documents',
                    type: 'College documentation',
                    desc:
                      'Software requirements documents prepared as part of my college projects.',
                    note:
                      'The original SRS files are needed before document previews, downloads, or repository links can be included.',
                  })
                }
              >
                Document info +
              </button>
            </article>
          </div>

          <article className="current flex flex-col md:flex-row gap-6 justify-between items-start">
            <div>
              <span className="pill">
                <span
                  className="live-dot"
                  aria-hidden="true"
                />
                On my desk right now
              </span>

              <h3>BizPilot AI</h3>

              <p>
                My current development project.
                More details will join this portfolio
                as the work progresses.
              </p>
            </div>

            <div
              className="orbit"
              aria-hidden="true"
            >
              <span>✧</span>
              <div>AI</div>
            </div>
          </article>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="contact"
        >
          <p className="eyebrow">
            04 / Say hello
          </p>

          <h2>
            Your next message
            <br />
            could be <span>a new idea.</span>
          </h2>

          <p>
            Want to talk about development, share a project,
            or connect? I’d love to hear from you.
          </p>

          <div className="flex flex-wrap gap-3 mt-7">
            <a
              className="button primary"
              href={`mailto:${EMAIL}`}
            >
              Email me ↗
            </a>

            <a
              className="button"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>

            <a
              className="button"
              href="tel:+923094931955"
            >
              +92 309 4931955  ↗
            </a>

            <button
              type="button"
              className="button"
              onClick={copyEmail}
            >
              Copy email ⧉
            </button>
          </div>

          <p className="text-sm mt-5">
            {EMAIL}
          </p>

          <p
            className="copy-message"
            role="status"
            aria-live="polite"
          >
            {copied}
          </p>
        </section>

        <StudioFooter />
      </main>

      {/* Academic project popup */}
      <dialog
        ref={dialog}
        aria-label="Project details"
        onCancel={closeModal}
        onClick={handleBackdropClick}
      >
        <button
          type="button"
          className="close-button"
          aria-label="Close project details"
          onClick={closeModal}
        >
          ×
        </button>

        {modal && (
          <>
            <p className="eyebrow">
              {modal.type}
            </p>

            <h2>{modal.name}</h2>

            <p>{modal.desc}</p>

            <div className="modal-note">
              {modal.note}
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href={GITHUB_URL}
                className="button"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub profile ↗
              </a>
            </div>
          </>
        )}
      </dialog>

      <StudioControls />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <App />,
);