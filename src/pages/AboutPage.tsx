import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import pickaxeIcon from '../assets/images/icons/picaxe.webp'
import swordIcon from '../assets/images/icons/sword.webp'
import villagerIcon from '../assets/images/icons/villager.webp'
import Navbar from '../components/navbar' 
import FooterSection from '../components/FooterSection' 
import './aboutPage.css'

gsap.registerPlugin(ScrollTrigger)

const historyMilestones = [
  {
    year: '2009',
    title: 'The First Block',
    description: 'Minecraft is created in just six days as a small Java project called "Cave Game". The very first blocks of dirt and cobblestone are placed.',
  },
  {
    year: '2011',
    title: 'Official Release',
    description: 'Minecraft 1.0 officially launches out of Beta at MINECON in Las Vegas. The Ender Dragon is introduced, giving players a final boss to defeat.',
  },
  {
    year: '2014',
    title: 'A New Era',
    description: 'Mojang Studios joins Xbox Game Studios. The game begins its massive expansion across consoles, mobile devices, and educational platforms.',
  },
  {
    year: '2020+',
    title: 'Infinite Expansion',
    description: 'Massive updates completely overhaul the Nether, the cave systems, and the oceans, proving that the world of Minecraft will never stop growing.',
  },
]

const philosophyCards = [
  {
    iconSrc: pickaxeIcon,
    title: 'Infinite Creativity',
    description: 'With an endless supply of resources and limitless space, your imagination is the only boundary. If you can dream it, you can build it.',
  },
  {
    iconSrc: swordIcon,
    title: 'Boundless Adventure',
    description: 'Every world is uniquely generated. From the deepest caves to the highest mountains, danger and discovery await in every direction.',
  },
  {
    iconSrc: villagerIcon,
    title: 'Community First',
    description: 'Minecraft is better together. Millions of players worldwide share creations, build sprawling servers, and write new stories every day.',
  },
]

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Hero Entrance Animation
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      gsap.set('.about-hero__eyebrow, .about-hero__title, .about-hero__description', { autoAlpha: 0, y: 30 })

      heroTimeline
        .to('.about-hero__eyebrow', { y: 0, autoAlpha: 1, duration: 0.6, delay: 0.2 })
        .to('.about-hero__title', { y: 0, autoAlpha: 1, duration: 0.7 }, '-=0.4')
        .to('.about-hero__description', { y: 0, autoAlpha: 1, duration: 0.7 }, '-=0.5')

      // Scroll Animations for subsequent sections
      const sections = ['.about-intro__content', '.about-history__header', '.about-philosophy__header']
      
      sections.forEach((selector) => {
        gsap.from(`${selector} > *`, {
          scrollTrigger: {
            trigger: selector,
            start: 'top 85%',
            once: true,
          },
          y: 20,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
        })
      })

      // Staggered grid animations
      gsap.from('.history-card', {
        scrollTrigger: { trigger: '.history-grid', start: 'top 80%', once: true },
        y: 30, autoAlpha: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
      })

      gsap.from('.about-card', {
        scrollTrigger: { trigger: '.about-philosophy__grid', start: 'top 80%', once: true },
        y: 30, autoAlpha: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
      })
    },
    { scope: pageRef },
  )

  return (
    <div className="app-shell" ref={pageRef}>
      <div className="app-navbar">
        <Navbar activeLabel="About" />
      </div>
      
      <main className="about-page" id="about-page">
        {/*  Hero */}
        <section className="about-hero" aria-labelledby="about-title">
          <video className="about-hero__bg" autoPlay muted loop playsInline aria-hidden="true">
            <source src="/videos/about/hero_bg.webm" type="video/webm" />
          </video>
          <div className="about-hero__overlay" aria-hidden="true" />
          
          <p className="about-hero__eyebrow">The Foundation</p>
          <h1 className="about-hero__title" id="about-title">
            One block at a time
          </h1>
          <p className="about-hero__description">
            Explore the origins, history, and core philosophy behind a game about placing blocks and going on adventures.
          </p>
        </section>

        {/*  About Details  */}
        <section className="about-intro">
          <div className="about-intro__content">
            <h2>Infinite Worlds to Find</h2>
            <p>
              Minecraft is a game made entirely of blocks. But within those blocks lies a universe of infinite possibilities. 
              Whether you want to survive the harsh wilderness, construct towering architectural marvels, or engineer complex 
              machinery, the game bends to your will.
            </p>
            <p>
              There is no "right" way to play. You write your own rules, forge your own path, and build a world that is 
              entirely your own.
            </p>
          </div>
        </section>

        {/*  History Timeline  */}
        <section className="about-history">
          <div className="about-history__header">
            <h2>Our History</h2>
          </div>
          <div className="history-grid">
            {historyMilestones.map((milestone) => (
              <article className="history-card" key={milestone.year}>
                <span className="history-card__year">{milestone.year}</span>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </article>
            ))}
          </div>
        </section>
        
        {/*  Philosophy  */}
        <section className="about-philosophy" id="philosophy">
          <div className="about-philosophy__header">
            <h2>Core Pillars</h2>
            <p>The guiding principles that keep the blocky universe spinning, no matter how much the game evolves.</p>
          </div>
          <div className="about-philosophy__grid">
            {philosophyCards.map((card) => (
              <article className="about-card" key={card.title}>
                <img className="about-card__icon" src={card.iconSrc} alt="" aria-hidden="true" />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  )
}