import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import FooterSection from '../components/FooterSection'
import './galleryDetail.css'

import mapsIMG from '../assets/images/maps.webp'
import modsIMG from '../assets/images/mods.webp'
import texture_packIMG from '../assets/images/texture_pack.webp'
import addonIMG from '../assets/images/addon.webp'
import redstoneIMG from '../assets/images/redstone.webp'
import fanartIMG from '../assets/images/fanart.webp'
import mechaIMG from '../assets/images/mechaAddon.webp'

type Artwork = {
  id: string
  title: string
  author: string
  image: string
  description?: string
}

type CategoryDetail = {
  title: string
  description: string
  bannerImage: string
  artworks: Artwork[]
}

const categoryData: Record<string, CategoryDetail> = {
  'maps': {
    title: 'Community Maps',
    description: 'Explore custom survival worlds, parkour challenges, puzzle vaults, and massive adventure maps created by our community builders.',
    bannerImage: mapsIMG,
    artworks: [
      { id: 'm1', title: 'Cyberpunk Metropolis', author: 'BuilderPro99', image: mapsIMG, description: 'A massive futuristic neon city with full interiors and custom redstone light fixtures.' },
      { id: 'm2', title: 'Lost Temple of Ancient Ruins', author: 'CraftMaster', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80', description: 'A trap-filled adventure maze featuring custom mob spawners and treasure chests.' },
    ]
  },
  'mods': {
    title: 'Community Mods',
    description: 'Gameplay modifications, custom mob spawns, performance optimization suites, and new game mechanics.',
    bannerImage: modsIMG,
    artworks: [
      { id: 'mod1', title: 'Mutants & Bosses Expansion', author: 'ModCoder_X', image: modsIMG, description: 'Adds 12 mutated mob variants with special abilities and unique drop tables.' },
    ]
  },
  'texture-pack': {
    title: 'Texture Packs',
    description: 'Transform your voxel worlds with medieval, realistic, retro 8-bit, or stylized cartoon resource packs.',
    bannerImage: texture_packIMG,
    artworks: [
      { id: 'tp1', title: 'PixelCraft Realism 64x', author: 'ArtisanPixel', image: texture_packIMG, description: 'High-definition bump-mapped textures optimized for smooth gameplay performance.' },
    ]
  },
  'addon': {
    title: 'Community Addons',
    description: 'Custom entities, drivable vehicles, special armor suits, and behavioral scripts for enhanced sandbox play.',
    bannerImage: addonIMG,
    artworks: [
      { id: 'ad1', title: 'Mecha Armor & Exosuits', author: 'TechBuilder', image: mechaIMG, description: 'Wearable mechanical power armor with jetpack flight mechanics and plasma cannons.' },
    ]
  },
  'redstone': {
    title: 'Redstone Engineering',
    description: 'Automated farms, binary computers, hidden vault doors, and complex logic gate contraptions built by redstone engineers.',
    bannerImage: redstoneIMG,
    artworks: [
      { id: 'rs1', title: 'Automatic Mega Sorting Hub', author: 'RedstoneWizard', image: redstoneIMG, description: 'Capable of auto-sorting 256 item types into double-chest arrays using hopper filters.' },
    ]
  },
  'fanarts': {
    title: 'Minecraft Fanarts',
    description: 'Digital paintings, 3D render art, pixel illustrations, and character concept sketches created by community artists.',
    bannerImage: fanartIMG,
    artworks: [
      { id: 'fa1', title: 'Steve & Alex Nether Expedition', author: 'CreativeArtist', image: fanartIMG, description: 'A digital painting depicting an encounter with a Ghast in the Soul Sand Valley.' },
    ]
  }
}

export default function GalleryDetail() {
  const { categorySlug } = useParams<{ categorySlug: string }>()
  const navigate = useNavigate()
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)

  const currentCategory = (categorySlug && categoryData[categorySlug]) || {
    title: 'Community Gallery',
    description: 'Discover player-created builds, custom maps, mods, and artwork.',
    bannerImage: mapsIMG,
    artworks: []
  }

  // Kunci scroll halaman ketika modal preview aktif
  useEffect(() => {
    if (selectedArtwork) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedArtwork])

  // Handler tombol ESC untuk menutup modal
  useEffect(() => {
    if (!selectedArtwork) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedArtwork(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedArtwork])

  return (
    <div className="app-shell">
      <div className="app-navbar">
        <Navbar activeLabel="Community" />
      </div>

      <main className="gallery-detail-page">
        <div className="gallery-detail__container">
          <button 
            className="gallery-detail__back-btn" 
            type="button" 
            onClick={(e) => {e.preventDefault();navigate(-1)}}
          >
            <span aria-hidden="true">&larr;</span> Back to Gallery
          </button>

          {/* Hero Banner */}
          <header 
            className="gallery-detail__hero" 
            style={{ backgroundImage: `url(${currentCategory.bannerImage})` }}
          >
            <div className="gallery-detail__hero-overlay">
              <span className="gallery-detail__badge">Category Showcase</span>
              <h1>{currentCategory.title}</h1>
              <p>{currentCategory.description}</p>
            </div>
          </header>

          {/* Grid Karya Komunitas */}
          <section className="gallery-detail__content" aria-labelledby="category-works-title">
            <header className="gallery-detail__section-header">
              <span className="gallery-detail__eyebrow">Player Creations</span>
              <h2 id="category-works-title">Showcase & Submissions</h2>
            </header>

            {currentCategory.artworks.length > 0 ? (
              <div className="gallery-detail__grid">
                {currentCategory.artworks.map((art) => (
                  <button 
                    className="gallery-card" 
                    type="button" 
                    key={art.id} 
                    onClick={() => setSelectedArtwork(art)}
                  >
                    <div 
                      className="gallery-card__img" 
                      style={{ backgroundImage: `url(${art.image})` }} 
                      aria-hidden="true"
                    />
                    <div className="gallery-card__info">
                      <h3>{art.title}</h3>
                      <p className="gallery-card__author">
                        Created by: <strong>{art.author}</strong>
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="gallery-detail__empty">
                <p>No community submissions found for this category yet.</p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Modal Preview (Light Theme) */}
      {selectedArtwork && (
        <div 
          className="gallery-preview" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="gallery-preview-title"
          onClick={() => setSelectedArtwork(null)}
        >
          <div 
            className="gallery-preview__dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="gallery-preview__close"
              type="button"
              aria-label="Close artwork preview"
              onClick={() => setSelectedArtwork(null)}
            >
              &times;
            </button>

            <div
              className="gallery-preview__image"
              style={{ backgroundImage: `url(${selectedArtwork.image})` }}
              role="img"
              aria-label={`${selectedArtwork.title} by ${selectedArtwork.author}`}
            />

            <div className="gallery-preview__content">
              <span className="gallery-preview__tag">Community Submission</span>
              <h2 id="gallery-preview-title">{selectedArtwork.title}</h2>
              <p className="gallery-preview__author">Author: <strong>{selectedArtwork.author}</strong></p>
              {selectedArtwork.description && (
                <p className="gallery-preview__desc">{selectedArtwork.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <FooterSection />
    </div>
  )
}