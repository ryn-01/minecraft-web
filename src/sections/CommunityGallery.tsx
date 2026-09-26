import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' // Sesuaikan dengan router Anda jika pakai Next.js/lainnya
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
  path: string // URL tujuan halaman selanjutnya
  imageUrl: string // URL background image untuk masing-masing card
}

const galleryItems: GalleryItem[] = [
  { 
    title: 'Community Maps', 
    category: 'Community build', 
    artwork: 'maps', 
    path: '/gallery/maps',
    imageUrl: mapsIMG // Contoh gambar Minecraft/Game style
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
  const [selectedItem] = useState<GalleryItem | null>(null)
  const navigate = useNavigate() // Hook navigasi

  // Mencegah background scroll saat modal preview terbuka (opsional jika masih ingin dipakai)
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedItem])

  const handleCardClick = (item: GalleryItem) => {
    // Navigasi ke halaman selanjutnya sesuai judul/path
    navigate(item.path)
  }

  return (
    <section className="community-gallery" id="gallery" aria-labelledby="gallery-title">
      <header className="community-gallery__header">
        <h2 id="gallery-title">Community gallery</h2>
        <p>See what players are creating together across every world.</p>
      </header>
      
      <div className="community-gallery__grid">
        {galleryItems.map((item) => (
          <button
            className="community-gallery__item"
            type="button"
            key={item.title}
            onClick={() => handleCardClick(item)}
            aria-label={`Buka halaman ${item.title}`}
          >
            {/* Bagian Background Image dengan Inline Style untuk URL gambar */}
            <span 
              className="community-gallery__artwork" 
              style={{ backgroundImage: `url(${item.imageUrl})` }}
              aria-hidden="true" 
            />
            <span className="community-gallery__caption">
              <strong>{item.title}</strong>
              <small>{item.category}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}