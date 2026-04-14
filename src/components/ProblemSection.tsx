import { motion } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'
import type { Content } from '../data/content'
import { useSectionMotion } from './motion'

type Props = { content: Content['problem'] }

export default function ProblemSection({ content }: Props) {
  const { fadeUp, stagger, viewport } = useSectionMotion()
  return (
    <section id={content.id} className="bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]">
            {content.heading}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-2xl font-sans text-[15px] sm:text-[16px] leading-7 text-[var(--text-secondary)]">
            {content.subheading}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-[var(--border)] bg-white p-7">
              <div className="font-serif text-2xl tracking-tight">{content.headingLeft}</div>
              <ul className="mt-5 grid gap-3">
                {content.leftItems.map((t) => (
                  <li key={t} className="flex gap-3">
                    <XCircle className="mt-0.5 h-5 w-5 text-[var(--amber)]" />
                    <div className="font-sans text-[15px] leading-7 text-[var(--text-primary)]">{t}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-[rgba(26,107,74,0.25)] bg-[var(--accent-light)]/60 p-7">
              <div className="font-serif text-2xl tracking-tight text-[var(--text-primary)]">{content.headingRight}</div>
              <ul className="mt-5 grid gap-3">
                {content.rightItems.map((t) => (
                  <li key={t} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-accent" />
                    <div className="font-sans text-[15px] leading-7 text-[var(--text-primary)]">{t}</div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

