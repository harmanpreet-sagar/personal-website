import BackgroundElements from '@/components/BackgroundElements'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <>
      <BackgroundElements />
      <Navigation />
      <ThemeToggle />
      <main className="container">
        <Hero />
        <StatsBar />
        <About />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </>
  )
}

