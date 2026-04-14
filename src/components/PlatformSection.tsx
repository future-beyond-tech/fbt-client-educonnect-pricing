import { motion } from 'framer-motion'
import {
  BarChart3,
  Bell,
  ClipboardList,
  Download,
  GraduationCap,
  Megaphone,
  Paperclip,
  PieChart,
  School,
  ShieldCheck,
  Smartphone,
  UserCog,
  Users,
} from 'lucide-react'
import type React from 'react'
import type { Content } from '../data/content'
import { useSectionMotion } from './motion'

type Props = { content: Content['platform'] }

const iconMap: Record<Content['platform']['items'][number]['icon'], React.ComponentType<{ className?: string }>> = {
  ClipboardList,
  BarChart3,
  Megaphone,
  Users,
  GraduationCap,
  UserCog,
  School,
  ShieldCheck,
  Smartphone,
  Paperclip,
}

export default function PlatformSection({ content }: Props) {
  const { fadeUp, stagger, viewport } = useSectionMotion()
  return (
    <section id={content.id} className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]">
            {content.heading}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-3xl font-sans text-[15px] sm:text-[16px] leading-7 text-[var(--text-secondary)]">
            {content.subheading}
          </motion.p>

          <motion.div variants={stagger} className="mt-10 grid gap-5 lg:grid-cols-2">
            {content.items.map((item) => {
              const Icon = iconMap[item.icon]
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="group rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_1px_0_rgba(15,17,23,0.04)] transition will-change-transform hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,17,23,0.08)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-full bg-[rgba(26,107,74,0.10)] px-3 py-1 text-xs font-semibold text-accent">
                      {content.livePill}
                    </div>
                    <div className="inline-flex items-center rounded-full border border-[rgba(26,107,74,0.20)] bg-[var(--accent-light)] px-3 py-1 text-xs font-semibold text-accent">
                      {item.badge}
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-light)] border border-[rgba(26,107,74,0.18)]">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-sans text-base font-semibold text-[var(--text-primary)]">
                        {item.title}
                      </div>
                      <div className="mt-1 font-sans text-[14px] leading-6 text-[var(--text-secondary)]">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 rounded-3xl border border-dashed border-[rgba(26,107,74,0.45)] bg-[var(--accent-light)] p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="font-sans text-sm font-semibold text-[var(--text-primary)]">
                {content.comingSoon.label}
              </div>
              <div className="font-sans text-xs text-[var(--text-secondary)]">
                {content.comingSoon.tooltip}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {content.comingSoon.pills.map((p) => (
                <span
                  key={p.label}
                  title={content.comingSoon.tooltip}
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(107,114,128,0.25)] bg-white/60 px-4 py-2 font-sans text-sm text-[rgba(15,17,23,0.75)]"
                >
                  {p.icon === 'Bell' ? (
                    <Bell className="h-4 w-4 text-[rgba(15,17,23,0.65)]" />
                  ) : p.icon === 'Download' ? (
                    <Download className="h-4 w-4 text-[rgba(15,17,23,0.65)]" />
                  ) : (
                    <PieChart className="h-4 w-4 text-[rgba(15,17,23,0.65)]" />
                  )}
                  {p.label}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

