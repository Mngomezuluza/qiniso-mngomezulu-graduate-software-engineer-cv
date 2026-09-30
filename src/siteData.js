const base = import.meta.env.BASE_URL;

// Published to GitHub Pages as static files, where there is no API to store contact messages.
export const staticSite = import.meta.env.VITE_STATIC_SITE === 'true';

export const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/credentials', label: 'Credentials' },
  { to: '/contact', label: 'Contact' }
];

export const dashboardCards = [
  {
    title: 'Profile Overview',
    to: '/about',
    description: 'Professional summary, work experience, technical strengths, and the story behind the CV.'
  },
  {
    title: 'Project Portfolio',
    to: '/projects',
    description: 'Detailed engineering case studies with visuals, features, build steps, and GitHub links.'
  },
  {
    title: 'Credentials',
    to: '/credentials',
    description: 'Download the ATS CV, transcript, and supporting credentials in one place.'
  },
  {
    title: 'Recruiter Contact',
    to: '/contact',
    description: staticSite
      ? 'Share your company details and enquiry by email for follow-up.'
      : 'Share your company details and enquiry so it can be stored for follow-up.'
  }
];

export const profile = {
  name: 'Qiniso Manqoba Mngomezulu',
  title: 'Software Engineering Graduate',
  headline: 'Software Engineering Graduate | Full Stack Developer | Business Intelligence',
  location: 'Johannesburg, South Africa',
  phone: '+27 67 552 3363',
  email: 'manqobamngo20@outlook.com',
  github: 'https://github.com/Mngomezuluza',
  githubSecondary: 'https://github.com/QinisoMngo',
  linkedin: 'https://www.linkedin.com/in/qiniso-manqoba-mngomezulu-132b98377',
  summary:
    'Software engineering graduate and IT Intern with hands-on experience across full-stack development, business intelligence and enterprise platform support. I build and secure production features on a multi-tenant business platform (Next.js, TypeScript, PostgreSQL/Supabase, Vercel) and support a client KPI dashboard programme built on TIBCO Spotfire, TIBCO Data Virtualization and an Enterprise Service Bus.',
  portrait: `${base}assets/images/qiniso-mngomezulu-profile.jpeg`,
  availability:
    'Open to graduate software engineering, full-stack development, backend development, and junior platform roles.'
};

export const socialLinks = [
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'GitHub', href: profile.github },
  { label: 'GitHub (QinisoMngo)', href: profile.githubSecondary },
  { label: 'Email', href: `mailto:${profile.email}` }
];

export const highlights = [
  'IT Intern at PWD Xperts since July 2026, working across full-stack development, business intelligence, and enterprise platform support.',
  'Built role-based access control, API security, and automated reporting on production Next.js, TypeScript, and Supabase platforms.',
  'Supporting a client KPI dashboard programme on TIBCO Spotfire, TIBCO Data Virtualization, and an Enterprise Service Bus.',
  'Bachelor of Computing (Software Engineering) graduate from Belgium Campus iTversity, now completing Honours.',
  'Earlier office administration and IT support experience with strong organisational discipline.',
  'Multilingual communicator: English, Afrikaans, isiZulu, Setswana, and isiXhosa.'
];

export const skills = [
  {
    title: 'Languages',
    items: ['C#', 'Java', 'JavaScript', 'TypeScript', 'Python', 'SQL', 'PHP', 'PowerShell']
  },
  {
    title: 'Frameworks & Tools',
    items: ['.NET', 'ASP.NET', 'Blazor', 'React', 'Next.js', 'Node.js', 'Express', 'Prisma', 'NextAuth.js', 'Tailwind CSS', 'Git', 'GitHub', 'Postman', 'Vercel', 'Visual Studio', 'VS Code', 'Unity']
  },
  {
    title: 'Databases & APIs',
    items: ['SQL Server', 'PostgreSQL', 'Supabase (Storage, Row Level Security)', 'MySQL', 'Oracle', 'MongoDB', 'Firebase', 'REST APIs', 'JSON', 'XML', 'OAuth', 'JWT', 'GraphQL']
  },
  {
    title: 'Business Intelligence & Data',
    items: ['TIBCO Spotfire', 'TIBCO Data Virtualization (TDV)', 'KPI Dashboard Development', 'Business Requirements Documents (BRDs)', 'Database Administration', 'Data Warehousing', 'Reporting']
  },
  {
    title: 'Integration',
    items: ['Enterprise Service Bus (TIBCO BusinessWorks)', 'Boomi', 'Model Context Protocol (MCP) connectors']
  },
  {
    title: 'Servers & Incident Management',
    items: ['Windows Server (Spotfire, TDV and ESB servers)', 'Windows Services', 'Tomcat configuration', 'JDK runtimes', 'TLS certificates & keystores', 'Server log analysis', 'Root Cause Analysis (RCA)']
  },
  {
    title: 'Identity & Cloud Administration',
    items: ['Active Directory', 'Microsoft Entra ID', 'Microsoft 365 Admin Center', 'SharePoint Administration', 'Document360 (KMS)', 'OneDrive-to-SharePoint Migration']
  },
  {
    title: 'Security & DevOps',
    items: ['Role-based access control', 'Multi-tenant data scoping', 'Audit logging', 'MFA', 'Secret management', 'Regression and integration testing', 'Vercel deployments and cron jobs', 'Database backup and restore']
  },
  {
    title: 'AI-Assisted Development',
    items: ['Claude Code', 'GitHub Copilot', 'OpenAI Codex']
  }
];

