interface Project {
  title: string
  subtitle: string
  description: string
  highlights?: Array<{ value?: string; label: string }>
  award?: string
  tech: string[]
  emoji: string
  githubUrl: string
}

const projects: Project[] = [
  {
    title: 'RBC-BizConnect',
    subtitle: 'Investor-Business Matching Platform',
    description: 'Built a scalable platform with secure Firebase auth and an efficient matching algorithm that reduced investor-business match time by 90%.',
    award: '🏆 1st Place — DeltaHacks IX',
    tech: ['Python', 'JavaScript', 'SQL', 'Firebase', 'HTML', 'CSS', 'Figma'],
    emoji: '💼',
    githubUrl: 'https://github.com/harmanpreet-sagar/Delta-Hacks'
  },
  {
    title: 'MacWater',
    subtitle: 'Campus Water Fountain Tracker',
    description: 'DeltaHacks X submission — a web app helping students locate and rate water fountains across McMaster campus with real-time availability.',
    award: '🏆 DeltaHacks X',
    tech: ['JavaScript', 'Node.js', 'Maps API'],
    emoji: '💧',
    githubUrl: 'https://github.com/harmanpreet-sagar/MacWater'
  },
  {
    title: 'Humans vs Robots',
    subtitle: 'Space Edition Game',
    description: 'A shooter game where players defeat enemies while dodging bullets. Supports Xbox controller and keyboard input with clean UI/UX.',
    highlights: [
      { label: 'XNA Framework' },
      { label: 'Xbox Controller' }
    ],
    tech: ['C#', 'XNA', 'OOP'],
    emoji: '🎮',
    githubUrl: 'https://github.com/harmanpreet-sagar/Humans-vs-Robots'
  },
  {
    title: 'Robotic Car',
    subtitle: 'Autonomous Navigation System',
    description: 'Led system design for autonomous navigation with ultrasonic sensing. Reduced motor control latency by 40% and wiring failures by 50%.',
    highlights: [
      { value: '40%', label: 'less latency' },
      { value: '20-30cm', label: 'detection' }
    ],
    tech: ['C++', 'Arduino', 'Ultrasonic Sensing', 'PWM Motor Control', 'Embedded Circuit Design'],
    emoji: '🤖',
    githubUrl: 'https://github.com/harmanpreet-sagar/Robotic-Car'
  },
  {
    title: 'Maze Runner',
    subtitle: 'Pathfinding Algorithm Visualizer',
    description: 'Implemented BFS and DFS algorithms to solve mazes with visual path tracing. Built with clean OOP architecture for software design course.',
    highlights: [
      { label: 'BFS/DFS' },
      { label: 'Visualization' }
    ],
    tech: ['Java', 'Algorithms', 'OOP'],
    emoji: '🧩',
    githubUrl: 'https://github.com/harmanpreet-sagar/Maze-Runner'
  },
  {
    title: 'Pacman',
    subtitle: 'Classic Arcade Recreation',
    description: 'Recreated the classic Pacman game with Python and Pygame. Features ghost AI, score tracking, and authentic arcade gameplay mechanics.',
    highlights: [
      { label: 'Ghost AI' },
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
          <a
            key={index}
            href={project.githubUrl}
            className="project-card"
            target="_blank"
            rel="noopener noreferrer"
          >
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
          </a>
        ))}
      </div>
    </section>
  )
}

