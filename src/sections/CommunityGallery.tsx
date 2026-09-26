import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './communityGallery.css'

import mapsIMG from '../assets/images/maps.webp'
import modsIMG from '../assets/images/mods.webp'
import texture_packIMG from '../assets/images/texture_pack.webp'
import addonIMG from '../assets/images/addon.webp'
import redstoneIMG from '../assets/images/redstone.webp'
import fanartIMG from '../assets/images/fanart.webp'

type GalleryItem = {
  title: string
  category: string
  artwork: 'maps' | 'mods' | 'texture_pack' | 'addon' | 'redstone' | 'arts'
  path: string
  imageUrl: string
}

const galleryItems: GalleryItem[] = [
  { 
    title: 'Community Maps', 
    category: 'Community build', 
    artwork: 'maps', 
    path: '/gallery/maps',
    imageUrl: mapsIMG
  },
  { 
    title: 'Mods', 
    category: 'Player showcase', 
    artwork: 'mods', 
    path: '/gallery/mods',
    imageUrl: modsIMG
  },
  { 
    title: 'Texture Pack', 
    category: 'Player showcase', 
    artwork: 'texture_pack', 
    path: '/gallery/texture-pack',
    imageUrl: texture_packIMG
  },
  { 
    title: 'Addon', 
    category: 'Player showcase', 
    artwork: 'addon', 
    path: '/gallery/addon',
    imageUrl: addonIMG  
  },
  { 
    title: 'Redstone Build', 
    category: 'Community build', 
    artwork: 'redstone', 
    path: '/gallery/redstone',
    imageUrl: redstoneIMG
  },
  { 
    title: 'Minecraft Fanarts', 
    category: 'Community build', 
    artwork: 'arts', 
    path: '/gallery/fanarts',
    imageUrl: fanartIMG
  },
]

export default function CommunityGallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | GalleryItem['category']>('all')
  const navigate = useNavigate()
  const location = useLocation()

  const handleCardClick = (item: GalleryItem) => {
    navigate(item.path, {
      state: {
        galleryReturn: {
          pathname: location.pathname,
          scrollY: window.scrollY,
        },
      },
    })
  }

  const visibleItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter)

  return (
    <section className="community-gallery" id="gallery" aria-labelledby="gallery-title">
      <header className="community-gallery__header">
        <h2 id="gallery-title">Community Gallery</h2>
        <p>See what players are creating together across every world.</p>
        
        <div className="community-gallery__filters" role="group" aria-label="Filter community gallery">
          {(['all', 'Community build', 'Player showcase'] as const).map((filter) => (
            <button
              className={`community-gallery__filter${activeFilter === filter ? ' is-active' : ''}`}
              type="button"
              key={filter}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === 'all' ? 'All Works' : filter}
            </button>
          ))}
        </div>
      </header>
      
      <div className="community-gallery__grid">
        {visibleItems.map((item) => (
          <button
            className="community-gallery__item"
            type="button"
            key={item.title}
            onClick={() => handleCardClick(item)}
            aria-label={`Open ${item.title} page`}
          >
            <span 
              className="community-gallery__artwork" 
              style={{ backgroundImage: `url(${item.imageUrl})` }}
              aria-hidden="true" 
            />
            <span className="community-gallery__caption">
              <span className="community-gallery__caption-text">
                <strong>{item.title}</strong>
                <small>{item.category}</small>
              </span>
              <span className="community-gallery__arrow" aria-hidden="true">↗</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}