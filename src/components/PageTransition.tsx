import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useOutlet, useNavigationType } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getScrollPosition, clearScrollPosition } from '../lib/scrollMemory'

gsap.registerPlugin(ScrollTrigger)

type RestoreState = { restoreScrollY?: number }

export default function PageTransition() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const outlet = useOutlet()
  const overlayRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)

  const [displayedOutlet, setDisplayedOutlet] = useState(outlet)
  const latestOutletRef = useRef(outlet)

  // Track the history KEY instead of just the pathname to correctly 
  // detect back/forward updates on similar routes or query changes.
  const pendingKey = useRef(location.key)
  const committedKey = useRef(location.key)

  useLayoutEffect(() => {
    latestOutletRef.current = outlet
  })

  useGSAP(
    () => {
      const fade = fadeRef.current
      if (!fade) return

      // Stop if the key hasn't changed
      if (pendingKey.current === location.key) return
      pendingKey.current = location.key

      ScrollTrigger.getAll().forEach((st) => st.kill())

      const tl = gsap.timeline({ onComplete: () => ScrollTrigger.refresh() })

      // 1. Fade in to a solid white cover.
      tl.to(fade, { opacity: 1, duration: 0.2, ease: 'sine.inOut' })

      // 2. Fully covered: swap to the new page AND resolve scroll position
      tl.call(() => {
        committedKey.current = location.key
        setDisplayedOutlet(latestOutletRef.current)

        const scrollToPosition = (top: number) => {
          const root = document.documentElement
          const previousBehavior = root.style.scrollBehavior
          root.style.scrollBehavior = 'auto'
          window.scrollTo(0, top)
          root.style.scrollBehavior = previousBehavior
        }

        const state = location.state as RestoreState | null
        if (typeof state?.restoreScrollY === 'number') {
          scrollToPosition(state.restoreScrollY)
          return
        }

        // BACK/FORWARD NAVIGATION: Restore previous coordinates safely under the cover
        if (navigationType === 'POP') {
          const savedY = getScrollPosition(location.key)
          if (savedY !== undefined) {
            scrollToPosition(savedY)
            clearScrollPosition(location.key) // Free up map memory after use
            return
          }
        }

        // HASH NAVIGATION: Give React a frame to commit elements
        if (location.hash) {
          const targetId = decodeURIComponent(location.hash.slice(1))
          requestAnimationFrame(() => {
            document.getElementById(targetId)?.scrollIntoView()
          })
          return
        }

        // NEW PAGES: RouteScrollManager has already handled resetting to top (0),
        // but if it didn't snap correctly, we reinforce it here while hidden.
        if (navigationType !== 'POP') {
          scrollToPosition(0)
        }
      })

      // 3. A short, calm hold.
      tl.to({}, { duration: 0.16 })

      // 4. Fade back out to reveal the new page.
      tl.to(fade, { opacity: 0, duration: 0.26, ease: 'sine.inOut' })
    },
    // Crucial change: Listen to location.key so that history POP tracking functions correctly
    { dependencies: [location.key], scope: overlayRef }
  )

  useEffect(() => {
    if (location.key === committedKey.current) {
      setDisplayedOutlet(outlet)
    }
  }, [outlet, location.key])

  return (
    <>
      <div ref={overlayRef} className="page-transition-overlay" aria-hidden="true">
        <div ref={fadeRef} className="transition-fade">
          <img src="/creeper.webp" alt="" />
        </div>
      </div>

      <div className="page-container">
        {displayedOutlet}
      </div>
    </>
  )
}
