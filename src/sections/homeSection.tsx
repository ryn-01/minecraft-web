import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import MinecraftLogo from '../assets/Minecraft.svg'
import './homeSection.css'
import { useNavigate } from 'react-router-dom'

type HomeSectionProps = {
  eyebrow?: string
  title?: string
  description?: string
  videoSource?: string
  downloadHref?: string
}

export default function HomeSection({
  eyebrow = 'Welcome to',
  title = 'Minecraft',
  description = '.',
  videoSource = '/videos/home/hero_bg_video.webm',
  downloadHref = '/download',
}: HomeSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useGSAP(
    () => {
      const intro = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      intro
        .from('.home-section__eyebrow', {
          y: 16,
          autoAlpha: 0,
          duration: 0.45,
        }, '-=0.2')
        .from('.home-section__title', {
          y: 42,
          autoAlpha: 0,
          duration: 0.8,
        }, '-=0.2')
        .from('.home-section__description', {
          y: 20,
          autoAlpha: 0,
          duration: 0.5,
        }, '-=0.35')
        .from('.home-section__actions', {
          y: 18,
          autoAlpha: 0,
          duration: 0.5,
        }, '-=0.25')
    },
    {
      scope: sectionRef,
    },
  )

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const navigate = useNavigate()

  return (
    <main
      ref={sectionRef}
      className="home-section"
      id="home"
    >
      {/* Background Video */}
      {videoSource && (
        <video
          className="home-section__video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source
            src={videoSource}
            type="video/webm"
          />
        </video>
      )}

      {/* Overlay */}
      <div
        className="home-section__overlay"
        aria-hidden="true"
      />

      {/* Hero Content */}
      <section
        className="home-section__content"
        aria-labelledby="home-title"
      >
        <p className="home-section__eyebrow">
          {eyebrow}
        </p>

        <h1
          className="home-section__title"
          id="home-title"
        >
          <img
            src={MinecraftLogo}
            alt={title}
          />
        </h1>

        <p className="home-section__description">
          {description}
        </p>

        <div className="home-section__actions">
          {/* Download */}
          <button
            className="button button--primary"
            onClick={() => navigate(downloadHref) }
          >
            Download
          </button>

          {/* Trailer */}
          <button
            className="button button--secondary"
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            Trailer
          </button>
        </div>
      </section>

      {/* YouTube Trailer Modal */}
      {isModalOpen && (
        <div
          className="home-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="trailer-title"
        >
          <div
            className="home-modal__backdrop"
            onClick={closeModal}
            aria-hidden="true"
          />

          <div className="home-modal__content">
            <button
              className="home-modal__close"
              type="button"
              aria-label="Close trailer"
              onClick={closeModal}
            >
              ×
            </button>

            <h2
              id="trailer-title"
              className="sr-only"
            >
              Minecraft Official Trailer
            </h2>

            <div className="home-modal__video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/MmB9b5njVbA?autoplay=1"
                title="Minecraft Official Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}