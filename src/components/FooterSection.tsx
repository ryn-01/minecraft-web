import './footerSection.css'

const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Feature', href: '/feature' },
  { label: 'Community', href: '/community' },
  { label: 'Download', href: '/download' },
]

const projectCredits = [
  { label: 'Gameplay Recording', href: '/credit' },
  { label: 'AI Concept Art', href: '/credit' },
  { label: 'Custom Animations', href: '/credit' },
  { label: 'Fan-made Fonts', href: '/credit' },
]

const socialLinks = [
  { label: 'Youtube', href: '#community' },
  { label: 'Instagram', href: '#community' },
  { label: 'Discord', href: '#community' },
  { label: 'GitHub Repo', href: '#community' },
]

export default function FooterSection() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        {/* Brand & Legal Disclaimer Section */}
        <div className="site-footer__brand">
          <div className="site-footer__title">
            MINECRAFT <span>FAN PROJECT</span>
          </div>
          
          <p className="site-footer__disclaimer">
            <strong>NOT AN OFFICIAL MINECRAFT PRODUCT.</strong><br />
            NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
          </p>

          <p className="site-footer__copyright">
            © 2026 Designed & Developed for Web Design Competition.
          </p>
        </div>

        {/* Navigation & Link Groups */}
        <div className="site-footer__links">
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

          <section className="site-footer__link-group" aria-labelledby="footer-credits">
            <h2 id="footer-credits">Asset Credits</h2>
            <ul>
              {projectCredits.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </section>

          <section className="site-footer__link-group" aria-labelledby="footer-socials">
            <h2 id="footer-socials">Community</h2>
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

      {/* Footer Bottom Bar */}
      <div className="site-footer__bottom">
        <p className="site-footer__trademark">
          Minecraft is a registered trademark of Mojang Synergies AB. All game assets belong to their respective owners.
        </p>
        <div className="site-footer__competition-tag">
          Immersive Web Competition 2026
        </div>
      </div>
    </footer>
  )
}