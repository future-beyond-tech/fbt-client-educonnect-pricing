import { useReducedMotion } from 'framer-motion'

export function useSectionMotion() {
  const reduce = useReducedMotion()

  const fadeUp = reduce
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' as const },
        },
      }

  const stagger = reduce
    ? { visible: { transition: { staggerChildren: 0 } } }
    : { visible: { transition: { staggerChildren: 0.07 } } }

  const viewport = { once: true, margin: '-60px' }

  return { fadeUp, stagger, viewport, reduce }
}


