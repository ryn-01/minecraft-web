import microsoftLogo from '../assets/images/microsoft_logo.png'
import mojangLogo from '../assets/images/monjang_logo.png'
import './footerSection.css'

const footerGroups = [
  {
    title: 'Community',
    links: [
      { label: 'Creator Learning Center', href: '#community' },
      { label: 'Mojang Studios', href: '#about' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Tips for beginners', href: '#adventures' },
      { label: 'Help', href: '#community' },
      { label: 'Feedback', href: '#community' },
      { label: 'Download', href: '#download' },
      { label: 'Contact us', href: '#community' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Profile', href: '#home' },
      { label: 'Redeem', href: '#download' },
    ],
  },
]

const navigationLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Dimensions', href: '#dimensions' },
  { label: 'Learn to play', href: '#adventures' },
  { label: 'News', href: '#gallery' },
  { label: 'Download', href: '#download' },
]

const socialLinks = [
  { label: 'Youtube', href: '#community' },
  { label: 'Instagram', href: '#community' },
  { label: 'Facebook', href: '#community' },
  { label: 'Twitter', href: '#community' },
  { label: 'Discord', href: '#community' },
]

export default function FooterSection() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__brand">
          <a href="#home" aria-label="Minecraft home">
            <img className="site-footer__mojang-logo" src={mojangLogo} alt="Mojang Studios" />
          </a>
          <p>© 2026 Mojang AB. TM Microsoft Corporation.</p>
          <div className="site-footer__legal-links">
            <a href="#community">Minecraft Usage Guidelines</a>
            <span aria-hidden="true">|</span>
            <a href="#community">Manage Consent</a>
          </div>
        </div>

        <div className="site-footer__links">
          {footerGroups.map((group) => (
            <section className="site-footer__link-group" key={group.title} aria-labelledby={`footer-${group.title.toLowerCase()}`}>
              <h2 id={`footer-${group.title.toLowerCase()}`}>{group.title}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="site-footer__link-group" aria-labelledby="footer-navigation">
            <h2 id="footer-navigation">Navigation</h2>
            <ul>
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </section>

          <section className="site-footer__link-group" aria-labelledby="footer-socials">
            <h2 id="footer-socials">Socials</h2>
            <ul>
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="site-footer__bottom">
        <nav className="site-footer__bottom-links" aria-label="Legal navigation">
          <a href="#community">Privacy and cookies</a>
          <a href="#community">Consumer health privacy</a>
          <a href="#community">Terms of use</a>
          <a href="#community">Trademarks</a>
          <a href="#community">About our ads</a>
          <a href="#community">Your privacy choices</a>
        </nav>
        <div className="site-footer__microsoft">
          <span>© 2026 Microsoft</span>
          <img src={microsoftLogo} alt="Microsoft" />
        </div>
      </div>
    </footer>
  )
}