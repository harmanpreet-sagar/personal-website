'use client'

import { useEffect, useRef } from 'react'

interface ExperienceItem {
  role: string
  company: string
  date: string
  description: string
  metrics: Array<{ value: string; label: string }>
  logo?: string
}

const experiences: ExperienceItem[] = [
  {
    role: 'Research Assistant, jPipe (Part-time)',
    company: 'McMaster University, McSCert',
    logo: '/images/logos/official/mcscert-stack.webp',
    date: 'Sept 2026 — Present',
    description: 'Building an LLM pipeline that turns the safety claims in AI model cards, and the quotes behind them, into jPipe justification diagrams. Traced every failed quote check on the GPT-5 system card and built a quote matcher a paraphrase can’t pass.',
    metrics: [
      { value: '187', label: 'LLM-extracted quotes checked' },
      { value: '7 of 7', label: 'failures diagnosed' },
      { value: '21', label: 'pytest tests' }
    ]
  },
  {
    role: 'Events Executive',
    company: 'DeltaHacks',
    logo: '/images/logos/official/deltahacks.webp',
    date: 'June 2026 — Present',
    description: 'Running DeltaHacks events, from high school outreach and an October resume roast to events at the hackathon itself.',
    metrics: []
  },
  {
    role: 'Firmware Specialist, PRESET CubeSat',
    company: 'McMaster Interdisciplinary Satellite Team',
    logo: '/images/logos/official/preset.webp',
    date: 'Sept 2023 — Oct 2026',
    description: 'Built a CubeSat Space Protocol server in Embedded C under FreeRTOS, with handlers for firmware updates, register access, FSM control, the CLI and science data, over both the CAN bus and the ground umbilical.',
    metrics: [
      { value: '5', label: 'CSP service handlers' },
      { value: '2', label: 'transports' },
      { value: '2', label: 'board revisions' }
    ]
  },
  {
    role: 'Web Developer',
    company: 'Develop for Good',
    logo: '/images/logos/official/dfg.webp',
    date: 'May 2026 — Aug 2026',
    description: 'Recommended Webflow so a nonprofit with no technical staff could maintain its own site, then built 3 of its 8 pages from Figma and wrote the handoff docs.',
    metrics: [
      { value: '16', label: 'week client engagement' },
      { value: '3 of 8', label: 'site pages built' }
    ]
  },
  {
    role: 'System Architecture & Modelling Intern',
    company: 'Synopsys Inc.',
    logo: '/images/logos/official/synopsys.webp',
    date: 'May 2024 — Aug 2025',
    description: 'Designed a two-tier regression system, a fast pre-commit gate backed by a 3-hour nightly run, and parallelized the gate. Verified SERDES designs in C++ and built a Confluence automation tool that 40+ engineers adopted.',
    metrics: [
      { value: '90%', label: 'fewer broken builds' },
      { value: '40 to 18 min', label: 'pre-commit gate' },
      { value: '50%', label: 'less SERDES debug time' },
      { value: '40+', label: 'Confluence tool users' }
    ]
  },
  {
    role: 'Community & Code Co-Lead',
    company: 'Google Developer Groups McMaster',
    logo: '/images/logos/official/gdg-mark.webp',
    date: 'Sept 2023 — Aug 2025',
    description: 'Led technical workshops and a 25+ member team through Agile sprints across multiple programs.',
    metrics: [
      { value: '400+', label: 'students reached' },
      { value: '6+', label: 'programs managed' }
    ]
  },
  {
    role: 'Research Assistant, Drasil',
    company: 'McMaster University, Dept. of Computing and Software',
    logo: '/images/logos/official/cas-stack.webp',
    date: 'May 2023 — Aug 2023',
    description: 'Improved validation accuracy and code-generation reliability in Drasil’s Haskell codebase across multiple case studies.',
    metrics: [
      { value: '200K+', label: 'line codebase' },
      { value: '25%', label: 'duplication reduced' }
    ]
  }
]

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const experienceItemsRef = useRef<HTMLDivElement[]>([])
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return

      const timeline = timelineRef.current
      const timelineRect = timeline.getBoundingClientRect()
      const timelineTop = timelineRect.top
      const timelineHeight = timelineRect.height
      const windowHeight = window.innerHeight

      const scrollPoint = windowHeight * 0.4
      const progress = Math.max(0, Math.min(100, ((scrollPoint - timelineTop) / timelineHeight) * 100))

      timeline.style.setProperty('--progress', `${progress}%`)

      experienceItemsRef.current.forEach((item) => {
        if (!item) return
        const itemRect = item.getBoundingClientRect()
        if (itemRect.top < scrollPoint + 50) {
          item.classList.add('active')
        } else {
          item.classList.remove('active')
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="experience">
      <h2 className="section-title">
        <span className="section-num">02</span>Experience
      </h2>
      <div className="experience-timeline" ref={timelineRef}>
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`experience-item${exp.date.includes('Present') ? ' is-current' : ''}`}
            ref={(el) => {
              if (el) experienceItemsRef.current[index] = el
            }}
          >
            {exp.logo && (
              <span className="experience-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={exp.logo} alt={`${exp.company} logo`} width={112} height={112} loading="lazy" />
              </span>
            )}
            <div className="experience-body">
              <div className="experience-header">
                <div className="experience-heading">
                  <h3 className="experience-role">{exp.role}</h3>
                  <p className="experience-company">{exp.company}</p>
                </div>
                <span className="experience-date">{exp.date}</span>
              </div>
              <p className="experience-description">{exp.description}</p>
              {exp.metrics.length > 0 && (
                <div className="experience-metrics">
                  {exp.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="metric">
                      <span className="metric-value">{metric.value}</span>
                      <span className="metric-label">{metric.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
