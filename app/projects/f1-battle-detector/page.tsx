import type { Metadata } from 'next'
import BackgroundElements from '@/components/BackgroundElements'
import ThemeToggle from '@/components/ThemeToggle'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'F1 Battle Detector case study | Harmanpreet Singh Sagar',
  description:
    'How I turned a live-only F1 battle tracker into a replay of real races on serverless functions, and proved the replay sees exactly what live timing would have seen.',
}

const stats = [
  { value: '6', label: '2025 Grands Prix replayed' },
  { value: '167k+', label: 'OpenF1 rows cached' },
  { value: '322', label: 'backend tests in CI' },
  { value: '1.5 s', label: 'tick grid, same as live' },
]

const scoreTerms = [
  { label: 'Gap', weight: 0.5 },
  { label: 'Closing rate', weight: 0.3 },
  { label: 'Pace delta', weight: 0.2 },
]

const bugs = [
  {
    title: 'The safety car that never left',
    body: (
      <>
        Steward notices that merely mention the safety car, such as &ldquo;&hellip; SAFETY CAR
        INFRINGEMENT&rdquo;, were parsed as deployments. That froze the 2025 Bahrain GP under a
        safety car for its last 27 minutes. A safety car is now deployed only on race
        control&rsquo;s <code>SafetyCar</code> category.
      </>
    ),
  },
  {
    title: 'Racing that had not started',
    body: (
      <>
        The 2025 Belgian GP opened with 4 laps behind the safety car, and the dashboard showed them
        as racing, with battles, because race control never announces when racing begins after a
        rolling start. The fix reads the start messages and ends a rolling start when the leader
        completes the lap. I also added a test that replays every shipped race through the detector
        and fails on any battle shown under a neutralised track.
      </>
    ),
  },
  {
    title: 'One reading, counted three times',
    body: (
      <>
        OpenF1 intervals refresh more slowly than the poll loop, so a stability filter that counted
        polls let a battle &ldquo;mature&rdquo; on a single gap reading served three times. A
        battle now has to persist across 3 distinct gap samples before it is shown, and the closing
        rate de-duplicates repeated readings the same way.
      </>
    ),
  },
  {
    title: 'Retrying straight into a rate limit',
    body: (
      <>
        A fast ingest hit HTTP 429 and the client retried with no delay. It now backs off
        exponentially from a configurable base and honours <code>Retry-After</code>.
      </>
    ),
  },
]

