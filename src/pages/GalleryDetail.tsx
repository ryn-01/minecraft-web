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

// Definisi tipe data untuk detail kategori & karya komunitas
type Artwork = {
  id: string
  title: string
  author: string
  image: string
}

type CategoryDetail = {
  title: string
  description: string
  bannerImage: string
  artworks: Artwork[]
}

// Data penjelasan dan daftar karya berdasarkan kategori
const categoryData: Record<string, CategoryDetail> = {
  'maps': {
    title: 'Community Maps',
    description: 'Jelajahi berbagai peta (maps) petualangan, survival, dan puzzle luar biasa yang dibuat oleh para builder berbakat di server kita. Setiap peta menawarkan tantangan unik dan dunia yang imersif.',
    bannerImage: mapsIMG,
    artworks: [
      { id: 'm1', title: 'Cyberpunk Map', author: 'BuilderPro99', image: mapsIMG },
      { id: 'm2', title: 'Lost Temple of Java', author: 'CraftMaster', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80' },
    ]
  },
  'mods': {
    title: 'Mods',
    description: 'Kumpulan modifikasi game pilihan yang memperkaya pengalaman bermain Minecraft, mulai dari mekanik gameplay baru, mobs tambahan, hingga optimasi performa.',
    bannerImage: modsIMG,
    artworks: [
      { id: 'mod1', title: 'Mutants Mod', author: 'ModCoder_X', image: modsIMG },
    ]
  },
  'texture-pack': {
    title: 'Texture Pack',
    description: 'Ubah nuansa visual dunia Minecraft Anda menjadi lebih realistis, bergaya kartun, atau bertema abad pertengahan dengan koleksi texture pack buatan komunitas.',
    bannerImage: texture_packIMG,
    artworks: [
      { id: 'tp1', title: 'PixelCraft Realism 64x', author: 'ArtisanPixel', image: texture_packIMG },
    ]
  },
  'addon': {
    title: 'Addon',
    description: 'Addon kreatif yang menambahkan elemen kustom, kendaraan, item unik, dan perilaku baru ke dalam permainan.',
    bannerImage: addonIMG,
    artworks: [
      { id: 'ad1', title: 'Mecha Armor', author: 'TechBuilder', image: mechaIMG },
    ]
  },
  'redstone': {
    title: 'Redstone Build',
    description: 'Koleksi mesin otomatis, kalkulator, jebakan canggih, dan contraption redstone rumit hasil karya para insinyur jenius di komunitas.',
    bannerImage: redstoneIMG,
    artworks: [
      { id: 'rs1', title: 'Automatic Mega Farm', author: 'RedstoneWizard', image: redstoneIMG },
    ]
  },
  'fanarts': {
    title: 'Minecraft Fanarts',
    description: 'Karya seni digital, ilustrasi, dan sketsa kreatif bertema karakter, item, serta pemandangan ikonik dunia Minecraft.',
    bannerImage: fanartIMG,
    artworks: [
      { id: 'fa1', title: 'Steve & Alex', author: 'CreativeArtist', image: fanartIMG },
    ]
  }
}

export default function GalleryDetail() {
  const { categorySlug } = useParams<{ categorySlug: string }>()
  const navigate = useNavigate()

  // Ambil data berdasarkan URL slug, fallback ke data default jika tidak ditemukan
  const currentCategory = (categorySlug && categoryData[categorySlug]) || {
    title: 'Kategori Galeri',
    description: 'Selamat datang di galeri komunitas Minecraft.',
    bannerImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    artworks: []
  }

  return (
    <div className="app-shell">
          <div className="app-navbar">
            <Navbar activeLabel="Community" />
          </div>

    <div className="gallery-detail-page">
      {/* Tombol Kembali */}
      {/* <button className="gallery-detail__back-btn" onClick={() => navigate(-1)}>
        &larr; Kembali ke Galeri
      </button> */}

      {/* Header Banner & Penjelasan */}
      <header className="gallery-detail__hero" style={{ backgroundImage: `url(${currentCategory.bannerImage})` }}>
        <div className="gallery-detail__hero-overlay">
          <h1>{currentCategory.title}</h1>
          <p>{currentCategory.description}</p>
        </div>
      </header>

      {/* Bagian Daftar Karya Komunitas */}
      <section className="gallery-detail__content">
        <h2>list of Community Works</h2>
        <div className="gallery-detail__grid">
          {currentCategory.artworks.length > 0 ? (
            currentCategory.artworks.map((art) => (
              <div className="gallery-card" key={art.id}>
                <div 
                  className="gallery-card__img" 
                  style={{ backgroundImage: `url(${art.image})` }} 
                />
                <div className="gallery-card__info">
                  <h3>{art.title}</h3>
                  <span>Oleh: {art.author}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="gallery-detail__empty">Belum ada karya yang diunggah untuk kategori ini.</p>
          )}
        </div>
      </section>
    </div>
    <FooterSection />
    </div>
  )
}