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
    description: 'Optimizing CI/CD pipelines, designing regression flows, and verifying high-speed SERDES designs. Building tools and bridges for cross-project model reuse.',
    metrics: [
      { value: '55%', label: 'pipeline runtime reduction' },
      { value: '90%', label: 'depot stability improvement' },
      { value: '45%', label: 'model speed increase' }
    ]
  },
  {
    role: 'Firmware Specialist',
    company: 'McMaster Interdisciplinary Satellite Team',
    date: 'Sept 2023 — Present',
    description: 'Developing UART-backed command servers, GPIO drivers for FPGA integration, and lightweight LibCSP telemetry servers in Embedded C.',
    metrics: [
      { value: '14', label: 'payload commands' }
    ]
  },
  {
    role: 'Community & Code Co-Lead',
    company: 'Google Developer Groups McMaster',
    date: 'Sept 2023 — Aug 2025',
    description: 'Leading technical workshops and a 25+ member team through Agile sprints. Managing logistics and stakeholder communication across multiple programs.',
    metrics: [
      { value: '400+', label: 'students reached' },
      { value: '6+', label: 'programs managed' }
    ]
  },
  {
    role: 'Research Assistant',
    company: 'McMaster University',
    date: 'May 2023 — Aug 2023',
    description: 'Improved Drasil\'s validation accuracy and code-generation reliability using Haskell. Generated reproducible outputs across multiple case studies.',
    metrics: [
      { value: '200K+', label: 'lines updated' },
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
            <div className="experience-metrics">
              {exp.metrics.map((metric, metricIndex) => (
                <div key={metricIndex} className="metric">
                  <span className="metric-value">{metric.value}</span>
                  <span className="metric-label">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

