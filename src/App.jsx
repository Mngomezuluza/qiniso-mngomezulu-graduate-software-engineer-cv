import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Link, Navigate, NavLink, Route, Routes, useParams } from 'react-router-dom';
import {
  achievements,
  dashboardCards,
  documents,
  education,
  experience,
  gallerySections,
  highlights,
  impactStats,
  motivationLetter,
  navItems,
  profile,
  projectIntro,
  projects,
  skills,
  softSkills,
  socialLinks,
  staticSite,
  transcriptSnapshot
} from './siteData.js';

const initialForm = {
  fullName: '',
  email: '',
  company: '',
  role: '',
  message: ''
};

function TiltCard({ as: Component = 'div', className = '', children, ...props }) {
  const [style, setStyle] = useState({});
  const mergedStyle = { ...(props.style || {}), ...style };

  const handleMove = (event) => {
    const { currentTarget, clientX, clientY } = event;
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = (0.5 - (y / rect.height)) * 12;

    setStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`,
      '--glow-x': `${x}px`,
      '--glow-y': `${y}px`
    });
  };

  const handleLeave = () => {
    setStyle({});
  };

  return (
    <Component
      className={`tilt-card ${className}`.trim()}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={mergedStyle}
      {...props}
    >
      {children}
    </Component>
  );
}

function HeroCluster() {
  const [style, setStyle] = useState({});

  const handleMove = (event) => {
    const { currentTarget, clientX, clientY } = event;
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const percentX = x / rect.width;
    const percentY = y / rect.height;

    setStyle({
      '--cluster-rotate-x': `${(0.5 - percentY) * 10}deg`,
      '--cluster-rotate-y': `${(percentX - 0.5) * 14}deg`,
      '--cluster-shift-x': `${(percentX - 0.5) * 24}px`,
      '--cluster-shift-y': `${(percentY - 0.5) * 18}px`,
      '--cluster-glow-x': `${x}px`,
      '--cluster-glow-y': `${y}px`
    });
  };

  const handleLeave = () => {
    setStyle({});
  };

  return (
    <div
      className="hero-cluster"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
      aria-label="Feature collage showing Qiniso's academic, leadership, sports, and software engineering journey"
    >
      <div className="hero-cluster-layer cluster-backdrop" aria-hidden="true" />
      <div className="hero-cluster-layer cluster-grid" aria-hidden="true" />
      <div className="hero-cluster-image-wrap">
        <img
          src={`${import.meta.env.BASE_URL}assets/images/cluster-image.webp`}
          alt="Collage featuring Qiniso in formal attire, sports, VR, leadership, and software engineering settings"
        />
      </div>
      <div className="hero-cluster-layer cluster-glow" aria-hidden="true" />
      <div className="hero-cluster-copy">
        <span>Career Story</span>
        <strong>Leadership, Engineering, Resilience</strong>
      </div>
    </div>
  );
}

function readStoredTheme() {
  try {
    return localStorage.getItem('theme');
  } catch {
    return null;
  }
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage can be unavailable (private mode); the choice still applies for this visit.
    }
    setTheme(next);
  };

  // Follow the operating system setting until the visitor picks a theme themselves.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event) => {
      if (readStoredTheme()) return;
      const next = event.matches ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        {isDark ? (
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4.5" />
            <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
          </g>
        ) : (
          <path fill="currentColor" d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" />
        )}
      </svg>
    </button>
  );
}

function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}

const revealSelector = '.reveal-card, .timeline';

// Adds .is-visible to cards and timelines as they scroll into view, including ones
// rendered later (filtered project cards, expanded experience).
function useRevealOnScroll(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const showAll = () => root.querySelectorAll(revealSelector).forEach((el) => el.classList.add('is-visible'));
      showAll();
      const mutations = new MutationObserver(showAll);
      mutations.observe(root, { childList: true, subtree: true });
      return () => mutations.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0 }
    );

    const watch = () =>
      root.querySelectorAll(revealSelector).forEach((el) => {
        if (!el.classList.contains('is-visible')) observer.observe(el);
      });
    watch();
    const mutations = new MutationObserver(watch);
    mutations.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [rootRef]);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers, or the Clipboard API being blocked: fall back to a hidden textarea.
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch {
      copied = false;
    }
    field.remove();
    return copied;
  }
}

// Returns 'idle' | 'copied' | 'failed' and a copy function; the status resets after a moment.
function useCopyStatus(text) {
  const [status, setStatus] = useState('idle');
  const resetTimer = useRef(0);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copy = async () => {
    setStatus((await copyText(text)) ? 'copied' : 'failed');
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus('idle'), 2200);
  };

  return [status, copy];
}

function CopyEmailButton({ email }) {
  const [status, handleCopy] = useCopyStatus(email);
  const label = { idle: 'Copy', copied: 'Copied!', failed: 'Press Ctrl+C' }[status];
  return (
    <button
      type="button"
      className={`copy-button ${status === 'copied' ? 'is-copied' : ''}`}
      onClick={handleCopy}
      aria-label={`Copy email address ${email}`}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        {status === 'copied' ? (
          <path fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" d="m5 12.5 4.5 4.5L19 7.5" />
        ) : (
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <rect x="8" y="8" width="12" height="12" rx="2.5" />
            <path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" />
          </g>
        )}
      </svg>
      <span>{label}</span>
      <span className="visually-hidden" role="status">
        {status === 'copied' ? 'Email address copied to clipboard' : ''}
      </span>
    </button>
  );
}

function CountUp({ value, duration = 1400 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return undefined;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          setDisplay(Math.round(eased * value));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} aria-hidden="true">
      {display}
    </span>
  );
}

function ImpactStats() {
  return (
    <section className="impact-strip" aria-label="At a glance">
      {impactStats.map((stat, index) => (
        <TiltCard
          key={stat.label}
          className="impact-card glass-card reveal-card depth-card"
          style={{ '--reveal-delay': `${index * 90}ms` }}
        >
          <strong className="impact-value">
            <CountUp value={stat.value} />
            <span className="visually-hidden">{stat.value}</span>
          </strong>
          <span className="impact-label">{stat.label}</span>
        </TiltCard>
      ))}
    </section>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <p className="section-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

function PageShell({ className = '', children }) {
  const shellRef = useRef(null);
  useRevealOnScroll(shellRef);

  return (
    <div className={`page-shell ${className}`.trim()} ref={shellRef}>
      <div className="bg-orb bg-orb-left" aria-hidden="true" />
      <div className="bg-orb bg-orb-right" aria-hidden="true" />
      <header className="site-header">
        <div className="shell header-inner">
          <div className="brand-block">
            <p className="brand-kicker">Qiniso Mngomezulu</p>
            <NavLink className="brand-name" to="/">
              Software Engineer Portfolio
            </NavLink>
          </div>
          <nav className="main-nav" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? 'nav-chip active' : 'nav-chip')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <ThemeToggle />
        </div>
        <ScrollProgress />
      </header>
      <main className="page-main shell page-depth-enter">{children}</main>
    </div>
  );
}

function DashboardPage() {
  return (
    <PageShell>
      <section className="nocta-hero-shell">
        <div className="hero-backdrop-panel reveal-card" aria-hidden="true">
          <img src={profile.portrait} alt="" />
          <div className="hero-backdrop-fade" />
        </div>

        <section className="hero-panel nocta-hero-panel">
          <TiltCard className="hero-copy glass-card reveal-card depth-card nocta-copy-card">
            <p className="hero-eyebrow">{profile.headline}</p>
            <h1 className="hero-title">{profile.name}</h1>
            <p className="hero-summary">{profile.summary}</p>
            <div className="hero-meta">
              <span>{profile.location}</span>
              <span>{profile.phone}</span>
              <span className="email-pill">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <CopyEmailButton email={profile.email} />
              </span>
            </div>
            <div className="hero-actions">
              <a className="primary-button" href={`${import.meta.env.BASE_URL}assets/docs/Qiniso_Mngomezulu_CV_ATS.docx`} download>
                Download CV
              </a>
              <NavLink to="/contact" className="secondary-button">
                Contact Qiniso
              </NavLink>
            </div>
            <p className="availability-pill">{profile.availability}</p>
          </TiltCard>

          <TiltCard as="aside" className="hero-spotlight glass-card reveal-card depth-card nocta-spotlight-card">
            <div className="hero-spotlight-frame">
              <HeroCluster />
              <div className="hero-floating-stamp">
                <span>Currently</span>
                <strong>IT Intern · PWD Xperts</strong>
              </div>
            </div>
            <div className="social-stack">
              {socialLinks.map((link) => (
                <a key={link.label} className="social-link" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </TiltCard>
        </section>

        <div className="hero-side-caption reveal-card">
          <p>Built for recruiter review, with clear routing, downloadable credentials, and a richer portfolio narrative.</p>
        </div>
      </section>

      <ImpactStats />

      <section className="dashboard-grid">
        {dashboardCards.map((card, index) => (
          <TiltCard
            key={card.title}
            as={NavLink}
            to={card.to}
            className="dashboard-card reveal-card depth-card"
            style={{ '--reveal-delay': `${index * 110}ms` }}
          >
            <span className="card-index">0{index + 1}</span>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <span className="card-link">Open page <span aria-hidden="true">→</span></span>
          </TiltCard>
        ))}
      </section>

      <section className="dashboard-feature-grid">
        <TiltCard as="article" className="glass-card reveal-card depth-card">
          <h2>What You Can Review Here</h2>
          <ul className="detail-list">
            <li>Detailed project breakdowns with features, build steps, and skills demonstrated</li>
            <li>Downloadable CV and academic documents</li>
            <li>A general letter of motivation, ready to print or copy</li>
            <li>Visual highlights from school, Beyond Adventure, and project work</li>
            <li>{staticSite ? 'A recruiter form that emails contact details and company information' : 'A recruiter form that stores contact details and company information'}</li>
          </ul>
        </TiltCard>
      </section>
    </PageShell>
  );
}

function ExperienceItem({ job }) {
  const [expanded, setExpanded] = useState(false);
  const leadCount = job.leadCount || job.points.length;
  const hiddenCount = job.points.length - leadCount;
  const visiblePoints = expanded ? job.points : job.points.slice(0, leadCount);

  return (
    <div className="timeline-item">
      <p className="timeline-period">{job.period}</p>
      <h3>{job.role}</h3>
      <p className="timeline-institution">{job.company}</p>
      <ul className="detail-list" id={`points-${job.company.replace(/\W+/g, '-')}`}>
        {visiblePoints.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      {hiddenCount > 0 ? (
        <button
          type="button"
          className="text-button"
          aria-expanded={expanded}
          aria-controls={`points-${job.company.replace(/\W+/g, '-')}`}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? 'Show less' : `Show ${hiddenCount} more responsibilities`}
        </button>
      ) : null}
    </div>
  );
}

function AboutPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="About"
        title="Professional summary and story"
        description="A clearer view of technical strengths, academic direction, and the personal journey behind the work."
      />

      <TiltCard as="section" className="glass-card reveal-card depth-card">
        <h2>Experience</h2>
        <div className="timeline">
          {experience.map((job) => (
            <ExperienceItem key={`${job.company}-${job.period}`} job={job} />
          ))}
        </div>
      </TiltCard>

      <section className="content-grid two-column">
        <TiltCard as="article" className="glass-card reveal-card depth-card">
          <h2>Professional Highlights</h2>
          <ul className="detail-list">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </TiltCard>

        <TiltCard as="article" className="glass-card reveal-card depth-card">
          <h2>Technical Skills</h2>
          <div className="skill-groups">
            {skills.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <div className="tag-wrap">
                  {group.items.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TiltCard>
      </section>

      <section className="content-grid two-column">
        <TiltCard as="article" className="glass-card reveal-card depth-card">
          <h2>Soft Skills</h2>
          <div className="tag-wrap">
            {softSkills.map((item) => (
              <span key={item} className="tag tag-strong">
                {item}
              </span>
            ))}
          </div>
        </TiltCard>

        <TiltCard as="article" className="glass-card reveal-card depth-card">
          <h2>Personal Strengths</h2>
          <p>
            My background in team sport, leadership environments, and faith-based values has shaped
            the way I work with people. I try to lead with discipline, respect, humility, and
            responsibility while still staying coachable and focused on continuous improvement.
          </p>
        </TiltCard>
      </section>

      <section className="gallery-section-block">
        {gallerySections.map((section) => (
          <TiltCard key={section.title} as="article" className="glass-card reveal-card depth-card">
            <div className="split-header">
              <div>
                <p className="section-eyebrow">Gallery</p>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>
            </div>
            <div className="gallery-grid">
              {section.images.map((image) => (
                <figure key={image.src} className="gallery-card depth-media">
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </figure>
              ))}
            </div>
          </TiltCard>
        ))}
      </section>
    </PageShell>
  );
}

const projectFilters = ['All', 'Professional', 'Academic'];

function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const visibleProjects = filter === 'All' ? projects : projects.filter((project) => project.category === filter);

  return (
    <PageShell>
      <SectionHeading
        eyebrow="Projects"
        title="Engineering case studies"
        description={projectIntro}
      />

      <div className="filter-bar" role="group" aria-label="Filter projects">
        {projectFilters.map((option) => {
          const count = option === 'All' ? projects.length : projects.filter((project) => project.category === option).length;
          return (
            <button
              key={option}
              type="button"
              className={option === filter ? 'filter-chip active' : 'filter-chip'}
              aria-pressed={option === filter}
              onClick={() => setFilter(option)}
            >
              {option}
              <span className="filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      <section className="project-grid" aria-live="polite">
        {visibleProjects.map((project, index) => (
          <TiltCard
            key={project.slug}
            as={Link}
            to={`/projects/${project.slug}`}
            className="glass-card project-summary-card reveal-card depth-card"
            style={{ '--reveal-delay': `${(index % 2) * 90}ms` }}
          >
            <div className="project-card-top">
              <span className={`category-badge category-${project.category.toLowerCase()}`}>{project.category}</span>
              {project.organisation ? <span className="project-card-org">{project.organisation}</span> : null}
            </div>
            <h2>{project.title}</h2>
            <p className="project-card-summary">{project.summary}</p>
            <div className="tag-wrap">
              {project.tech.slice(0, 5).map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
              {project.tech.length > 5 ? <span className="tag tag-more">+{project.tech.length - 5}</span> : null}
            </div>
            <span className="card-link">View case study <span aria-hidden="true">→</span></span>
          </TiltCard>
        ))}
      </section>
    </PageShell>
  );
}

function ProjectDetailPage() {
  const { slug } = useParams();
  const index = projects.findIndex((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (index === -1) {
    return <Navigate to="/projects" replace />;
  }

  const project = projects[index];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <PageShell>
      <Link to="/projects" className="back-link">
        <span aria-hidden="true">←</span> All projects
      </Link>

      <section className="project-showcase-grid">
        <TiltCard as="article" className="glass-card project-detail-card reveal-card depth-card">
          {project.image ? (
            <div className="project-media depth-media">
              <img src={project.image} alt={`${project.title} related showcase visual`} loading="lazy" />
            </div>
          ) : null}

          <div className="project-body">
            <p className="project-stack">{project.tech.join(' | ')}</p>
            <h1 className="project-detail-title">{project.title}</h1>
            {project.organisation ? <p className="project-organisation">{project.organisation}</p> : null}
            <p className="project-summary">{project.summary}</p>

            {project.purpose ? (
              <div className="project-section-block">
                <h3>Purpose</h3>
                <p>{project.purpose}</p>
              </div>
            ) : null}

            {project.features ? (
              <div className="project-section-block">
                <h3>Key Features</h3>
                <ul className="detail-list">
                  {project.features.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {project.buildSteps ? (
              <div className="project-section-block">
                <h3>How It Was Built</h3>
                <ol className="number-list">
                  {project.buildSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            ) : null}

            <div className="content-grid two-column compact-grid">
              <div className="project-section-block">
                <h3>My Contribution</h3>
                <ul className="detail-list">
                  {project.contribution.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="project-section-block">
                <h3>Skills Demonstrated</h3>
                <div className="tag-wrap">
                  {project.skills.map((item) => (
                    <span key={item} className="tag tag-strong">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="project-section-block">
              <h3>Tech Stack</h3>
              <div className="tag-wrap">
                {project.tech.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {project.github ? (
              <div className="project-actions">
                <a href={project.github} target="_blank" rel="noreferrer" className="primary-button">
                  View on GitHub
                </a>
              </div>
            ) : null}

            {project.gallery ? (
              <div className="project-gallery-row">
                {project.gallery.map((image) => (
                  <figure key={image} className="mini-gallery-card depth-media">
                    <img src={image} alt={`${project.title} supporting visual`} loading="lazy" />
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
        </TiltCard>
      </section>

      <nav className="project-pager" aria-label="More projects">
        <Link to={`/projects/${previous.slug}`} className="pager-link">
          <span>Previous</span>
          <strong>{previous.title}</strong>
        </Link>
        <Link to={`/projects/${next.slug}`} className="pager-link pager-next">
          <span>Next</span>
          <strong>{next.title}</strong>
        </Link>
      </nav>
    </PageShell>
  );
}

function CredentialsPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Credentials"
        title="Documents, education, and proof points"
        description="A clean review space for downloadable files, study history, and supporting milestones."
      />

      <section className="content-grid credentials-layout">
        <TiltCard className="glass-card reveal-card depth-card">
          <h2>Downloads</h2>
          <div className="document-list">
            {documents.map((documentItem) => (
              <a key={documentItem.title} className="document-card" href={documentItem.href} download>
                <div>
                  <p className="document-type">{documentItem.type}</p>
                  <h3>{documentItem.title}</h3>
                  <p>{documentItem.description}</p>
                </div>
                <span>Download</span>
              </a>
            ))}
          </div>
        </TiltCard>

        <div className="stacked-panels">
          <TiltCard as="article" className="glass-card reveal-card depth-card">
            <h2>Education</h2>
            <div className="timeline">
              {education.map((item) => (
                <div key={`${item.institution}-${item.period}`} className="timeline-item">
                  <p className="timeline-period">{item.period}</p>
                  <h3>{item.award}</h3>
                  <p className="timeline-institution">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noreferrer">
                        {item.institution}
                      </a>
                    ) : (
                      item.institution
                    )}
                  </p>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </TiltCard>

          <TiltCard as="article" className="glass-card reveal-card depth-card">
            <h2>Academic Snapshot</h2>
            <div className="tag-wrap">
              {transcriptSnapshot.map((item) => (
                <span key={item} className="tag tag-strong">
                  {item}
                </span>
              ))}
            </div>
            <ul className="detail-list compact">
              {achievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TiltCard>
        </div>
      </section>
    </PageShell>
  );
}

const letterSignOff = [
  profile.name,
  `${profile.phone} | ${profile.email}`,
  `LinkedIn: ${profile.linkedin.replace(/^https:\/\/(www\.)?/, '')}`,
  `Portfolio: ${profile.portfolio.replace(/^https:\/\//, '').replace(/\/$/, '')}`
];

const letterPlainText = [
  motivationLetter.greeting,
  ...motivationLetter.paragraphs,
  [motivationLetter.closing, ...letterSignOff].join('\n')
].join('\n\n');

function CopyLetterButton() {
  const [status, handleCopy] = useCopyStatus(letterPlainText);
  const label = {
    idle: 'Copy letter text',
    copied: 'Copied to clipboard',
    failed: 'Copy failed: select the text instead'
  }[status];

  return (
    <button type="button" className={`secondary-button ${status === 'copied' ? 'is-copied' : ''}`} onClick={handleCopy}>
      {label}
      <span className="visually-hidden" role="status">
        {status === 'copied' ? 'Letter copied to clipboard' : ''}
      </span>
    </button>
  );
}

function MotivationPage() {
  // The page title becomes the suggested file name when the letter is saved as a PDF.
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${profile.name} - Letter of Motivation`;
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <PageShell className="letter-page">
      <SectionHeading
        eyebrow="Motivation"
        title="Letter of motivation"
        description="A general letter about who I am, the work I have done so far, and the kind of role I am looking for."
      />

      <div className="letter-toolbar">
        <button type="button" className="primary-button" onClick={() => window.print()}>
          Print or save as PDF
        </button>
        <CopyLetterButton />
        <Link to="/credentials" className="secondary-button">
          CV and credentials
        </Link>
      </div>

      <article className="glass-card letter-card reveal-card">
        <header className="letter-head">
          <div>
            <p className="letter-name">{profile.name}</p>
            <p className="letter-role">{profile.headline}</p>
          </div>
          <address>
            {profile.location}
            <br />
            <a href={`tel:${profile.phone.replace(/\s+/g, '')}`}>{profile.phone}</a>
            <br />
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </address>
        </header>

        <div className="letter-body">
          <p>{motivationLetter.greeting}</p>
          {motivationLetter.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="letter-closing">{motivationLetter.closing}</p>
          <p className="letter-signature">
            <strong>{profile.name}</strong>
            <br />
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              {letterSignOff[2]}
            </a>
            <br />
            <a href={profile.portfolio} target="_blank" rel="noreferrer">
              {letterSignOff[3]}
            </a>
          </p>
        </div>
      </article>
    </PageShell>
  );
}

function ContactPage() {
  const [formState, setFormState] = useState(initialForm);
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitState({ status: 'idle', message: '' });

    const trimmedValues = Object.fromEntries(
      Object.entries(formState).map(([key, value]) => [key, value.trim()])
    );

    if (!trimmedValues.fullName || !trimmedValues.email || !trimmedValues.company || !trimmedValues.message) {
      setSubmitState({
        status: 'error',
        message: 'Please complete your name, email, company, and message.'
      });
      return;
    }

    if (staticSite) {
      const subject = `CV enquiry from ${trimmedValues.fullName} (${trimmedValues.company})`;
      const body = [
        `Name: ${trimmedValues.fullName}`,
        `Email: ${trimmedValues.email}`,
        `Company: ${trimmedValues.company}`,
        trimmedValues.role ? `Role or team: ${trimmedValues.role}` : null,
        '',
        trimmedValues.message
      ]
        .filter((line) => line !== null)
        .join('\n');

      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSubmitState({
        status: 'success',
        message: 'Your email app should now open with the message ready to send.'
      });
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimmedValues)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to send your message right now.');
      }

      setSubmitState({
        status: 'success',
        message: 'Thank you. Your details have been saved and your message was sent.'
      });
      setFormState(initialForm);
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error.message || 'Something went wrong. Please try again.'
      });
    }
  };

  return (
    <PageShell>
      <SectionHeading
        eyebrow="Contact"
        title="Connect for opportunities"
        description={
          staticSite
            ? 'Recruiters and hiring teams can submit details here, and the form will open an email ready to send.'
            : 'Recruiters and hiring teams can submit details here, and the information will be stored in the database for follow-up.'
        }
      />

      <section className="content-grid contact-layout">
        <TiltCard as="article" className="glass-card reveal-card depth-card">
          <h2>Direct Contact</h2>
          <div className="contact-cards">
            <div className="contact-card contact-card-split">
              <a href={`mailto:${profile.email}`} className="contact-card-link">
                <span>Email</span>
                <strong>{profile.email}</strong>
              </a>
              <CopyEmailButton email={profile.email} />
            </div>
            <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="contact-card">
              <span>Phone</span>
              <strong>{profile.phone}</strong>
            </a>
            <a href={profile.linkedin} className="contact-card" target="_blank" rel="noreferrer">
              <span>LinkedIn</span>
              <strong>View profile</strong>
            </a>
            <a href={profile.github} className="contact-card" target="_blank" rel="noreferrer">
              <span>GitHub</span>
              <strong>Open repositories</strong>
            </a>
            <a href={profile.githubSecondary} className="contact-card" target="_blank" rel="noreferrer">
              <span>GitHub (QinisoMngo)</span>
              <strong>Open repositories</strong>
            </a>
          </div>
        </TiltCard>

        <TiltCard as="form" className="glass-card contact-form reveal-card depth-card" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label>
              Full name
              <input name="fullName" type="text" value={formState.fullName} onChange={handleChange} placeholder="Your full name" />
            </label>
            <label>
              Email address
              <input name="email" type="email" value={formState.email} onChange={handleChange} placeholder="you@company.com" />
            </label>
            <label>
              Company name
              <input name="company" type="text" value={formState.company} onChange={handleChange} placeholder="Company or organisation" />
            </label>
            <label>
              Role or team
              <input name="role" type="text" value={formState.role} onChange={handleChange} placeholder="Recruiter, hiring manager, team lead" />
            </label>
            <label className="full-span">
              Message
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows="5"
                placeholder="Tell me about the role, team, or opportunity."
              />
            </label>
          </div>

          {submitState.message ? (
            <p className={submitState.status === 'success' ? 'form-message success' : 'form-message error'}>
              {submitState.message}
            </p>
          ) : null}

          <button type="submit" className="primary-button">
            {staticSite ? 'Send message by email' : 'Save and send message'}
          </button>
        </TiltCard>
      </section>
    </PageShell>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/credentials" element={<CredentialsPage />} />
        <Route path="/motivation" element={<MotivationPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
