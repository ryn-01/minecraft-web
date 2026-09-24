import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './featureSection.css'

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
  },
  {
    title: 'Creative',
    description: 'Build without limits and bring every idea to life.',
    artworkPosition: 'left',
  },
  {
    title: 'Hardcore',
    description: 'Test your skill and make every decision count.',
    artworkPosition: 'right',
  },
  {
    title: 'Adventure',
    description: 'Discover new worlds, gather resources, and write your own story.',
    artworkPosition: 'left',
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

  useGSAP(() => {
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
      },
    })

    panels.slice(1).forEach((panel, index) => {
      const direction = index % 2 === 0 ? -100 : 100
      timeline
        .set(panel, { xPercent: direction, autoAlpha: 1 }, index)
        .to(panels[index], { autoAlpha: 0, duration: 0.35 }, index)
        .to(panel, { xPercent: 0, duration: 0.65 }, index)
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="feature-section" id="feature" aria-labelledby="feature-title">
      <div className="feature-section__header">
        <h2 id="feature-title">Features</h2>
        <p>Build, survive, and conquer across the Overworld, Nether, and End.</p>
      </div>
      <div className="feature-section__track">
        {items.map((feature) => (
          <article
            className={`feature-section__panel feature-section__panel--${feature.artworkPosition}`}
            key={feature.title}
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
    </section>
  )
}
