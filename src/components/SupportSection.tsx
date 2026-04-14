import { motion } from 'framer-motion'
import { Database, Gauge, Lock, Mail, MessageCircle, Monitor, RefreshCcw, Shield, Video } from 'lucide-react'
import type React from 'react'
import type { Content } from '../data/content'
import { useSectionMotion } from './motion'

type Props = { content: Content['support'] }

const channelIcons: Record<Content['support']['channels'][number]['icon'], React.ComponentType<{ className?: string }>> = {
  MessageCircle,
  Mail,
  Video,
}

const maintenanceIcons: Record<Content['support']['maintenanceItems'][number]['icon'], React.ComponentType<{ className?: string }>> = {
  Shield,
  Database,
  Lock,
  Gauge,
  Monitor,
  RefreshCcw,
}

function toneClasses(tone: Content['support']['slaRows'][number]['tone']) {
  switch (tone) {
    case 'green':
      return 'bg-[rgba(26,107,74,0.12)] text-accent border-[rgba(26,107,74,0.25)]'
    case 'amber':
      return 'bg-[rgba(217,119,6,0.14)] text-[var(--amber)] border-[rgba(217,119,6,0.25)]'
    case 'blue':
      return 'bg-[rgba(59,130,246,0.12)] text-[rgba(59,130,246,0.95)] border-[rgba(59,130,246,0.25)]'
    case 'muted':
      return 'bg-[rgba(107,114,128,0.12)] text-[rgba(107,114,128,0.95)] border-[rgba(107,114,128,0.25)]'
  }
}

export default function SupportSection({ content }: Props) {
  const { fadeUp, stagger, viewport } = useSectionMotion()
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

          <motion.div variants={fadeUp} className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7 grid gap-4">
              {content.channels.map((c) => {
                const Icon = channelIcons[c.icon]
                return (
                  <div key={c.title} className="rounded-3xl border border-[var(--border)] bg-white p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-light)] border border-[rgba(26,107,74,0.18)]">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="font-sans font-semibold text-[var(--text-primary)]">{c.title}</div>
                          {c.note ? (
                            <div className="rounded-full border border-[rgba(26,107,74,0.25)] bg-[var(--accent-light)] px-2 py-0.5 font-sans text-xs font-semibold text-accent">
                              {c.note}
                            </div>
                          ) : null}
                        </div>
                        <div className="mt-1 font-sans text-[14px] leading-6 text-[var(--text-secondary)]">{c.description}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="lg:col-span-5 rounded-3xl border border-[var(--border)] bg-white p-6">
              <div className="font-serif text-2xl tracking-tight">{content.slaHeading}</div>
              <div className="mt-5 grid gap-3">
                {content.slaRows.map((r) => (
                  <div key={r.level} className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3">
                    <div className="font-sans text-sm font-medium text-[var(--text-primary)]">{r.level}</div>
                    <div className={['rounded-full border px-3 py-1 text-xs font-semibold', toneClasses(r.tone)].join(' ')}>
                      {r.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 rounded-3xl border border-[var(--border)] bg-white p-7">
            <div className="font-serif text-2xl tracking-tight">{content.maintenanceHeading}</div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.maintenanceItems.map((m) => {
                const Icon = maintenanceIcons[m.icon]
                return (
                  <div key={m.title} className="rounded-3xl border border-[var(--border)] bg-[var(--bg-primary)] p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-[var(--border)]">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="font-sans text-sm font-semibold text-[var(--text-primary)]">{m.title}</div>
                        <div className="mt-1 font-sans text-[13px] leading-6 text-[var(--text-secondary)]">{m.description}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

