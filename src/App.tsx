
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageTransition from './components/PageTransition'

import DownloadPage from './pages/DownloadPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import FeaturePage from './pages/FeaturePage'
import CommunityPage from './pages/CommunityPage'
import CreditsPage from './pages/CreditsPage'
import GalleryDetail from './pages/GalleryDetail'
import { RouteScrollManager } from './components/RouteScrollManager'


export default function App() {
  return (
    <BrowserRouter>
      <RouteScrollManager />
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