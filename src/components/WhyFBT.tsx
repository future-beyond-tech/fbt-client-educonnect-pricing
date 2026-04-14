import { motion } from 'framer-motion'
import { Building2, Calendar, Shield } from 'lucide-react'
import type { Content } from '../data/content'
import { useSectionMotion } from './motion'

type Props = { content: Content['whyFbt'] }

export default function WhyFBT({ content }: Props) {
  const { fadeUp, stagger, viewport } = useSectionMotion()
  const iconMap = {
    Building2,
    Shield,
    Calendar,
  } as const

  return (
    <section id={content.id} className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]">
            {content.heading}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 font-sans text-[15px] sm:text-[16px] leading-7 text-[var(--text-secondary)]">
            {content.subheading}
          </motion.p>

          <motion.div variants={stagger} className="mt-10 grid gap-5 lg:grid-cols-3">
            {content.cards.map((c) => (
              <motion.div
                key={c.title}
                variants={fadeUp}
                className="rounded-3xl border border-[var(--border)] bg-white p-7 shadow-[0_1px_0_rgba(15,17,23,0.04)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,17,23,0.08)]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-light)] border border-[rgba(26,107,74,0.18)]">
                    {(() => {
                      const Icon = iconMap[c.icon]
                      return <Icon className="h-5 w-5 text-accent" />
                    })()}
                  </div>
                  <div>
                    <div className="font-serif text-2xl tracking-tight">{c.title}</div>
                    <div className="mt-2 font-sans text-[14px] leading-7 text-[var(--text-secondary)]">{c.description}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 rounded-3xl border border-[var(--border)] bg-[var(--bg-primary)] p-7">
            <div className="font-sans text-sm font-semibold text-[var(--text-primary)]">{content.techStripLabel}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {content.techBadges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2 font-sans text-sm text-[var(--text-primary)]"
                >
                  <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

