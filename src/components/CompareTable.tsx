import { motion } from 'framer-motion'
import type { Content } from '../data/content'
import { useSectionMotion } from './motion'

type Props = { content: Content['compare'] }

export default function CompareTable({ content }: Props) {
  const { fadeUp, stagger, viewport } = useSectionMotion()
  return (
    <section id={content.id} className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]">
            {content.heading}
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-8 overflow-x-auto rounded-3xl border border-[var(--border)]">
            <table className="min-w-[760px] w-full border-collapse bg-white">
              <thead>
                <tr className="bg-[var(--bg-primary)]">
                  <th className="px-5 py-4 text-left font-sans text-sm font-semibold text-[var(--text-primary)]">
                    {content.columns.feature}
                  </th>
                  <th className="px-5 py-4 text-left font-sans text-sm font-semibold text-[var(--text-primary)]">
                    {content.columns.monthly}
                  </th>
                  <th className="px-5 py-4 text-left font-sans text-sm font-semibold text-accent">
                    {content.columns.yearly}
                  </th>
                </tr>
              </thead>
              <tbody>
                {content.rows.map((r, idx) => (
                  <tr key={r.feature} className={idx % 2 === 0 ? 'bg-white' : 'bg-[var(--bg-primary)]/60'}>
                    <td className="px-5 py-4 font-sans text-sm text-[var(--text-primary)]">{r.feature}</td>
                    <td className="px-5 py-4 font-sans text-sm text-[var(--text-primary)]">{r.monthly}</td>
                    <td className={['px-5 py-4 font-sans text-sm', r.highlightYearly ? 'bg-[var(--accent-light)]/60 text-[var(--text-primary)]' : 'text-[var(--text-primary)]'].join(' ')}>
                      {r.yearly}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

