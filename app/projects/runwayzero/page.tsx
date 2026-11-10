import type { Metadata } from 'next'
import Image from 'next/image'
import BackgroundElements from '@/components/BackgroundElements'
import ThemeToggle from '@/components/ThemeToggle'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'RunwayZero case study | Harmanpreet Singh Sagar',
  description:
    'A human-vs-AI game for runway-crossing calls on real Boston Logan traffic: how we turned a recording into fair puzzles, degraded surveillance for Fog mode, and built an ML forecaster that knows when it is unsure.',
}

const stats = [
  { value: '20', label: 'real Logan crossings' },
  { value: '3', label: 'conditions, incl. Fog' },
  { value: '25 m', label: 'ML error at 10 s (Kalman: 33 m)' },
  { value: '40', label: 'pipeline tests in CI' },
]

const scoring = [
  { points: 100, label: 'Right at 95%' },
  { points: 94, label: 'Right at 75%' },
  { points: 75, label: 'Any call at 50%' },
  { points: 44, label: 'Wrong at 75%' },
  { points: 10, label: 'Wrong at 95%' },
]

const results = [
  { model: 'Learned model (LightGBM on Kalman)', accuracy: '65%', brier: '0.24' },
  { model: 'Kalman filter', accuracy: '55%', brier: '0.29' },
  { model: 'Constant velocity', accuracy: '55%', brier: '0.35' },
]

const pitfalls = [
  {
    title: 'The map was sideways',
    body: (
      <>
        The dataset stores positions in kilometres with x pointing north and y pointing east. Our
        contract is metres with x east and y north, so until the rotation was fixed every track
        sat off the runways. A picture of the cleaned tracks over the map is now a step in the
        pipeline, not an afterthought.
      </>
    ),
  },
  {
    title: 'Every real crossing was safe',
    body: (
      <>
        In the recorded hour, the closest any aircraft came to a crossing vehicle was 150 m, so
        &ldquo;always CLEAR&rdquo; would have been unbeatable. What-if puzzles fixed that without
        inventing traffic (section 3).
      </>
    ),
  },
  {
    title: 'Freezes that made no sense',
    body: (
      <>
        Early freezes caught aircraft already inside the crossing, already past it, or off the
        map. A five-part threat rule now decides which aircraft counts, and the puzzle set was
        checked visually, one freeze at a time.
      </>
    ),
  },
  {
    title: 'A cone that was too sure in fog',
    body: (
      <>
        The Kalman cone was calibrated on clean tracks, so it was overconfident when reports went
        missing. Recalibrating it on gappy data widened the cone exactly where the data is old.
      </>
    ),
  },
]

