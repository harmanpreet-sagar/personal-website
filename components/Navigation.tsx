'use client'

import { useEffect, useState } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="#" className="logo">Harmanpreet Singh Sagar</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hamburger Menu (Mobile) */}
      <div 
        className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        id="hamburger"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}
        id="mobile-menu"
      >
        <a href="#about" className="mobile-link" onClick={closeMobileMenu}>About</a>
        <a href="#experience" className="mobile-link" onClick={closeMobileMenu}>Experience</a>
        <a href="#projects" className="mobile-link" onClick={closeMobileMenu}>Projects</a>
        <a href="#contact" className="mobile-link" onClick={closeMobileMenu}>Contact</a>
      </div>
    </>
  )
}

