import Skills from './Skills'

const recognition = [
  { value: '3x', name: 'Dean’s Honour List' },
  { value: '$6,000', name: 'Lawrence Tse Research Award' },
  { value: '$5,000', name: 'A.G. Reilly Scholarship' },
  { value: '2x', name: 'Hackathon winner' },
]

const status = [
  { label: 'Graduating', title: 'June 2027', detail: 'Software Engineering at McMaster, 3.83 GPA' },
  { label: 'Looking for', title: 'New grad roles from May 2027', detail: 'Based in Ontario, Canada' },
  {
    label: 'Off the clock',
    title: 'Cricket, F1 and the Maple Leafs',
    detail: 'Plus intramural badminton, and travelling anywhere the food is worth the trip',
  },
]

export default function About() {
  return (
    <section id="about">
      <h2 className="section-title">
        <span className="section-num">01</span>About Me
      </h2>
      <div className="about-grid">
        <div className="about-text">
          <p className="about-opener">
            I build software that <span>has to be right</span>, then I go looking for the ways it isn’t.
          </p>
          <p>
            The common thread in my work: systems where a quiet bug turns into a very loud one. So most of what I
            build comes with a check whose only job is to prove me wrong, and I like it best when that check finds
            something.
          </p>
          <ul className="recognition" aria-label="Recognition">
            {recognition.map((r) => (
              <li key={r.name} className="recognition-pill">
                <b>{r.value}</b>
                {r.name}
              </li>
            ))}
          </ul>
        </div>
        <dl className="status-panel">
          {status.map((s) => (
            <div key={s.label} className="status-row">
              <dt>{s.label}</dt>
              <dd>
                <span className="status-title">{s.title}</span>
                <span className="status-detail">{s.detail}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <Skills />
    </section>
  )
}
