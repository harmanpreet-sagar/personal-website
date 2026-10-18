'use client'

import { useEffect, useRef } from 'react'

interface ExperienceItem {
  role: string
  company: string
  date: string
  description: string
  metrics: Array<{ value: string; label: string }>
}

const experiences: ExperienceItem[] = [
  {
    role: 'Research Assistant, jPipe (Part-time)',
    company: 'McMaster University, McSCert',
    date: 'Sept 2026 — Present',
    description: 'Working on an LLM pipeline that extracts the safety claims in AI model cards, and the quoted evidence behind them, and turns them into jPipe justification diagrams. Diagnosed all 7 failed quote checks among the 187 quotes extracted from the GPT-5 system card: 5 were real LLM errors such as paraphrases and merged sentences, and 2 were false alarms where the PDF parser’s reading order split a single sentence. Built a Python text-normalization module of 7 ordered rules and a 5-tier quote matcher (exact, normalized, PDF fallback, fuzzy, failed) whose PDF fallback accepts exact matches only, so a paraphrase cannot pass, covered by 21 pytest tests.',
    metrics: [
      { value: '187', label: 'LLM-extracted quotes checked' },
      { value: '7 of 7', label: 'failures diagnosed' },
      { value: '5-tier', label: 'quote matcher' },
      { value: '21', label: 'pytest tests' }
    ]
  },
  {
    role: 'Events Executive',
    company: 'DeltaHacks',
    date: 'June 2026 — Present',
    description: 'Organizing events for the upcoming DeltaHacks, including high school outreach programs and a resume roast in October 2026, followed by events during the hackathon itself.',
    metrics: []
  },
  {
    role: 'Firmware Specialist, PRESET CubeSat',
    company: 'McMaster Interdisciplinary Satellite Team',
    date: 'Sept 2023 — Oct 2026',
    description: 'Implemented a CubeSat Space Protocol (CSP) server in Embedded C on a Xilinx Zynq ZedBoard, running as a FreeAct task under FreeRTOS over two transports: the internal CAN bus and the ground umbilical used for pre-launch testing. Built the service handlers for firmware update, AXI register access, FSM control, CLI, and science data, including a bounds-checked register-file service with a defined request and reply wire protocol, and ported the whole stack across two board revisions.',
    metrics: [
      { value: '5', label: 'CSP service handlers' },
      { value: '2', label: 'transports' },
      { value: '2', label: 'board revisions' },
      { value: '14', label: 'payload commands' }
    ]
  },
  {
    role: 'Web Developer',
    company: 'Develop for Good',
    date: 'May 2026 — Aug 2026',
    description: 'Sixteen-week nonprofit client engagement on a three-engineer team. Evaluated four build approaches (custom-coded, WordPress, Wix, Webflow) and recommended Webflow for CMS-driven maintainability by a client with no technical staff. Built and redesigned 3 of the site’s 8 pages from Figma designs, and authored the Notion handoff documentation covering page structure, responsive configurations, and content-update procedures.',
    metrics: [
      { value: '16', label: 'week client engagement' },
      { value: '4', label: 'build approaches evaluated' },
      { value: '3 of 8', label: 'site pages built' }
    ]
  },
  {
    role: 'System Architecture & Modelling Intern',
    company: 'Synopsys Inc.',
    date: 'May 2024 — Aug 2025',
    description: 'Designed a two-tier MATLAB/Simulink regression system, a pre-commit gate backed by a 3-hour nightly deep regression, then parallelized that gate’s Jenkins stages to cut its runtime. Verified high-speed SERDES designs in C++ to full code and functional coverage, and built an HTTP-based trace-observer tool with Restinio. Automated Confluence updates through the Atlassian REST API with OAuth 2.0, triggered on each successful pipeline run, then presented the Confluence tool to 250+ employees in the Digital Verification team; 40+ people adopted it, including users outside my immediate team.',
    metrics: [
      { value: '90%', label: 'fewer broken builds in the depot' },
      { value: '55%', label: 'gate runtime (40 to 18 mins)' },
      { value: '45%', label: 'MLSD model execution speed' },
      { value: '50%', label: 'less SERDES debug time' },
      { value: '12+ hrs', label: 'saved per month' },
      { value: '40+', label: 'Confluence tool users' }
    ]
  },
  {
    role: 'Community & Code Co-Lead',
    company: 'Google Developer Groups McMaster',
    date: 'Sept 2023 — Aug 2025',
    description: 'Led technical workshops and a 25+ member team through Agile sprints. Managed logistics and stakeholder communication across multiple programs.',
    metrics: [
      { value: '400+', label: 'students reached' },
      { value: '6+', label: 'programs managed' }
    ]
  },
  {
    role: 'Research Assistant, Drasil',
    company: 'McMaster University, Dept. of Computing and Software',
    date: 'May 2023 — Aug 2023',
    description: 'Improved Drasil\'s validation accuracy and code-generation reliability using Haskell. Generated reproducible outputs across multiple case studies.',
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

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="experience">
      <h2 className="section-title">Experience</h2>
      <div className="experience-timeline" ref={timelineRef}>
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="experience-item"
            ref={(el) => {
              if (el) experienceItemsRef.current[index] = el
            }}
          >
            <div className="experience-header">
              <div>
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
        ))}
      </div>
    </section>
  )
}

