import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import PageTransition from './components/PageTransition'
import { saveScrollPosition } from './lib/scrollMemory'

import DownloadPage from './pages/DownloadPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import FeaturePage from './pages/FeaturePage'
import CommunityPage from './pages/CommunityPage'
import CreditsPage from './pages/CreditsPage'
import GalleryDetail from './pages/GalleryDetail'

function RouteScrollRecorder() {
  const location = useLocation()

  useEffect(() => {
    return () => {
      saveScrollPosition(location.key, window.scrollY)
    }
  }, [location.key])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteScrollRecorder />
      <Routes>
        {/* Parent Route menggunakan PageTransition sebagai wrapper */}
        <Route element={<PageTransition />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/feature" element={<FeaturePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/credit" element={<CreditsPage />} />
          <Route path="/gallery/:categorySlug" element={<GalleryDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}