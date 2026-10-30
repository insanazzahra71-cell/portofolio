export const profile = {
  name: 'Insan Fadillah Azzahra',
  firstName: 'Insan Fadillah',
  lastName: 'Azzahra',
  role: 'Information Systems Student',
  email: 'insanfadillahazzahra@gmail.com',
  linkedin: 'https://www.linkedin.com/in/insanfadillahazzahra',
  linkedinLabel: 'linkedin.com/in/insanfadillahazzahra',
  location: 'Indonesia',
  availability: 'Open to opportunities',
  specialties: [
    'Business Analysis',
    'Data Analytics',
    'Quality Assurance',
    'System Analysis',
  ],
}

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
]

export const skills = [
  {
    title: 'Business & System Analysis',
    caption: 'Turning needs into clear, executable requirements.',
    items: [
      { name: 'Requirements gathering', level: 90 },
      { name: 'Business process modeling', level: 88 },
      { name: 'UML & BPMN', level: 85 },
      { name: 'BRD & documentation', level: 86 },
      { name: 'Stakeholder analysis', level: 84 },
    ],
  },
  {
    title: 'Quality Assurance',
    caption: 'Protecting the experience with structured testing.',
    items: [
      { name: 'Test planning & strategy', level: 88 },
      { name: 'Test case design', level: 90 },
      { name: 'Manual & regression testing', level: 92 },
      { name: 'API testing (Postman)', level: 78 },
      { name: 'Defect reporting & tracking', level: 87 },
    ],
  },
  {
    title: 'UI/UX Design',
    caption: 'Making the next step obvious for every user.',
    items: [
      { name: 'User research', level: 82 },
      { name: 'Wireframing', level: 88 },
      { name: 'Prototyping', level: 86 },
      { name: 'Design systems', level: 80 },
      { name: 'Usability testing', level: 78 },
    ],
  },
  {
    title: 'Data & Documentation',
    caption: 'Keeping decisions grounded in evidence.',
    items: [
      { name: 'SQL & database queries', level: 78 },
      { name: 'Spreadsheet analysis', level: 88 },
      { name: 'Data visualization', level: 76 },
      { name: 'Notion & Miro', level: 90 },
      { name: 'Jira & workflow tools', level: 85 },
    ],
  },
]

export const softSkills = [
  'Communication',
  'Stakeholder management',
  'Team collaboration',
  'Problem solving',
  'Attention to detail',
  'Time management',
  'Adaptability',
  'Presentation',
]

export const learningNow = [
  'SQL for data analytics',
  'Test automation with Playwright',
  'Power BI dashboards',
]

export const projects = [
  {
    id: 'bansu-village',
    filter: 'uiux',
    category: 'Web Platform · UI/UX',
    year: '2025',
    title: 'Bansu Village Announcement',
    summary:
      'A public information platform that helps residents access village announcements, event schedules, and essential services with clarity and ease.',
    description:
      'Residents previously relied on scattered notice boards and informal group chats to stay informed. I led the discovery and design process to create a centralized, mobile-first information hub built around the needs of the community.',
    tags: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
    tools: ['Figma', 'FigJam', 'Google Forms', 'Maze'],
    role: 'Lead UI/UX Designer',
    highlights: [
      'Conducted interviews with 12 residents to map information-seeking behavior.',
      'Designed a mobile-first information architecture and reusable component library.',
      'Validated the prototype with 8 users, improving task completion by 32%.',
    ],
    preview: 'village',
  },
  {
    id: 'internal-system',
    filter: 'uiux',
    category: 'Enterprise System · UI/UX',
    year: '2025',
    title: 'Internal System UI/UX',
    summary:
      'A redesigned internal operations platform for a student organization, bringing tasks, approvals, and team updates into one intuitive workspace.',
    description:
      'The existing system was difficult to navigate and created duplicated work across teams. I restructured the information architecture and designed a scalable dashboard that makes priorities and progress visible at a glance.',
    tags: ['Information Architecture', 'Design System', 'Dashboard', 'Prototyping'],
    tools: ['Figma', 'Notion', 'Miro', 'Maze'],
    role: 'UI/UX Designer',
    highlights: [
      'Audited the existing workflow and identified 14 friction points across 5 user roles.',
      'Created a modular design system covering navigation, forms, tables, and data states.',
      'Delivered a clickable prototype for stakeholder alignment and developer handoff.',
    ],
    preview: 'system',
  },
  {
    id: 'quality-assurance',
    filter: 'qa',
    category: 'Quality Assurance · Web App',
    year: '2025',
    title: 'Software Quality Assurance',
    summary:
      'A structured QA engagement for a web-based management system, covering test planning, functional checks, regression cycles, and defect reporting.',
    description:
      'I built the test approach from the ground up to improve release confidence. The project delivered a traceable testing workflow and clear documentation that helped the development team resolve issues faster.',
    tags: ['Test Planning', 'Test Cases', 'Regression Testing', 'Bug Reporting'],
    tools: ['Jira', 'Postman', 'Google Sheets', 'TestRail'],
    role: 'Quality Assurance Intern',
    highlights: [
      'Authored 120+ test cases across authentication, dashboard, and reporting modules.',
      'Reported and tracked 38 defects, reducing post-release issues by 20%.',
      'Documented reproducible steps, evidence, and severity levels for every finding.',
    ],
    preview: 'quality',
  },
]

