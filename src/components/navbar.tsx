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
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Feature', href: '#feature' },
  { label: 'Community', href: '#community' },
  { label: 'Download', href: '#download' },
]

export default function Navbar({
  items = defaultItems,
  activeLabel = 'Home',
}: NavbarProps) {
  return (
    <nav className="site-navbar" aria-label="Primary navigation">
      <ul className="site-navbar__list">
        {items.map((item) => (
          <li key={item.label}>
            <a
              className={`site-navbar__link${item.label === activeLabel ? ' is-active' : ''}`}
              href={item.href}
              aria-current={item.label === activeLabel ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}