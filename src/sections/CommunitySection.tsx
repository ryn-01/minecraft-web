import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './communitySection.css'

// Impor gambar webp untuk masing-masing mode (sesuaikan path foldernya dengan project Anda)
import onlineImg from '../assets/images/online.webp'
import realmsImg from '../assets/images/realms.webp'
import coopImg from '../assets/images/coop.webp'

gsap.registerPlugin(ScrollTrigger)

type CommunityMode = {
  title: string
  description: string
  action: string
  color: 'green' | 'purple' | 'blue'
  artwork: string
  align: 'left' | 'right'
}

const modes: CommunityMode[] = [
  {
    title: 'Online',
    description: 'Connect with players from anywhere, explore a living server, trade resources, join events, and build massive creations together in real time.',
    action: '100+ Players',
    color: 'green',
    artwork: onlineImg, // Menggunakan variabel impor webp
    align: 'left',
  },
  {
    title: 'Realms',
    description: 'Create a peaceful space with friends, manage your own world, build freely, and enjoy a more personal Minecraft experience away from crowded servers.',
    action: 'Up to 10 Players',
    color: 'purple',
    artwork: realmsImg, // Menggunakan variabel impor webp
    align: 'right',
  },
  {
    title: 'Co-op',
    description: 'Team up to survive dangerous nights, defeat bosses, gather rare resources, and complete ambitious projects that are impossible to build alone.',
    action: 'Private',
    color: 'blue',
    artwork: coopImg, // Menggunakan variabel impor webp
    align: 'left',
  },
]

export default function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeMode, setActiveMode] = useState(0)

  useGSAP(() => {
    const section = sectionRef.current
    const cards = gsap.utils.toArray<HTMLElement>('.community-mode', section)

    if (!section || cards.length < 2) {
      return
    }

    gsap.set(cards.slice(1), {
      autoAlpha: 0,
      xPercent: 110,
      rotation: 8,
      transformOrigin: 'center center',
    })

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.7,
        snap: {
          snapTo: 1 / (cards.length - 1),
          duration: { min: 0.2, max: 0.5 },
          delay: 0.05,
          ease: 'power1.inOut',
        },
        invalidateOnRefresh: true,
        end: () => `+=${(cards.length - 1) * window.innerHeight}`,
      },
    })

    cards.slice(1).forEach((card, index) => {
      const outgoingCard = cards[index]
      const incomingDirection = index % 2 === 0 ? 1 : -1

      timeline
        .to(outgoingCard, {
          autoAlpha: 0,
          xPercent: incomingDirection * -110,
          rotation: incomingDirection * -8,
          duration: 0.45,
          ease: 'power2.in',
        }, index)
        .to(card, {
          autoAlpha: 1,
          xPercent: 0,
          rotation: 0,
          duration: 0.55,
          ease: 'power2.out',
        }, index + 0.08)
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="community-section" id="community" aria-labelledby="community-title">
      <header className="community-section__header">
        <h2 id="community-title">Play. Connect. Conquer.</h2>
        <p>Every block tells a story—meet new players, create memories, and adventure together.</p>
      </header>
      <div className="community-section__modes" role="tablist" aria-label="Community play modes">
        {modes.map((mode, index) => {
          const isActive = index === activeMode

          return (
            <article
              className={`community-mode community-mode--${mode.color} community-mode--${mode.align}${isActive ? ' is-active' : ''}`}
              key={mode.title}
            >
              <button
                className="community-mode__button"
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`community-panel-${index}`}
                onClick={() => setActiveMode(index)}
              >
                {/* Menerapkan background image secara dinamis menggunakan inline style */}
                <span 
                  className="community-mode__artwork" 
                  style={{ backgroundImage: `url(${mode.artwork})` }} 
                  aria-hidden="true" 
                />
                <span className="community-mode__content">
                  <span className="community-mode__title">{mode.title} <span aria-hidden="true">◉</span></span>
                  <span className="community-mode__description">{mode.description}</span>
                  <span className="community-mode__action">{mode.action}</span>
                </span>
              </button>
              <span className="sr-only" id={`community-panel-${index}`} role="tabpanel">
                {mode.description}
              </span>
            </article>
          )
        })}
      </div>
    </section>
  )
}