import { useLayoutEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import DownloadPage from './pages/DownloadPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import FeaturePage from './pages/FeaturePage'
import CommunityPage from './pages/CommunityPage'
import CreditsPage from './pages/CreditsPage'

import GalleryDetail from './pages/GalleryDetail';

type ScrollLocationState = {
  restoreScrollY?: number
}

function RouteScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const scrollPositions = useRef(new Map<string, number>())

  useLayoutEffect(() => {
    let firstFrame = 0
    let secondFrame = 0
    const savedPositions = scrollPositions.current

    const scrollToPosition = (top: number) => {
      const root = document.documentElement
      const previousScrollBehavior = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'
      window.scrollTo(0, top)
      root.style.scrollBehavior = previousScrollBehavior
    }

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        const state = location.state as ScrollLocationState | null
        if (typeof state?.restoreScrollY === 'number') {
          scrollToPosition(state.restoreScrollY)
          return
        }

        const savedScrollY = savedPositions.get(location.key)
        if (navigationType === 'POP' && savedScrollY !== undefined) {
          scrollToPosition(savedScrollY)
          return
        }

        if (location.hash) {
          const targetId = decodeURIComponent(location.hash.slice(1))
          document.getElementById(targetId)?.scrollIntoView()
          return
        }

        scrollToPosition(0)
      })
    })

    return () => {
      savedPositions.set(location.key, window.scrollY)
      window.cancelAnimationFrame(firstFrame)
      window.cancelAnimationFrame(secondFrame)
    }
  }, [location.hash, location.key, location.pathname, location.search, location.state, navigationType])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteScrollManager />
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