function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="cs-figure">
      <Image src={src} alt={alt} width={1600} height={1000} sizes="(max-width: 900px) 100vw, 760px" />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export default function RunwayZeroCaseStudy() {
  return (
    <>
      <BackgroundElements />
      <header className="cs-topbar">
        <a href="/" className="logo">Harmanpreet Singh Sagar</a>
        <a href="/#projects" className="cs-back">&larr; All projects</a>
      </header>
      <ThemeToggle />

      <main className="container cs">
        <p className="cs-kicker">Case study &middot; RunwayZero &middot; Best In The Clouds Hack, HackRPI 2026</p>
        <h1 className="cs-title">Can you clear a runway crossing better than an AI?</h1>
        <p className="cs-lede">
          RunwayZero is a training game built on real recorded surface traffic at Boston Logan. A
          vehicle is holding short of a runway, an aircraft is coming, and you have to decide.
          An ML player makes the same call from the same frames, then the recording shows what
          really happened. Harnoor Sagar and I built it together at HackRPI 2026, where it won Best
          In The Clouds Hack among 80 teams. I led the data pipeline, the forecasting models and the
          evaluation; Harnoor led the front end.
        </p>

        <div className="cs-actions">
          <a
            href="https://runway-zero.vercel.app"
            className="project-link-btn project-link-demo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Play it
          </a>
          <a
            href="https://github.com/harmanpreet-sagar/RunwayZero"
            className="project-link-btn project-link-github"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code on GitHub
          </a>
          <a
            href="https://devpost.com/software/runwayzero"
            className="project-link-btn project-link-devpost"
            target="_blank"
            rel="noopener noreferrer"
          >
            Devpost
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

        <Figure
          src="/images/projects/runwayzero-intro.webp"
          alt="RunwayZero start screen beside a live surface scope of Boston Logan"
          caption="The start screen. Everything on the scope is a real recorded aircraft or vehicle at Logan."
        />

        <section className="cs-section">
          <h2>1. Why runway crossings</h2>
          <p>
            Serious runway incursions in the U.S. rose by a reported 44% in 2025. Many of them
            start with the same small decision: a controller clears a vehicle across an active
            runway, in seconds, from a surface display that may be a little out of date. We wanted
            a way to practise that decision on real traffic, and to ask a sharper question than
            &ldquo;who was right&rdquo;: who knows better when they are unsure?
          </p>
          <p>
            RunwayZero is a practice tool for controllers in training and airside drivers. It is
            not a certified simulator or an ATC system, and the site says so on the first screen.
          </p>
        </section>

        <section className="cs-section">
          <h2>2. One round</h2>
          <p>
            Traffic plays, then freezes as a vehicle holds short of the runway. You transmit CLEAR
            or HOLD and how sure you are: 50, 75 or 95%. The AI makes the same call and shows its
            reasoning and its forecast cone. Then the recording plays out, and HOLD was right if
            the vehicle and the runway traffic came within 100 m (328 ft) while the vehicle was in
            the crossing zone.
          </p>
          <p>
            Both players are scored with the Brier score, the standard score for probability
            forecasts. It rewards being right, and it rewards knowing how sure to be: a confident
            wrong call costs far more than a hedged one.
          </p>
          <div className="cs-scoring" aria-label="Points per call">
            {scoring.map((r) => (
              <div key={r.label} className="cs-scoring-row">
                <span className="cs-scoring-points">{r.points}</span>
                <span>{r.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="cs-section">
          <h2>3. Turning a recording into a fair puzzle</h2>
          <p>
            The data is one hour of Logan surface traffic from the CMU Amelia-48 dataset (FAA SWIM
            data), one report per second. A Python truth layer cleans the tracks, builds the airport
            map, and puts a crossing zone wherever vehicles cross a runway. The puzzle generator
            then cuts rounds out of real moments. One finding shaped everything: in the recorded hour,
            every real crossing was safe (the closest any aircraft came was 150 m), so &ldquo;always
            CLEAR&rdquo; would have been unbeatable. So every one of the 20 rounds is a what-if built
            from real tracks, under two rules:
          </p>
          <ul>
            <li>
              <strong>The vehicle always replays a crossing it really made.</strong> We never invent a
              path for it, so the reveal shows the consequence of a real crossing.
            </li>
            <li>
              <strong>Only the timing is shifted.</strong> Some vehicles waited at the hold line while
              jets used the runway. For those moments, the vehicle&rsquo;s own real crossing starts at
              the freeze, and every aircraft moves exactly as recorded. Rounds are labelled WHAT IF,
              but only after you lock in.
            </li>
          </ul>
          <p>
            HOLD rounds were picked by time alone, never by how the AI did on them, and the models
            never train on time windows used for puzzles.
          </p>
        </section>

        <section className="cs-section">
          <h2>4. Fog mode</h2>
          <p>
            Real surveillance fails in a few typical ways, and Fog mode applies all of them, seeded
            per puzzle so a puzzle always looks the same. The question aircraft&rsquo;s reports
            stop for the last 6 to 12 seconds, so it is drawn at its last known position, marked
            stale and then lost. Every other report is a couple of seconds old, and every position
            is off by a few metres. The reveal is never degraded, and the AI only sees the same
            degraded frames you do.
          </p>
          <Figure
            src="/images/projects/runwayzero-fog.webp"
            alt="A Fog mode round: the runway aircraft's track is lost 7 seconds ago and drawn as a dashed ghost"
            caption="A Fog mode freeze. The aircraft on the runway was last seen 7 s ago, so you only know where it was."
          />
        </section>

        <section className="cs-section">
          <h2>5. Three forecasters, one AI player</h2>
          <p>
            The AI forecasts every aircraft on the runway for the next 30 seconds as a cloud of
            possible futures, assumes the vehicle drives straight across at a typical speed, and
            counts how many futures put an aircraft within 100 m while the vehicle is on the runway.
            That share becomes its confidence, snapped to 50, 75 or 95% like your buttons. Only the
            forecaster changes:
          </p>
          <ul>
            <li>
              <strong>Constant velocity</strong>, the baseline: keep doing what you were doing.
            </li>
            <li>
              <strong>A Kalman filter</strong> that also tracks acceleration, so it sees a takeoff
              roll or a landing jet braking. Its uncertainty grows with every second it predicts
              without a new report, so old data widens the cone. It samples 400 futures, and the
              cone is scaled so it really contains the truth about 90% of the time.
            </li>
            <li>
              <strong>A LightGBM model that learns the Kalman filter&rsquo;s error</strong>, in the
              aircraft&rsquo;s own frame (further ahead or behind, left or right). Physics cannot
              know that a slow jet lined up on an active runway is about to roll; a model trained
              on the rest of the hour can. It was trained on both clean and fog-like slices, and
              validated with 5-fold cross-validation over 10-minute blocks, with gaps between them
              so neighbouring seconds cannot leak across folds.
            </li>
          </ul>
          <Figure
            src="/images/projects/runwayzero-ai-call.webp"
            alt="The AI's call: HOLD at 75%, with the predicted aircraft path and uncertainty cone drawn on the scope and its reasoning in plain English"
            caption="After you lock in, the ML player shows its call, its forecast cone and its reasoning, with the two simpler models' calls underneath."
          />
        </section>

        <section className="cs-section">
          <h2>6. Results</h2>
          <p>
            Ten seconds ahead, on held-out data, the learned model&rsquo;s position error was 25 m
            against 33 m for the Kalman filter. Playing all 20 puzzles:
          </p>
          <div className="cs-table-wrap">
            <table className="cs-table">
              <thead>
                <tr>
                  <th scope="col">AI player</th>
                  <th scope="col">Calls right</th>
                  <th scope="col">Brier (lower is better)</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.model}>
                    <td>{r.model}</td>
                    <td>{r.accuracy}</td>
                    <td>{r.brier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Twenty puzzles is a small sample, so these are directions, not conclusions. The most
            honest number is the hardest one: in Fog mode, all three models got only 2 of 6 rounds
            right. When the data is old, a better forecaster does not help much, which is exactly
            the situation the game is meant to train for.
          </p>
        </section>

        <section className="cs-section">
          <h2>7. Debriefs that cannot make things up</h2>
          <p>
            After each round, a short debrief explains what happened. The debriefs are written by
            Gemini ahead of time, with no live API calls during play. Python computes the facts
            first, using the same rules the game shows, and Gemini only gets those facts. Every
            number in its answer must appear in them and every aircraft ID must be one we gave it;
            otherwise it gets one retry, and then the puzzle has no debrief. Each one was also read
            by a person before it shipped.
          </p>
          <Figure
            src="/images/projects/runwayzero-reveal.webp"
            alt="The reveal of a WHAT IF round: closest approach 32 ft, HOLD was right, with the Gemini debrief explaining why"
            caption="A reveal. Both players held at 75%, the closest approach was 32 ft, and the debrief points out why the speed estimate was misleading."
          />
        </section>

        <section className="cs-section">
          <h2>8. Two people, one contract</h2>
          <p>
            With 24 hours and two people, the risk was the two halves not fitting. Before writing
            any pipeline code we agreed a data contract: JSON Schemas as the source of truth, a
            TypeScript mirror the web app imports, and mock fixtures so the front end never waited
            on real data. Every export goes through a validator, and CI checks the Python tests,
            the TypeScript contract against the fixtures, and the web build on every push. The game
            itself is fully static: Python precomputes every puzzle to JSON and Next.js serves it
            from Vercel.
          </p>
        </section>

        <section className="cs-section">
          <h2>9. What went wrong along the way</h2>
          <div className="cs-bugs">
            {pitfalls.map((b) => (
              <div key={b.title} className="cs-bug">
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cs-section">
          <h2>10. Limits and what comes next</h2>
          <p>
            The puzzles come from one hour at one airport, fog is simulated on real tracks, and the
            game has not yet been tested with controllers in training. Next: more airports
            and crossings, a shared leaderboard, sensor faults the player can trigger, and a proper
            study of whether people get overconfident when surveillance degrades.
          </p>
        </section>

        <div className="cs-actions cs-actions-end">
          <a href="/#projects" className="project-link-btn project-link-github">&larr; Back to all projects</a>
          <a
            href="https://runway-zero.vercel.app"
            className="project-link-btn project-link-demo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Play RunwayZero
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}
