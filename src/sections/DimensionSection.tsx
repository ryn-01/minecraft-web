import { useEffect, useState } from 'react'
import './dimensionSection.css'

type Dimension = {
  name: string
  description: string
  detailedDescription: string
  color: string
  imageSrc: string
  imageAlt: string
}

const dimensions: Dimension[] = [
  {
    name: 'Overworld',
    description: 'Explore villages, oceans, forests, and endless places to build your home.',
    detailedDescription:
      'The Overworld is where every journey starts — sun-drenched plains, dense jungles, snowy peaks, and deep oceans all generated fresh every world. Chop trees, mine ore, farm crops, tame animals, and grow a base into a full village over time. It stays calm by day, but night brings zombies, skeletons, and spiders, so defenses matter as much as decoration.',
    color: 'green',
    imageSrc: '/videos/dimensions/overworld_potrait.webm',
    imageAlt: 'Steve exploring the Overworld',
  },
  {
    name: 'Nether',
    description: 'Cross dangerous fortresses, glowing caves, and rivers of lava.',
    detailedDescription:
      'A hostile dimension beneath the bedrock, built from netherrack, soul sand, and rivers of lava, where blazes, piglins, and ghasts guard every path. It hides ancient debris for netherite gear, glowstone for light, and quartz for building — and its fortresses hold the blaze rods needed to open a portal to the End. One Nether block also covers roughly eight Overworld blocks, making it the fastest way to travel long distances.',
    color: 'red',
    imageSrc: '/videos/dimensions/nether_potrait.webm',
    imageAlt: 'The Nether dimension',
  },
  {
    name: 'The End',
    description: 'Enter a mysterious outer island and face the ultimate dragon battle.',
    detailedDescription:
      'A shattered void reachable only through a stronghold portal, home to the Ender Dragon and the endermen that patrol its islands. Defeating the dragon earns you the dragon egg and opens the outer End, a scattered archipelago guarded by shulkers and dotted with end cities full of elytra, shulker boxes, and rare loot. It is the last major challenge Minecraft has to offer.',
    color: 'olive',
    imageSrc: '/videos/dimensions/end_potrait.webm',
    imageAlt: 'An End portal leading to The End',
  },
]

export default function DimensionSection() {
  const [activeDimension, setActiveDimension] = useState<number | null>(null)

  const selectDimension = (index: number | null) => {
    setActiveDimension(index)
  }

  const isVideoSource = (source: string) => source.endsWith('.webm')

  useEffect(() => {
    if (activeDimension === null) {
      return
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        selectDimension(null)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        selectDimension((activeDimension + 1) % dimensions.length)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        selectDimension((activeDimension - 1 + dimensions.length) % dimensions.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeDimension])

  return (
    <section className="dimension-section" id="dimensions" aria-labelledby="dimension-title">
      <header className="dimension-section__header">
        <h2 id="dimension-title">Build your story across every dimension</h2>
        <p>Build, survive, and conquer across the Overworld, Nether, and End.</p>
      </header>
      <div
        className={`dimension-section__cards${activeDimension !== null ? ' has-active' : ''}`}
        role="tablist"
        aria-label="Minecraft dimensions"
      >
        {dimensions.map((dimension, index) => {
          const isActive = activeDimension === index
          const isCollapsed = activeDimension !== null && !isActive

          return (
            <article
              className={`dimension-card dimension-card--${dimension.color}${isActive ? ' is-active' : ''}${
                isCollapsed ? ' is-collapsed' : ''
              }`}
              key={dimension.name}
            >
              <button
                className="dimension-card__button"
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-expanded={isActive}
                aria-controls={`dimension-panel-${index}`}
                onClick={() => selectDimension(isActive ? null : index)}
              >
                {isActive ? (
                  <span className="dimension-card__expanded">
                    <video
                      className="dimension-card__video"
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={`${dimension.name} environment loop`}
                    >
                      <source src={dimension.imageSrc} type="video/webm" />
                    </video>
                    <span className="dimension-card__scrim" aria-hidden="true" />
                    <span className="dimension-card__expanded-content">
                      <span className="dimension-card__name">{dimension.name}</span>
                      <span className="dimension-card__description dimension-card__description--detailed">
                        {dimension.detailedDescription}
                      </span>
                      <span className="dimension-card__link">
                        Close <span aria-hidden="true">×</span>
                      </span>
                    </span>
                  </span>
                ) : (
                  <>
                    <span className="dimension-card__collapsed" aria-hidden="true">
                      <span className="dimension-card__collapsed-label">{dimension.name}</span>
                    </span>
                    <span className="dimension-card__artwork">
                      {isVideoSource(dimension.imageSrc) ? (
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          aria-label={dimension.imageAlt}
                        >
                          <source src={dimension.imageSrc} type="video/webm" />
                        </video>
                      ) : (
                        <img src={dimension.imageSrc} alt={dimension.imageAlt} />
                      )}
                    </span>
                    <span className="dimension-card__content">
                      <span className="dimension-card__name">{dimension.name}</span>
                      <span className="dimension-card__description">{dimension.description}</span>
                      <span className="dimension-card__link">
                        Expand <span aria-hidden="true">↗</span>
                      </span>
                    </span>
                  </>
                )}
              </button>
              <div className="sr-only" id={`dimension-panel-${index}`} role="tabpanel">
                {dimension.detailedDescription}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}