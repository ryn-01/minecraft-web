import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import StorySection from './StorySection'
import './aboutSection.css'

type AboutSectionProps = {
  title?: string
  description?: string
  mediaSrc?: string
  mediaAlt?: string
  mediaType?: 'image' | 'video'
  learnMoreHref?: string
}

function isVideoSource(source: string) {
  return /\.(webm|mp4|ogg)(?:$|[?#])/i.test(source)
}

export default function AboutSection({
  title = 'One block at a time, infinite worlds to find.',
  description = 'Minecraft is a game about placing blocks and going on adventures. Explore randomly generated worlds, gather resources, craft tools, and shape your own path. Every world is yours to build.',
  mediaSrc = '/videos/home/Enderman_Home.webm',
  mediaAlt = 'An Enderman holding a grass block',
  mediaType,
  learnMoreHref = '/about',
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const resolvedMediaType = mediaType ?? (isVideoSource(mediaSrc) ? 'video' : 'image')

  useGSAP(
    () => {
      const animatedElements = [
        '.about-section__content',
        '.about-section__media',
        '.about-section__button',
      ]
      const section = sectionRef.current

      if (!section) {
        return
      }

      let hasAnimated = false
      gsap.set(animatedElements, { autoAlpha: 0 })

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true
            gsap
              .timeline({ defaults: { ease: 'power3.out' } })
              .to('.about-section__content', { x: 0, autoAlpha: 1, duration: 0.7 })
              .to('.about-section__media', { x: 0, autoAlpha: 1, duration: 0.8 }, '-=0.55')
              .to('.about-section__button', { y: 0, autoAlpha: 1, duration: 0.4 }, '-=0.35')
          }
        },
        { threshold: 0.2 },
      )

      observer.observe(section)
      return () => observer.disconnect()
    },
    { scope: sectionRef },
  )

  return (
    <main ref={sectionRef} className="about-section" id="about">
      <section className="about-section__layout" aria-labelledby="about-title">
        <div className="about-section__content">
          <h1 className="about-section__title" id="about-title">
            {title}
          </h1>
          <p className="about-section__description">{description}</p>
          <a className="about-section__button" href={learnMoreHref}>
            Learn more <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="about-section__media" aria-label={resolvedMediaType === 'image' ? mediaAlt : undefined}>
          {resolvedMediaType === 'video' ? (
            <video autoPlay muted loop playsInline preload="metadata" aria-label={mediaAlt}>
              <source src={mediaSrc} type="video/webm" />
            </video>
          ) : (
            <img src={mediaSrc} alt={mediaAlt} />
          )}
        </div>
      </section>
      <StorySection />
    </main>
  )
}
