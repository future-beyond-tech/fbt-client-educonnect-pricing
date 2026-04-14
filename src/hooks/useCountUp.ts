import { useEffect, useMemo, useRef, useState } from 'react'

type Options = {
  durationMs?: number
  from?: number
  delayMs?: number
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function useCountUp(target: number, options: Options = {}) {
  const { durationMs = 600, from, delayMs = 0 } = options
  const [value, setValue] = useState<number>(from ?? target)
  const raf = useRef<number | null>(null)
  const lastTarget = useRef(target)
  const timer = useRef<number | null>(null)

  const duration = useMemo(() => Math.max(120, durationMs), [durationMs])

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      if (timer.current !== null) window.clearTimeout(timer.current)
      setValue(target)
      return
    }

    const fromValue = value
    const to = target
    if (fromValue === to) return

    if (raf.current !== null) cancelAnimationFrame(raf.current)

    const run = () => {
      const start = performance.now()
      lastTarget.current = to

      const tick = (now: number) => {
        const elapsed = now - start
        const t = Math.min(1, elapsed / duration)
        const eased = easeOutCubic(t)
        const next = fromValue + (to - fromValue) * eased
        setValue(next)
        if (t < 1 && lastTarget.current === to) {
          raf.current = requestAnimationFrame(tick)
        }
      }

      raf.current = requestAnimationFrame(tick)
    }

    if (delayMs > 0) {
      if (timer.current !== null) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(run, delayMs)
    } else {
      run()
    }

    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current)
      if (timer.current !== null) window.clearTimeout(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration, delayMs])

  return value
}

