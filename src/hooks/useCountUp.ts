import { useEffect, useMemo, useRef, useState } from 'react'

type Options = {
  durationMs?: number
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function useCountUp(target: number, options: Options = {}) {
  const { durationMs = 600 } = options
  const [value, setValue] = useState(target)
  const raf = useRef<number | null>(null)
  const lastTarget = useRef(target)

  const duration = useMemo(() => Math.max(120, durationMs), [durationMs])

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      setValue(target)
      return
    }

    const from = value
    const to = target
    if (from === to) return

    if (raf.current !== null) cancelAnimationFrame(raf.current)

    const start = performance.now()
    lastTarget.current = to

    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(1, elapsed / duration)
      const eased = easeOutCubic(t)
      const next = from + (to - from) * eased
      setValue(next)
      if (t < 1 && lastTarget.current === to) {
        raf.current = requestAnimationFrame(tick)
      }
    }

    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration])

  return value
}