export const experience = [
  {
    role: 'IT Intern',
    company: 'PWD Xperts',
    period: 'July 2026 - Present',
    points: [
      'Support Business Intelligence dashboard development for a client KPI dashboard programme, shadowing the Head of Dashboard Development; started TIBCO Spotfire and Spotfire Administration training in July 2026 and am learning TIBCO Data Virtualization (TDV) hands-on, alongside database administration and data warehousing tasks.',
      'Write and revise Business Requirements Documents (BRDs) for KPI dashboards, covering current and target state, functional requirements, data sources and dashboard ownership, and update them through review rounds with senior analysts.',
      'Contributed to a consolidated Root Cause Analysis (RCA) of production outages across Spotfire Server, TDV, the ESB and a web portal: gathered evidence from server logs, configuration files and timestamps, helped identify causes such as a disabled Tomcat class-path setting, a missing JDK runtime and a TLS certificate/keystore mismatch, and drafted remediation and monitoring recommendations.',
      'Take part in live troubleshooting sessions with infrastructure teams and vendors on the Windows servers hosting Spotfire, TDV and the ESB, and manage Active Directory and Microsoft Entra ID accounts and groups for BI platform access.',
      'Full-stack development on the company\'s in-house dashboard (full admin rights): designed and built the role-based access control layer across HR, finance, hotel operations and tender modules, and added authentication, company scoping and audit logging to previously unauthenticated API routes, backed by regression tests written to verify coverage.',
      'Diagnosed and resolved production issues on the in-house dashboard, including silent document-upload failures, a blocked database migration path, slow pages fixed through database indexing and fewer queries, and conflicting finance totals across modules.',
      'Designed and built an automated bi-weekly reporting system for the CEO\'s PhD research platform, from a cron-triggered data pipeline through to an admin review-and-approval workflow and email delivery; deployed the platform and report to the CEO on a bi-weekly basis.',
      'Took over ownership (full admin rights) of internal client projects following the departure of the Project Manager: SOC/Cybersecurity, Enterprise Service Bus (ESB), a client Customer Portal website, and the Knowledge Management System (Document360); update project plans, coordinate with the managed detection and response (MDR) provider, and log and follow up Boomi platform support tickets.',
      'Administer the Microsoft 365 Admin Center (full admin rights) and led the migration of company data from OneDrive to SharePoint, acting as SharePoint administrator.',
      'Shadow project leads/managers on documentation, distributing reports, and presenting monthly and weekly project reports; turn meeting outcomes into work-plan updates and risk registers, and collaborate with Tender Managers to integrate Sage Accounting data into the internal PWD Xperts dashboard.'
    ]
  },
  {
    role: 'Office Administrator & IT Support',
    company: 'SOWISO Consultants PTY LTD & SOWISO Foundation NPC',
    period: '2017 - 2020',
    points: [
      'Provided technical support including software installation, troubleshooting, hardware setup, and day-to-day systems assistance.',
      'Maintained organisational records, supported administration processes, and used digital tools such as Outlook, Zoom, and Microsoft Teams.',
      'Automated repetitive work using Excel macros and basic scripting, while assisting with backups, IT inventory, and bookkeeping support.'
    ]
  }
];

export const softSkills = [
  'Leadership and team coordination',
  'Clear communication',
  'Discipline and consistency',
  'Integrity and accountability',
  'Calm decision-making under pressure',
  'Adaptability and willingness to learn',
  'Resilience and perseverance',
  'Service mindset and humility',
  'Mentorship and encouragement',
  'Time management'
];

