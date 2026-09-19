import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './storySection.css'

export type StoryStep = {
  title: string
  description: string
  mediaSrc?: string
  mediaAlt?: string
  mediaType?: 'image' | 'video'
}

type StorySectionProps = {
  title?: string
  intro?: string
  featureTitle?: string
  featureDescription?: string
  mediaSrc?: string
  mediaAlt?: string
  mediaType?: 'image' | 'video'
  steps?: StoryStep[]
}

function isVideoSource(source: string) {
  return /\.(webm|mp4|ogg)(?:$|[?#])/i.test(source)
}

export default function StorySection({
  title = 'Begin your story',
  intro = 'Every great adventure starts with a single block. Gather resources, craft tools, and shape your own path.',
  featureTitle = 'Get resources',
  featureDescription = 'Every great adventure starts with a single block. Gather resources, craft tools, and shape your own path. Every world is yours to discover.',
  mediaSrc,
  mediaAlt = 'Story section media',
  mediaType,
  steps,
}: StorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const defaultSteps: StoryStep[] = [
    { title: featureTitle, description: featureDescription },
    { title: 'Craft', description: 'Turn gathered resources into tools, supplies, and everything you need for the next adventure.' },
    { title: 'Build', description: 'Shape the world around you and create a home, a base, or anything you can imagine.' },
    { title: 'Explore', description: 'Discover new biomes, hidden treasures, and unexpected adventures beyond the horizon.' },
    { title: 'Survive', description: 'Face the night, protect what you built, and keep your story moving forward.' },
  ]
  const storySteps = steps?.length ? steps : defaultSteps
  const [activeStep, setActiveStep] = useState(0)
  const activeStory = storySteps[activeStep] ?? storySteps[0]
  const activeMediaSrc = activeStory.mediaSrc ?? (activeStep === 0 ? mediaSrc : undefined)
  const activeMediaAlt = activeStory.mediaAlt ?? mediaAlt
  const activeMediaType = activeStory.mediaType ?? (activeMediaSrc && isVideoSource(activeMediaSrc) ? 'video' : mediaType)

  useGSAP(
    () => {
      const section = sectionRef.current
      const elements = ['.story-section__heading', '.story-section__intro', '.story-section__feature', '.story-section__media']

      if (!section) {
        return
      }

      gsap.set(elements, { autoAlpha: 0 })
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            gsap
              .timeline({ defaults: { ease: 'power3.out' } })
              .to('.story-section__heading', { y: 0, autoAlpha: 1, duration: 0.55 })
              .to('.story-section__intro', { y: 0, autoAlpha: 1, duration: 0.45 }, '-=0.25')
              .to('.story-section__feature', { x: 0, autoAlpha: 1, duration: 0.65 }, '-=0.15')
              .to('.story-section__media', { x: 0, autoAlpha: 1, duration: 0.7 }, '-=0.55')
          } else {
            gsap.set(elements, { autoAlpha: 0 })
          }
        },
        { threshold: 0.2 },
      )

      observer.observe(section)
      return () => observer.disconnect()
    },
    { scope: sectionRef },
  )

  useEffect(() => {
    if (!sectionRef.current || activeStep === 0) {
      return
    }

    gsap.fromTo(
      ['.story-section__feature', '.story-section__media'],
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' },
    )
  }, [activeStep])

  const moveStep = (direction: -1 | 1) => {
    setActiveStep((current) => (current + direction + storySteps.length) % storySteps.length)
  }

  return (
    <section ref={sectionRef} className="story-section" id="story" aria-labelledby="story-title">
      <div className="story-section__pixel-corner" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="story-section__inner">
        <h2 className="story-section__heading" id="story-title">
          {title}
        </h2>
        <p className="story-section__intro">{intro}</p>
        <div className="story-section__grid">
          <article className="story-section__feature">
            <h3>{activeStory.title}</h3>
            <p>{activeStory.description}</p>
            <div className="story-section__controls" aria-label="Story navigation">
              <button type="button" aria-label="Previous story step" onClick={() => moveStep(-1)}>
                <span aria-hidden="true">‹</span>
              </button>
              <button type="button" aria-label="Next story step" onClick={() => moveStep(1)}>
                <span aria-hidden="true">›</span>
              </button>
            </div>
          </article>
          <div className="story-section__media">
            {activeMediaSrc && activeMediaType === 'video' ? (
              <video autoPlay muted loop playsInline aria-label={activeMediaAlt}>
                <source src={activeMediaSrc} />
              </video>
            ) : activeMediaSrc ? (
              <img src={activeMediaSrc} alt={activeMediaAlt} />
            ) : (
              <div className="story-section__placeholder" aria-label="Media placeholder" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
