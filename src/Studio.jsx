import React, { useState, useEffect, useRef } from "react";
export function Overview() {
  const [tab, setTab] = useState("Overview");
  const [expanded, setExpanded] = useState("Development");
  const groups = {
    Development: ["HTML & CSS", "Python & Django", "Java", "C++"],
    Exploration: [
      "TypeScript through AI-assisted projects",
      "Web applications",
      "Chatbot projects",
    ],
    Coursework: [
      "C++ text-mode game",
      "Software Requirements Specification documents",
      "Computer Science — 5th semester",
    ],
  };
  return (
    <section id="overview" className="overview-section">
      <div className="section-top">
        <div>
          <p className="eyebrow">The full picture / Laiba Fatima</p>
          <h2>
            Curiosity is my
            <br />
            <span>starting point.</span>
          </h2>
        </div>
        <p>
          A snapshot of where I am, what I’ve built, and what I’m learning next.
        </p>
      </div>
      <div
        className="overview-tabs"
        role="tablist"
        aria-label="Profile overview"
      >
        {["Overview", "My toolkit", "My journey"].map((t) => (
          <button
            key={t}
            id={"tab-" + t.replaceAll(" ", "-")}
            role="tab"
            aria-selected={tab === t}
            aria-controls="overview-panel"
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div
        id="overview-panel"
        role="tabpanel"
        aria-labelledby={"tab-" + tab.replaceAll(" ", "-")}
        className="overview-panel"
      >
        {tab === "Overview" ? (
          <div className="overview-grid">
            <div className="identity-panel">
              <span className="identity-monogram">LF</span>
              <div>
                <h3>Laiba Fatima</h3>
                <p>
                  Computer Science student
                  <br />
                  5th semester · Aspiring developer
                </p>
              </div>
              <span className="panel-label">
                Learning through real projects
              </span>
            </div>
            <div className="overview-facts">
              <div>
                <strong>04</strong>
                <span>Live web projects</span>
              </div>
              <div>
                <strong>02</strong>
                <span>Chatbot projects</span>
              </div>
              <div>
                <strong>C++</strong>
                <span>Text-mode college game</span>
              </div>
              <div>
                <strong>SRS</strong>
                <span>College documentation</span>
              </div>
            </div>
            <div className="next-panel">
              <span className="eyebrow">Currently building</span>
              <h3>
                BizPilot AI <span className="live-dot" />
              </h3>
              <p>
                My current project, with more details to share as it develops.
              </p>
              <a href="#lab">Explore my learning lab ↗</a>
            </div>
          </div>
        ) : tab === "My toolkit" ? (
          <div className="toolkit-accordion">
            {Object.entries(groups).map(([name, items]) => (
              <div key={name}>
                <button
                  aria-expanded={expanded === name}
                  onClick={() => setExpanded(expanded === name ? "" : name)}
                >
                  <span>{name}</span>
                  <span>{expanded === name ? "−" : "+"}</span>
                </button>
                {expanded === name && (
                  <div className="accordion-body">
                    {items.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <ol className="journey-line">
            <li>
              <span>01 / Foundations</span>
              <h3>Learning the language of software</h3>
              <p>
                College coursework, C++ programming, Java, and software
                requirements documents.
              </p>
            </li>
            <li>
              <span>02 / Building</span>
              <h3>Taking ideas onto the web</h3>
              <p>
                Four live web projects, two chatbot projects, and hands-on
                exploration of development tools.
              </p>
            </li>
            <li>
              <span>03 / In progress</span>
              <h3>The next chapter: BizPilot AI</h3>
              <p>
                Continuing to build my skills through a new project while
                studying Computer Science.
              </p>
            </li>
          </ol>
        )}
      </div>
    </section>
  );
}
const commands = [
  { label: "Home", hint: "Introduction", id: "home" },
  { label: "Projects", hint: "Four live websites", id: "work" },
  { label: "Overview", hint: "Student profile & experience", id: "overview" },
  { label: "About", hint: "My story & skills", id: "about" },
  { label: "Learning lab", hint: "C++ · SRS · BizPilot AI", id: "lab" },
  { label: "Contact", hint: "Email · GitHub · Phone", id: "contact" },
];
export function StudioControls() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("home");
  const dialog = useRef(null);
  const input = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    const key = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, []);
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
      input.current.focus();
    } else if (dialog.current?.open) {
      dialog.current.close();
      trigger.current?.focus();
      setQuery("");
    }
  }, [open]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-15% 0px -65% 0px" },
    );
    commands.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  function navigate(id) {
    setOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }
  return (
    <>
      <button
        ref={trigger}
        className="command-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open quick navigation"
      >
        <span>⌘</span> Explore <kbd>Ctrl K</kbd>
      </button>
      <aside className="section-rail" aria-label="Section navigation">
        {commands.map((c) => (
          <button
            key={c.id}
            className={active === c.id ? "active" : ""}
            onClick={() => navigate(c.id)}
            aria-label={"Go to " + c.label}
            aria-current={active === c.id ? "location" : undefined}
          >
            <span />
            {c.label}
          </button>
        ))}
      </aside>
      <dialog
        ref={dialog}
        className="command-dialog"
        aria-label="Quick navigation"
        onCancel={() => setOpen(false)}
      >
        <div className="flex justify-between items-center mb-5">
          <p className="eyebrow">Find your way</p>
          <button
            className="close-button"
            onClick={() => setOpen(false)}
            aria-label="Close quick navigation"
          >
            ×
          </button>
        </div>
        <label>
          <span className="sr-only">Search sections</span>
          <input
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Where would you like to go?"
          />
        </label>
        <div className="command-list">
          {commands
            .filter((c) =>
              (c.label + " " + c.hint)
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .map((c) => (
              <button key={c.id} onClick={() => navigate(c.id)}>
                <span>
                  {c.label}
                  <small>{c.hint}</small>
                </span>
                <span>↗</span>
              </button>
            ))}
          {!commands.some((c) =>
            (c.label + " " + c.hint)
              .toLowerCase()
              .includes(query.toLowerCase()),
          ) && <p className="muted">No matching section.</p>}
        </div>
      </dialog>
    </>
  );
}
export function StudioFooter() {
  return (
    <footer className="studio-footer">
      <div className="footer-grid">
        <div>
          <p className="eyebrow">A portfolio in progress</p>
          <a className="footer-signature" href="#home">
            Laiba faTima
          </a>
          <p>
            Computer Science student.
            <br />
            Learning, building, moving forward.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <a href="#work">Selected work ↗</a>
          <a href="#overview">Full overview ↗</a>
          <a href="#lab">Learning lab ↗</a>
        </div>
        <div>
          <h3>Let’s connect</h3>
          <a href="mailto:laiba.829922@gmail.com">laiba.829922@gmail.com</a>
          <a
            href="https://github.com/laiba-829922"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
          <a href="tel:+923094931955">0309 4931955</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Laiba Fatima</span>
        <span>Built with React + Tailwind CSS</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}
