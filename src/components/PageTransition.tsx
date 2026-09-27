import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useOutlet, useNavigationType } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getScrollPosition } from '../lib/scrollMemory'

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

  const pendingPathname = useRef(location.pathname)
  const committedPathname = useRef(location.pathname)

  useLayoutEffect(() => {
    latestOutletRef.current = outlet
  })

  useGSAP(
    () => {
      const fade = fadeRef.current
      if (!fade) return

      if (pendingPathname.current === location.pathname) return
      pendingPathname.current = location.pathname

      ScrollTrigger.getAll().forEach((st) => st.kill())

      const tl = gsap.timeline({ onComplete: () => ScrollTrigger.refresh() })

      // 1. Fade in to a solid white cover. The creeper mark is already at
      //    its resting 40% opacity, so it just appears along with the fade.
      tl.to(fade, { opacity: 1, duration: 0.26, ease: 'sine.inOut' })

      // 2. Fully covered: swap to the new page AND resolve scroll position,
      //    all while hidden. Doing both here — instead of in a separate
      //    App-level effect — is what stops the old page from visibly
      //    jumping to the top before the cover finishes.
      tl.call(() => {
        committedPathname.current = location.pathname
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

        const savedY = getScrollPosition(location.key)
        if (navigationType === 'POP' && savedY !== undefined) {
          scrollToPosition(savedY)
          return
        }

        if (location.hash) {
          const targetId = decodeURIComponent(location.hash.slice(1))
          // Give React a frame to commit the new page before we look
          // for the target element.
          requestAnimationFrame(() => {
            document.getElementById(targetId)?.scrollIntoView()
          })
          return
        }

        scrollToPosition(0)
      })

      // 3. A short, calm hold.
      tl.to({}, { duration: 0.16 })

      // 4. Fade back out to reveal the new page.
      tl.to(fade, { opacity: 0, duration: 0.26, ease: 'sine.inOut' })
    },
    { dependencies: [location.pathname], scope: overlayRef }
  )

  useEffect(() => {
    if (location.pathname === committedPathname.current) {
      setDisplayedOutlet(outlet)
    }
  }, [outlet, location.pathname])

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