export const projectIntro =
  'These projects are written as portfolio case studies so a recruiter can quickly understand what each system does, how it was built, what I contributed, and the engineering skills it demonstrates.';

export const projects = [
  {
    title: 'PWD Group Portal – Multi-Tenant Business Management Platform',
    organisation: 'PWD Xperts',
    summary:
      'A production, multi-tenant platform spanning CRM, HR, finance, procurement, legal and tender management across the group\'s companies.',
    contribution: [
      'Designed and built the role-based access control layer across HR, finance, hotel operations and tender modules.',
      'Secured previously unprotected API routes with authentication, company scoping and audit logging, backed by regression tests.',
      'Improved dashboard performance through database indexing and query reduction.',
      'Moved document uploads to Supabase Storage and reconciled conflicting finance calculations.',
      'Built spreadsheet and Sage data imports and an AI (MCP) connector for searching the tender library.'
    ],
    tech: ['TypeScript', 'Next.js', 'React', 'PostgreSQL', 'Prisma', 'Supabase', 'NextAuth.js', 'Tailwind CSS', 'Vercel', 'MCP'],
    skills: ['Role-based access control', 'API security', 'Multi-tenant data scoping', 'Audit logging', 'Regression testing', 'Performance tuning', 'Data imports']
  },
  {
    title: 'Research Portal – Automated Survey & Reporting Platform',
    organisation: 'PWD Xperts',
    summary:
      'An end-to-end automated bi-weekly reporting system for a PhD research survey platform.',
    contribution: [
      'Built a cron-triggered pipeline that assembles a multi-document report pack from live survey data.',
      'Added an admin review-and-approval workflow and email delivery.',
      'Diagnosed and fixed a production-only chart-rendering bug by implementing custom vector-glyph label rendering with a bundled font.'
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Recharts', 'docx', 'Vercel Cron'],
    skills: ['Automated reporting', 'Scheduled jobs', 'Approval workflows', 'Document generation', 'Production debugging']
  },
  {
    title: 'KPI Dashboard Programme – Business Intelligence',
    organisation: 'Client project, PWD Xperts',
    summary:
      'Supporting the build and deployment of executive KPI dashboards for a public-sector client on TIBCO Spotfire, fed by TIBCO Data Virtualization and an Enterprise Service Bus.',
    contribution: [
      'Write and revise Business Requirements Documents (current and target state, functional requirements, data sources, dashboard ownership) through review cycles with senior analysts.',
      'Support UAT and progress reporting.'
    ],
    tech: ['TIBCO Spotfire', 'TIBCO Data Virtualization (TDV)', 'TIBCO BusinessWorks (ESB)', 'Boomi', 'Windows Server'],
    skills: ['Business intelligence', 'Requirements documentation', 'User acceptance testing', 'Stakeholder reporting']
  },
  {
    title: 'VR Interactive Modelling Application',
    summary:
      'A Unity-based VR modelling application that allows users to draw, edit, and manipulate geometry using VR controllers, with snapping, undo/redo, multiple modelling tools, and DXF export for fabrication workflows.',
    purpose:
      'The project explored how immersive spatial interfaces can replace traditional desktop-based modelling workflows for rapid design and prototyping.',
    features: [
      'Draw geometry using VR controllers and a projected drawing plane',
      'Switch between line, freehand, rectangle, circle, and polygon tools',
      'Use snapping for more precise placement and editing',
      'Undo and redo modelling actions during runtime',
      'Select and transform created shapes',
      'Export completed drawings to DXF format'
    ],
    buildSteps: [
      'Built the environment in Unity with XR support enabled through OpenXR and the XR Interaction Toolkit.',
      'Configured controller input and raycasting so users could project actions onto the modelling plane.',
      'Implemented tool-based geometry creation with shared systems for stroke storage, snapping, and history management.',
      'Added selection and editing workflows for moving, rotating, and scaling geometry.',
      'Integrated DXF export so model output could be reused in fabrication-oriented workflows.'
    ],
    contribution: [
      'Contributed to the VR interaction workflow and runtime tool flow.',
      'Worked on tool-based geometry creation and snapping support.',
      'Supported editing functionality and export-ready modelling features.'
    ],
    tech: ['Unity', 'C#', 'OpenXR', 'XR Interaction Toolkit', 'Unity Input System'],
    skills: ['VR application development', '3D interaction design', 'Unity scripting', 'Input handling', 'Geometry manipulation', 'Feature integration'],
    github: profile.github,
    image: `${base}assets/gallery/vr-headset-integration.jpeg`,
    gallery: [
      `${base}assets/gallery/unity-capstone.jpeg`,
      `${base}assets/gallery/vr-headset-integration.jpeg`,
      `${base}assets/gallery/capstone-team.jpeg`
    ]
  },
  {
    title: 'LPR381 Linear and Integer Programming Solver',
    summary:
      'A desktop optimisation solver that combines a C# Avalonia interface with an F# algorithm engine to solve linear and integer programming problems using methods such as Simplex, Branch and Bound, and Cutting Plane.',
    purpose:
      'The goal was to provide a structured desktop interface for solving optimisation problems while separating the mathematical engine from the user experience.',
    features: [
      'Enter optimisation problems manually',
      'Load structured problem definitions from files',
      'Choose a solving method dynamically',
      'Display objective values, variable assignments, and iteration outputs',
      'Support linear and integer programming workflows',
      'Export results for later use'
    ],
    buildSteps: [
      'Designed a split architecture with a C# Avalonia front end and an F# solving engine.',
      'Built UI flows for objective functions, constraints, variable types, and solver configuration.',
      'Parsed manual and file-based inputs into structured formulations.',
      'Connected the UI to the algorithm layer through a registry-driven solver selection approach.',
      'Returned results and iteration data back to the interface for display and export.'
    ],
    contribution: [
      'Contributed to the user interface layer and interaction flow.',
      'Helped connect the C# UI to the F# algorithm engine.',
      'Supported result display and interoperability design.'
    ],
    tech: ['C#', 'F#', 'Avalonia UI', '.NET', 'Math and optimisation libraries'],
    skills: ['Desktop application development', 'Cross-language integration', 'UI design for technical systems', 'Structured input processing', 'Optimisation workflows'],
    github: profile.github,
    image: `${base}assets/gallery/vr-headset-integration.jpeg`,
    gallery: [`${base}assets/gallery/aws-azure-summit.jpeg`]
  },
  {
    title: 'Maintenance Management App',
    summary:
      'A full-stack maintenance management application for logging service jobs, tracking progress, updating statuses, and archiving completed records through a REST API backend and browser-based interface.',
    purpose:
      'The system was designed to make maintenance work easier to manage by introducing structured status tracking and historical job storage.',
    features: [
      'Create and manage maintenance jobs',
      'View all submitted work items in the browser',
      'Update job details and status values',
      'Filter jobs by state and conditions',
      'Archive completed records',
      'Perform batch updates across multiple records'
    ],
    buildSteps: [
      'Built the backend with Node.js and Express.',
      'Modelled job data in MongoDB using Mongoose schemas and validation.',
      'Created REST endpoints for create, read, update, archive, and batch status workflows.',
      'Built the frontend interface with HTML, CSS, and JavaScript.',
      'Connected the browser UI to the API through fetch-based client-server communication.'
    ],
    contribution: [
      'Built the backend application structure and REST API.',
      'Designed the MongoDB job model.',
      'Created the frontend interface and connected it to the API.',
      'Implemented filtering, updates, and archiving workflows.'
    ],
    tech: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JavaScript', 'HTML', 'CSS'],
    skills: ['Full-stack development', 'REST API design', 'CRUD implementation', 'NoSQL integration', 'Schema validation', 'Frontend data rendering'],
    github: profile.github,
    image: `${base}assets/gallery/vr-headset-integration.jpeg`,
    gallery: [`${base}assets/gallery/csr-lupas-walk.jpeg`]
  },
  {
    title: 'Poised Project Management System',
    summary:
      'A Java-based project management system for capturing, updating, searching, deleting, and finalising engineering project records using JDBC and MariaDB.',
    purpose:
      'The application replaced less structured project record management with a database-driven workflow for storing engineering project information and linked people.',
    features: [
      'Create new project records',
      'Search and update project information',
      'Delete project data when required',
      'Finalise projects and track completion',
      'Manage people linked to project records',
      'Auto-generate project names when one is not supplied'
    ],
    buildSteps: [
      'Built the application as a Java console system with a menu-driven workflow.',
      'Connected the app to MariaDB through JDBC.',
      'Modelled projects and linked people through Java classes and a service layer.',
      'Implemented SQL-driven CRUD operations with prepared statements.',
      'Added business rules for project finalisation and automatic naming.'
    ],
    contribution: [
      'Built the Java application structure and database connection layer.',
      'Implemented SQL-based CRUD functionality.',
      'Developed the menu-driven workflow and business rules.'
    ],
    tech: ['Java', 'JDBC', 'MariaDB', 'SQL'],
    skills: ['Java development', 'Relational database integration', 'SQL query design', 'Console application development', 'Business rule implementation'],
    github: profile.github,
    image: `${base}assets/gallery/vr-headset-integration.jpeg`,
    gallery: [`${base}assets/gallery/st-benedicts-awards.jpeg`]
  },
  {
    title: 'Customer Churn Prediction System',
    summary:
      'A machine learning application that predicts telecom customer churn using data preprocessing, model training, interactive analytics, and browser-based prediction interfaces built with Dash and Flask.',
    purpose:
      'The aim was to identify customers at risk of leaving through data-driven modelling while also exposing results through accessible analytical interfaces.',
    features: [
      'Analyse telecom customer data',
      'Generate churn predictions and probabilities',
      'View interactive dashboards and visuals',
      'Expose prediction workflows through Flask endpoints',
      'Submit live profile data through a browser interface'
    ],
    buildSteps: [
      'Explored and cleaned CSV-based telecom churn datasets in Jupyter notebooks.',
      'Prepared features and trained a scikit-learn model for churn prediction.',
      'Saved the trained model for reuse in deployed applications.',
      'Built a Dash dashboard for interactive analytics and model outputs.',
      'Created a Flask-based prediction layer for API-backed live predictions.'
    ],
    contribution: [
      'Worked on preprocessing and feature preparation.',
      'Trained and exported the machine learning model.',
      'Built deployment layers using Dash and Flask.',
      'Implemented live prediction input handling.'
    ],
    tech: ['Python', 'scikit-learn', 'pandas', 'Dash', 'Flask', 'Plotly', 'Jupyter Notebook'],
    skills: ['Machine learning workflow development', 'Model deployment', 'Feature engineering', 'Dashboard creation', 'Prediction pipeline design'],
    github: profile.github,
    image: `${base}assets/gallery/vr-headset-integration.jpeg`,
    gallery: [`${base}assets/gallery/beyond-adventure-graduation.jpeg`]
  },
  {
    title: 'Student Performance Prediction System',
    summary:
      'A machine learning system that uses academic and behavioural data to estimate student performance and surface predictions through interactive Dash and Flask applications.',
    purpose:
      'The project focused on using educational data to create predictive insights that could be explored through a browser-based user interface.',
    features: [
      'Accept student-related input data',
      'Generate predicted academic outcomes',
      'Present interactive prediction results',
      'Expose prediction endpoints for browser integrations',
      'Support feature scaling and consistent live inference'
    ],
    buildSteps: [
      'Prepared and explored student datasets in Jupyter notebooks.',
      'Engineered features and trained predictive models.',
      'Saved the final model for deployment use.',
      'Built a Dash application for data-driven prediction workflows.',
      'Added a Flask endpoint and browser-based interaction layer for live predictions.'
    ],
    contribution: [
      'Prepared and explored student performance data.',
      'Engineered features for modelling.',
      'Trained and exported machine learning models.',
      'Built deployment components using Dash and Flask.'
    ],
    tech: ['Python', 'scikit-learn', 'pandas', 'Dash', 'Flask', 'Plotly', 'HTML', 'CSS', 'JavaScript'],
    skills: ['Predictive model development', 'Feature engineering', 'Model deployment', 'Interactive dashboard development', 'ML application integration'],
    github: profile.github,
    image: `${base}assets/gallery/vr-headset-integration.jpeg`,
    gallery: [`${base}assets/gallery/ironman-completion.jpeg`]
  }
];

export const education = [
  {
    institution: 'Belgium Campus iTversity',
    period: 'Jan 2023 - Dec 2025',
    award: 'Bachelor of Computing (Software Engineering)',
    detail: 'Completed core software engineering modules including programming, databases, web programming, networking, and linear programming.'
  },
  {
    institution: 'Belgium Campus iTversity',
    period: 'Jan 2026 - In Progress',
    award: 'Bachelor of Computing (Software Engineering) Honours',
    detail: 'Continuing advanced study while strengthening portfolio-grade software engineering work.'
  },
  {
    institution: 'HyperionDev / Stellenbosch University',
    period: 'Feb 2026 - In Progress',
    award: 'Immersive Full Stack Web & Software Engineering Bootcamp',
    detail: 'Deepening modern frontend and software engineering practice through intensive project work.'
  },
  {
    institution: 'Eduvisa Graduate School of Management',
    period: 'Jan 2022 - Dec 2022',
    award: 'Foundation Diploma in Business Skills',
    detail: 'Completed modules in time management, administrative skills, project management, bookkeeping, and business etiquette.'
  },
  {
    institution: "St Benedict's College for Boys",
    period: 'Jan 2014 - Dec 2018',
    award: 'National Senior Certificate',
    detail: 'Core subjects included Mathematics, Information Technology, Business Studies, Accounting, English, and Afrikaans.',
    link: 'https://www.stbenedicts.co.za/'
  }
];

export const achievements = [
  'Completed the Beyond Adventure gap-year programme in 2022, reflecting discipline, resilience, leadership, and personal development.',
  'Academic transcript includes strong results in Mathematics, Programming, Linear Programming, Web Programming, and Innovation and Leadership.',
  'Foundation Diploma in Business Skills awarded on 2022-11-26.'
];

export const documents = [
  {
    title: 'ATS CV',
    description: 'Applicant tracking system friendly CV in Word format, updated with current experience.',
    href: `${base}assets/docs/Qiniso_Mngomezulu_CV_ATS.docx`,
    type: 'DOCX'
  },
  {
    title: 'Academic Transcript',
    description: 'Belgium Campus academic record and results summary.',
    href: `${base}assets/docs/AcademicPdf-Transcript.pdf`,
    type: 'PDF'
  },
  {
    title: 'CV PDF',
    description: 'Printable CV version for manual review.',
    href: `${base}assets/docs/CV-Qiniso-Manqoba-Mngomezulu.pdf`,
    type: 'PDF'
  },
  {
    title: 'Business Skills Diploma',
    description: 'Foundation Diploma in Business Skills certificate.',
    href: `${base}assets/docs/L3-FDip.Skill-Mngomezulu-Qiniso.pdf`,
    type: 'PDF'
  }
];

export const transcriptSnapshot = [
  'Mathematics 181: 82%',
  'Programming 181: 78%',
  'Linear Programming 181: 71%',
  'Web Programming 181: 63%',
  'Innovation and Leadership 101/102: 85%'
];

export const gallerySections = [
  {
    title: 'Innovation and Events',
    description: 'Conference exposure, teamwork, and project showcase moments.',
    images: [
      { src: `${base}assets/gallery/aws-azure-summit.jpeg`, alt: 'Qiniso at the AWS Summit Johannesburg event.' },
      { src: `${base}assets/gallery/capstone-team.jpeg`, alt: 'Qiniso with teammates at a formal graduation or project event.' },
      { src: `${base}assets/gallery/unity-capstone.jpeg`, alt: 'VR capstone poster presentation showing the project overview.' },
      { src: `${base}assets/gallery/vr-headset-integration.jpeg`, alt: 'Qiniso wearing a VR headset while testing the project setup.' }
    ]
  },
  {
    title: 'Beyond Adventure',
    description: 'Leadership, resilience, physical endurance, and growth beyond the classroom.',
    images: [
      { src: `${base}assets/gallery/beyond-adventure-activities.jpeg`, alt: 'Qiniso taking part in Beyond Adventure physical activities.' },
      { src: `${base}assets/gallery/beyond-adventure-graduation.jpeg`, alt: 'Qiniso with peers at the Beyond Adventure graduation.' },
      { src: `${base}assets/gallery/ironman-completion.jpeg`, alt: 'Qiniso during an endurance or team-building challenge.' },
      { src: `${base}assets/gallery/csr-lupas-walk.jpeg`, alt: 'Community or outreach event photo connected to CSR activities.' }
    ]
  },
  {
    title: 'School Journey',
    description: 'Moments from St Benedict’s that reflect discipline, recognition, and team sport.',
    images: [
      { src: `${base}assets/gallery/st-benedicts-awards.jpeg`, alt: 'Qiniso receiving an award at St Benedict’s.' },
      { src: `${base}assets/gallery/st-benedicts-soccer.jpeg`, alt: 'Qiniso playing soccer for St Benedict’s.' },
      { src: `${base}assets/gallery/st-benedicts-soccer-2.jpeg`, alt: 'Another football action shot from Qiniso’s St Benedict’s years.' }
    ]
  }
];
