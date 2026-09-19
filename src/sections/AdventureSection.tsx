import { useState } from 'react'
import type { CSSProperties } from 'react'
import './adventureSection.css'

type Adventure = {
  title: string
  description: string
  artwork: 'snow' | 'jungle' | 'redstone' | 'caves' | 'sky' | 'ocean'
}

const adventures: Adventure[] = [
  {
    title: 'Snow Battle',
    description: 'Team up in a frozen arena, dodge incoming snowballs, and claim victory before the ice melts.',
    artwork: 'snow',
  },
  {
    title: 'Death Run',
    description: 'Race through ancient ruins, trigger traps, and reach the finish before the course catches you.',
    artwork: 'jungle',
  },
  {
    title: 'Redstone Battle',
    description: 'Use clever machines, pressure plates, and switches to outsmart your opponents.',
    artwork: 'redstone',
  },
  {
    title: 'Cave Rush',
    description: 'Descend into the deep dark, find hidden treasure, and escape before the caves collapse.',
    artwork: 'caves',
  },
  {
    title: 'Sky Islands',
    description: 'Build above the clouds, connect floating islands, and discover a new view of the world.',
    artwork: 'sky',
  },
  {
    title: 'Ocean Quest',
    description: 'Dive beneath the waves, explore coral reefs, and uncover ruins lost below the sea.',
    artwork: 'ocean',
  },
]

export default function AdventureSection() {
  const [activeAdventure, setActiveAdventure] = useState(1)

  const moveAdventure = (direction: -1 | 1) => {
    setActiveAdventure((current) => (current + direction + adventures.length) % adventures.length)
  }

  return (
    <section className="adventure-section" id="adventures" aria-labelledby="adventure-title">
      <header className="adventure-section__header">
        <h2 id="adventure-title">New adventures await</h2>
        <p>Explore new places, join fresh events, and experience the newest additions to our ever-growing world.</p>
      </header>
      <div className="adventure-section__carousel">
        <button
          className="adventure-section__control adventure-section__control--previous"
          type="button"
          aria-label="Previous adventure"
          onClick={() => moveAdventure(-1)}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <div className="adventure-section__cards" aria-live="polite">
          {adventures.map((adventure, index) => {
            const distance = (index - activeAdventure + adventures.length) % adventures.length
            const isActive = index === activeAdventure
            const isVisible = distance === 0 || distance === 1 || distance === adventures.length - 1

            return (
              <article
                className={`adventure-card${isVisible ? ' is-visible' : ''}${isActive ? ' is-active' : ''}`}
                key={adventure.title}
                style={{ '--card-order': distance === adventures.length - 1 ? -1 : distance } as CSSProperties}
              >
                <button
                  className="adventure-card__button"
                  type="button"
                  aria-label={`Select ${adventure.title}`}
                  onClick={() => setActiveAdventure(index)}
                >
                  <span className={`adventure-card__artwork adventure-card__artwork--${adventure.artwork}`} aria-hidden="true" />
                  <span className="adventure-card__content">
                    <span className="adventure-card__title">{adventure.title}</span>
                    <span className="adventure-card__description">{adventure.description}</span>
                    <span className="adventure-card__link">Learn more <span aria-hidden="true">↗</span></span>
                  </span>
                </button>
              </article>
            )
          })}
        </div>
        <button
          className="adventure-section__control adventure-section__control--next"
          type="button"
          aria-label="Next adventure"
          onClick={() => moveAdventure(1)}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </section>
  )
}
