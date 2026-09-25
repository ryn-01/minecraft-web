import HomeSection from './sections/homeSection'
import AboutSection from './sections/AboutSection'
import FeatureSection from './sections/FeatureSection'
import DimensionSection from './sections/DimensionSection'
import CommunitySection from './sections/CommunitySection'
import AdventureSection from './sections/AdventureSection'
import CommunityGallery from './sections/CommunityGallery'
import CtaSection from './sections/CtaSection'
import DownloadPage from './pages/DownloadPage'
import FooterSection from './sections/FooterSection'
import Navbar from './components/navbar'

export default function App() {
  const isDownloadPage = window.location.pathname === '/download'

  return (
    <div className="app-shell">
      <header className="app-navbar">
        <Navbar activeLabel={isDownloadPage ? 'Download' : 'Home'} />
      </header>
      {isDownloadPage ? (
        <DownloadPage />
      ) : (
        <>
          <HomeSection />
          <AboutSection />
          <FeatureSection />
          <DimensionSection />
          <CommunitySection />
          <CommunityGallery />
          <AdventureSection />
          <CtaSection />
          <FooterSection />
        </>
      )}
    </div>
  )
}
