import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './adventureSection.css'

import snowBattleIMG from '../assets/images/snowBattle.webp'
import deathRunIMG from '../assets/images/deathRun.webp'
import redstoneBattleIMG from '../assets/images/redstoneBattle.webp'
import caveRushIMG from '../assets/images/caveRush.webp'
import skyIslandIMG from '../assets/images/skyIslandArea.webp'
import oceanQuestIMG from '../assets/images/oceanQuest.webp'

type Adventure = {
  eyebrow: string
  title: string
  tags: string[]
  description: string
  artwork: string
}

const adventures: Adventure[] = [
  {
    eyebrow: 'Winter Arena',
    title: 'Snow Battle',
    tags: ['PVP', 'Minigame', 'Fast-Paced'],
    description: 'Team up in a frozen arena, dodge incoming snowballs, and claim victory before the ice melts.',
    artwork: snowBattleIMG,
  },
  {
    eyebrow: 'Jungle Ruins',
    title: 'Death Run',
    tags: ['Parkour', 'Traps', 'Race'],
    description: 'Race through ancient ruins, trigger traps, and reach the finish before the course catches you.',
    artwork: deathRunIMG,
  },
  {
    eyebrow: 'Logic Circuits',
    title: 'Redstone Battle',
    tags: ['Puzzle', 'Mechanics', 'Strategy'],
    description: 'Use clever machines, pressure plates, and automated switches to outsmart your opponents.',
    artwork: redstoneBattleIMG,
  },
  {
    eyebrow: 'Deep Darkness',
    title: 'Cave Rush',
    tags: ['Survival', 'Loot', 'PvE'],
    description: 'Descend into the deep dark, find hidden treasure, and escape before the caves collapse.',
    artwork: caveRushIMG,
  },
  {
    eyebrow: 'High Altitude',
    title: 'Sky Islands',
    tags: ['Exploration', 'Void', 'Creative'],
    description: 'Build above the clouds, connect floating islands, and discover a new view of the world.',
    artwork: skyIslandIMG,
  },
  {
    eyebrow: 'Sunken Ruins',
    title: 'Ocean Quest',
    tags: ['Adventure', 'Aquatic', 'Mystery'],
    description: 'Dive beneath the waves, explore coral reefs, and uncover ruins lost below the sea.',
    artwork: oceanQuestIMG,
  },
]

export default function AdventureSection() {
  const [activeAdventure, setActiveAdventure] = useState(1)
  const navigate = useNavigate()

  const moveAdventure = (direction: -1 | 1) => {
    setActiveAdventure((current) => (current + direction + adventures.length) % adventures.length)
  }

  const handleCardClick = (index: number) => {
    if (index === activeAdventure) {
      navigate('/community')
    } else {
      setActiveAdventure(index)
    }
  }

  const getPositionClass = (index: number) => {
    const distance = (index - activeAdventure + adventures.length) % adventures.length
    if (distance === 0) return 'adventure-card--active'
    if (distance === 1) return 'adventure-card--next'
    if (distance === adventures.length - 1) return 'adventure-card--prev'
    return 'adventure-card--hidden'
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
            const positionClass = getPositionClass(index)

            return (
              <article
                className={`adventure-card ${positionClass}`}
                key={adventure.title}
              >
                <button
                  className="adventure-card__button"
                  type="button"
                  aria-label={`Select ${adventure.title}`}
                  onClick={() => handleCardClick(index)}
                  tabIndex={positionClass === 'adventure-card--hidden' ? -1 : 0}
                >
                  <span
                    className="adventure-card__artwork"
                    aria-hidden="true" 
                    style={{ backgroundImage: `url(${adventure.artwork})` }}
                  />
                  <span className="adventure-card__content">
                    <span className="adventure-card__eyebrow">{adventure.eyebrow}</span>
                    <span className="adventure-card__title">{adventure.title}</span>
                    <span className="adventure-card__tags" aria-label={`${adventure.title} tags`}>
                      {adventure.tags.map((tag) => (
                        <span className="adventure-tag" key={tag}>{tag}</span>
                      ))}
                    </span>
                    <span className="adventure-card__description">{adventure.description}</span>
                    <span className="adventure-card__link">
                      Learn more <span aria-hidden="true">↗</span>
                    </span>
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