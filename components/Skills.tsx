const GROUPS: { name: string; items: string[] }[] = [
  { name: 'Languages', items: ['Python', 'TypeScript', 'C++', 'JavaScript', 'C', 'Embedded C', 'Java', 'C#', 'SQL', 'Haskell', 'Bash', 'SystemVerilog'] },
  { name: 'Backend & Data Stores', items: ['FastAPI', 'asyncio', 'Pydantic', 'httpx', 'Node.js', 'REST APIs', 'OAuth 2.0', 'JWT', 'PostgreSQL', 'Supabase', 'Firebase', 'MQTT', 'Twilio', 'Restinio'] },
  { name: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'SWR', 'React Three Fiber', 'HTML', 'CSS'] },
  { name: 'Data & ML', items: ['NumPy', 'pandas', 'scikit-learn', 'LightGBM', 'Matplotlib', 'Kalman filtering', 'STAC'] },
  { name: 'AI & LLMs', items: ['Gemini API', 'Exa', 'ElevenLabs', 'PyMuPDF', 'JSON Schema'] },
  { name: 'Embedded & Hardware', items: ['FreeRTOS', 'LibCSP', 'CAN', 'Vitis', 'Arduino', 'UVM', 'MATLAB', 'Simulink'] },
  { name: 'DevOps & Testing', items: ['GitHub Actions', 'pytest', 'Docker', 'Git', 'GitHub', 'Jenkins', 'Linux', 'Vercel', 'Render', 'JUnit', 'CMake', 'Maven', 'vcpkg', 'Perforce'] },
  { name: 'Docs & Design', items: ['Figma', 'Webflow', 'Confluence', 'Atlassian REST API', 'Notion'] },
  { name: 'Game Dev', items: ['PyGame', 'XNA Framework', 'Visual Studio'] },
]

export default function Skills() {
  return (
    <div className="skills-v2">
      <div className="skills-groups">
        {GROUPS.map((g) => (
          <div key={g.name}>
            <h3 className="skills-group-title">{g.name}</h3>
            <div className="skills-list">
              {g.items.map((n) => (
                <span key={n} className="skill-tag">{n}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
