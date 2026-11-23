import Skills from './Skills'

export default function About() {
    const awards = [
        { name: "Dean's Honour List", value: '3x' },
        { name: 'Lawrence Tse Research Award', value: '$6,000' },
        { name: 'A.G. Reilly Scholarship', value: '$5,000' },
        { name: 'McMaster University Award of Excellence', value: '2022' }
    ]

    return (
        <section id="about">
            <h2 className="section-title">About Me</h2>
            <div className="about-content">
                <div className="about-text">
                    <p>
                        Software Engineering student at McMaster University (Class of 2027) who has verified SERDES designs in C++, written firmware for satellite subsystems in Embedded C, and led the architecture and development of a full-stack IoT platform. I am now a part-time research assistant at McSCert, testing how reliably an LLM pipeline extracts safety claims from AI model cards. I like working on problems where the software and the system are equally important.
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

            <Skills />
        </section>
    )
}
