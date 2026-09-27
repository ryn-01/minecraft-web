import { useEffect } from "react"
import { useLocation, useNavigationType } from "react-router-dom"
import { saveScrollPosition } from "../lib/scrollMemory" // Adjust path as needed

export function RouteScrollManager() {
  const location = useLocation()
  const navType = useNavigationType()

  // 1. Record the position we're leaving FROM
  useEffect(() => {
    return () => {
      saveScrollPosition(location.key, window.scrollY)
    }
  }, [location.key])

  // 2. Only reset scroll on NEW page navigation (PUSH/REPLACE).
  // Defer to PageTransition for POP (back/forward) events.
  useEffect(() => {
    if (navType !== "POP") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      })
    }
  }, [location.key, navType])

  return null
}