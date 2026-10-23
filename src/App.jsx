import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  ChevronUp,
  ClipboardCheck,
  Compass,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  PenTool,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import {
  credentials,
  experience,
  expertise,
  navLinks,
  organizations,
  profile,
  projectFilters,
  projects,
  tools,
} from './data'

const expertiseIcons = [Briefcase, ShieldCheck, PenTool]
const credentialIcons = [BadgeCheck, ShieldCheck, PenTool]
const toolIcons = [PenTool, FileText, ClipboardCheck]

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )

    nodes.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [])
}

function useActiveSection() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const updateActiveSection = () => {
      const marker = window.scrollY + 160
      let current = ''

      if (window.scrollY >= 120) navLinks.forEach((link) => {
        const section = document.querySelector(link.href)
        if (section && section.offsetTop <= marker) {
          current = link.href.slice(1)
        }
      })

      setActiveSection(current)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  return activeSection
}

function SectionLabel({ children }) {
  return (
    <span className="eyebrow">
      <span className="eyebrow-dot" aria-hidden="true" />
      {children}
    </span>
  )
}

function SectionHeader({ eyebrow, title, description, aside, className = '' }) {
  return (
    <div className={`section-head reveal ${className}`.trim()}>
      <div className="section-head-copy">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {aside ? <div className="section-head-aside">{aside}</div> : null}
    </div>
  )
}

function Header({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [clickedSection, setClickedSection] = useState('')

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 820) setMenuOpen(false)
    }
    window.addEventListener('resize', closeOnResize)
    return () => window.removeEventListener('resize', closeOnResize)
  }, [])

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#home" aria-label="Insan Fadillah home">
          <span className="brand-mark">A</span>
          <span>Insan Fadillah</span>
        </a>

        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className={`nav-link ${activeSection === link.href.slice(1) || (!activeSection && clickedSection === link.href.slice(1)) ? 'is-active' : ''}`}
              href={link.href}
              onClick={() => {
                setClickedSection(link.href.slice(1))
                setMenuOpen(false)
              }}
            >
              {link.label}
            </a>
          ))}
          <a className="button button--small button--primary nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
            Let&apos;s Talk
            <ArrowUpRight size={15} />
          </a>
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}

function Portrait() {
  return (
    <div className="hero-visual reveal">
      <div className="portrait-aura" aria-hidden="true" />
      <div className="portrait-ring portrait-ring--outer" aria-hidden="true" />
      <div className="portrait-ring portrait-ring--inner" aria-hidden="true" />
      <div className="portrait-frame">
          <img
          src="/images/portrait.jpeg"
          alt="Portrait of Insan Fadillah Azzahra"
        />
      </div>
    </div>
  )
}

function Hero() {
  const fullName = `${profile.firstName} ${profile.lastName}`
  const [typedCharacters, setTypedCharacters] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedCharacters(fullName.length)
      return undefined
    }

    let count = 0
    const timer = window.setInterval(() => {
      count += 1
      setTypedCharacters(count)
      if (count >= fullName.length) window.clearInterval(timer)
    }, 72)

    return () => window.clearInterval(timer)
  }, [fullName])

  return (
    <section className="hero section-shell" id="home">
      <div className="hero-copy reveal">
        <p className="hero-hello">Hello, I&apos;m</p>
        <h1 className="hero-name" aria-label={fullName}>
          <span aria-hidden="true">
            {profile.firstName.slice(0, typedCharacters)}
            {typedCharacters <= profile.firstName.length ? <i className="typing-cursor" /> : null}
          </span>
          <span aria-hidden="true">
            {profile.lastName.slice(0, Math.max(0, typedCharacters - profile.firstName.length - 1))}
            {typedCharacters > profile.firstName.length && typedCharacters < fullName.length ? <i className="typing-cursor" /> : null}
          </span>
        </h1>
        <h2 className="hero-role">{profile.role}</h2>
        <p className="hero-specialties">
          Interested in Business Analysis, Data Analytics,
          <br className="desktop-break" /> Quality Assurance &amp; System Analysis
        </p>
        <p className="hero-description">
          An Information Systems student at Satu University with a keen interest in information
          technology, business analysis, data analytics, and quality assurance. Experienced in
          system development, UI/UX design, software testing, and project management.
        </p>
        <div className="hero-actions">
          <a className="button button--primary" href="#contact">
            Let&apos;s Connect
            <ArrowUpRight size={17} />
          </a>
          <a className="button button--ghost" href="/Insan-Fadillah-Azzahra-CV.pdf" download>
            <Download size={16} />
            Download CV
          </a>
        </div>
        <div className="hero-footnote">
          <span>
            <MapPin size={14} />
            Based in Indonesia
          </span>
          <span className="hero-footnote-divider" aria-hidden="true" />
          <span>Available for remote collaboration</span>
        </div>
      </div>
      <Portrait />
    </section>
  )
}

