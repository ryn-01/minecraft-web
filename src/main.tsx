import HomeSection from './sections/homeSection'
import AboutSection from './sections/AboutSection'
import FeatureSection from './sections/FeatureSection'
import DimensionSection from './sections/DimensionSection'
import CommunitySection from './sections/CommunitySection'
import AdventureSection from './sections/AdventureSection'
import CommunityGallery from './sections/CommunityGallery'
import Navbar from './components/navbar'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="app-shell">
      <header className="app-navbar">
        <Navbar />
      </header>
      <HomeSection />
      <AboutSection />
      <FeatureSection />
      <DimensionSection />
      <CommunitySection />
      <CommunityGallery />
      <AdventureSection />
    </div>
  </StrictMode>,
)
