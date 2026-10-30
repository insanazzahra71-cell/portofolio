import { useEffect, useRef, useState } from 'react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
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
  learningNow,
  navLinks,
  organizations,
  profile,
  projectFilters,
  projects,
  skills,
  softSkills,
  tools,
} from './data'

const expertiseIcons = [Briefcase, ShieldCheck, PenTool]
const credentialIcons = [BadgeCheck, ShieldCheck, PenTool]
const toolIcons = [PenTool, FileText, ClipboardCheck]
const skillIcons = [Briefcase, ShieldCheck, PenTool, BarChart3]

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getScrollOffset() {
  const header = document.querySelector('.site-header')
  return (header ? header.getBoundingClientRect().height : 66) + 18
}

function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId)
  if (!target) return false

  const top = target.getBoundingClientRect().top + window.scrollY - getScrollOffset()
  window.scrollTo({
    top: Math.max(Math.round(top), 0),
    left: 0,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
  return true
}

function AnchorLink({ href, children, onNavigate, ...rest }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleClick = (event) => {
    if (onNavigate) onNavigate()

    if (!href.startsWith('#')) return
    const sectionId = href.slice(1)
    if (!sectionId) return

    event.preventDefault()

    if (window.location.hash === href) {
      scrollToSection(sectionId)
      return
    }

    navigate(`${pathname}${href}`)
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}

function SectionNavLink({ to, children, className, onClick, ...rest }) {
  const { pathname, hash } = useLocation()

  const handleClick = (event) => {
    if (onClick) onClick()

    if (!to.includes('#')) return
    const [path, targetHash] = to.split('#')

    // React Router will not re-scroll when the URL is already identical,
    // so handle a repeated click on the same section manually.
    if ((path || '/') === pathname && `#${targetHash}` === hash) {
      event.preventDefault()
      scrollToSection(targetHash)
    }
  }

  return (
    <Link to={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
}

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
    let frame = 0

    const updateActiveSection = () => {
      frame = 0

      const sections = navLinks
        .filter((link) => link.href.includes('#'))
        .map((link) => {
          const id = link.href.split('#')[1]
          return { id, element: document.getElementById(id) }
        })
        .filter((item) => item.element)

      if (!sections.length) return

      const scrollY = window.scrollY
      const marker = getScrollOffset() + 60
      let current = ''

      if (scrollY >= 120) {
        sections.forEach(({ id, element }) => {
          if (element.getBoundingClientRect().top <= marker) current = id
        })
      }

      const atBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) current = sections[sections.length - 1].id

      setActiveSection(current)
    }

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
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

function Header({ activeSection, isAboutPage = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 940) setMenuOpen(false)
    }
    window.addEventListener('resize', closeOnResize)
    return () => window.removeEventListener('resize', closeOnResize)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname, hash])

  useEffect(() => {
    if (!menuOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Insan Fadillah home">
          <span className="brand-mark">A</span>
          <span>Insan Fadillah</span>
        </Link>

        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navLinks.map((link) => {
            const isHash = link.href.includes('#')
            const sectionId = isHash ? link.href.split('#')[1] : ''
            const isActive = isAboutPage
              ? link.href === '/about'
              : link.href === '/'
                ? activeSection === ''
                : isHash && activeSection === sectionId
            return (
              <SectionNavLink
                key={link.href}
                className={`nav-link ${isActive ? 'is-active' : ''}`}
                to={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </SectionNavLink>
            )
          })}
          <SectionNavLink className="button button--small button--primary nav-cta" to="/#contact" onClick={() => setMenuOpen(false)}>
            Let&apos;s Talk
            <ArrowUpRight size={15} />
          </SectionNavLink>
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
          <AnchorLink className="button button--primary" href="#contact">
            Let&apos;s Connect
            <ArrowUpRight size={17} />
          </AnchorLink>
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
  const aboutHighlights = [
    { icon: Briefcase, label: 'Focus', value: 'Business Analysis, QA & Data Analytics' },
    { icon: Users, label: 'Approach', value: 'User-Centered & Data-Driven' },
    { icon: Lightbulb, label: 'Mindset', value: 'Detail-Oriented Problem Solver' },
  ]

  return (
    <section className="section section-shell about" id="about">
      <SectionHeader
        eyebrow="About Me"
        title="Bridging Business, Data & User Experience"
        description="A blend of analytical thinking, structured delivery, and empathetic design to turn complex challenges into practical, impactful solutions."
      />
      <div className="about-intro-grid">
        <article className="about-profile-card reveal">
          <div className="about-profile-header">
            <div className="about-profile-avatar">
              <img src="/images/portrait.jpeg" alt="Portrait of Insan Fadillah Azzahra" />
            </div>
            <div className="about-profile-info">
              <h3>{profile.name}</h3>
              <p>{profile.role}</p>
              <div className="about-profile-meta">
                <span>
                  <MapPin size={14} />
                  {profile.location}
                </span>
                <span className="about-profile-pill">
                  <span className="status-dot" aria-hidden="true" />
                  {profile.availability}
                </span>
              </div>
            </div>
          </div>
          <p className="about-profile-bio">
            I&apos;m an Information Systems student at Satu University who enjoys connecting business needs
            with practical tech solutions. With hands-on experience in UI/UX design, software quality
            assurance, and project coordination, I focus on clarity, structure, and measurable outcomes.
          </p>
          <div className="about-highlight-row">
            {aboutHighlights.map(({ icon: Icon, label, value }) => (
              <div className="about-highlight-item" key={label}>
                <span className="about-highlight-icon">
                  <Icon size={16} />
                </span>
                <div>
                  <span className="about-highlight-label">{label}</span>
                  <strong className="about-highlight-value">{value}</strong>
                </div>
              </div>
            ))}
          </div>
          <div className="about-profile-actions">
            <AnchorLink className="button button--primary" href="#contact">
              Let&apos;s Collaborate
              <ArrowUpRight size={17} />
            </AnchorLink>
            <a className="button button--ghost" href="/Insan-Fadillah-Azzahra-CV.pdf" download>
              <Download size={16} />
              Download CV
            </a>
          </div>
        </article>

        <div className="about-side-grid">
          <article className="about-card about-card--mission reveal">
            <div className="card-topline">
              <span className="icon-badge icon-badge--coral">
                <Compass size={22} strokeWidth={1.8} />
              </span>
              <span className="card-index">01</span>
            </div>
            <h3>Career Orientation</h3>
            <p>
              Focused on building a career in Business Analysis, Data Analytics, and Quality
              Assurance. I turn complex needs into clear, structured solutions — bridging business
              goals, technology, and user experience to deliver measurable impact.
            </p>
            <div className="tag-row">
              <span className="tag">Business Analysis</span>
              <span className="tag">Data Analytics</span>
              <span className="tag">Quality Assurance</span>
              <span className="tag">System Analysis</span>
            </div>
            <AnchorLink className="text-link" href="#expertise">
              Explore my approach
              <ArrowRight size={15} />
            </AnchorLink>
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
              Pursuing a degree in Information Systems with a strong foundation in database
              management, business process modeling, UI/UX design, and software testing. Actively
              involved in academic projects and organizational activities.
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
            <AnchorLink className="text-link" href="#projects">
              View campus projects
              <ArrowUpRight size={15} />
            </AnchorLink>
          </article>
        </div>
      </div>

      <div className="about-values-grid reveal">
        <article className="about-value-card">
          <span className="about-value-icon">
            <ShieldCheck size={18} />
          </span>
          <div>
            <h4>Clarity First</h4>
            <p>Translating complex ideas into simple, actionable solutions.</p>
          </div>
        </article>
        <article className="about-value-card">
          <span className="about-value-icon">
            <Check size={18} />
          </span>
          <div>
            <h4>Quality-Driven</h4>
            <p>Every detail matters, from logic to user experience.</p>
          </div>
        </article>
        <article className="about-value-card">
          <span className="about-value-icon">
            <Sparkles size={18} />
          </span>
          <div>
            <h4>Always Learning</h4>
            <p>Constantly exploring new tools to grow and deliver better.</p>
          </div>
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
          <AnchorLink className="button button--primary modal-cta" href="#contact" onNavigate={onClose}>
            Discuss a similar project
            <ArrowUpRight size={16} />
          </AnchorLink>
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
    </section>
  )
}

function Skills() {
  return (
    <section className="section section-shell skills" id="skills">
      <SectionHeader
        eyebrow="Skills"
        title="Skills & Capabilities"
        description="The mix of analysis, testing, design, and data skills I bring to a team — built through coursework, internships, and hands-on projects."
        aside={<span className="credential-filter">Analytical · Creative · Structured</span>}
      />
      <div className="skills-layout">
        <div className="skills-grid">
          {skills.map((group, index) => {
            const Icon = skillIcons[index]
            return (
              <article className="skill-card reveal" key={group.title}>
                <div className="skill-card-head">
                  <span className="skill-card-icon">
                    <Icon size={19} strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3>{group.title}</h3>
                    <p>{group.caption}</p>
                  </div>
                  <span className="skill-count" aria-hidden="true">
                    {String(group.items.length).padStart(2, '0')}
                  </span>
                </div>
                <ul className="skill-meters">
                  {group.items.map((item, itemIndex) => (
                    <li key={item.name}>
                      <div className="skill-meter-head">
                        <span>{item.name}</span>
                        <em>{item.level}%</em>
                      </div>
                      <span className="skill-meter" aria-hidden="true">
                        <span
                          style={{
                            width: `${item.level}%`,
                            animationDelay: `${itemIndex * 70}ms`,
                          }}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>

        <aside className="skills-aside reveal">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              Strengths
            </span>
            <h3>Soft skills I rely on</h3>
            <div className="tag-row">
              {softSkills.map((skill) => (
                <span className="tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="skills-aside-block">
            <span className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              Currently learning
            </span>
            <ul className="skills-learning">
              {learningNow.map((item) => (
                <li key={item}>
                  <ArrowRight size={13} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="skills-aside-note">
            <Sparkles size={15} />
            Every skill here is applied to real work — see how it comes together in my case studies.
          </p>
          <AnchorLink className="text-link" href="#projects">
            View case studies
            <ArrowUpRight size={15} />
          </AnchorLink>
        </aside>
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
          <Link className="brand" to="/">
            <span className="brand-mark">A</span>
            <span>Insan Fadillah</span>
          </Link>
          <p>
            {profile.name}
            <br />
            Information Systems Student &amp; Product Enthusiast
          </p>
        </div>
        <div className="footer-links">
          {navLinks.map((link) => (
            <SectionNavLink key={link.href} to={link.href}>
              {link.label}
            </SectionNavLink>
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
          <a className="back-to-top" href="#" aria-label="Back to top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' }) }}>
            <ChevronUp size={16} />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  useReveal()
  const activeSection = useActiveSection()

  return (
    <>
      <Header activeSection={activeSection} isAboutPage={false} />
      <main>
        <Hero />
        <Highlights />
        <Skills />
        <Projects />
        <Expertise />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function AboutPage() {
  useReveal()

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'About — Insan Fadillah Azzahra'
    return () => {
      document.title = previousTitle
    }
  }, [])

  const quickFacts = [
    {
      icon: GraduationCap,
      title: 'Information Systems Student',
      detail: 'Satu University · 2022 — 2026',
    },
    {
      icon: Briefcase,
      title: 'Business & System Analysis',
      detail: 'Requirements · Process · Structure',
    },
    {
      icon: ShieldCheck,
      title: 'Quality Assurance',
      detail: 'Testing · Documentation · Release',
    },
    {
      icon: Sparkles,
      title: 'Open for Opportunities',
      detail: 'Internship · Project · Collaboration',
    },
  ]

  const facts = [
    { label: 'Full name', value: profile.name },
    { label: 'Based in', value: 'Indonesia · open to remote' },
    { label: 'Education', value: 'Information Systems, Satu University' },
    { label: 'Focus', value: 'Business Analysis · QA · UI/UX' },
    { label: 'Currently', value: 'QA Intern at PT. Nusantara Digital' },
    { label: 'Availability', value: 'Internship, project & collaboration' },
  ]

  const focusAreas = [
    {
      number: '01',
      tone: 'rose',
      icon: Briefcase,
      title: 'Business & System Analysis',
      description:
        'I map the problem before anyone builds the solution — clarifying needs, processes, and requirements so the whole team moves in one direction.',
      skills: [
        'Requirements gathering',
        'Business process modeling',
        'UML & BPMN',
        'BRD documentation',
        'Stakeholder analysis',
        'Feasibility analysis',
      ],
    },
    {
      number: '02',
      tone: 'amber',
      icon: ShieldCheck,
      title: 'Quality Assurance',
      description:
        'I build testing practices that protect the user experience and make every release more dependable, from the first test case to the final regression run.',
      skills: [
        'Test planning',
        'Test case design',
        'Functional testing',
        'Regression testing',
        'API testing',
        'Defect reporting',
      ],
    },
    {
      number: '03',
      tone: 'coral',
      icon: PenTool,
      title: 'UI/UX & Product Thinking',
      description:
        'I connect user insight with product goals to shape simple, inclusive, and purposeful digital experiences that people actually want to use.',
      skills: [
        'User research',
        'Wireframing',
        'Prototyping',
        'Design systems',
        'Information architecture',
        'Usability testing',
      ],
    },
  ]

  const learningItems = [
    { title: 'Business Analysis Fundamentals', meta: 'Coursera · 2025' },
    { title: 'QA & Software Testing Fundamental', meta: 'Digital Talent Academy · 2025' },
    { title: 'UI/UX Design & Prototyping', meta: 'DesignLab Indonesia · 2024' },
    { title: 'Public Relations & Media', meta: 'HIMSI · 2023 — 2024' },
  ]

  const values = [
    {
      icon: Compass,
      title: 'Clarity before speed',
      description:
        'A shared understanding at the start saves days of rework later. I would rather ask one more question now than rebuild later.',
    },
    {
      icon: ClipboardCheck,
      title: 'Evidence over assumption',
      description:
        'Decisions get stronger when they are grounded in data, testing, and real user behavior — not only in what feels right.',
    },
    {
      icon: Users,
      title: 'Empathy in the details',
      description:
        'Small copy, flow, and process choices decide whether people feel supported or stuck. Details are where trust is built.',
    },
    {
      icon: Lightbulb,
      title: 'Learn, then share',
      description:
        'I document what I learn so the next person and the next project can move faster. Growth is better when it is shared.',
    },
  ]

  const interests = [
    'Research notes',
    'Design systems',
    'Community programs',
    'Mentoring',
    'Visual storytelling',
    'Continuous learning',
  ]

  return (
    <>
      <Header activeSection="" isAboutPage />
      <main>
        <section className="about-hero section-shell" id="about">
          <div className="about-hero-copy reveal">
            <SectionLabel>About Me</SectionLabel>
            <h1 className="about-hero-title">
              Curious about systems,
              <br />
              <em>careful about people.</em>
            </h1>
            <p className="about-hero-description">
              I&apos;m {profile.name}, an Information Systems student based in Indonesia. I work at
              the intersection of business analysis, quality assurance, and product design — turning
              messy problems into clear, dependable digital experiences.
            </p>
            <div className="hero-actions">
              <Link className="button button--primary" to="/#contact">
                Let&apos;s Connect
                <ArrowUpRight size={17} />
              </Link>
              <a
                className="button button--ghost"
                href="/Insan-Fadillah-Azzahra-CV.pdf"
                download
              >
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

        <section className="highlights section-shell reveal" aria-label="Quick facts">
          {quickFacts.map(({ icon: Icon, title, detail }) => (
            <div className="highlight-item" key={title}>
              <span className="highlight-icon">
                <Icon size={17} />
              </span>
              <span>
                <strong>{title}</strong>
                <small>{detail}</small>
              </span>
            </div>
          ))}
        </section>

        <section className="section section-shell about-story">
          <SectionHeader
            eyebrow="My Story"
            title="The person behind the work"
            description="A short story about how I found my focus, what drives me, and the way I like to work with teams."
          />
          <div className="about-story-grid">
            <div className="about-story-copy reveal">
              <p className="about-story-lead">
                I like problems that sit between people and technology — the ones that need both a
                clear process and a human touch.
              </p>
              <p>
                My interest started with a simple question: why do some digital products feel
                effortless while others quietly create more work? That curiosity led me to
                information systems, and from there to business analysis, quality assurance, and
                UI/UX. They became three lenses for looking at the same problem from different
                angles.
              </p>
              <p>
                Today I split my time between coursework, internships, and campus projects. I write
                requirements that teams can act on, test products until they behave as promised, and
                design interfaces that make the next step obvious. I care about the small details
                because that is usually where trust is built.
              </p>
              <p>
                Outside of work, I stay involved in student organizations and community programs.
                Those experiences taught me that good collaboration is often the difference between
                a plan that looks good on paper and one that actually ships.
              </p>
              <div className="about-interests">
                <span className="eyebrow">Off the clock</span>
                <div className="tag-row">
                  {interests.map((interest) => (
                    <span className="tag" key={interest}>
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <aside className="about-facts reveal">
              <span className="eyebrow">
                <span className="eyebrow-dot" aria-hidden="true" />
                At a glance
              </span>
              <dl className="about-facts-list">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <a
                className="text-link"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                Connect on LinkedIn
                <ArrowUpRight size={15} />
              </a>
            </aside>
          </div>
        </section>

        <section className="section section-shell about-focus">
          <SectionHeader
            eyebrow="Focus Areas"
            title="What I focus on"
            description="Three connected disciplines that shape how I approach every project."
          />
          <div className="about-focus-grid">
            {focusAreas.map((area) => {
              const Icon = area.icon
              return (
                <article
                  className={`expertise-card expertise-card--${area.tone} reveal`}
                  key={area.title}
                >
                  <div className="expertise-top">
                    <span className="expertise-icon">
                      <Icon size={21} strokeWidth={1.8} />
                    </span>
                    <span className="expertise-number">{area.number}</span>
                  </div>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                  <ul className="skill-list">
                    {area.skills.map((skill) => (
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
        </section>

        <section className="section section-shell about-education">
          <SectionHeader
            eyebrow="Education & Growth"
            title="Where I learn and how I grow"
            description="Formal study, hands-on practice, and a habit of documenting what I learn along the way."
          />
          <div className="about-grid">
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
                Coursework in database management, business process modeling, UI/UX design, and
                software testing. I pair academic projects with internships so theory stays connected
                to real delivery.
              </p>
              <div className="tag-row">
                <span className="tag">Database Management</span>
                <span className="tag">BPMN</span>
                <span className="tag">UI/UX Design</span>
                <span className="tag">Software Testing</span>
                <span className="tag">Project Management</span>
              </div>
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
              <Link className="text-link" to="/#projects">
                Explore campus projects
                <ArrowUpRight size={15} />
              </Link>
            </article>

            <article className="about-card about-card--learning reveal">
              <div className="card-topline">
                <span className="icon-badge icon-badge--coral">
                  <BadgeCheck size={22} strokeWidth={1.8} />
                </span>
                <span className="date-badge">Always learning</span>
              </div>
              <h3>Certifications &amp; Community</h3>
              <p>
                Beyond the classroom, I keep learning through certifications, workshops, and
                organizational work that puts me close to real teams and real users.
              </p>
              <ul className="about-mini-list">
                {learningItems.map((item) => (
                  <li key={item.title}>
                    <span className="about-mini-icon" aria-hidden="true">
                      <Check size={11} />
                    </span>
                    <span>
                      <strong>{item.title}</strong>
                      <em>{item.meta}</em>
                    </span>
                  </li>
                ))}
              </ul>
              <a
                className="text-link"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                View credentials on LinkedIn
                <ArrowUpRight size={15} />
              </a>
            </article>
          </div>
        </section>

        <section className="section section-shell about-values">
          <SectionHeader
            eyebrow="How I Work"
            title="Principles I bring to every project"
            description="Not just a process — a way of thinking about the people on the other side of the screen."
          />
          <div className="value-grid">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <article className="value-card reveal" key={value.title}>
                  <span className="value-icon">
                    <Icon size={19} strokeWidth={1.8} />
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="section section-shell about-cta-section">
          <div className="about-cta reveal">
            <div className="about-cta-copy">
              <SectionLabel>Let&apos;s Connect</SectionLabel>
              <h2>
                Let&apos;s build something <em>meaningful.</em>
              </h2>
              <p>
                I&apos;m open to internships, project collaborations, and conversations about
                business analysis, quality assurance, data, and product design.
              </p>
            </div>
            <div className="about-cta-actions">
              <Link className="button button--primary" to="/#contact">
                Start a conversation
                <ArrowUpRight size={16} />
              </Link>
              <Link className="button button--ghost" to="/#projects">
                View my projects
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const previousPathname = useRef(pathname)

  useEffect(() => {
    const pathChanged = previousPathname.current !== pathname
    previousPathname.current = pathname

    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: pathChanged || prefersReducedMotion() ? 'auto' : 'smooth',
      })
      return undefined
    }

    const targetId = hash.slice(1)
    let cancelled = false
    let attempts = 0
    let timer = 0

    const tryScroll = () => {
      if (cancelled) return

      // The intro loader locks scrolling, so wait until it is gone.
      const isLocked = document.body.classList.contains('is-loading')
      if (!isLocked && scrollToSection(targetId)) return

      attempts += 1
      if (attempts < 40) timer = window.setTimeout(tryScroll, 80)
    }

    timer = window.setTimeout(tryScroll, 0)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [pathname, hash, key])

  return null
}

function App() {
  useReveal()
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
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  )
}

export default App
