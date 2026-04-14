import { motion } from 'framer-motion'
import type { Content } from '../data/content'
import { useSectionMotion } from './motion'

type Props = { content: Content['hero'] }

function scrollToHref(href: `#${string}`) {
  const id = href.slice(1)
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Hero({ content }: Props) {
  const { fadeUp, stagger, viewport, reduce } = useSectionMotion()
  return (
    <section id={content.id} className="relative overflow-hidden bg-dark text-[var(--text-on-dark)]">
      <div className="absolute inset-0 dot-grid opacity-90" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(26,107,74,0.18),transparent_55%),radial-gradient(900px_circle_at_85%_20%,rgba(232,245,239,0.10),transparent_45%)]" />

      <div className="relative mx-auto max-w-6xl px-4 pt-24 sm:pt-28 pb-14 sm:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-7"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-[rgba(26,107,74,0.55)] bg-[rgba(26,107,74,0.12)] px-4 py-2 font-sans text-sm text-[rgba(249,250,251,0.92)]">
              {content.badge}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 font-serif text-[34px] leading-[1.06] tracking-[-0.02em] sm:text-[48px] lg:text-[56px]"
            >
              <span className="block">{content.headlineLines[0]}</span>
              <span className="block italic">{content.headlineLines[1]}</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-5 max-w-xl font-sans text-[16px] leading-7 text-[rgba(249,250,251,0.72)] sm:text-[18px]">
              {content.subtextLines.join(' ')}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => scrollToHref(content.primaryCta.href)}
                className="inline-flex items-center justify-center rounded-2xl bg-accent px-6 py-3 text-[15px] font-medium text-white hover:brightness-95 active:brightness-90 transition"
              >
                {content.primaryCta.label}
              </button>
              <button
                type="button"
                onClick={() => scrollToHref(content.secondaryCta.href)}
                className="inline-flex items-center justify-center rounded-2xl border border-[rgba(249,250,251,0.35)] bg-transparent px-6 py-3 text-[15px] font-medium text-white/90 hover:bg-white/5 transition"
              >
                {content.secondaryCta.label}
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
              {content.trustPills.map((t) => (
                <div
                  key={t}
                  className="rounded-full border border-[rgba(249,250,251,0.18)] bg-white/5 px-4 py-2 font-sans text-xs text-white/80"
                >
                  {t}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden lg:col-span-5 lg:block"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={reduce ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
          >
            <div className="mockup-float rounded-[28px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-sans text-sm font-medium text-white/90">{content.mockup.title}</div>
                  <div className="font-sans text-xs text-white/55">{content.mockup.subtitle}</div>
                </div>
                <div className="flex gap-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/18" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/12" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="inline-flex items-center rounded-full border border-[rgba(255,255,255,0.14)] bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                  {content.mockup.classChip}
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10">
                    <div className="absolute inset-0 rounded-full border border-[rgba(255,255,255,0.16)]" />
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(var(--accent) ${content.mockup.attendance.valuePct}%, rgba(255,255,255,0.16) 0)`,
                        maskImage: 'radial-gradient(transparent 58%, #000 60%)',
                        WebkitMaskImage: 'radial-gradient(transparent 58%, #000 60%)',
                      }}
                    />
                  </div>
                  <div>
                    <div className="font-sans text-[11px] text-white/55">{content.mockup.attendance.label}</div>
                    <div className="font-serif text-lg italic text-white">
                      {content.mockup.attendance.valuePct}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] p-3">
                <div className="font-sans text-xs font-semibold text-white/70">{content.mockup.homeworkLabel}</div>
                <div className="mt-3 grid gap-2">
                  {content.mockup.homeworkRows.map((row) => (
                    <div key={row.title} className="flex items-center justify-between gap-3 rounded-xl border border-[rgba(255,255,255,0.10)] bg-white/5 px-3 py-2">
                      <div className="font-sans text-[12px] text-white/80">{row.title}</div>
                      <div
                        className={[
                          'rounded-full px-2 py-0.5 font-sans text-[11px] font-semibold',
                          row.status === 'Published'
                            ? 'bg-[rgba(26,107,74,0.22)] text-[rgba(232,245,239,0.95)] border border-[rgba(26,107,74,0.35)]'
                            : 'bg-[rgba(107,114,128,0.18)] text-white/70 border border-[rgba(255,255,255,0.14)]',
                        ].join(' ')}
                      >
                        {row.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

