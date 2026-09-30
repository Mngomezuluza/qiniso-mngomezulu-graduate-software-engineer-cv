import { useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import {
  achievements,
  dashboardCards,
  documents,
  education,
  experience,
  gallerySections,
  highlights,
  navItems,
  profile,
  projectIntro,
  projects,
  skills,
  softSkills,
  socialLinks,
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
          src="/assets/images/cluster-image.png"
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

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <p className="section-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

function PageShell({ children }) {
  return (
    <div className="page-shell">
      <div className="bg-orb bg-orb-left" aria-hidden="true" />
      <div className="bg-orb bg-orb-right" aria-hidden="true" />
      <header className="site-header">
        <div className="shell header-inner">
          <div>
            <p className="brand-kicker">Qiniso Mngomezulu</p>
            <NavLink className="brand-name" to="/">
              Graduate Software Engineer CV
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
        </div>
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
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <div className="hero-actions">
              <a className="primary-button" href="/assets/docs/Qiniso_Mngomezulu_CV_ATS.docx" download>
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
                <span>Graduate</span>
                <strong>Software Engineer</strong>
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

      <section className="dashboard-grid">
        {dashboardCards.map((card, index) => (
          <TiltCard
            key={card.title}
            as={NavLink}
            to={card.to}
            className="dashboard-card reveal-card depth-card"
            style={{ animationDelay: `${index * 110}ms` }}
          >
            <span className="card-index">0{index + 1}</span>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <span className="card-link">Open page</span>
          </TiltCard>
        ))}
      </section>

      <section className="dashboard-feature-grid">
        <TiltCard as="article" className="glass-card reveal-card depth-card">
          <h2>What You Can Review Here</h2>
          <ul className="detail-list">
            <li>Detailed project breakdowns with features, build steps, and skills demonstrated</li>
            <li>Downloadable CV and academic documents</li>
            <li>Visual highlights from school, Beyond Adventure, and project work</li>
            <li>A recruiter form that stores contact details and company information</li>
          </ul>
        </TiltCard>
      </section>
    </PageShell>
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
            <div key={`${job.company}-${job.period}`} className="timeline-item">
              <p className="timeline-period">{job.period}</p>
              <h3>{job.role}</h3>
              <p className="timeline-institution">{job.company}</p>
              <ul className="detail-list">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
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

function ProjectsPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Projects"
        title="Engineering case studies"
        description={projectIntro}
      />

      <section className="project-showcase-grid">
        {projects.map((project) => (
          <TiltCard key={project.title} as="article" className="glass-card project-detail-card reveal-card depth-card">
            {project.image ? (
              <div className="project-media depth-media">
                <img src={project.image} alt={`${project.title} related showcase visual`} loading="lazy" />
              </div>
            ) : null}

            <div className="project-body">
              <p className="project-stack">{project.tech.join(' | ')}</p>
              <h2>{project.title}</h2>
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
        ))}
      </section>
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
        description="Recruiters and hiring teams can submit details here, and the information will be stored in the database for follow-up."
      />

      <section className="content-grid contact-layout">
        <TiltCard as="article" className="glass-card reveal-card depth-card">
          <h2>Direct Contact</h2>
          <div className="contact-cards">
            <a href={`mailto:${profile.email}`} className="contact-card">
              <span>Email</span>
              <strong>{profile.email}</strong>
            </a>
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
            Save and send message
          </button>
        </TiltCard>
      </section>
    </PageShell>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/credentials" element={<CredentialsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
