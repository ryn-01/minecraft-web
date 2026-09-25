import { useEffect, useState } from 'react'
import './navbar.css'

export type NavItem = {
  label: string
  href: string
}

type NavbarProps = {
  items?: NavItem[]
  activeLabel?: string
}

const defaultItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Feature', href: '/feature' },
  { label: 'Community', href: '/#community' },
  { label: 'Download', href: '/download' },
]

export default function Navbar({
  items = defaultItems,
  activeLabel = 'Home',
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <nav className={`site-navbar${isOpen ? ' is-open' : ''}`} aria-label="Primary navigation">
      <button
        className="site-navbar__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="site-navbar__toggle-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="sr-only">Toggle navigation menu</span>
      </button>
      <ul className="site-navbar__list" id="primary-navigation">
        {items.map((item) => (
          <li key={item.label}>
            <a
              className={`site-navbar__link${item.label === activeLabel ? ' is-active' : ''}`}
              href={item.href}
              aria-current={item.label === activeLabel ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}