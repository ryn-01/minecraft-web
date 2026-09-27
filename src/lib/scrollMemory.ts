// Shared scroll-position memory across route changes. App.tsx records the
// position we're leaving FROM; PageTransition reads it back and applies it
// at the one moment that matters — once the screen is fully covered —
// instead of the scroll jumping while the old page is still visible.

const scrollPositions = new Map<string, number>()

export function saveScrollPosition(key: string, y: number) {
  scrollPositions.set(key, y)
}

export function getScrollPosition(key: string): number | undefined {
  return scrollPositions.get(key)
}

export function clearScrollPosition(key: string) {
  scrollPositions.delete(key)
}
