import type { Metadata } from 'next'
import Image from 'next/image'
import BackgroundElements from '@/components/BackgroundElements'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Revisit case study | Harmanpreet Singh Sagar',
  description:
    'Type any place on Earth and get a narrated, sourced film of how it changed since 1984: how we turned 40 years of Landsat imagery into measured changes, and built an AI agent that explains them without making anything up.',
}

const stats = [
  { value: '43', label: 'summers of Landsat per place' },
  { value: '7 of 7', label: 'test changes found' },
  { value: '0', label: 'unsupported claims' },
  { value: '262', label: 'backend tests in CI' },
]

const detectors = [
  { method: 'Window means + pixel layer', found: '8 of 9', control: '0', contradictions: '7', tiny: '12' },
  { method: 'Segment fitting', found: '4 of 9', control: '0', contradictions: '1', tiny: '0' },
  { method: 'ruptures (change-point library)', found: '3 of 9', control: '0', contradictions: '0', tiny: '0' },
  { method: 'Combined (shipped)', found: '7 of 7', control: '0', contradictions: '0', tiny: '0' },
]

const pitfalls = [
  {
    title: 'A new bridge was erased as cloud',
    body: (
      <>
        Landsat&rsquo;s own quality flags marked the bright new concrete of the Gordie Howe bridge as
        cloud in every scene, so the biggest real change in Delray became a hole. A
        persistent-bright-surface guard now keeps a pixel when it is flagged in most scenes but
        steadily bright and confirmed by a neighbouring summer. Holes on the deck fell from 12.7% to
        1.5%.
      </>
    ),
  },
  {
    title: 'Lake Mead was “84% built-up”',
    body: (
      <>
        Algae-tinted water passes the usual built-up test. Excluding water from the built-up
        measure, and averaging greenness over land only, fixed two numbers that were swinging with
        the lake level. Both fixes went into the shared contract as new versions, agreed by both of
        us.
      </>
    ),
  },
  {
    title: '96% of AI requests were rate-limited',
    body: (
      <>
        During testing, three experiments shared one Gemini quota, and every retry counted against a
        story&rsquo;s call budget, quietly turning real causes into &ldquo;unknown&rdquo;. Requests
        are now paced, and rate-limit retries have their own allowance. When the daily quota ran out
        on build day, every change stayed &ldquo;cause unknown&rdquo; and nothing was invented.
      </>
    ),
  },
  {
    title: 'A 51-foot drop became “a record low”',
    body: (
      <>
        Some overreach passes a word-for-word check: the quote is real, but the claim says more than
        it does. Every number and words like &ldquo;record&rdquo;, &ldquo;half&rdquo; or
        &ldquo;doubled&rdquo; must now appear in the claim&rsquo;s own quotes, and a separate checker
        call has to agree.
      </>
    ),
  },
  {
    title: 'The test was too easy to pass',
    body: (
      <>
        Our first change-detection scorer crowned a method that found 8 of 9 changes by spraying
        tiny patches, three of them &ldquo;urban growth&rdquo; while built-up land was falling. A
        stricter scorer with one-to-one matching and counts of contradictions exposed it (section 4).
      </>
    ),
  },
  {
    title: 'Antivirus broke every download',
    body: (
      <>
        The laptop&rsquo;s antivirus re-signs HTTPS certificates, so Python rejected every request.
        Trusting the operating system&rsquo;s certificate store fixed it without ever turning
        certificate checks off.
      </>
    ),
  },
]

