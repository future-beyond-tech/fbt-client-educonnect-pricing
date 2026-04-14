import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { Content } from '../data/content'

type Props = {
  content: Content['nav']
  sectionIds: string[]
  primaryCtaHref: `#${string}`
}

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar({ content, sectionIds, primaryCtaHref }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const primaryCtaId = useMemo(() => primaryCtaHref.slice(1), [primaryCtaHref])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNavClick = (href: `#${string}`) => {
    const id = href.slice(1)
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={[
          'mx-auto max-w-6xl px-4',
          'transition-all duration-200',
          scrolled ? 'pt-3' : 'pt-4',
        ].join(' ')}
      >
        <div
          className={[
            'h-14 sm:h-16',
            'rounded-2xl border',
            'bg-white/70 backdrop-blur',
            'flex items-center justify-between',
            'px-4 sm:px-5',
            scrolled ? 'shadow-[0_14px_35px_rgba(15,17,23,0.10)] border-[var(--border)]' : 'border-transparent',
          ].join(' ')}
        >
          <button
            type="button"
            onClick={() => handleNavClick('#hero')}
            className="text-left"
            aria-label={content.brand.primary}
          >
            <div className="font-sans text-sm sm:text-[15px] font-medium tracking-tight text-[var(--text-primary)]">
              {content.brand.primary}
            </div>
            {content.brand.secondary ? (
              <div className="font-sans text-xs text-[var(--text-secondary)]">{content.brand.secondary}</div>
            ) : null}
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {content.items.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="font-sans text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleNavClick(`#${primaryCtaId}` as `#${string}`)}
              className="hidden sm:inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white hover:brightness-95 active:brightness-90 transition"
            >
              {content.primaryCta.label}
            </button>

            <button
              type="button"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-white/70 backdrop-blur hover:bg-white transition"
              onClick={() => setOpen((v) => !v)}
              aria-label={content.mobileMenuLabel}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5 text-[var(--text-primary)]" /> : <Menu className="h-5 w-5 text-[var(--text-primary)]" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-50"
          >
            <div
              className="absolute inset-0 bg-[rgba(15,17,23,0.40)]"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute left-4 right-4 top-4 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-[0_18px_60px_rgba(15,17,23,0.18)]"
            >
              <div className="flex items-center justify-between">
                <div className="font-sans text-sm font-medium">{content.brand.primary}</div>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] hover:bg-[var(--bg-primary)] transition"
                  onClick={() => setOpen(false)}
                  aria-label={content.closeMenuLabel}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-3 grid gap-1">
                {content.items
                  .filter((i) => sectionIds.includes(i.href.slice(1)))
                  .map((item) => (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => handleNavClick(item.href)}
                      className="w-full rounded-xl px-3 py-3 text-left font-sans text-sm text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition"
                    >
                      {item.label}
                    </button>
                  ))}
              </div>

              <button
                type="button"
                onClick={() => handleNavClick(`#${primaryCtaId}` as `#${string}`)}
                className="mt-3 w-full rounded-xl bg-accent px-4 py-3 text-sm font-medium text-white hover:brightness-95 active:brightness-90 transition"
              >
                {content.primaryCta.label}
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