function Highlights() {
  const items = [
    { icon: GraduationCap, title: 'Information Systems Student', detail: 'Building a better future through technology' },
    { icon: PenTool, title: 'UI/UX Developer', detail: 'Design · Prototype · Test' },
    { icon: Lightbulb, title: 'Passionate Learner', detail: 'Always exploring new skills' },
    { icon: Sparkles, title: 'Open for Opportunities', detail: 'Internship · Project · Collaboration' },
  ]

  return (
    <section className="highlights section-shell" aria-label="At a glance">
      {items.map(({ icon: Icon, title, detail }) => (
        <div className="highlight-item" key={title}>
          <span className="highlight-icon"><Icon size={17} /></span>
          <span><strong>{title}</strong><small>{detail}</small></span>
        </div>
      ))}
    </section>
  )
}

function About() {
  return (
    <section className="section section-shell about" id="about">
      <SectionHeader eyebrow="About & Education" title="About Me & Education" />
      <div className="about-grid">
        <article className="about-card about-card--mission reveal">
          <div className="card-topline">
            <span className="icon-badge icon-badge--coral">
              <Compass size={22} strokeWidth={1.8} />
            </span>
            <span className="card-index">01</span>
          </div>
          <h3>Dedication and Career Orientation</h3>
          <p>
            I am focused on building a career in Business Analysis, Data Analytics, and Quality
            Assurance. I turn complex needs into clear, structured solutions — bridging business
            goals, technology, and user experience to deliver measurable impact.
          </p>
          <div className="tag-row">
            <span className="tag">Business Analysis</span>
            <span className="tag">Data Analytics</span>
            <span className="tag">Quality Assurance</span>
          </div>
          <a className="text-link" href="#expertise">
            Explore my approach
            <ArrowRight size={15} />
          </a>
        </article>

        <article className="about-card about-card--education reveal">
          <div className="card-topline">
            <span className="icon-badge icon-badge--cream">
              <GraduationCap size={22} strokeWidth={1.8} />
            </span>
            <span className="date-badge">2022 — 2026</span>
          </div>
          <p className="education-label">Bachelor&apos;s Degree</p>
          <h3>Satu University</h3>
          <p className="education-major">Information Systems</p>
          <p>
            Currently pursuing a degree in Information Systems, with a strong foundation in
            database management, business process modeling, UI/UX design, and software testing.
            Actively involved in academic projects and organizational activities.
          </p>
          <div className="education-meta">
            <span>
              <MapPin size={14} />
              Indonesia
            </span>
            <span className="education-status">
              <span className="status-dot" aria-hidden="true" />
              In progress
            </span>
          </div>
          <a className="text-link" href="#projects">
            View campus projects
            <ArrowUpRight size={15} />
          </a>
        </article>
      </div>
    </section>
  )
}

