export default function About() {
    const languages = [
        'Python', 'C++', 'Java', 'C', 'Embedded C', 'C#', 'SQL', 'Haskell', 'HTML', 'CSS', 'Bash', 'SystemVerilog'
    ]
    
    const libraries_and_frameworks = [
        'MATLAB', 'Simulink', 'Restinio', 'Firebase', 'LibCSP', 'UVM', 'Matplotlib', 'NumPy', 'SciPy',
        'React', 'FastAPI', 'Tailwind CSS', 'TypeScript', 'Pydantic', 'Pytest', 'Twilio'
    ]

    const tools = [
        'Git', 'GitHub', 'Linux', 'CMake', 'vcpkg', 'Perforce', 'Jenkins', 'Atlassian API', 'REST APIs', 'Vitis', 'Arduino',
        'Docker', 'PostgreSQL', 'Supabase', 'MQTT', 'Vercel', 'Render'
    ]

    const awards = [
        { name: "Dean's Honour List", value: "2022-24" },
        { name: 'Lawrence Tse Research Award', value: '$6,000' },
        { name: 'A.G. Reilly Scholarship', value: '$5,000' }
    ]

    return (
        <section id="about">
            <h2 className="section-title">About Me</h2>
            <div className="about-content">
                <div className="about-text">
                    <p>
                        Software Engineering student at McMaster University (Class of 2027) who has verified SERDES designs in C++, written firmware for satellite subsystems in Embedded C, and led the architecture and development of a full-stack IoT platform. I like working on problems where the software and the system are equally important.
                    </p>
                </div>
                <div>
                    <h3 style={{ fontSize: '0.85rem', color: 'var(--text)', opacity: 0.5, marginBottom: '0.75rem' }}>Recognition</h3>
                    {awards.map((award, index) => (
                        <div key={index} className="award-item">
                            <span className="award-name">{award.name}</span>
                            {award.value && <span className="award-value">{award.value}</span>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="skills-section">
                <div className="skills-category">
                    <h3 style={{ fontSize: '0.85rem', color: 'var(--text)', opacity: 0.5, marginBottom: '0.75rem' }}>Languages</h3>
                    <div className="skills-list">
                        {languages.map((language) => (
                            <span key={language} className="skill-tag">{language}</span>
                        ))}
                    </div>
                </div>

                <div className="skills-category">
                    <h3 style={{ fontSize: '0.85rem', color: 'var(--text)', opacity: 0.5, marginBottom: '0.75rem' }}>Libraries & Frameworks</h3>
                    <div className="skills-list">
                        {libraries_and_frameworks.map((library_and_framework) => (
                            <span key={library_and_framework} className="skill-tag">{library_and_framework}</span>
                        ))}
                    </div>
                </div>

                <div className="skills-category">
                    <h3 style={{ fontSize: '0.85rem', color: 'var(--text)', opacity: 0.5, marginBottom: '0.75rem' }}>Tools</h3>
                    <div className="skills-list">
                        {tools.map((tool) => (
                            <span key={tool} className="skill-tag">{tool}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
