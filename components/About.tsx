export default function About() {
  const skills = [
    'Python', 'C++', 'Java', 'C', 'Embedded C', 'Haskell',
    'SQL', 'MATLAB', 'Simulink', 'Jenkins', 'Git', 'Linux'
  ]

  const awards = [
    { name: "Dean's Honour List", value: null },
    { name: 'Lawrence Tse Research Award', value: '$6,000' },
    { name: 'A.G. Reilly Scholarship', value: '$5,000' }
  ]

  return (
    <section id="about">
      <h2 className="section-title">About Me</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            I&apos;m a Software Engineering student at McMaster University (Class of 2027) passionate about building efficient systems and solving complex problems. Currently, I work as a System Architecture & Modelling Engineering Intern at Synopsys Inc., where I&apos;ve reduced CI/CD pipeline runtimes by 55% and improved depot stability by 90%.
          </p>
          <p>
            Beyond my internship, I serve as Community & Code Co-Lead for Google Developer Groups McMaster, organizing workshops for 400+ students. I also develop firmware for satellite subsystems with the McMaster Interdisciplinary Satellite Team.
          </p>
          <p>
            Previously, I worked as a Research Assistant at McMaster, contributing to the Drasil project by improving validation accuracy across 200k+ lines of code. I enjoy tackling challenges from embedded systems to high-speed SERDES verification.
          </p>
        </div>
        <div>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--text)', opacity: 0.5, marginBottom: '0.75rem' }}>Skills</h3>
          <div className="skills-list">
            {skills.map((skill) => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
          <div className="awards-list">
            <h3 style={{ fontSize: '0.85rem', color: 'var(--text)', opacity: 0.5, marginBottom: '0.75rem' }}>Recognition</h3>
            {awards.map((award, index) => (
              <div key={index} className="award-item">
                <span className="award-name">{award.name}</span>
                {award.value && <span className="award-value">{award.value}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

