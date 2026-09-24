import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './storySection.css'

import chopping from '../assets/video/chopping.webm';
import building from '../assets/video/building.webm';
import crafting from '../assets/video/crafting.webm';
import warden from '../assets/video/warden.webm';

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
  intro = 'Every Minecraft adventure follows a rhythm: gather what you need, craft what you cannot find, and build a world worth defending.',
  featureTitle = 'Gather resources',
  featureDescription = 'Punch your first tree, collect stone, and turn the world around you into everything you need to begin. Every great build starts with a handful of resources.',
  mediaSrc = chopping,
  mediaAlt = 'Story section media',
  mediaType,
  steps,
}: StorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const defaultSteps: StoryStep[] = [
    { title: featureTitle, description: featureDescription },
    { title: 'Craft your tools', description: 'Turn wood and stone into your first pickaxe, axe, and sword. Better tools unlock faster gathering and safer adventures.', mediaSrc: crafting, mediaType: 'video' },
    { title: 'Build a shelter', description: 'Before night falls, place a bed, light your surroundings, and build a safe home to protect your progress.', mediaSrc: building, mediaType: 'video' },
    { title: 'Face the unknown', description: 'Prepare your best gear, enter the Nether, and keep pushing forward until you are ready for the End.',mediaSrc: warden, mediaType: 'video' },
  ]
  const storySteps = steps?.length ? steps : defaultSteps
  const [activeStep, setActiveStep] = useState(0)
  const activeStory = storySteps[activeStep] ?? storySteps[0]
  const activeMediaSrc = activeStory.mediaSrc ?? (activeStep === 0 ? mediaSrc : undefined)
  const activeMediaAlt = activeStory.mediaAlt ?? mediaAlt
  const activeMediaType = activeStory.mediaType
    ?? (activeMediaSrc
      ? (isVideoSource(activeMediaSrc) ? 'video' : mediaType ?? 'image')
      : undefined)

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
        {Array.from({ length: 10 }, (_, index) => <span key={index} />)}
      </div>
      <div className="story-section__inner">
        <h2 className="story-section__heading" id="story-title">
          {title}
        </h2>
        <p className="story-section__intro">{intro}</p>
        <div className="story-section__grid">
          <article className="story-section__feature">
            <p className="story-section__step">
              Step {String(activeStep + 1).padStart(2, '0')} <span aria-hidden="true">/</span> {String(storySteps.length).padStart(2, '0')}
            </p>
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
              <video key={activeMediaSrc} autoPlay muted loop playsInline aria-label={activeMediaAlt}>
                <source src={activeMediaSrc} type="video/webm" />
              </video>
            ) : activeMediaSrc ? (
              <img key={activeMediaSrc} src={activeMediaSrc} alt={activeMediaAlt} />
            ) : (
              <div className="story-section__placeholder" aria-label="Media placeholder" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
