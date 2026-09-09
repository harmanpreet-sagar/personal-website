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
    role: 'System Architecture & Modelling Intern',
    company: 'Synopsys Inc.',
    date: 'May 2024 — Aug 2025',
    description: 'Designed a two-tier MATLAB/Simulink regression system, a pre-commit gate backed by a 3-hour nightly deep regression, then parallelized that gate’s Jenkins stages to cut its runtime. Verified high-speed SERDES designs in C++ to full code and functional coverage, and built an HTTP-based trace-observer tool with Restinio.',
    metrics: [
      { value: '90%', label: 'fewer broken builds in the depot' },
      { value: '55%', label: 'gate runtime (40 to 18 mins)' },
      { value: '45%', label: 'MLSD model execution speed' },
      { value: '50%', label: 'less SERDES debug time' }
    ]
  },
  {
    role: 'Firmware Specialist, PRESET CubeSat',
    company: 'McMaster Interdisciplinary Satellite Team',
    date: 'Sept 2023 — Present',
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
    role: 'Incoming Research Assistant, jPipe',
    company: 'McMaster University, McSCert',
    date: 'Sept 2026',
    description: 'Selected to contribute to jPipe, a Java and ANTLR4 DSL compiler for justification diagrams used in safety-critical software certification.',
    metrics: []
  },
  {
    role: 'Research Assistant, Drasil',
    company: 'McMaster University, Dept. of Computing and Software',
    date: 'May 2023 — Aug 2023',
    description: 'Improved Drasil\'s validation accuracy and code-generation reliability using Haskell. Generated reproducible outputs across multiple case studies.',
    metrics: [
      { value: '200K+', label: 'lines updated' },
      { value: '25%', label: 'duplication reduced' }
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