export const projectFilters = [
  { id: 'all', label: 'All Projects' },
  { id: 'uiux', label: 'UI/UX Design' },
  { id: 'qa', label: 'Quality Assurance' },
]

export const expertise = [
  {
    number: '01',
    tone: 'rose',
    title: 'Business Analysis & System Analysis',
    description:
      'Turning ambiguous business needs into clear requirements, processes, and system solutions that teams can execute.',
    skills: [
      'Requirements gathering',
      'Stakeholder analysis',
      'Business process modeling',
      'User flow & journey mapping',
      'UML & BPMN',
      'BRD & documentation',
      'Cost-benefit analysis',
      'Feasibility analysis',
    ],
  },
  {
    number: '02',
    tone: 'amber',
    title: 'Quality Assurance & Software Testing',
    description:
      'Building structured testing practices that protect the user experience and make every release more dependable.',
    skills: [
      'Test planning & strategy',
      'Test case design',
      'Functional & regression testing',
      'Manual testing',
      'Bug reporting & tracking',
      'API testing with Postman',
      'Automation testing (basic)',
      'Performance testing (basic)',
    ],
  },
  {
    number: '03',
    tone: 'coral',
    title: 'UI/UX Design & Product Thinking',
    description:
      'Connecting user insight with product goals to shape simple, inclusive, and purposeful digital experiences.',
    skills: [
      'User research',
      'Wireframing & prototyping',
      'Usability & interaction design',
      'Design systems & components',
      'Information architecture',
      'Accessibility & inclusive design',
      'Usability testing',
      'Product discovery',
    ],
  },
]

export const tools = [
  {
    title: 'Design & Prototyping',
    items: ['Figma', 'FigJam', 'Canva', 'Framer'],
  },
  {
    title: 'Analysis & Documentation',
    items: ['Google Workspace', 'Microsoft Office', 'Notion', 'Miro'],
  },
  {
    title: 'Testing & Delivery',
    items: ['Jira', 'Postman', 'TestRail', 'GitHub'],
  },
]

