import { useState } from 'react'
import endPortalImage from '../assets/images/endPortal.webp'
import netherImage from '../assets/images/nether.webp'
import overworldImage from '../assets/images/steve.webp'
import './dimensionSection.css'

type Dimension = {
  name: string
  description: string
  color: string
  imageSrc: string
  imageAlt: string
}

const dimensions: Dimension[] = [
  {
    name: 'Overworld',
    description: 'Explore villages, oceans, forests, and endless places to build your home.',
    color: 'green',
    imageSrc: overworldImage,
    imageAlt: 'Steve exploring the Overworld',
  },
  {
    name: 'Nether',
    description: 'Cross dangerous fortresses, glowing caves, and rivers of lava.',
    color: 'red',
    imageSrc: netherImage,
    imageAlt: 'The Nether dimension',
  },
  {
    name: 'The End',
    description: 'Enter a mysterious outer island and face the ultimate dragon battle.',
    color: 'olive',
    imageSrc: endPortalImage,
    imageAlt: 'An End portal leading to The End',
  },
]

export default function DimensionSection() {
  const [activeDimension, setActiveDimension] = useState(0)

  return (
    <section className="dimension-section" id="dimensions" aria-labelledby="dimension-title">
      <header className="dimension-section__header">
        <h2 id="dimension-title">Build your story across every dimension</h2>
        <p>Build, survive, and conquer across the Overworld, Nether, and End.</p>
      </header>
      <div className="dimension-section__cards" role="tablist" aria-label="Minecraft dimensions">
        {dimensions.map((dimension, index) => {
          const isActive = activeDimension === index

          return (
            <article
              className={`dimension-card dimension-card--${dimension.color}${isActive ? ' is-active' : ''}`}
              key={dimension.name}
            >
              <button
                className="dimension-card__button"
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`dimension-panel-${index}`}
                onClick={() => setActiveDimension(index)}
              >
                <span className="dimension-card__artwork">
                  <img src={dimension.imageSrc} alt={dimension.imageAlt} />
                </span>
                <span className="dimension-card__content">
                  <span className="dimension-card__name">{dimension.name}</span>
                  <span className="dimension-card__description">{dimension.description}</span>
                  <span className="dimension-card__link">Learn more <span aria-hidden="true">↗</span></span>
                </span>
              </button>
              <div className="sr-only" id={`dimension-panel-${index}`} role="tabpanel">
                {dimension.description}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
