import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Theme } from '../hooks/useTheme'

interface NavbarProps {
  theme: Theme
  onToggleTheme: () => void
}

const NAV_LINKS = [
  { label: 'Features',     id: 'features'   },
  { label: 'How It Works', id: 'journey'     },
  { label: 'Investment',   id: 'investment'  },
  { label: 'Care Plan',    id: 'care'        },
  { label: 'FAQ',          id: 'faq'         },
]

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isDark = theme === 'dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNav = (id: string) => {
    scrollToId(id)
    setMenuOpen(false)
  }

  // When at top of page, nav sits over the dark hero — always use white text.
  // Once scrolled, adapt to the active theme's nav background.
  const atTop = !scrolled
  const linkColor = atTop || isDark
    ? 'text-white/65 hover:text-white'
    : 'text-[rgba(26,15,60,0.65)] hover:text-[#1A0F3C]'

  const iconColor = atTop || isDark
    ? 'border-[rgba(255,255,255,0.12)] text-white/65 hover:text-white'
    : 'border-[rgba(81,43,212,0.20)] text-[rgba(26,15,60,0.60)] hover:text-[#1A0F3C]'

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
      style={{
        background:    scrolled ? 'var(--th-nav-bg)'     : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)'           : 'none',
        borderBottom:  scrolled ? '1px solid var(--th-nav-border)' : '1px solid transparent',
      }}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">

        {/* ── Brand ─────────────────────────────────────── */}
        <button
          type="button"
          onClick={() => handleNav('opening')}
          className="flex items-center gap-2.5 focus-visible:outline-none"
          aria-label="EduConnect — scroll to top"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#512BD4] font-sans text-[11px] font-bold text-white shadow-[0_0_16px_rgba(81,43,212,0.50)]">
            EC
          </div>
          <div className="flex flex-col leading-none">
            <span className={`font-sans text-[14px] font-semibold ${atTop || isDark ? 'text-white' : 'text-[#1A0F3C]'}`}>
              EduConnect
            </span>
            <span className="font-sans text-[10px] font-semibold text-[#512BD4]">by FBT</span>
          </div>
        </button>

        {/* ── Desktop nav links ──────────────────────────── */}
        <div className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNav(link.id)}
              className={`rounded-lg px-3 py-2 font-sans text-[13px] font-medium transition hover:bg-[rgba(81,43,212,0.10)] ${linkColor}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* ── Right controls ─────────────────────────────── */}
        <div className="flex items-center gap-2">

          {/* See Pricing CTA */}
          <button
            type="button"
            onClick={() => handleNav('investment')}
            className="hidden items-center gap-1.5 rounded-xl bg-[#512BD4] px-4 py-2 font-sans text-[13px] font-semibold text-white transition hover:brightness-110 hover:shadow-[0_0_20px_rgba(81,43,212,0.45)] active:brightness-90 sm:flex"
          >
            See Pricing
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition hover:bg-[rgba(81,43,212,0.12)] ${iconColor}`}
          >
            {isDark
              ? <Sun  className="h-4 w-4" />
              : <Moon className="h-4 w-4" />
            }
          </button>

          {/* Hamburger (mobile only) */}
          <button
            type="button"
            onClick={() => setMenuOpen(m => !m)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition md:hidden ${iconColor}`}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="border-t md:hidden"
          style={{
            background:     'var(--th-nav-bg)',
            backdropFilter: 'blur(18px)',
            borderColor:    'var(--th-nav-border)',
          }}
        >
          <div className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNav(link.id)}
                className={`rounded-lg px-3 py-2.5 text-left font-sans text-[14px] font-medium transition hover:bg-[rgba(81,43,212,0.10)] ${
                  isDark
                    ? 'text-white/70 hover:text-white'
                    : 'text-[rgba(26,15,60,0.70)] hover:text-[#1A0F3C]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => handleNav('investment')}
              className="mt-2 rounded-xl bg-[#512BD4] px-4 py-2.5 font-sans text-[14px] font-semibold text-white transition hover:brightness-110 active:brightness-90"
            >
              See Pricing →
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
