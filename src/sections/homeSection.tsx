import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Navbar from '../components/navbar'
import './homeSection.css'

type HomeSectionProps = {
  title?: string
  description?: string
  videoSource?: string
  downloadHref?: string
  trailerHref?: string
}

export default function HomeSection({
  title = 'Minecraft',
  description = 'Build, explore, and create your own adventure.',
  videoSource,
  downloadHref = '#download',
  trailerHref = '#trailer',
}: HomeSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })

      intro
        .from('.site-navbar', { y: -24, autoAlpha: 0, duration: 0.65 })
        .from('.home-section__eyebrow', { y: 16, autoAlpha: 0, duration: 0.45 }, '-=0.2')
        .from('.home-section__title', { y: 42, autoAlpha: 0, duration: 0.8 }, '-=0.2')
        .from('.home-section__description', { y: 20, autoAlpha: 0, duration: 0.5 }, '-=0.35')
        .from('.home-section__actions', { y: 18, autoAlpha: 0, duration: 0.5 }, '-=0.25')

    },
    { scope: sectionRef },
  )

  useEffect(() => {
    const handlePageExit = () => {
      if (sectionRef.current) {
        gsap.to(sectionRef.current.querySelector('.home-section__content'), {
          autoAlpha: 0,
          y: -16,
          duration: 0.25,
          ease: 'power2.in',
        })
      }
    }

    window.addEventListener('pagehide', handlePageExit)
    return () => window.removeEventListener('pagehide', handlePageExit)
  }, [])

  return (
    <main
      ref={sectionRef}
      className="home-section"
      id="home"
    >
      {videoSource ? (
        <video
          className="home-section__video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src={videoSource} />
        </video>
      ) : null}
      <div
        className="home-section__overlay"
        aria-hidden="true"
      />
      <Navbar />
      <section
        className="home-section__content"
        aria-labelledby="home-title"
      >
        <p className="home-section__eyebrow">
          Create. Explore. Survive.
        </p>
        <h1
          className="home-section__title"
          id="home-title"
        >
          {title}
        </h1>
        <p className="home-section__description">
          {description}
        </p>
        <div className="home-section__actions">
          <a
            className="button button--primary"
            href={downloadHref}
          >
            Download
          </a>
          <a
            className="button button--secondary"
            href={trailerHref}
          >
            Trailer
          </a>
        </div>
      </section>
    </main>
  )
}