export default function F1CaseStudy() {
  return (
    <>
      <BackgroundElements />
      <header className="cs-topbar">
        <a href="/" className="logo">Harmanpreet Singh Sagar</a>
        <a href="/#projects" className="cs-back">&larr; All projects</a>
      </header>
      <ThemeToggle />

      <main className="container cs">
        <p className="cs-kicker">Case study &middot; F1 Battle Detector</p>
        <h1 className="cs-title">Making a race replay behave exactly like live timing</h1>
        <p className="cs-lede">
          F1 Battle Detector ranks the on-track battles in a Formula 1 race. This is how I turned it
          from a live tracker that was empty most of the week into a replay of real races running on
          serverless functions, and how I proved the replay sees exactly what live timing would have
          seen.
        </p>

        <div className="cs-actions">
          <a
            href="https://f1-battle-detector-summarizer.vercel.app/"
            className="project-link-btn project-link-demo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live demo
          </a>
          <a
            href="https://github.com/harmanpreet-sagar/F1-Battle-Detector-Summarizer"
            className="project-link-btn project-link-github"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code on GitHub
          </a>
        </div>

        <div className="cs-stats">
          {stats.map((s) => (
            <div key={s.label} className="cs-stat">
              <span className="cs-stat-value">{s.value}</span>
              <span className="cs-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <section className="cs-section">
          <h2>1. Why a replay</h2>
          <p>
            The first version polled OpenF1&rsquo;s live timing. Live timing needs a paid token, and
            races only run a few hours a week, so anyone opening the demo almost always saw nothing.
            OpenF1&rsquo;s historical data is free. I wrote a phased plan and rebuilt the project
            around replaying recorded races, without giving up the live path.
          </p>
          <p>
            The demo now replays six 2025 Grands Prix (Bahrain, Austria, Britain, Belgium, Hungary
            and S&atilde;o Paulo) at 5x speed on a loop, and the dashboard says plainly that it is a
            recorded race, not live.
          </p>
        </section>

        <section className="cs-section">
          <h2>2. One pipeline, three data sources</h2>
          <p>
            I extracted a <code>RacePipeline</code> behind a <code>DataSource</code> interface with
            live, replay and mock implementations, selected by <code>DATA_MODE</code>, and injected
            a clock abstraction so detection runs in race time rather than wall time. The detector
            never knows which source is feeding it.
          </p>
          <p>Races get into the replay through an ingest CLI:</p>
          <pre className="cs-code"><code>python -m app.ingest --year 2025 --round 14</code></pre>
          <p>
            It fetches 10 OpenF1 endpoints per race and caches them as gzip-compressed JSON, with a
            manifest of row counts, sizes and content hashes. It is idempotent: a second run over a
            cached race makes zero requests, and a forced re-fetch writes nothing if the content hash
            has not changed. It also refuses any session that ended less than 45 minutes ago,
            because OpenF1&rsquo;s archive has not settled by then and the race would look complete
            while being partial. Each race comes to about 390 KB; the 2025 Hungarian GP alone is
            29,440 rows, 92% of them intervals.
          </p>
        </section>

        <section className="cs-section">
          <h2>3. Never knowing anything early</h2>
          <p>
            The 10 endpoints update on different cadences. The timeline builder merges them into one
            time-ordered event stream and stamps each event at the moment a live poller could first
            have known it. A lap time, for example, is stamped at the lap&rsquo;s start plus its
            duration, not at its start, so the replay can never see a lap time before live timing
            could have.
          </p>
          <p>
            The replay engine then steps through each race on the same 1.5-second tick grid a live
            poller sees, and hands the pipeline exactly what a live poll at that instant would have
            returned: the latest position and gap for each driver, with lap times refreshed only on
            the ticks a live poller would refresh them, every 10 seconds.
          </p>
        </section>

        <section className="cs-section">
          <h2>4. Proving it with a live-equivalence test</h2>
          <p>
            Saying the replay matches live timing is easy, so I wanted a test that fails when it does
            not. It sends 8 laps of the 2025 Hungarian GP down two paths and compares the battles
            they produce at every tick.
          </p>
          <div className="cs-diagram" role="img" aria-label="Two paths, a fake OpenF1 server feeding the real live client, and the replay engine, must produce identical battles at every tick">
            <div className="cs-diagram-paths">
              <div className="cs-path">
                <span className="cs-path-label">Path A: live</span>
                <span className="cs-node">Fake OpenF1 HTTP server</span>
                <span className="cs-arrow" aria-hidden="true">&darr;</span>
                <span className="cs-node">Real API client and live source, fake clock</span>
              </div>
              <div className="cs-path">
                <span className="cs-path-label">Path B: replay</span>
                <span className="cs-node">Cached race files</span>
                <span className="cs-arrow" aria-hidden="true">&darr;</span>
                <span className="cs-node">Replay engine on the 1.5 s grid</span>
              </div>
            </div>
            <span className="cs-arrow" aria-hidden="true">&darr;</span>
            <span className="cs-node cs-node-result">Identical battles at every tick</span>
          </div>
          <p>
            It is the strongest claim in the project, and it is tested end to end. It sits in a
            322-test pytest suite that runs in GitHub Actions on every push and pull request to main.
          </p>
        </section>

        <section className="cs-section">
          <h2>5. How a battle is scored</h2>
          <p>
            Each pair of adjacent drivers gets a composite score from three weighted terms. Yellow
            flags, safety cars, a red flag, a pit window or low-confidence data multiply the score
            down. A score above 0.55 is WATCH and above 0.70 is HOT.
          </p>
          <div className="cs-score" aria-label="Score weights: gap 0.5, closing rate 0.3, pace delta 0.2">
            {scoreTerms.map((t) => (
              <div key={t.label} className="cs-score-term" style={{ flexGrow: t.weight }}>
                <span className="cs-score-weight">{t.weight.toFixed(1)}</span>
                <span className="cs-score-label">{t.label}</span>
              </div>
            ))}
          </div>
          <p>
            Ranking adds one more idea: what is at stake. A battle&rsquo;s rank is its score boosted
            by the championship points that change hands if the chaser gets past, from 1x with
            nothing at stake up to 2x for the lead. A fight for the lead outranks almost anything,
            but a genuinely hot fight at the back can still beat a dull one in the points. The
            dashboard shows the breakdown for the top battle, so you can see why it ranks where it
            does.
          </p>
        </section>

        <section className="cs-section">
          <h2>6. A broadcast with no server behind it</h2>
          <p>
            Vercel freezes a function between requests, so nothing can keep a replay running. I made
            the schedule arithmetic instead of state: where the broadcast is depends only on the wall
            clock (<code>REPLAY_EPOCH</code> and <code>REPLAY_SPEED</code>). Each request works out
            which race and race time it is, replays the preceding 108 ticks (60 of history plus 48
            of detection) into a throwaway pipeline, and serves the result. Every viewer and every
            server instance sees the same moment. Red-flag stoppages are compressed to 5 wall
            seconds instead of a frozen screen.
          </p>
          <p>
            That rebuild takes about 30 to 40 ms warm. To find where the rest of a viewer&rsquo;s
            wait went, I added a <code>Server-Timing</code> header. On a Vercel preview, warm
            requests took 151 ms median, of which 70 to 81 ms was the app itself, so most of the
            wait is platform routing rather than the rebuild. The same code also ships as one
            multi-stage Docker image, where a single long-running pipeline replaces the per-request
            rebuild.
          </p>
        </section>

        <section className="cs-section">
          <h2>7. Bugs only real races could find</h2>
          <p>
            Mock data behaves. Recorded races do not, and replaying them surfaced bugs no synthetic
            test had.
          </p>
          <div className="cs-bugs">
            {bugs.map((b) => (
              <div key={b.title} className="cs-bug">
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cs-section">
          <h2>8. What comes next</h2>
          <p>
            These are planned and not built yet. Phase 2 will produce post-race battle reports and
            label whether each battle ended in a pass, which lets me evaluate the detector against
            real outcomes. Phase 3 is an overtake-prediction model, benchmarked against today&rsquo;s
            hand-tuned scoring.
          </p>
          <p>
            Two limits I know about: opening laps under-detect, because there is no pace delta before
            a lap completes, and blue flags are not detected, since pairs come from classified
            position rather than track position.
          </p>
        </section>

        <div className="cs-actions cs-actions-end">
          <a href="/#projects" className="project-link-btn project-link-github">&larr; Back to all projects</a>
          <a
            href="https://github.com/harmanpreet-sagar/F1-Battle-Detector-Summarizer"
            className="project-link-btn project-link-github"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the code
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}
