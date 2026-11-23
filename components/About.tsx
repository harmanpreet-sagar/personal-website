import Skills from './Skills'

const awards = [
  { name: "Dean's Honour List", value: '3x' },
  { name: 'Lawrence Tse Research Award', value: '$6,000' },
  { name: 'A.G. Reilly Scholarship', value: '$5,000' },
  { name: 'McMaster University Award of Excellence', value: '2022' },
]

const problems = [
  {
    project: 'Revisit',
    title: 'An AI that isn’t allowed to make things up.',
    body: 'Ask a language model why a lake shrank and it will happily invent an answer. So the model only copies sentences off real pages, code checks each one word for word, and a separate checker must agree before a claim reaches the film.',
    result: '0 unsupported claims, every run',
  },
  {
    project: 'RunwayZero',
    title: 'Physics couldn’t see a jet start its takeoff roll.',
    body: 'The Kalman filter forecasting aircraft at Boston Logan fell apart the moment a jet began accelerating. I trained a LightGBM model to learn the filter’s own mistakes, validated on held-out time blocks.',
    result: '74% less error on accelerating jets',
  },
  {
    project: 'F1 Battle Detector',
    title: 'A live race broadcast on a server with no memory.',
    body: 'Serverless functions forget everything between requests, so nothing can keep six real Grands Prix running. I made the broadcast pure arithmetic on the clock: every request works out where the race is and rebuilds that exact moment, so every viewer sees the same lap.',
    result: '30-40 ms to rebuild any race moment',
  },
  {
    project: 'Synopsys',
    title: 'Broken builds kept slipping into the depot.',
    body: 'I designed a two-tier regression system: a fast pre-commit gate backed by a 3-hour nightly run. Then I parallelized the gate so engineers waited 18 minutes instead of 40.',
    result: '90% fewer broken builds',
  },
]

export default function About() {
  return (
    <section id="about">
      <h2 className="section-title">
        <span className="section-num">01</span>About Me
      </h2>
      <div className="about-content">
        <div className="about-text">
          <p className="about-opener">
            I build software that <span>has to be right</span>, then I go looking for the ways it isn’t.
          </p>
          <p>
            Final year of Software Engineering at McMaster. Sixteen months at Synopsys on chip-verification
            tooling, flight software for the PRESET CubeSat, and now research at McSCert on whether LLMs quote
            their sources honestly. The common thread: systems where a quiet bug turns into a very loud one.
          </p>
        </div>
        <div>
          <h3 className="about-subhead">Recognition</h3>
          {awards.map((award) => (
            <div key={award.name} className="award-item">
              <span className="award-name">{award.name}</span>
              <span className="award-value">{award.value}</span>
            </div>
          ))}
        </div>
      </div>

      <h3 className="problems-title">Problems I’m proudest of solving</h3>
      <div className="problems-grid">
        {problems.map((p) => (
          <article key={p.project} className="problem-card">
            <span className="problem-project">{p.project}</span>
            <h4>{p.title}</h4>
            <p>{p.body}</p>
            <span className="problem-result">{p.result}</span>
          </article>
        ))}
      </div>

      <Skills />
    </section>
  )
}