function Figure({ src, alt, caption, width = 1600, height = 1000 }: { src: string; alt: string; caption: string; width?: number; height?: number }) {
  return (
    <figure className="cs-figure">
      <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 900px) 100vw, 760px" />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export default function RevisitCaseStudy() {
  return (
    <>
      <BackgroundElements />
      <header className="cs-topbar">
        <a href="/" className="logo">Harmanpreet Singh Sagar</a>
        <a href="/#projects" className="cs-back">&larr; All projects</a>
      </header>

      <main className="container cs">
        <p className="cs-kicker">Case study &middot; Revisit &middot; Hack The Nest 2026</p>
        <h1 className="cs-title">What happened to the places we grew up in, and why?</h1>
        <p className="cs-lede">
          Revisit turns any place on Earth into a 60 to 90 second narrated film of how it changed
          since 1984, built from real NASA Landsat imagery. It measures what changed and when, finds
          documented events that explain each change, and links every claim to a quote it checked
          word for word. When it cannot find a cause, it says so instead of guessing. Vanessa Lai and
          I built it together at Hack The Nest 2026. I led the satellite pipeline, change detection
          and the cause agent; Vanessa led the web app, the 3D globe, the film player and the
          narration.
        </p>

        <div className="cs-actions">
          <a
            href="https://revisit-earth.vercel.app/"
            className="project-link-btn project-link-demo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch a film
          </a>
          <a
            href="https://github.com/vanessa-laii/Hack-The-Nest"
            className="project-link-btn project-link-github"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code on GitHub
          </a>
          <a
            href="https://devpost.com/software/earth-memories"
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
          src="/images/projects/revisit-film-page.webp"
          alt="Revisit film player showing Lake Mead in 2010, with the caption: Records show: since 1999, a multi-year drought and increased water demand have caused Lake Mead's water levels to decline"
          caption="The Lake Mead film, paused at 2010. The caption is a claim the agent could back with a verified quote."
          width={800}
          height={500}
        />

        <section className="cs-section">
          <h2>1. Change too slow to see</h2>
          <p>
            The biggest changes to the places we live happen too slowly to notice: a lake shrinks a
            few metres a year, farmland becomes subdivisions one block at a time, a forest burns and
            grows back over a decade. The evidence exists. Landsat satellites have photographed every
            patch of land since the 1980s at 30 m per pixel. But that archive is built for
            specialists, with raw reflectance bands, cloud bit flags and five different satellites.
            And even when you can see that a place changed, nothing tells you why.
          </p>
          <p>
            We wanted something a teacher could show a class about their own town, a local journalist
            could check, or anyone could use to ask &ldquo;what was here before?&rdquo;
          </p>
        </section>

        <section className="cs-section">
          <h2>2. From a place name to a film</h2>
          <ul>
            <li><strong>Find the place</strong> with OpenStreetMap and draw a 6 km square around it. If several places match, you pick; we never guess.</li>
            <li><strong>Build one clean picture per summer</strong> from every usable Landsat scene, 1984 to 2026.</li>
            <li><strong>Measure</strong> each summer: how green the land is, how much is water, how much is bare or built-up.</li>
            <li><strong>Find lasting changes</strong>: a lake shrinking over a decade, a fire in one summer, a demolished plant.</li>
            <li><strong>Find causes</strong> on the web, keeping only claims whose quotes appear word for word on the page, name the place and fall in the right years.</li>
            <li><strong>Narrate</strong> a 150 to 225 word script as a film: the timelapse plays, captions follow the voice, and every claim opens its exact source.</li>
          </ul>
          <Figure
            src="/images/projects/revisit-globe.webp"
            alt="Revisit landing page: a 3D globe with glowing markers for each place and a place picker"
            caption="The landing globe. Each marker is a place with a finished film."
            width={800}
            height={500}
          />
        </section>

        <section className="cs-section">
          <h2>3. One clean picture per summer</h2>
          <p>
            Every frame is real Landsat Collection 2 data from Microsoft Planetary Computer, with no
            generated images anywhere. Before choosing how to load it, we timed three loaders on the
            same 43 years: the slowest, reading all 546 scenes, took 803 seconds; the one we kept
            took 14 to 21. Keeping only
            the clearest scenes per summer and searching all summers in parallel cut the search alone
            from 25 seconds to 3. A full imagery build now takes about 39 seconds, and 3 seconds from
            cache.
          </p>
          <p>
            Each summer becomes a per-pixel median of its cloud-, shadow- and snow-masked scenes,
            drawn with one fixed colour stretch for every year, so a change in brightness is a real
            change. We compared three ways to composite on a control site where nothing should
            change, and the median flickered least. Summers with less than 60% clear sky are skipped,
            with the reason recorded, never filled in from other years.
          </p>
          <Figure
            src="/images/projects/revisit-lake-mead.webp"
            alt="Lake Mead from Landsat in 1999 and 2010: the shoreline has retreated and the water has narrowed"
            caption="Lake Mead, 1999 and 2010, from the same 6 km square. Real Landsat composites, one fixed colour stretch."
            width={1536}
            height={760}
          />
        </section>

        <section className="cs-section">
          <h2>4. Finding changes that are real</h2>
          <p>
            Every change becomes a chapter of the film and a sentence in the narration, so a false
            alarm is costly. The detector works in two layers. A place-wide layer fits straight-line
            segments to each summer&rsquo;s greenness, water and built-up measures, judged against
            each place&rsquo;s own year-to-year noise. A local layer looks pixel by pixel for patches
            of at least 4 hectares that fully flipped, because a demolished plant covers about 1% of
            the square and disappears in the averages. A change must last at least two summers
            (fires excepted), survive a switch between satellites, and never contradict its own
            number. Central Park in New York is the control: it must produce zero changes.
          </p>
          <p>We scored four methods on the same test places with a strict one-to-one scorer:</p>
          <div className="cs-table-wrap">
            <table className="cs-table">
              <thead>
                <tr>
                  <th scope="col">Method</th>
                  <th scope="col">Changes found</th>
                  <th scope="col">At the control</th>
                  <th scope="col">Contradictions</th>
                  <th scope="col">Tiny</th>
                </tr>
              </thead>
              <tbody>
                {detectors.map((d) => (
                  <tr key={d.method}>
                    <td>{d.method}</td>
                    <td>{d.found}</td>
                    <td>{d.control}</td>
                    <td>{d.contradictions}</td>
                    <td>{d.tiny}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            The method with the highest raw score was the worst one: it reached 8 of 9 by reporting
            dozens of tiny patches, some contradicting their own numbers. The combined method found
            every expected change after a reviewed update to the test set, with nothing at the
            control and no contradictions.
          </p>
          <Figure
            src="/images/projects/revisit-paradise.webp"
            alt="Paradise, California from Landsat in 2017 and 2019: green tree cover replaced by brown burned ground after the Camp Fire"
            caption="Paradise, California, before and after the 2018 Camp Fire. Burns are the one change allowed to last a single summer."
            width={1536}
            height={760}
          />
        </section>

        <section className="cs-section">
          <h2>5. Causes without making things up</h2>
          <p>
            The hard part is the &ldquo;why&rdquo;. A language model asked why a lake shrank will
            happily invent an answer. So the cause agent is built so the model can only ever remove
            things, never add something the code has not checked:
          </p>
          <ul>
            <li><strong>Search</strong> the web with Exa using two neutral queries that describe what the change looks like, never why.</li>
            <li><strong>Copy, never write.</strong> Gemini is only allowed to copy sentences off the pages. Code then checks each one appears on the page word for word, names the place (a state alone is not enough), and falls within the change&rsquo;s years.</li>
            <li><strong>Compose from checked quotes only.</strong> Every number and quantity word in a claim must appear in its own quotes.</li>
            <li><strong>A second opinion.</strong> A separate checker call sees each claim with only its quotes and must answer yes. Any no drops the claim.</li>
            <li><strong>Confidence by rule.</strong> Confirmed means two independent sources or one authoritative one; likely means one other source; otherwise the chapter says cause unknown. The model never sets confidence.</li>
          </ul>
          <p>
            Web pages are treated as untrusted data, and every model and search call is logged with
            the story. Across every test run, the agent made zero unsupported claims, and it found up
            to 5 of the 7 causes we expected, at about 9 model calls per story. Recall moved between
            runs; the zero never did. The whole project spent $0.34 on search, behind a cache and a
            hard spending cap.
          </p>
          <Figure
            src="/images/projects/revisit-evidence.webp"
            alt="Revisit evidence panel: the Lake Mead claim with four verified excerpts from news and NASA sources, each with its site, authority level and date"
            caption="The evidence behind one claim: every excerpt was found word for word on its page, with its source and date."
            width={600}
            height={360}
          />
        </section>

        <section className="cs-section">
          <h2>6. The film</h2>
          <p>
            The web app is Next.js with a React Three Fiber globe. Building a story streams live
            progress over server-sent events, then opens the film. In the player, the narration audio
            is the clock: each segment&rsquo;s years are spread evenly over its audio, frames
            crossfade between real Landsat summers, and a change chapter holds on its
            &ldquo;after&rdquo; year so the result stays on screen. ElevenLabs voices each script
            segment on the server, and its character timings become word timings for sentence
            captions. Narration is cached, so saved stories play offline with no API keys. The script
            is never rewritten for the voice: what you hear is exactly what the agent verified.
          </p>
          <Figure
            src="/images/projects/revisit-chart.webp"
            alt="Revisit metrics chart for Paradise, California: land greenness steady from 1984, then dropping sharply in 2018"
            caption="The whole-area measures behind each film. Paradise's greenness falls off a cliff in 2018."
            width={600}
            height={415}
          />
        </section>

        <section className="cs-section">
          <h2>7. Two people, one contract</h2>
          <p>
            With two people and one weekend, the risk was the halves not fitting. Before writing
            pipeline code we agreed JSON Schema contracts for the story, the narration and the build
            events, and generated the web app&rsquo;s TypeScript types from them. Vanessa built
            against a mock backend from the first hour while the real pipeline came together. Every
            story is validated against the contract before it is saved.
          </p>
          <p>
            Each big choice (how to load imagery, how to composite, how to detect change, how to find
            causes) started as a short experiment with a shared scorer and ended in a written
            decision record. The backend has 262 tests that run offline with search and the model
            mocked, and CI runs them on every pull request.
          </p>
          <Figure
            src="/images/projects/revisit-delray.webp"
            alt="Delray, Detroit from Landsat in 2016 and 2025: the Gordie Howe International Bridge now crosses the Detroit River"
            caption="Delray, Detroit, 2016 and 2025. The Gordie Howe bridge, once erased as cloud, now shows up as land."
            width={1536}
            height={760}
          />
        </section>

        <section className="cs-section">
          <h2>8. What went wrong along the way</h2>
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
          <h2>9. Limits and what comes next</h2>
          <p>
            The test set is small: 8 places and 7 expected causes, so the numbers are evidence, not
            statistics. Cause recall depends on what two web searches return. In deserts, bare ground
            already reads as built-up, so new suburbs show up as greening, and we say so rather than
            hide it. Next: checking Lake Mead against the official reservoir records, an image check
            that compares each claim with its before and after frames, more places and faster live
            builds, and better coverage of places with little English-language news.
          </p>
        </section>

        <div className="cs-actions cs-actions-end">
          <a href="/#projects" className="project-link-btn project-link-github">&larr; Back to all projects</a>
          <a
            href="https://revisit-earth.vercel.app/"
            className="project-link-btn project-link-demo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch a Revisit film
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}