function ProjectPreview({ variant }) {
  if (variant === 'village') {
    return (
      <div className="preview preview--village" aria-hidden="true">
        <div className="preview-browser">
          <span />
          <span />
          <span />
          <em>village.bansu.id</em>
        </div>
        <div className="village-canvas">
          <div className="mini-nav">
            <span className="mini-brand">
              BANS<em>U</em>
            </span>
            <div className="mini-nav-links">
              <i />
              <i />
              <i />
              <i />
            </div>
            <span className="mini-cta">Sign in</span>
          </div>
          <div className="village-hero">
            <div className="village-copy">
              <span className="mini-eyebrow">VILLAGE INFORMATION</span>
              <strong>
                News, services
                <br />
                &amp; community
                <br />
                <em>in one place.</em>
              </strong>
              <div className="mini-copy-lines">
                <i />
                <i />
              </div>
              <span className="mini-button">Latest updates</span>
            </div>
            <div className="village-art">
              <span className="village-sun" />
              <span className="village-hill village-hill--one" />
              <span className="village-hill village-hill--two" />
              <span className="village-hut" />
              <div className="announcement-card">
                <span>Latest announcement</span>
                <strong>Community clean-up day</strong>
                <i />
                <i />
              </div>
            </div>
          </div>
          <div className="village-stats">
            <div>
              <strong>24</strong>
              <span>Announcements</span>
            </div>
            <div>
              <strong>12</strong>
              <span>Public services</span>
            </div>
            <div>
              <strong>08</strong>
              <span>Community events</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'system') {
    return (
      <div className="preview preview--system" aria-hidden="true">
        <div className="preview-browser">
          <span />
          <span />
          <span />
          <em>workspace.internal</em>
        </div>
        <div className="system-canvas">
          <aside className="system-sidebar">
            <span className="system-logo">N</span>
            <div className="system-nav">
              <span className="is-active" />
              <span />
              <span />
              <span />
              <span />
            </div>
            <span className="system-avatar">AF</span>
          </aside>
          <div className="system-main">
            <div className="system-topbar">
              <div>
                <span className="system-kicker">WORKSPACE</span>
                <strong>Good morning, Alya</strong>
              </div>
              <div className="system-top-actions">
                <span />
                <span />
              </div>
            </div>
            <div className="system-metrics">
              <div>
                <span>Active tasks</span>
                <strong>28</strong>
                <em>+12%</em>
              </div>
              <div>
                <span>In review</span>
                <strong>09</strong>
                <em>+4%</em>
              </div>
              <div>
                <span>Completed</span>
                <strong>64</strong>
                <em>+18%</em>
              </div>
            </div>
            <div className="system-panels">
              <div className="system-chart">
                <div className="system-panel-head">
                  <span>Team progress</span>
                  <em>This week</em>
                </div>
                <div className="chart-bars">
                  {[44, 64, 52, 78, 68, 92, 71, 84, 58, 96, 76, 88].map((height, index) => (
                    <i key={index} style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
              <div className="system-tasklist">
                <div className="system-panel-head">
                  <span>Today&apos;s focus</span>
                  <em>View all</em>
                </div>
                {[0, 1, 2].map((item) => (
                  <div className="task-row" key={item}>
                    <span className={item === 0 ? 'task-check is-done' : 'task-check'}>
                      {item === 0 ? <Check size={8} /> : null}
                    </span>
                    <span>
                      <i />
                      <i />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="system-table">
              <div className="system-panel-head">
                <span>Project overview</span>
                <em>Filter</em>
              </div>
              {[0, 1, 2].map((row) => (
                <div className="system-table-row" key={row}>
                  <span>{['Product redesign', 'QA automation', 'User research'][row]}</span>
                  <i />
                  <i />
                  <em className={row === 0 ? 'status-good' : ''}>
                    {['On track', 'In review', 'Planning'][row]}
                  </em>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="preview preview--quality" aria-hidden="true">
      <div className="preview-browser">
        <span />
        <span />
        <span />
        <em>qa.dashboard/release</em>
      </div>
      <div className="quality-canvas">
        <div className="quality-topbar">
          <div>
            <span className="quality-kicker">QUALITY ASSURANCE</span>
            <strong>Release overview</strong>
          </div>
          <div className="quality-actions">
            <span>May 2025</span>
            <em>Export report</em>
          </div>
        </div>
        <div className="quality-metrics">
          <div>
            <span className="quality-ring quality-ring--one">
              <em>92%</em>
            </span>
            <span>Test coverage</span>
          </div>
          <div>
            <span className="quality-ring quality-ring--two">
              <em>108</em>
            </span>
            <span>Tests passed</span>
          </div>
          <div>
            <span className="quality-ring quality-ring--three">
              <em>07</em>
            </span>
            <span>Open defects</span>
          </div>
        </div>
        <div className="quality-body">
          <div className="quality-chart">
            <div className="quality-panel-head">
              <span>Test execution</span>
              <em>Last 7 days</em>
            </div>
            <div className="quality-bars">
              {[44, 66, 54, 82, 70, 88, 76, 96, 84].map((height, index) => (
                <span key={index}>
                  <i style={{ height: `${height}%` }} />
                </span>
              ))}
            </div>
            <div className="quality-legend">
              <span>
                <i /> Passed
              </span>
              <span>
                <i /> Failed
              </span>
              <span>
                <i /> Blocked
              </span>
            </div>
          </div>
          <div className="quality-defects">
            <div className="quality-panel-head">
              <span>Recent defects</span>
              <em>View all</em>
            </div>
            {[0, 1, 2].map((item) => (
              <div className="defect-row" key={item}>
                <span className={`severity severity--${item}`} />
                <span>
                  <strong>{['Login redirect loop', 'Missing empty state', 'Date filter overflow'][item]}</strong>
                  <em>{['High', 'Medium', 'Low'][item]} priority</em>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="quality-footer">
          <span>
            <i /> Regression suite completed
          </span>
          <em>Last updated 2 min ago</em>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, onOpen, index }) {
  return (
    <article className="project-card" style={{ '--card-index': index }}>
      <div className="project-media">
        <ProjectPreview variant={project.preview} />
        <span className="project-category">{project.category}</span>
      </div>
      <div className="project-content">
        <div className="project-meta">
          <span>{project.year}</span>
          <span className="meta-separator" aria-hidden="true" />
          <span>{project.role}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="tag-row">
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <button className="project-link" type="button" onClick={() => onOpen(project)}>
          Case Study Preview
          <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close case study">
          <X size={19} />
        </button>
        <div className="modal-preview">
          <ProjectPreview variant={project.preview} />
        </div>
        <div className="modal-content">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            {project.category}
          </span>
          <h2 id="project-modal-title">{project.title}</h2>
          <p className="modal-summary">{project.description}</p>
          <div className="modal-meta">
            <div>
              <span>Year</span>
              <strong>{project.year}</strong>
            </div>
            <div>
              <span>Role</span>
              <strong>{project.role}</strong>
            </div>
          </div>
          <div className="modal-section">
            <h3>What I did</h3>
            <ul className="check-list">
              {project.highlights.map((item) => (
                <li key={item}>
                  <span>
                    <Check size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-section">
            <h3>Tools & methods</h3>
            <div className="tag-row">
              {project.tools.map((tool) => (
                <span className="tag" key={tool}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <a className="button button--primary modal-cta" href="#contact" onClick={onClose}>
            Discuss a similar project
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects =
    activeFilter === 'all' ? projects : projects.filter((project) => project.filter === activeFilter)

  return (
    <section className="section section-shell projects" id="projects">
      <SectionHeader
        eyebrow="Projects & Case Studies"
        title="Selected Case Studies & Projects"
        aside={
          <div className="filter-group" role="group" aria-label="Filter projects">
            {projectFilters.map((filter) => (
              <button
                className={`filter-button ${activeFilter === filter.id ? 'is-active' : ''}`}
                type="button"
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={activeFilter === filter.id}
              >
                {filter.label}
              </button>
            ))}
          </div>
        }
      />
      <div className="project-grid">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            project={project}
            key={project.id}
            index={index}
            onOpen={setSelectedProject}
          />
        ))}
      </div>
      <div className="current-strip reveal">
        <div className="current-copy">
          <span className="pulse-dot" aria-hidden="true" />
          <span>
            Currently working on <strong>Business Analysis &amp; Data Analytics research</strong>
          </span>
        </div>
        <span className="availability-pill">
          <Sparkles size={14} />
          Available for collaboration
        </span>
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}

function Expertise() {
  return (
    <section className="section section-shell expertise" id="expertise">
      <SectionHeader
        eyebrow="Expertise & Methodology"
        title="Expertise & Work Methodology"
        description="I combine analytical thinking, structured delivery, and user-centered design to turn complex problems into practical solutions."
      />
      <div className="expertise-grid">
        {expertise.map((item, index) => {
          const Icon = expertiseIcons[index]
          return (
            <article className={`expertise-card expertise-card--${item.tone} reveal`} key={item.title}>
              <div className="expertise-top">
                <span className="expertise-icon">
                  <Icon size={21} strokeWidth={1.8} />
                </span>
                <span className="expertise-number">{item.number}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul className="skill-list">
                {item.skills.map((skill) => (
                  <li key={skill}>
                    <span aria-hidden="true" />
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
      <div className="toolbelt reveal">
        <div className="toolbelt-head">
          <SectionLabel>Tools I Use</SectionLabel>
          <p>A practical toolkit for analysis, design, testing, and delivery.</p>
        </div>
        <div className="tools-grid">
          {tools.map((group, index) => {
            const Icon = toolIcons[index]
            return (
              <div className="tool-group" key={group.title}>
                <span className="tool-icon">
                  <Icon size={18} strokeWidth={1.8} />
                </span>
                <div>
                  <h3>{group.title}</h3>
                  <div className="tool-chips">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="toolbelt-note">
          <Lightbulb size={17} />
          <p>
            I believe the best solutions sit at the intersection of <strong>structure</strong>,{' '}
            <strong>empathy</strong>, and <strong>measurable impact</strong>.
          </p>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section section-shell experience" id="experience">
      <SectionHeader
        eyebrow="Experience"
        title="Professional Experience & Organizations"
        aside={
          <a className="button button--ghost button--small" href="/Insan-Fadillah-Azzahra-CV.pdf" download>
            <Download size={15} />
            Download Resume
          </a>
        }
      />
      <div className="timeline">
        {experience.map((item) => (
          <article className="timeline-item reveal" key={`${item.role}-${item.company}`}>
            <span className="timeline-marker" aria-hidden="true">
              <span />
            </span>
            <div className="timeline-content">
              <div className="timeline-heading">
                <div>
                  <span className="timeline-company">{item.company}</span>
                  <h3>{item.role}</h3>
                </div>
                <span className="timeline-date">
                  <CalendarDays size={13} />
                  {item.date}
                </span>
              </div>
              <p className="timeline-location">
                <MapPin size={13} />
                {item.location}
                <span aria-hidden="true">·</span>
                {item.type}
              </p>
              <p className="timeline-description">{item.description}</p>
              <ul className="timeline-achievements">
                {item.achievements.map((achievement) => (
                  <li key={achievement}>
                    <Check size={12} />
                    {achievement}
                  </li>
                ))}
              </ul>
              <div className="tag-row">
                {item.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="organization-block reveal">
        <div className="organization-head">
          <SectionLabel>Organizational Experience</SectionLabel>
          <p>Leadership, collaboration, and community impact beyond the classroom.</p>
        </div>
        <div className="organization-grid">
          {organizations.map((item, index) => (
            <article className="organization-card" key={item.organization}>
              <div className="organization-icon">
                {index === 0 ? <Users size={20} /> : <Building2 size={20} />}
              </div>
              <div className="organization-content">
                <span className="organization-date">{item.date}</span>
                <h3>{item.organization}</h3>
                <p className="organization-role">{item.role}</p>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Credentials() {
  return (
    <section className="section section-shell credentials" id="credentials">
      <SectionHeader
        eyebrow="Certifications & Training"
        title="Certifications, Training & Seminars"
        description="A selection of learning experiences that support my growth in business analysis, quality assurance, and product design."
        aside={<span className="credential-filter">All credentials</span>}
      />
      <div className="credential-grid">
        {credentials.map((item, index) => {
          const Icon = credentialIcons[index]
          return (
            <a
              className="credential-card reveal"
              href={item.url}
              target="_blank"
              rel="noreferrer"
              key={item.title}
              aria-label={`${item.title} by ${item.issuer}`}
            >
              <div className="credential-top">
                <span className="credential-icon">
                  <Icon size={21} strokeWidth={1.8} />
                </span>
                <ExternalLink size={15} className="credential-arrow" />
              </div>
              <span className="credential-category">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="tag-row">
                {item.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="credential-footer">
                <span>{item.issuer}</span>
                <span>{item.date}</span>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    if (status !== 'idle') setStatus('idle')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Portofolio inquiry from ${form.name}`)
    const body = encodeURIComponent(
      `${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`,
    )
    setStatus('opening')
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-head">
        <span className="eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          Send a message
        </span>
        <p>Tell me a little about your idea, project, or opportunity.</p>
      </div>
      <div className="form-row">
        <label className="field">
          <span>Name</span>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />
        </label>
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
        </label>
      </div>
      <label className="field">
        <span>Message</span>
        <textarea
          name="message"
          placeholder="I'd love to hear about what you're working on..."
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
        />
      </label>
      <button className="button button--primary form-submit" type="submit">
        {status === 'opening' ? 'Opening your email app…' : 'Send Message'}
        <Send size={16} />
      </button>
      <p className="form-note">
        {status === 'opening'
          ? 'Your email app should open with the message ready to send.'
          : 'Your details are only used to reply to your message.'}
      </p>
    </form>
  )
}

function Contact() {
  return (
    <section className="section section-shell contact" id="contact">
      <div className="contact-shell reveal">
        <div className="contact-copy">
          <SectionLabel>Contact</SectionLabel>
          <h2>
            Have an Idea, Collaboration or <em>Career Opportunity?</em>
          </h2>
          <p>
            Let&apos;s connect and build something meaningful. I&apos;m open to opportunities in
            business analysis, quality assurance, data analytics, and product design.
          </p>
          <div className="contact-links">
            <a className="contact-link" href={`mailto:${profile.email}`}>
              <span className="contact-link-icon">
                <Mail size={19} />
              </span>
              <span>
                <em>Email</em>
                <strong>{profile.email}</strong>
              </span>
              <ArrowUpRight size={16} className="contact-link-arrow" />
            </a>
            <a
              className="contact-link"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-link-icon">
                <Linkedin size={19} />
              </span>
              <span>
                <em>LinkedIn</em>
                <strong>{profile.linkedinLabel}</strong>
              </span>
              <ArrowUpRight size={16} className="contact-link-arrow" />
            </a>
          </div>
          <div className="contact-location">
            <MapPin size={14} />
            Based in Indonesia
            <span aria-hidden="true">·</span>
            Open to remote opportunities
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-top">
        <div className="footer-brand">
          <a className="brand" href="#home">
            <span className="brand-mark">A</span>
            <span>Insan Fadillah</span>
          </a>
          <p>
            {profile.name}
            <br />
            Information Systems Student &amp; Product Enthusiast
          </p>
        </div>
        <div className="footer-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 {profile.name}. All rights reserved.</p>
        <div className="footer-meta">
          <span>Designed with intention &amp; curiosity</span>
          <a className="back-to-top" href="#home" aria-label="Back to top">
            <ChevronUp size={16} />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}

function App() {
  useReveal()
  const activeSection = useActiveSection()
  const [loaderState, setLoaderState] = useState('loading')

  useEffect(() => {
    document.body.classList.add('is-loading')
    const leaveTimer = window.setTimeout(() => setLoaderState('leaving'), 760)
    const finishTimer = window.setTimeout(() => {
      setLoaderState('done')
      document.body.classList.remove('is-loading')
    }, 1160)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(finishTimer)
      document.body.classList.remove('is-loading')
    }
  }, [])

  return (
    <div className="app">
      {loaderState !== 'done' ? (
        <div className={`page-loader ${loaderState === 'leaving' ? 'is-leaving' : ''}`} role="status" aria-live="polite">
          <div className="loader-brand">
            <span className="brand-mark">A</span>
            <span>Insan Fadillah</span>
          </div>
          <p>Menyiapkan portofolio</p>
          <span className="loader-track"><span /></span>
        </div>
      ) : null}
      <div className="ambient" aria-hidden="true">
        <span className="ambient-blob ambient-blob--one" />
        <span className="ambient-blob ambient-blob--two" />
        <span className="ambient-blob ambient-blob--three" />
        <span className="ambient-grain" />
      </div>
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <Highlights />
        <Projects />
        <Expertise />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
