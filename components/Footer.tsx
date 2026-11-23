const ICONS = {
  mail: <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 17.5v-11zm2.3-.5 7.7 6 7.7-6H4.3zM20 7.6l-7.4 5.8a1 1 0 0 1-1.2 0L4 7.6v9.9c0 .3.2.5.5.5h15c.3 0 .5-.2.5-.5V7.6z" />,
  linkedin: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />,
  github: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />,
  doc: <path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V9h5.5L13 3.5zM8 13h8v1.5H8V13zm0 3.5h8V18H8v-1.5z" />,
}

const Icon = ({ d }: { d: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{d}</svg>
)

export default function Footer() {
  return (
    <footer id="contact">
      <div className="horizon" aria-hidden="true" />
      <div className="container contact-inner">
        <p className="contact-kicker">
          <span className="section-num">04</span>CONTACT
        </p>
        <h2 className="footer-title">
          Let&apos;s talk<span className="hero-dot">.</span>
        </h2>
        <p className="footer-text">
          Hiring for a May 2027 start, building something where a quiet bug becomes a very loud problem, or up
          for a debate on F1 strategy? I&apos;d love to hear from you.
        </p>
        <div className="contact-actions">
          <a href="mailto:harmanpreetssagar@gmail.com" className="hero-link hero-link-primary">
            <Icon d={ICONS.mail} />
            Get in touch
          </a>
          <a href="https://linkedin.com/in/harmanpreetssagar" className="hero-link" target="_blank" rel="noopener noreferrer">
            <Icon d={ICONS.linkedin} />
            LinkedIn
          </a>
          <a href="https://github.com/harmanpreet-sagar" className="hero-link" target="_blank" rel="noopener noreferrer">
            <Icon d={ICONS.github} />
            GitHub
          </a>
          <a href="/Harmanpreet_Singh_Sagar_resume.pdf" className="hero-link" target="_blank" rel="noopener noreferrer">
            <Icon d={ICONS.doc} />
            Resume
          </a>
        </div>
        <p className="contact-meta">Based in Ontario, Canada &middot; Open to new grad roles from May 2027</p>
        <p className="footer-copyright">&copy; 2026 Harmanpreet Singh Sagar</p>
      </div>
    </footer>
  )
}
