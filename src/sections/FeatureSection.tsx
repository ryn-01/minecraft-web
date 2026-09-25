import { useCallback, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './featureSection.css'

// Contoh impor gambar webp untuk setiap mode (sesuaikan path foldernya dengan project Anda)
import survivalImg from '../assets/images/survival.webp'
import creativeImg from '../assets/images/creative.webp'
import hardcoreImg from '../assets/images/hardcore.webp'
import adventureImg from '../assets/images/adventure.webp'

gsap.registerPlugin(ScrollTrigger)

export type Feature = {
  title: string
  description: string
  artworkPosition: 'left' | 'right'
  artworkSrc?: string
  artworkAlt?: string
  artworkType?: 'image' | 'video'
}

const features: Feature[] = [
  {
    title: 'Survival',
    description: 'Build, survive, and conquer across the Overworld, Nether, and End.',
    artworkPosition: 'right',
    artworkSrc: survivalImg,
    artworkType: 'image',
  },
  {
    title: 'Creative',
    description: 'Build without limits and bring every idea to life.',
    artworkPosition: 'left',
    artworkSrc: creativeImg,
    artworkType: 'image',
  },
  {
    title: 'Hardcore',
    description: 'Test your skill and make every decision count.',
    artworkPosition: 'right',
    artworkSrc: hardcoreImg,
    artworkType: 'image',
  },
  {
    title: 'Adventure',
    description: 'Discover new worlds, gather resources, and write your own story.',
    artworkPosition: 'left',
    artworkSrc: adventureImg,
    artworkType: 'image',
  },
]

function isVideoSource(source: string) {
  return /\.(webm|mp4|ogg)(?:$|[?#])/i.test(source)
}

type FeatureSectionProps = {
  items?: Feature[]
}

export default function FeatureSection({ items = features }: FeatureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const progressFillRef = useRef<HTMLSpanElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const panelCount = items.length

  useGSAP(
    () => {
      const section = sectionRef.current
      const panels = gsap.utils.toArray<HTMLElement>('.feature-section__panel', section)

      if (!section || panels.length < 2) {
        return
      }

      gsap.set(panels.slice(1), { autoAlpha: 0 })

      const timeline = gsap.timeline({
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          end: () => `+=${(panels.length - 1) * window.innerHeight}`,
          onUpdate: (self) => {
            if (progressFillRef.current) {
              progressFillRef.current.style.transform = `scaleX(${self.progress})`
            }
            const nearest = Math.round(self.progress * (panels.length - 1))
            if (nearest !== activeIndexRef.current) {
              activeIndexRef.current = nearest
              setActiveIndex(nearest)
            }
          },
        },
      })

      scrollTriggerRef.current = timeline.scrollTrigger ?? null

      panels.slice(1).forEach((panel, index) => {
        const direction = index % 2 === 0 ? -100 : 100
        timeline
          .set(panel, { xPercent: direction, autoAlpha: 1 }, index)
          .to(panels[index], { autoAlpha: 0, duration: 0.35 }, index)
          .to(panel, { xPercent: 0, duration: 0.65 }, index)
      })

      return () => {
        scrollTriggerRef.current = null
      }
    },
    { scope: sectionRef, dependencies: [panelCount] },
  )

  // Mouse-tilt on each artwork panel for a more tactile, immersive feel.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) {
      return
    }
    const artworks = Array.from(section.querySelectorAll<HTMLElement>('.feature-section__artwork'))
    const cleanups: Array<() => void> = []

    artworks.forEach((el) => {
      gsap.set(el, { rotationX: 0, rotationY: 0 })

      const setRotation = (rotationX: number, rotationY: number) => {
        gsap.to(el, {
          rotationX,
          rotationY,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: true,
        })
      }

      const handleMove = (event: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const relX = (event.clientX - rect.left) / rect.width - 0.5
        const relY = (event.clientY - rect.top) / rect.height - 0.5
        setRotation(relY * -12, relX * 12)
      }
      const handleLeave = () => {
        setRotation(0, 0)
      }

      el.addEventListener('mousemove', handleMove)
      el.addEventListener('mouseleave', handleLeave)
      cleanups.push(() => {
        el.removeEventListener('mousemove', handleMove)
        el.removeEventListener('mouseleave', handleLeave)
        gsap.killTweensOf(el)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [items])

  const goToPanel = useCallback((index: number) => {
    const st = scrollTriggerRef.current
    if (!st) {
      return
    }
    const clamped = Math.max(0, Math.min(panelCount - 1, index))
    const progress = panelCount > 1 ? clamped / (panelCount - 1) : 0
    const target = st.start + (st.end - st.start) * progress
    window.scrollTo({ top: target, behavior: 'smooth' })
  }, [panelCount])

  // Arrow-key navigation, only while the pinned track is actively engaged.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const st = scrollTriggerRef.current
      if (!st || !st.isActive) {
        return
      }
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        goToPanel(activeIndexRef.current + 1)
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        goToPanel(activeIndexRef.current - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPanel])

  return (
    <section ref={sectionRef} className="feature-section" id="feature" aria-labelledby="feature-title">
      <div className="feature-section__header">
        <h2 id="feature-title">Features</h2>
        <p>Build, survive, and conquer across the Overworld, Nether, and End.</p>
        <div className="feature-section__progress-bar" aria-hidden="true">
          <span ref={progressFillRef} />
        </div>
      </div>
      <div className="feature-section__track">
        {items.map((feature, index) => (
          <article
            className={`feature-section__panel feature-section__panel--${feature.artworkPosition}`}
            key={feature.title}
            aria-hidden={index !== activeIndex}
          >
            <div className="feature-section__copy">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
            <div className="feature-section__artwork" aria-label={`${feature.title} feature artwork`}>
              {feature.artworkSrc && (feature.artworkType === 'video' || isVideoSource(feature.artworkSrc)) ? (
                <video autoPlay muted loop playsInline aria-label={feature.artworkAlt ?? `${feature.title} feature artwork`}>
                  <source src={feature.artworkSrc} />
                </video>
              ) : feature.artworkSrc ? (
                <img src={feature.artworkSrc} alt={feature.artworkAlt ?? `${feature.title} feature artwork`} />
              ) : null}
            </div>
          </article>
        ))}
      </div>
      <div className="feature-section__nav" role="tablist" aria-label="Feature slides">
        {items.map((feature, index) => (
          <button
            key={feature.title}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to ${feature.title}`}
            className={index === activeIndex ? 'is-active' : ''}
            onClick={() => goToPanel(index)}
          />
        ))}
      </div>
    </section>
  )
}