'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const ROLES = [
  'flight software for a CubeSat.',
  'CI that cuts broken builds by 90%.',
  'an F1 replay that spots who is really racing.',
  'AI agents that refuse to make things up.',
  'ML that out-forecasts a Kalman filter.',
  'checks that catch LLMs misquoting their sources.',
]

function useTypedRoles() {
  const [state, setState] = useState({ i: 0, len: 0, phase: 'type' as 'type' | 'hold' | 'del', hold: 0 })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState({ i: 0, len: ROLES[0].length, phase: 'hold', hold: Infinity })
      return
    }
    const t = setInterval(() => {
      setState((s) => {
        const role = ROLES[s.i]
        if (s.phase === 'type') return s.len < role.length ? { ...s, len: s.len + 1 } : { ...s, phase: 'hold', hold: 40 }
        if (s.phase === 'hold') return s.hold > 0 ? { ...s, hold: s.hold - 1 } : { ...s, phase: 'del' }
        return s.len > 0 ? { ...s, len: s.len - 1 } : { i: (s.i + 1) % ROLES.length, len: 0, phase: 'type', hold: 0 }
      })
    }, 55)
    return () => clearInterval(t)
  }, [])

  return ROLES[state.i].slice(0, state.len)
}

const LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/harmanpreet-sagar',
    icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/harmanpreetssagar',
    icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />,
  },
  {
    label: 'Devpost',
    href: 'https://devpost.com/harmanpreet1308',
    icon: <path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61H6.002zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595V5.694zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853h-1.336z" />,
  },
]

export default function Hero() {
  const typed = useTypedRoles()

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-kicker">SOFTWARE ENGINEER &middot; McMASTER &apos;27</p>
        <h1>
          Harmanpreet
          <br />
          Singh Sagar<span className="hero-dot">.</span>
        </h1>
        <p className="hero-typed" aria-label="I build software for satellites, chip verification, F1 race replays, and trustworthy AI.">
          <span aria-hidden="true">
            I build <strong>{typed}</strong>
            <span className="hero-caret" />
          </span>
        </p>
        <p className="hero-tagline">
          I like problems where software meets the <strong>real world</strong>: chips, satellites, race
          tracks, runways. The kind where <strong>being wrong actually costs something</strong>.
        </p>
        <div className="hero-links">
          <a href="/Harmanpreet_Singh_Sagar_resume.pdf" className="hero-link hero-link-primary" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h6v6h6v10H6zm2-6h8v2H8v-2zm0 4h8v2H8v-2zm0-8h3v2H8v-2z" />
            </svg>
            Resume
          </a>
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="hero-link" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{l.icon}</svg>
              {l.label}
            </a>
          ))}
        </div>
        <p className="hero-availability">
          <span className="hero-availability-dot" aria-hidden="true" />
          Open to new grad roles from May 2027
        </p>
      </div>
      <div className="hero-image">
        <svg className="hero-orbits" viewBox="-700 -330 1400 660" aria-hidden="true">
          <g fill="none" stroke="#7DD3FC" strokeWidth="1.2">
            <ellipse rx="520" ry="150" transform="rotate(-14)" strokeOpacity="0.2" />
            <ellipse rx="400" ry="230" transform="rotate(22)" strokeOpacity="0.2" />
            <ellipse rx="640" ry="260" transform="rotate(-4)" strokeOpacity="0.16" strokeDasharray="3 7" />
          </g>
          <circle cx="493" cy="-120" r="5" fill="#FBBF24" />
          <circle cx="-340" cy="-170" r="3.5" fill="#7DD3FC" fillOpacity="0.7" />
        </svg>
        <div className="planet">
          <span className="planet-ring" aria-hidden="true" />
          <span className="planet-orbit" aria-hidden="true" />
          <span className="planet-spin" aria-hidden="true">
            <span className="planet-sat" />
          </span>
          <Image
            src="/images/harman_main_light_up_the_night.jpg"
            alt="Harmanpreet Singh Sagar"
            width={356}
            height={356}
            className="planet-photo"
            priority
          />
        </div>
      </div>
    </section>
  )
}
