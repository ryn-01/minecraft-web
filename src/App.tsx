import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DownloadPage from './pages/DownloadPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import FeaturePage from './pages/FeaturePage'
import CommunityPage from './pages/CommunityPage'
import CreditsPage from './pages/CreditsPage'

import GalleryDetail from './pages/GalleryDetail';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/feature" element={<FeaturePage />} />
        <Route path="/community" element={<CommunityPage/>}/>
        <Route path="/download" element={<DownloadPage />} />
        <Route path='/credit' element={<CreditsPage/>}/> 
        <Route path="/gallery/:categorySlug" element={<GalleryDetail />} />
      </Routes>
    </BrowserRouter>

  )
}
