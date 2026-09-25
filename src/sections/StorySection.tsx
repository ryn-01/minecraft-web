import { useCallback, useEffect, useRef, useState } from 'react'
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
  autoplayMs?: number
}

function isVideoSource(source: string) {
  return /\.(webm|mp4|ogg)(?:$|[?#])/i.test(source)
}

function resolveMedia(
  step: StoryStep,
  index: number,
  fallbackSrc: string,
  fallbackAlt: string,
  fallbackType?: 'image' | 'video',
) {
  const src = step.mediaSrc ?? (index === 0 ? fallbackSrc : undefined)
  const alt = step.mediaAlt ?? fallbackAlt
  const type =
    step.mediaType ?? (src ? (isVideoSource(src) ? 'video' : fallbackType ?? 'image') : undefined)
  return { src, alt, type }
}

export default function StorySection({
  title = 'Begin your story',
  intro = 'Every Minecraft adventure follows a rhythm: gather what you need, craft what you cannot find, and build a world worth defending.',
  featureTitle = 'Gather resources',
  featureDescription = 'Punch your first tree, collect stone, and turn the world around you into everything you need to begin. Every great build starts with a handful of resources.',
  mediaSrc = '/videos/about/chopping.webm',
  mediaAlt = 'Story section media',
  mediaType,
  steps,
  autoplayMs = 6000,
}: StorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const inViewRef = useRef(false)
  const pausedRef = useRef(false)
  const timerRef = useRef<number | null>(null)
  const touchStartXRef = useRef<number | null>(null)

  const defaultSteps: StoryStep[] = [
    { title: featureTitle, description: featureDescription },
    {
      title: 'Craft your tools',
      description:
        'Turn wood and stone into your first pickaxe, axe, and sword. Better tools unlock faster gathering and safer adventures.',
      mediaSrc: '/videos/about/crafting.webm',
      mediaType: 'video',
    },
    {
      title: 'Build a shelter',
      description:
        'Before night falls, place a bed, light your surroundings, and build a safe home to protect your progress.',
      mediaSrc: '/videos/about/building.webm',
      mediaType: 'video',
    },
    {
      title: 'Face the unknown',
      description:
        'Prepare your best gear, enter the Nether, and keep pushing forward until you are ready for the End.',
      mediaSrc: '/videos/about/warden.webm',
      mediaType: 'video',
    },
  ]
  const storySteps = steps?.length ? steps : defaultSteps
  const resolvedSteps = storySteps.map((step, index) =>
    resolveMedia(step, index, mediaSrc, mediaAlt, mediaType),
  )

  const [activeStep, setActiveStep] = useState(0)
  const activeStory = storySteps[activeStep] ?? storySteps[0]
  const activeMedia = resolvedSteps[activeStep] ?? resolvedSteps[0]

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startTimer = useCallback(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    clearTimer()
    if (reduceMotion || storySteps.length < 2) {
      return
    }
    timerRef.current = window.setInterval(() => {
      if (!pausedRef.current) {
        setActiveStep((current) => (current + 1) % storySteps.length)
      }
    }, autoplayMs)
  }, [autoplayMs, clearTimer, storySteps.length])

  const moveStep = useCallback(
    (direction: -1 | 1) => {
      setActiveStep((current) => (current + direction + storySteps.length) % storySteps.length)
      startTimer()
    },
    [startTimer, storySteps.length],
  )

  const goToStep = useCallback(
    (index: number) => {
      setActiveStep(index)
      startTimer()
    },
    [startTimer],
  )

  useGSAP(
    () => {
      const section = sectionRef.current
      const elements = [
        '.story-section__heading',
        '.story-section__intro',
        '.story-section__feature',
        '.story-section__media',
      ]

      if (!section) {
        return
      }

      gsap.set(elements, { autoAlpha: 0 })
      const observer = new IntersectionObserver(
        ([entry]) => {
          inViewRef.current = entry.isIntersecting
          if (entry.isIntersecting) {
            gsap
              .timeline({ defaults: { ease: 'power3.out' } })
              .to('.story-section__heading', { y: 0, autoAlpha: 1, duration: 0.55 })
              .to('.story-section__intro', { y: 0, autoAlpha: 1, duration: 0.45 }, '-=0.25')
              .to('.story-section__feature', { x: 0, autoAlpha: 1, duration: 0.65 }, '-=0.15')
              .to('.story-section__media', { x: 0, autoAlpha: 1, duration: 0.7 }, '-=0.55')
            startTimer()
          } else {
            gsap.set(elements, { autoAlpha: 0 })
            clearTimer()
          }
        },
        { threshold: 0.2 },
      )

      observer.observe(section)
      return () => {
        observer.disconnect()
        clearTimer()
      }
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

  // Keyboard navigation, only while the section is in view.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!inViewRef.current) {
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        moveStep(1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        moveStep(-1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [moveStep])

  const handlePointerEnter = () => {
    pausedRef.current = true
  }
  const handlePointerLeave = () => {
    pausedRef.current = false
  }

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null
  }
  const handleTouchEnd = (event: React.TouchEvent) => {
    const startX = touchStartXRef.current
    const endX = event.changedTouches[0]?.clientX
    touchStartXRef.current = null
    if (startX === null || endX === undefined) {
      return
    }
    const delta = endX - startX
    const SWIPE_THRESHOLD = 40
    if (delta > SWIPE_THRESHOLD) {
      moveStep(-1)
    } else if (delta < -SWIPE_THRESHOLD) {
      moveStep(1)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="story-section"
      id="story"
      aria-labelledby="story-title"
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      onFocus={handlePointerEnter}
      onBlur={handlePointerLeave}
    >
      <div className="story-section__ambient" aria-hidden="true">
        {resolvedSteps.map((media, index) =>
          media.src && media.type === 'video' ? (
            <video
              key={`${media.src}-${index}`}
              className={`story-section__ambient-layer${index === activeStep ? ' is-active' : ''}`}
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={media.src} type="video/webm" />
            </video>
          ) : media.src ? (
            <img
              key={`${media.src}-${index}`}
              className={`story-section__ambient-layer${index === activeStep ? ' is-active' : ''}`}
              src={media.src}
              alt=""
            />
          ) : null,
        )}
      </div>
      <div className="story-section__scrim" aria-hidden="true" />
      <div className="story-section__pixel-corner" aria-hidden="true">
        {Array.from({ length: 10 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="story-section__inner">
        <h2 className="story-section__heading" id="story-title">
          {title}
        </h2>
        <p className="story-section__intro">{intro}</p>
        <div
          className="story-section__grid"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <article className="story-section__feature">
            <p className="story-section__step">
              Step {String(activeStep + 1).padStart(2, '0')} <span aria-hidden="true">/</span>{' '}
              {String(storySteps.length).padStart(2, '0')}
            </p>
            <h3>{activeStory.title}</h3>
            <p>{activeStory.description}</p>
            <div className="story-section__controls-row">
              <div className="story-section__controls" aria-label="Story navigation">
                <button type="button" aria-label="Previous story step" onClick={() => moveStep(-1)}>
                  <span aria-hidden="true">‹</span>
                </button>
                <button type="button" aria-label="Next story step" onClick={() => moveStep(1)}>
                  <span aria-hidden="true">›</span>
                </button>
              </div>
              <div className="story-section__progress" role="tablist" aria-label="Story steps">
                {storySteps.map((step, index) => (
                  <button
                    key={step.title}
                    type="button"
                    role="tab"
                    aria-selected={index === activeStep}
                    aria-label={`Go to step ${index + 1}: ${step.title}`}
                    className={index === activeStep ? 'is-active' : ''}
                    onClick={() => goToStep(index)}
                  />
                ))}
              </div>
            </div>
          </article>
          <div className="story-section__media">
            {activeMedia.src && activeMedia.type === 'video' ? (
              <video key={activeMedia.src} autoPlay muted loop playsInline aria-label={activeMedia.alt}>
                <source src={activeMedia.src} type="video/webm" />
              </video>
            ) : activeMedia.src ? (
              <img key={activeMedia.src} src={activeMedia.src} alt={activeMedia.alt} />
            ) : (
              <div className="story-section__placeholder" aria-label="Media placeholder" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}