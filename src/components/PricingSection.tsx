import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { Content } from '../data/content'
import { useSectionMotion } from './motion'

type Billing = 'monthly' | 'yearly'

type Props = {
  content: Content['pricing']
  billing: Billing
  onBillingChange: (next: Billing) => void
}

function formatInr(n: number) {
  return `₹${n.toLocaleString('en-IN')}`
}

export default function PricingSection({ content, billing, onBillingChange }: Props) {
  const isYearly = billing === 'yearly'
  const { fadeUp, stagger, viewport, reduce } = useSectionMotion()

  return (
    <section id={content.id} className="bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]">
            {content.heading}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 font-sans text-[15px] sm:text-[16px] leading-7 text-[var(--text-secondary)]">
            {content.subheading}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 sm:px-5">
              <div className="font-sans text-sm text-[var(--text-secondary)]">
                {content.billingLabel}
              </div>

              <button
                type="button"
                onClick={() => onBillingChange(isYearly ? 'monthly' : 'yearly')}
                className="relative inline-flex h-10 w-[220px] items-center rounded-full border border-[var(--border)] bg-[var(--bg-primary)] p-1"
                aria-label={content.toggleAriaLabel}
              >
                <motion.span
                  layout
                  transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 30 }}
                  className={[
                    'absolute top-1 h-8 w-[108px] rounded-full bg-white shadow-[0_10px_25px_rgba(15,17,23,0.10)]',
                    isYearly ? 'left-[110px]' : 'left-1',
                  ].join(' ')}
                />
                <span className="relative z-10 flex w-full items-center justify-between px-2 text-sm font-medium">
                  <span className={isYearly ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}>
                    {content.toggle.monthly}
                  </span>
                  <span className={isYearly ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}>
                    {content.toggle.yearly}
                  </span>
                </span>
              </button>
            </div>

            <AnimatePresence initial={false}>
              {isYearly ? (
                <motion.div
                  key="banner"
                  initial={{ height: 0, opacity: 0, y: -6 }}
                  animate={{ height: 'auto', opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="rounded-2xl border border-[rgba(26,107,74,0.25)] bg-[var(--accent-light)] px-4 py-3 font-sans text-sm text-[var(--text-primary)]">
                    <span className="font-medium text-accent">{content.toggle.savingsBanner}</span>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>

          <motion.div variants={stagger} className="mt-10 grid gap-5 lg:grid-cols-3">
            <motion.div variants={fadeUp} className="rounded-3xl border border-[var(--border)] bg-white p-7">
                <div className="inline-flex items-center rounded-full bg-[rgba(217,119,6,0.14)] px-3 py-1 text-xs font-semibold text-[var(--amber)]">
                {content.setupCard.badge}
              </div>
              <div className="mt-4 font-serif text-2xl tracking-tight">{content.setupCard.title}</div>
              <div className="mt-3 font-serif text-4xl italic tracking-tight text-[var(--text-primary)]">
                {formatInr(content.setupCard.price)}
              </div>
              <div className="mt-2 font-sans text-sm text-[var(--text-secondary)]">{content.setupCard.subtext}</div>
              <ul className="mt-6 grid gap-3">
                {content.setupCard.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-light)] border border-[rgba(26,107,74,0.18)]">
                      <Check className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <div className="font-sans text-[14px] leading-6 text-[var(--text-primary)]">{b}</div>
                  </li>
                ))}
              </ul>
            </motion.div>

              <motion.div variants={fadeUp} className="rounded-3xl border-2 border-[rgba(59,130,246,0.35)] bg-white p-7">
              <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex items-center rounded-full bg-[rgba(59,130,246,0.12)] px-3 py-1 text-xs font-semibold text-[rgba(59,130,246,0.95)]">
                  {content.monthlyCard.badge}
                </div>
              </div>
              <div className="mt-4 font-serif text-2xl tracking-tight">{content.monthlyCard.title}</div>
              <div className="mt-3 font-serif text-4xl italic tracking-tight text-[var(--text-primary)]">
                {formatInr(content.monthlyCard.priceMonthly)}
                  <span className="font-sans text-base not-italic text-[var(--text-secondary)]">{content.monthlyCard.priceSuffix}</span>
              </div>
              <div className="mt-2 font-sans text-sm text-[var(--text-secondary)]">{content.monthlyCard.subtext}</div>
              <ul className="mt-6 grid gap-3">
                {content.monthlyCard.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-light)] border border-[rgba(26,107,74,0.18)]">
                      <Check className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <div className="font-sans text-[14px] leading-6 text-[var(--text-primary)]">{b}</div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-3xl border-2 border-[rgba(26,107,74,0.40)] bg-[rgba(232,245,239,0.55)] p-7 shadow-[0_20px_60px_rgba(26,107,74,0.10)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center rounded-full bg-[rgba(26,107,74,0.12)] px-3 py-1 text-xs font-semibold text-accent">
                  {content.yearlyCard.badge}
                </div>
                <AnimatePresence initial={false}>
                  {isYearly ? (
                    <motion.div
                      key="save"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                      className="inline-flex items-center rounded-full bg-[var(--amber-light)] px-3 py-1 text-xs font-semibold text-[var(--amber)]"
                    >
                      {content.toggle.savingsPill}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <div className="mt-4 font-serif text-2xl tracking-tight">{content.yearlyCard.title}</div>

              <div className="mt-3">
                <AnimatePresence mode="wait" initial={false}>
                  {isYearly ? (
                    <motion.div
                      key="discount"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="font-serif text-4xl italic tracking-tight text-accent"
                    >
                      {formatInr(content.yearlyCard.priceYearlyDiscounted)}
                      <span className="ml-2 font-sans text-base not-italic text-[var(--text-secondary)]">/yr</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="regular"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="font-serif text-4xl italic tracking-tight text-[var(--text-secondary)]"
                    >
                      {formatInr(content.yearlyCard.priceYearlyRegular)}
                      <span className="ml-2 font-sans text-base not-italic text-[var(--text-secondary)]">/yr</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

                <AnimatePresence initial={false}>
                  {isYearly ? (
                    <motion.div
                      key="savetext"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="mt-2 font-sans text-sm font-semibold text-[var(--amber)]"
                    >
                      {content.yearlyCard.savingsText}
                    </motion.div>
                  ) : null}
                </AnimatePresence>

              <div className="mt-4 font-sans text-sm font-medium text-[var(--text-primary)]">
                {content.yearlyCard.plusHeading}
              </div>

              <ul className="mt-4 grid gap-3">
                {content.yearlyCard.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white border border-[rgba(26,107,74,0.20)]">
                      <Check className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <div className="font-sans text-[14px] leading-6 text-[var(--text-primary)]">{b}</div>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById(content.yearlyCard.cta.href.slice(1))
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-accent px-5 py-3 text-[15px] font-semibold text-white hover:brightness-95 active:brightness-90 transition"
              >
                {content.yearlyCard.cta.label}
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

