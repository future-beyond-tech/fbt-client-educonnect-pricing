import React from 'react'
import { motion } from 'framer-motion'
import type { Content } from '../data/content'
import { useCountUp } from '../hooks/useCountUp'
import { useInView } from '../hooks/useInView'
import { useSectionMotion } from './motion'

type Props = { content: Content['roi'] }

function formatInr(n: number) {
  const rounded = Math.round(n)
  return `₹${rounded.toLocaleString('en-IN')}`
}

function formatNumber(n: number) {
  return Math.round(n).toLocaleString('en-IN')
}

export default function ROICalculator({ content }: Props) {
  const { fadeUp, stagger, viewport } = useSectionMotion()
  const [teachers, setTeachers] = useStateNumber(content.sliders.teachers.defaultValue)
  const [salary, setSalary] = useStateNumber(content.sliders.salary.defaultValue)

  const hoursSaved = teachers * content.assumptions.hoursPerTeacher
  const valueOfTime = (salary / 160) * hoursSaved
  const roi = valueOfTime / content.assumptions.monthlyCost

  const { ref, inView } = useInView<HTMLDivElement>({ once: true, rootMargin: '-120px 0px' })

  const animatedHours = useCountUp(inView ? hoursSaved : 0)
  const animatedValue = useCountUp(inView ? valueOfTime : 0)
  const animatedRoi = useCountUp(inView ? roi : 0)

  return (
    <section id={content.id} className="bg-dark text-[var(--text-on-dark)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl tracking-tight text-white">
            {content.heading}
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6 rounded-3xl border border-[rgba(255,255,255,0.12)] bg-white/5 p-6">
              <div className="grid gap-6">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <label className="font-sans text-sm text-white/80">
                      {content.sliders.teachers.label}
                    </label>
                    <div className="rounded-xl border border-[rgba(255,255,255,0.14)] bg-white/5 px-3 py-1 font-serif italic text-white">
                      {teachers.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="mt-3">
                    <input
                      className="range"
                      type="range"
                      min={content.sliders.teachers.min}
                      max={content.sliders.teachers.max}
                      value={teachers}
                      onChange={(e) => setTeachers(parseInt(e.currentTarget.value, 10))}
                      style={{
                        background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${pct(
                          teachers,
                          content.sliders.teachers.min,
                          content.sliders.teachers.max,
                        )}%, rgba(255,255,255,0.16) ${pct(
                          teachers,
                          content.sliders.teachers.min,
                          content.sliders.teachers.max,
                        )}%, rgba(255,255,255,0.16) 100%)`,
                      }}
                      aria-label={content.sliders.teachers.label}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <label className="font-sans text-sm text-white/80">
                      {content.sliders.salary.label}
                    </label>
                    <div className="rounded-xl border border-[rgba(255,255,255,0.14)] bg-white/5 px-3 py-1 font-serif italic text-white">
                      {formatInr(salary)}
                    </div>
                  </div>
                  <div className="mt-3">
                    <input
                      className="range"
                      type="range"
                      min={content.sliders.salary.min}
                      max={content.sliders.salary.max}
                      step={500}
                      value={salary}
                      onChange={(e) => setSalary(parseInt(e.currentTarget.value, 10))}
                      style={{
                        background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${pct(
                          salary,
                          content.sliders.salary.min,
                          content.sliders.salary.max,
                        )}%, rgba(255,255,255,0.16) ${pct(
                          salary,
                          content.sliders.salary.min,
                          content.sliders.salary.max,
                        )}%, rgba(255,255,255,0.16) 100%)`,
                      }}
                      aria-label={content.sliders.salary.label}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div ref={ref} className="lg:col-span-6 grid grid-cols-2 gap-4">
              <MetricCard label={content.metrics.hoursSaved} value={`${formatNumber(animatedHours)}${content.units.hoursSuffix}`} />
              <MetricCard label={content.metrics.staffValue} value={formatInr(animatedValue)} />
              <MetricCard label={content.metrics.cost} value={formatInr(content.assumptions.monthlyCost)} />
              <MetricCard label={content.metrics.roi} value={`${animatedRoi.toFixed(1)}${content.units.roiSuffix}`} highlight />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 rounded-3xl border border-[rgba(26,107,74,0.30)] bg-[rgba(26,107,74,0.12)] p-6">
            <div className="font-sans text-sm text-white/80">{content.callout.label}</div>
            <div className="mt-2 font-serif text-2xl sm:text-3xl italic text-white">
              {content.callout.prefix}
              {Math.max(0, roi).toFixed(1)}
              {content.callout.suffix}
            </div>
            <div className="mt-2 font-sans text-[13px] leading-6 text-white/60">
              {content.callout.assumption}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function MetricCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={[
        'rounded-3xl border bg-white/5 p-5',
        highlight ? 'border-[rgba(26,107,74,0.40)]' : 'border-[rgba(255,255,255,0.12)]',
      ].join(' ')}
    >
      <div className="font-sans text-[12px] text-white/60">{label}</div>
      <div className={['mt-2 font-serif text-2xl italic', highlight ? 'text-[var(--accent-light)]' : 'text-white'].join(' ')}>
        {value}
      </div>
    </div>
  )
}

function pct(value: number, min: number, max: number) {
  const clamped = Math.min(max, Math.max(min, value))
  return ((clamped - min) / (max - min)) * 100
}

function useStateNumber(initial: number) {
  const [v, setV] = React.useState<number>(initial)
  return [v, setV] as const
}