export const experience = [
  {
    role: 'Quality Assurance Intern',
    company: 'PT. Nusantara Digital',
    date: 'Jan 2025 — Present',
    location: 'Jakarta, Indonesia',
    type: 'Internship',
    description:
      'Execute manual testing for a web-based internal system, documenting test scenarios and collaborating with developers and product owners to ship reliable releases.',
    achievements: [
      'Authored 120+ test cases and tracked defects through Jira.',
      'Reduced re-test cycles by 20% with clearer bug documentation.',
    ],
    tags: ['Manual Testing', 'Test Documentation', 'Jira'],
  },
  {
    role: 'Project Manager Intern',
    company: 'Startup Campus',
    date: 'Aug 2024 — Dec 2024',
    location: 'Remote',
    type: 'Internship',
    description:
      'Led a five-person cross-functional team through a digital product project, managing sprint planning, task prioritization, and stakeholder communication.',
    achievements: [
      'Coordinated weekly sprint reviews and maintained the project backlog.',
      'Delivered the final prototype on schedule and within scope.',
    ],
    tags: ['Project Management', 'Sprint Planning', 'Stakeholder Communication'],
  },
  {
    role: 'UI/UX Designer Intern',
    company: 'Kreatif Studio',
    date: 'Feb 2024 — Jul 2024',
    location: 'Hybrid',
    type: 'Internship',
    description:
      'Designed end-to-end user flows and high-fidelity prototypes for internal dashboards and mobile applications, translating research into intuitive interfaces.',
    achievements: [
      'Built a reusable component library for faster design handoff.',
      'Presented design rationale to clients and incorporated feedback iteratively.',
    ],
    tags: ['UI Design', 'Prototyping', 'User Research'],
  },
  {
    role: 'Team Lead — Community Service Program (PKM)',
    company: 'SATH University',
    date: 'Aug 2023 — Dec 2023',
    location: 'Indonesia',
    type: 'Leadership',
    description:
      'Led 12 students in a digital literacy program for local small businesses, delivering practical workshops and a digital toolkit for day-to-day operations.',
    achievements: [
      'Facilitated 4 workshops for 25+ local business owners.',
      'Managed program schedule, budget, and partner communication.',
    ],
    tags: ['Leadership', 'Program Management', 'Community Engagement'],
  },
  {
    role: 'Freshman Leader',
    company: 'SATH University',
    date: 'Aug 2023 — Sep 2023',
    location: 'Indonesia',
    type: 'Organization',
    description:
      'Mentored more than 30 new students throughout orientation and supported their academic and social transition to campus life.',
    achievements: [
      'Designed weekly mentoring sessions and campus navigation activities.',
      'Became a peer resource for academic planning and campus services.',
    ],
    tags: ['Mentoring', 'Public Speaking', 'Team Development'],
  },
  {
    role: 'Design Team',
    company: 'HIMSI — Information Systems Student Association',
    date: 'Feb 2023 — Dec 2023',
    location: 'Indonesia',
    type: 'Organization',
    description:
      'Produced visual assets for campus events and organization campaigns, including social media content, posters, and event branding.',
    achievements: [
      'Created a consistent visual identity across 20+ event materials.',
      'Collaborated with the media and public relations teams on campaigns.',
    ],
    tags: ['Visual Design', 'Branding', 'Content Creation'],
  },
]

export const organizations = [
  {
    organization: 'HIMSI — Information Systems Student Association',
    role: 'Public Relations & Media',
    date: '2023 — 2024',
    description:
      'Helped shape the organization’s public voice through campaign design, social media content, and event documentation.',
  },
  {
    organization: 'Majelis Ta’lim',
    role: 'Media & Design',
    date: '2023 — 2024',
    description:
      'Supported community programs through visual storytelling, event materials, and digital content production.',
  },
]

export const credentials = [
  {
    category: 'Certification',
    title: 'Business Analysis Fundamentals',
    issuer: 'Coursera',
    date: 'March 2025',
    description:
      'A practical foundation in requirements gathering, stakeholder analysis, process mapping, and solution evaluation.',
    tags: ['Business Analysis', 'Requirements', 'Process Mapping'],
    url: 'https://www.coursera.org',
  },
  {
    category: 'Training',
    title: 'Quality Assurance & Software Testing Fundamental',
    issuer: 'Digital Talent Academy',
    date: 'January 2025',
    description:
      'Hands-on training covering test design, manual testing, defect lifecycle, and quality metrics for web applications.',
    tags: ['Manual Testing', 'Test Design', 'QA'],
    url: 'https://digitalent.komdigi.go.id',
  },
  {
    category: 'Workshop',
    title: 'UI/UX Design & Prototyping Workshop',
    issuer: 'DesignLab Indonesia',
    date: 'November 2024',
    description:
      'An intensive workshop on user research, interaction design, prototyping, and presenting design decisions.',
    tags: ['UI/UX', 'Figma', 'Prototyping'],
    url: 'https://www.figma.com',
  },
]
