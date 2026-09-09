interface Project {
    title: string
    subtitle: string
    description: string
    highlights?: Array<{ value?: string; label: string }>
    award?: string
    tech: string[]
    emoji: string
    githubUrl: string
    demoUrl?: string
    devpostUrl?: string
  }
  
  const projects: Project[] = [
    {
      title: 'F1 Battle Detector',
      subtitle: 'Real-Time Race Analytics',
      description: 'Real-time Formula 1 battle detection fusing 3 live OpenF1 data streams across 20 drivers on a 1.5s async polling loop. Composite scoring model ranks battles by weighted gap, closing rate, and pace delta, with a stability filter requiring a battle to persist across 3 consecutive polls before it surfaces. Cut the container image 82% (1.19GB to 210MB) with a multi-stage Docker build.',
      highlights: [
        { value: '82%', label: 'smaller image' },
        { value: '62', label: 'tests in CI' },
        { value: '1.5s', label: 'polling loop' }
      ],
      tech: ['Python', 'FastAPI', 'asyncio', 'Pydantic', 'Next.js', 'TypeScript', 'SWR', 'Docker', 'GitHub Actions'],
      emoji: '🏎️',
      githubUrl: 'https://github.com/harmanpreet-sagar/F1-Battle-Detector-Summarizer'
    },
    {
      title: 'SCEMAS',
      subtitle: 'Smart City Environmental Monitoring & Alert System',
      description: 'Full-stack IoT monitoring platform with real-time MQTT ingestion, configurable alert thresholds, and SSE-streamed live alerts to a React dashboard. Team lead on a 5-person build spanning 5 subsystems, personally owning Threshold Management and the API Facade while debugging and integrating across the rest.',
      highlights: [
        { label: '⚡ Real-time SSE Alerts' },
        { label: '🐳 Docker Compose' },
        { label: '👥 Team Lead, 5-Person Team' }
      ],
      tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Supabase', 'MQTT', 'Docker', 'JWT', 'Twilio', 'Tailwind CSS'],
      emoji: '🌿',
      githubUrl: 'https://github.com/harmanpreet-sagar/sfwreng-3a04-group6-t01-scemas',
      demoUrl: 'https://sfwreng-3a04-group6-t01-scemas.vercel.app'
    },
    {
      title: 'RBC-BizConnect',
      subtitle: 'Investor-Business Matching Platform',
      description: 'Built a scalable platform with secure Firebase authentication and a SQLite-backed data layer. Cut investor-business matching from quadratic to linear time with a single-pass algorithm, letting the platform scale to large datasets.',
      award: '🏆 1st Place — DeltaHacks IX',
      tech: ['Python', 'JavaScript', 'SQL', 'Firebase', 'HTML', 'CSS', 'Figma'],
      emoji: '💼',
      githubUrl: 'https://github.com/harmanpreet-sagar/Delta-Hacks',
      devpostUrl: 'https://devpost.com/software/rbc-bizconnect'
    },
    {
      title: 'MacWater',
      subtitle: 'Campus Water Filter Status Tracker',
      description: 'DeltaHacks X submission built with a 4-person team: a web app giving McMaster students real-time status of campus water filtration systems, showing which filters are working and which need replacement. Owned the backend and database in Node.js and SQL, serving status driven by the team’s image classifier.',
      award: '🎯 DeltaHacks X Submission',
      tech: ['HTML', 'CSS', 'JavaScript', 'SQL', 'Node.js', 'Figma'],
      emoji: '💧',
      githubUrl: 'https://github.com/harmanpreet-sagar/MacWater',
      devpostUrl: 'https://devpost.com/software/macwater'
    },
    {
      title: 'Humans vs Robots',
      subtitle: 'Space Edition Game',
      description: 'Interactive combat game in C# with the XNA Framework, built on object-oriented design with a real-time game loop handling collision detection, projectile physics, and CPU opponent behaviour. Supports keyboard and Xbox 360 controller input.',
      highlights: [
        { label: 'XNA Framework' },
        { value: '20+', label: 'playtesters' }
      ],
      tech: ['C#', 'XNA Framework', 'OOP'],
      emoji: '🎮',
      githubUrl: 'https://github.com/harmanpreet-sagar/Humans-vs-Robots'
    },
    {
      title: 'Robotic Car',
      subtitle: 'Autonomous Navigation System',
      description: 'Autonomous vehicle that detects obstacles with an ultrasonic sensor and halts to avoid collision. Built on Arduino with motor control circuitry, breadboard assembly, and a dual battery supply, documented with a circuit diagram, schematic, and full component list.',
      highlights: [
        { label: 'Ultrasonic Sensing' },
        { label: 'Arduino' }
      ],
      tech: ['C++', 'Arduino', 'Ultrasonic Sensing', 'PWM Motor Control', 'Embedded Circuit Design'],
      emoji: '🤖',
      githubUrl: 'https://github.com/harmanpreet-sagar/Robotic-Car'
    },
    {
      title: 'Maze Runner',
      subtitle: 'Maze Pathfinding Solver',
      description: 'Java maze solver that parses ASCII maze files and computes valid paths using BFS and right-hand traversal. Instruction parsing and validation covered by 27 JUnit tests for canonical and compressed paths, with a Maven CLI that benchmarks and times the two traversal strategies against each other.',
      highlights: [
        { label: 'BFS & Right-Hand' },
        { value: '27', label: 'JUnit tests' }
      ],
      tech: ['Java', 'Maven', 'JUnit', 'Algorithms', 'OOP'],
      emoji: '🧩',
      githubUrl: 'https://github.com/harmanpreet-sagar/Maze-Runner'
    },
    {
      title: 'Pacman',
      subtitle: 'Classic Arcade Recreation',
      description: 'Pacman recreation in Python and Pygame with arrow-key movement, orb collection, monster collision, sound effects, and persistent high scores. The four ghosts follow scripted patrol routes rather than pathfinding.',
      highlights: [
        { label: '4 Scripted Ghosts' },
        { label: 'Pygame' }
      ],
      tech: ['Python', 'Pygame', 'Game Dev'],
      emoji: '👻',
      githubUrl: 'https://github.com/harmanpreet-sagar/Pacman'
    }
  ]
  
  export default function Projects() {
    return (
      <section id="projects">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                {project.emoji}
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-description">{project.description}</p>
                <div className="project-highlights">
                  {project.award && (
                    <span className="project-award">{project.award}</span>
                  )}
                  {project.highlights?.map((highlight, highlightIndex) => (
                    <div key={highlightIndex} className="project-highlight">
                      {highlight.value && (
                        <span className="project-highlight-value">{highlight.value}</span>
                      )}
                      <span className="project-highlight-label">{highlight.label}</span>
                    </div>
                  ))}
                </div>
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex}>
                      {tech}
                      {techIndex < project.tech.length - 1 && ' • '}
                    </span>
                  ))}
                </div>
              </div>
              <div className="project-links">
                <a
                  href={project.githubUrl}
                  className="project-link-btn project-link-github"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* GitHub mark */}
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    className="project-link-btn project-link-demo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* External link icon */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                )}
                {project.devpostUrl && (
                  <a
                    href={project.devpostUrl}
                    className="project-link-btn project-link-devpost"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* Devpost "D" logomark */}
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M6 3h6.5C17.09 3 21 6.91 21 11.5S17.09 20 12.5 20H6V3zm4 3.5v10h2.5c2.76 0 5-2.24 5-5s-2.24-5-5-5H10z" />
                    </svg>
                    Devpost
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
}
  