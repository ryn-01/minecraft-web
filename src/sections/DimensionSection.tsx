import { useState } from 'react'
import './dimensionSection.css'

type Dimension = {
  name: string
  description: string
  color: string
  artworkClass: string
}

const dimensions: Dimension[] = [
  {
    name: 'Overworld',
    description: 'Explore villages, oceans, forests, and endless places to build your home.',
    color: 'green',
    artworkClass: 'overworld',
  },
  {
    name: 'Nether',
    description: 'Cross dangerous fortresses, glowing caves, and rivers of lava.',
    color: 'red',
    artworkClass: 'nether',
  },
  {
    name: 'The End',
    description: 'Enter a mysterious outer island and face the ultimate dragon battle.',
    color: 'olive',
    artworkClass: 'end',
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
                <span className={`dimension-card__artwork dimension-card__artwork--${dimension.artworkClass}`} aria-hidden="true" />
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
