import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/navbar' 
import FooterSection from '../components/FooterSection' 
import './creditsPage.css'

gsap.registerPlugin(ScrollTrigger)

interface CreditItem {
  badge: string
  title: string
  description: string
  sourceText?: string
  sourceUrl?: string
}

interface CreditCategory {
  categoryTitle: string
  items: CreditItem[]
}

const creditsData: CreditCategory[] = [
  {
    categoryTitle: 'Icons, Graphics & Fonts',
    items: [
      {
        badge: 'UI Icons',
        title: 'Platform Logos (Icons8)',
        description: 'Windows 10, macOS, and Linux OS icons used for platform compatibility badges.',
        sourceText: 'icons8.com',
        sourceUrl: 'https://icons8.com',
      },
      {
        badge: 'Game Faces',
        title: 'Villager & Creeper Faces',
        description: 'Minecraft Villager and Creeper character face graphics used for community and entity cards.',
        sourceText: 'minecraftfaces.com',
        sourceUrl: 'https://minecraftfaces.com',
      },
      {
        badge: 'Game Sprites',
        title: 'Minecraft Wiki',
        description: 'Official item sprites, ores, and game block icons sourced from the community wiki.',
        sourceText: 'minecraft.fandom.com',
        sourceUrl: 'https://minecraft.fandom.com',
      },
      {
        badge: 'Typography',
        title: 'Minecrafter & Minecraft Fonts',
        description: 'Fan-made Minecraft title and body fonts used for display headers and pixel art branding.',
        sourceText: 'DaFont',
        sourceUrl: 'https://www.dafont.com/minecrafter.font',
      },
    ],
  },
  {
    categoryTitle: 'Media & Gameplay Content',
    items: [
      {
        badge: 'Video Footage',
        title: 'In-Game Background Video',
        description: 'Original screen recordings and background gameplay loops captured directly in-game by the author.',
      },
      {
        badge: 'Video Background',
        title: 'Soothing Minecraft – Glowing Caves',
        description: 'Official ambient video background loop sourced from the official Minecraft YouTube channel.',
        sourceText: 'YouTube (Minecraft)',
        sourceUrl: 'https://youtu.be/hJLgLTpI9U8',
      },
      {
        badge: 'Character Animation',
        title: 'Custom Character Animations',
        description: 'Custom animated character sequences and interaction effects created specifically for this site.',
      },
      {
        badge: 'Concept Art',
        title: 'AI Art & In-Game Screenshots',
        description: 'AI-generated concept wallpapers combined with in-game promotional screenshots.',
      },
    ],
  },
  {
    categoryTitle: 'Code, Hosting & Frameworks',
    items: [
      {
        badge: 'Hosting',
        title: 'Vercel Platform',
        description: 'Cloud platform used for automated hosting, continuous deployment, and global CDN delivery.',
        sourceText: 'vercel.com',
        sourceUrl: 'https://vercel.com',
      },
      {
        badge: 'Animation',
        title: 'GSAP & ScrollTrigger',
        description: 'High-performance JavaScript animation engine powering scroll-driven interactive effects.',
        sourceText: 'gsap.com',
        sourceUrl: 'https://gsap.com',
      },
      {
        badge: 'Framework Stack',
        title: 'React, Vite, Tailwind & Router',
        description: 'React 19, Vite build tool, Tailwind CSS v4, and React Router v7 powering the app architecture.',
      },
    ],
  },
]

export default function CreditsPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Hero Entrance Animation
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      gsap.set('.credits-hero__eyebrow, .credits-hero__title, .credits-hero__description', { autoAlpha: 0, y: 30 })

      heroTimeline
        .to('.credits-hero__eyebrow', { y: 0, autoAlpha: 1, duration: 0.6, delay: 0.2 })
        .to('.credits-hero__title', { y: 0, autoAlpha: 1, duration: 0.7 }, '-=0.4')
        .to('.credits-hero__description', { y: 0, autoAlpha: 1, duration: 0.7 }, '-=0.5')

      // Scroll Animation for Sections & Cards
      gsap.utils.toArray<HTMLElement>('.credits-section').forEach((section) => {
        const cards = section.querySelectorAll('.credits-card')
        
        gsap.from(cards, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
        })
      })
    },
    { scope: pageRef },
  )

  return (
    <div className="app-shell" ref={pageRef}>
      <div className="app-navbar">
        <Navbar activeLabel="Credits" />
      </div>

      <main className="credits-page" id="credits-page">
        {/* Hero Section */}
        <section className="credits-hero" aria-labelledby="credits-title">
          <p className="credits-hero__eyebrow">Attribution & Transparency</p>
          <h1 className="credits-hero__title" id="credits-title">
            Asset Credits
          </h1>
          <p className="credits-hero__description">
            A complete list of external open-source libraries, community assets, media sources, and cloud platform used in constructing this promotional website.
          </p>
        </section>

        {/* Content Body */}
        <section className="credits-body">
          <div className="credits-container">
            {creditsData.map((category) => (
              <div className="credits-section" key={category.categoryTitle}>
                <div className="credits-section__header">
                  <h2>{category.categoryTitle}</h2>
                </div>

                <div className="credits-grid">
                  {category.items.map((item) => (
                    <article className="credits-card" key={item.title}>
                      <div className="credits-card__content">
                        <span className="credits-card__badge">{item.badge}</span>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>

                      {item.sourceUrl && item.sourceText && (
                        <a
                          className="credits-card__link"
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit {item.sourceText} &rarr;
                        </a>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            ))}

            {/* Legal Disclaimer Notice */}
            <div className="credits-disclaimer-box">
              <h3>Legal Disclaimer</h3>
              <p>
                NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
                All Minecraft game assets, trademarks, and logos belong to Mojang Synergies AB / Microsoft. This project was developed solely for non-commercial educational purposes and competition submission.
              </p>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  )
}