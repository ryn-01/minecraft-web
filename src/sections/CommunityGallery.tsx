import { useEffect, useState } from 'react'
import './communityGallery.css'

type GalleryItem = {
  title: string
  category: string
  artwork: 'village' | 'castle' | 'nether' | 'ocean' | 'forest' | 'build'
}

const galleryItems: GalleryItem[] = [
  { title: 'Village morning', category: 'Community build', artwork: 'village' },
  { title: 'Castle in the clouds', category: 'Player showcase', artwork: 'castle' },
  { title: 'Nether expedition', category: 'Server event', artwork: 'nether' },
  { title: 'Ocean monument', category: 'Co-op project', artwork: 'ocean' },
  { title: 'Forest settlement', category: 'Community build', artwork: 'forest' },
  { title: 'Redstone workshop', category: 'Player showcase', artwork: 'build' },
]

export default function CommunityGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  // Prevent background scrolling when the modal is open
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
            onClick={() => setSelectedItem(item)}
            aria-label={`Open ${item.title}`}
          >
            <span className={`community-gallery__artwork community-gallery__artwork--${item.artwork}`} aria-hidden="true" />
            <span className="community-gallery__caption">
              <strong>{item.title}</strong>
              <small>{item.category}</small>
            </span>
          </button>
        ))}
      </div>
      {selectedItem && (
        <div className="community-gallery__dialog" role="dialog" aria-modal="true" aria-labelledby="gallery-dialog-title">
          <button
            className="community-gallery__backdrop"
            type="button"
            aria-label="Close gallery preview"
            onClick={() => setSelectedItem(null)}
          />
          <div className="community-gallery__preview">
            <span className={`community-gallery__artwork community-gallery__artwork--${selectedItem.artwork}`} aria-hidden="true" />
            <h3 id="gallery-dialog-title">{selectedItem.title}</h3>
            <p>{selectedItem.category}</p>
            <button type="button" onClick={() => setSelectedItem(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  )
}