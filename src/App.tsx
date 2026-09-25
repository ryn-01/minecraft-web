import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DownloadPage from './pages/DownloadPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import FeaturePage from './pages/FeaturePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/feature" element={<FeaturePage />} />
        <Route path="/download" element={<DownloadPage />} />
      </Routes>
    </BrowserRouter>

  )
}
