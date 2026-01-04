interface Project {
  title: string
  subtitle: string
  description: string
  highlights?: Array<{ value: string; label: string }>
  award?: string
  tech: string[]
  emoji: string
}

const projects: Project[] = [
  {
    title: 'RBC-BizConnect',
    subtitle: 'Investor-Business Matching Platform',
    description: 'Built a scalable platform with secure Firebase auth and an efficient matching algorithm that reduced investor-business match time by 90%.',
    award: '🏆 1st Place — DeltaHacks IX',
    tech: ['Python', 'JavaScript', 'SQL', 'Firebase', 'HTML', 'CSS', 'Figma'],
    emoji: '💼'
  },
  {
    title: 'Robotic Car',
    subtitle: 'Autonomous Navigation System',
    description: 'Led system design for autonomous navigation with ultrasonic sensing. Reduced motor control latency by 40% and wiring failures by 50%.',
    highlights: [
      { value: '40%', label: 'less latency' },
      { value: '20-30cm', label: 'detection range' }
    ],
    tech: ['C++', 'Arduino', 'Ultrasonic Sensing', 'PWM Motor Control','Embedded Circuit Design'],
    emoji: '🤖'
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
              {/* Replace with: <img src="project1.jpg" alt={project.title}> */}
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
                    <span className="project-highlight-value">{highlight.value}</span>
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
          </div>
        ))}
      </div>
    </section>
  )
}

