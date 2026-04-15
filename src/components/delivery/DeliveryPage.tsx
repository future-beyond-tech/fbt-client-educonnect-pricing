import { AnimatePresence, motion } from 'framer-motion'
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Lock,
  Settings,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { PROJECT, formatINR } from '../../data/content'
import { useCountUp } from '../../hooks/useCountUp'
import { useInView } from '../../hooks/useInView'
import { useSectionMotion } from '../motion'

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function useCountUpInt(target: number, opts: { durationMs: number; delayMs?: number; from?: number }) {
  const v = useCountUp(target, opts)
  return Math.round(v)
}

/* ─── Shared sub-components ────────────────────────────────── */

function MetricCard({ value, label }: { value: string | number; label: string }) {
  const { fadeUp, viewport, reduce } = useSectionMotion()
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1, rootMargin: '-60px 0px', once: true })
  const numeric = typeof value === 'number'
  const counted = useCountUpInt(numeric ? value : 0, { durationMs: 900, from: 0 })

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="rounded-2xl border border-[rgba(81,43,212,0.35)] bg-[var(--th-bg-card)] p-5"
    >
      <div className="font-serif text-3xl tracking-tight text-[var(--th-text)]">
        {numeric ? (inView || reduce ? counted : 0) : value}
      </div>
      <div className="mt-1 font-sans text-[13px] text-[var(--th-text-muted)]">{label}</div>
    </motion.div>
  )
}

function ScrollIndicator() {
  const { reduce } = useSectionMotion()
  return (
    <div className="mt-12 flex flex-col items-center gap-3 text-white/70">
      <div className="h-10 w-px overflow-hidden rounded-full bg-white/20">
        <motion.div
          aria-hidden="true"
          initial={reduce ? { y: 0 } : { y: -12 }}
          animate={reduce ? { y: 0 } : { y: 22 }}
          transition={reduce ? { duration: 0 } : { duration: 1.3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="h-5 w-px bg-white/70"
        />
      </div>
      <div className="font-sans text-xs tracking-[0.24em] uppercase">scroll</div>
    </div>
  )
}

function LivePill() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,229,204,0.40)] bg-[rgba(0,229,204,0.10)] px-3 py-1 font-sans text-xs font-semibold text-[#00E5CC]">
      ● Live
    </div>
  )
}

function BadgePill({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full border border-[rgba(81,43,212,0.55)] bg-[rgba(81,43,212,0.14)] px-4 py-2 font-sans text-sm text-[rgba(200,190,255,0.92)]">
      {children}
    </div>
  )
}

function FeatureCard({ title, description, icon, mockup }: {
  title: string; description: string; icon: ReactNode; mockup: ReactNode
}) {
  const { fadeUp, viewport } = useSectionMotion()
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="group rounded-2xl border border-[var(--th-border)] bg-[var(--th-bg-card)] p-5 transition hover:-translate-y-0.5 hover:border-[rgba(81,43,212,0.40)] hover:shadow-[0_22px_60px_rgba(81,43,212,0.15)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#512BD4] text-white">{icon}</div>
          <div>
            <div className="font-sans text-[16px] font-semibold text-[var(--th-text)]">{title}</div>
            <div className="mt-1 font-sans text-[13px] leading-6 text-[var(--th-text-muted)]">{description}</div>
          </div>
        </div>
        <LivePill />
      </div>
      <div className="mt-4 rounded-2xl border border-[var(--th-border-subtle)] bg-[var(--th-bg-inner)] p-4">
        {mockup}
      </div>
    </motion.div>
  )
}

function MockRow({ left, right, rightTone = 'muted' }: {
  left: string; right: string; rightTone?: 'muted' | 'green' | 'amber' | 'blue'
}) {
  const tone =
    rightTone === 'green'  ? 'bg-[rgba(0,229,204,0.12)]   text-[#00E5CC]               border-[rgba(0,229,204,0.30)]'
    : rightTone === 'amber'  ? 'bg-[rgba(255,176,32,0.14)]  text-[#FFB020]               border-[rgba(255,176,32,0.30)]'
    : rightTone === 'blue'   ? 'bg-[rgba(59,130,246,0.12)]  text-[rgba(59,130,246,0.95)] border-[rgba(59,130,246,0.22)]'
    : 'bg-[rgba(81,43,212,0.08)] text-[var(--th-text-muted)] border-[var(--th-border)]'

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[var(--th-border-subtle)] bg-[var(--th-bg-inner)] px-3 py-2">
      <div className="font-sans text-[12px] text-[var(--th-text)]">{left}</div>
      <div className={`rounded-full border px-2 py-0.5 font-sans text-[11px] font-semibold ${tone}`}>{right}</div>
    </div>
  )
}

function INRStrike({ value }: { value: number }) {
  return <span className="text-white/55 line-through">{formatINR(value)}</span>
}

/* ─── Page ──────────────────────────────────────────────────── */

export default function DeliveryPage() {
  const { fadeUp, stagger, viewport, reduce } = useSectionMotion()
  const [faqOpenIdx, setFaqOpenIdx] = useState<number>(0)
  const [carePlan, setCarePlan] = useState<'monthly' | 'yearly'>('monthly')

  const heroBackend  = useCountUpInt(PROJECT.stats.backendFiles,  { durationMs: 1500, delayMs: 1000, from: 0 })
  const heroTables   = useCountUpInt(PROJECT.stats.dbTables,      { durationMs: 1500, delayMs: 1000, from: 0 })
  const heroFeatures = useCountUpInt(PROJECT.stats.liveFeatures,  { durationMs: 1500, delayMs: 1000, from: 0 })
  const savings      = useMemo(() => PROJECT.fees.marketRate - PROJECT.fees.projectDelivery, [])

  return (
    <div className="font-sans">

      {/* ════════════════════════════════════════════════════
          SECTION 1 — Opening Act   (deep — stays dark both themes)
      ════════════════════════════════════════════════════ */}
      <section id="opening" className="relative min-h-screen text-white" style={{ background: 'var(--th-bg-deep)' }}>
        <div className="absolute inset-0 dot-grid opacity-90" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(81,43,212,0.28),transparent_55%),radial-gradient(900px_circle_at_85%_20%,rgba(0,229,204,0.12),transparent_45%)]" />

        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 pb-16 pt-28 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="w-full">

            <motion.div variants={fadeUp}>
              <BadgePill>📦 Project Delivery — {PROJECT.name}</BadgePill>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mx-auto mt-7 max-w-4xl font-serif text-[40px] leading-[1.04] tracking-[-0.02em] sm:text-[56px] lg:text-[64px]"
            >
              <span className="block">We built your school&apos;s</span>
              <span className="block">communication system.</span>
              <span className="block italic bg-gradient-to-r from-[#A78BFA] to-[#00E5CC] bg-clip-text text-transparent">
                It&apos;s ready.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl font-sans text-[16px] leading-7 text-[#9CA3AF] sm:text-[20px]">
              Every homework record. Every attendance mark. Every parent notification. Every notice.
              All in one system — designed, engineered, and deployed for Indian schools.
            </motion.p>

            <motion.div variants={fadeUp} className="mx-auto mt-10 grid max-w-3xl grid-cols-3 items-center gap-4">
              {[
                { val: heroBackend,  raw: PROJECT.stats.backendFiles,  label: 'backend files' },
                { val: heroTables,   raw: PROJECT.stats.dbTables,      label: 'DB tables'     },
                { val: heroFeatures, raw: PROJECT.stats.liveFeatures,  label: 'live features' },
              ].map(({ val, raw, label }, i) => (
                <>
                  {i > 0 && <div key={`div-${label}`} className="mx-auto hidden h-10 w-px bg-white/10 sm:block" aria-hidden="true" />}
                  <div key={label} className="text-center">
                    <div className="font-serif text-4xl tracking-tight text-white sm:text-5xl">
                      {reduce ? raw : val}
                    </div>
                    <div className="mt-1 font-sans text-xs font-semibold tracking-wide text-[rgba(200,190,255,0.78)] sm:text-sm">
                      {label}
                    </div>
                  </div>
                </>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => scrollToId('features')}
                className="inline-flex items-center justify-center rounded-2xl bg-[#512BD4] px-7 py-3 text-[15px] font-semibold text-white transition hover:brightness-110 hover:shadow-[0_0_30px_rgba(81,43,212,0.50)] active:brightness-90"
              >
                See What We Built →
              </button>
              <button
                type="button"
                onClick={() => scrollToId('investment')}
                className="inline-flex items-center justify-center rounded-2xl border border-[rgba(0,229,204,0.40)] bg-[rgba(0,229,204,0.08)] px-7 py-3 text-[15px] font-semibold text-[#00E5CC] transition hover:bg-[rgba(0,229,204,0.14)] active:brightness-90"
              >
                See Pricing
              </button>
            </motion.div>

            <motion.div variants={fadeUp}>
              <ScrollIndicator />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 2 — The Numbers   (alt bg — flips with theme)
      ════════════════════════════════════════════════════ */}
      <section id="numbers" className="scroll-mt-14" style={{ background: 'var(--th-bg-alt)' }}>
        <div className="mx-auto max-w-6xl px-4 py-24">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>

            <motion.div variants={fadeUp} className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#00E5CC]">
              Under the hood
            </motion.div>
            <motion.h2 variants={fadeUp} className="mt-4 max-w-3xl font-serif text-3xl tracking-tight sm:text-[40px] text-[var(--th-text)]">
              <span className="block">This is not a template.</span>
              <span className="block italic">Not a plugin. Not a reused project.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-3xl font-sans text-[15px] leading-7 text-[var(--th-text-muted)]">
              Built from scratch. Every line written specifically for school communication. Here&apos;s what&apos;s inside.
            </motion.p>

            <motion.div variants={stagger} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard value={PROJECT.stats.backendFiles}       label="Backend source files (.cs)" />
              <MetricCard value={PROJECT.stats.frontendComponents} label="Frontend components (.tsx)" />
              <MetricCard value={PROJECT.stats.dbTables}           label="Database tables" />
              <MetricCard value={PROJECT.stats.migrations}         label="Schema migrations" />
              <MetricCard value={PROJECT.stats.apiSlices}          label="API feature slices (VSA)" />
              <MetricCard value={PROJECT.stats.roles}              label="User roles (Admin/Teacher/Parent/Student)" />
              <MetricCard value="10 MB"                            label="Max file attachment size" />
              <MetricCard value="99.5%"                            label="Target uptime SLA" />
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              {['Built on .NET 8', 'PostgreSQL', 'Next.js 15'].map((t) => (
                <div
                  key={t}
                  className="inline-flex items-center justify-center rounded-full border border-[var(--th-border)] bg-[var(--th-bg-card)] px-5 py-2 font-sans text-xs font-semibold text-[var(--th-text-muted)]"
                >
                  {t}
                </div>
              ))}
              <div className="font-sans text-xs text-[var(--th-text-subtle)]">(same tech as enterprise banking and e-commerce)</div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 3 — Feature Showcase   (main bg)
      ════════════════════════════════════════════════════ */}
      <section id="features" className="scroll-mt-14" style={{ background: 'var(--th-bg-main)' }}>
        <div className="mx-auto max-w-6xl px-4 py-24">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>

            <motion.div variants={fadeUp} className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#00E5CC]">
              What&apos;s live today
            </motion.div>
            <motion.h2 variants={fadeUp} className="mt-4 font-serif text-3xl tracking-tight sm:text-[40px] text-[var(--th-text)]">
              <span className="block">Ten features. All working.</span>
              <span className="block italic">All yours.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-3xl font-sans text-[15px] leading-7 text-[var(--th-text-muted)]">
              Every feature below is confirmed live in the product. We don&apos;t show you what&apos;s coming — we show you what&apos;s done.
            </motion.p>

            <motion.div variants={stagger} className="mt-10 grid gap-5 lg:grid-cols-2">

              <FeatureCard
                title="Homework Management"
                description="Homework list, approval flow, attachments — tracked end-to-end."
                icon={<span className="text-sm font-semibold">HW</span>}
                mockup={
                  <div className="grid gap-2">
                    <MockRow left="Maths — Chapter 6"   right="Draft"            rightTone="amber" />
                    <MockRow left="English Essay"        right="Published"        rightTone="green" />
                    <MockRow left="Science Worksheet"    right="Pending Approval" rightTone="blue"  />
                    <div className="mt-2 flex items-center justify-between">
                      <div className="rounded-lg border border-[var(--th-border)] bg-[var(--th-bg-card)] px-3 py-2 font-sans text-[12px] text-[var(--th-text-subtle)]">
                        Attach PDF
                      </div>
                      <div className="rounded-lg bg-[#512BD4] px-3 py-2 font-sans text-[12px] font-semibold text-white">
                        Submit for Approval
                      </div>
                    </div>
                  </div>
                }
              />

              <FeatureCard
                title="Attendance Tracking"
                description="Class grid with status toggles and a single save action."
                icon={<span className="text-sm font-semibold">AT</span>}
                mockup={
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="font-sans text-[12px] font-semibold text-[var(--th-text)]">Class 8A — Today</div>
                      <div className="rounded-full border border-[var(--th-border)] bg-[var(--th-bg-card)] px-3 py-1 font-sans text-[11px] text-[var(--th-text-subtle)]">
                        Teacher
                      </div>
                    </div>
                    <div className="mt-3 grid gap-2">
                      {[
                        { name: 'Arjun K',  status: 'Present', dot: 'bg-[#00E5CC]',             text: 'text-[#00E5CC]' },
                        { name: 'Priya M',  status: 'Absent',  dot: 'bg-[rgba(239,68,68,0.95)]', text: 'text-[rgba(239,68,68,0.95)]' },
                        { name: 'Rohan S',  status: 'Late',    dot: 'bg-[#FFB020]',              text: 'text-[#FFB020]' },
                      ].map(({ name, status, dot, text }) => (
                        <div key={name} className="flex items-center justify-between rounded-xl border border-[var(--th-border-subtle)] bg-[var(--th-bg-inner)] px-3 py-2">
                          <div className="font-sans text-[12px] text-[var(--th-text)]">{name}</div>
                          <div className="inline-flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${dot}`} />
                            <div className={`font-sans text-[11px] font-semibold ${text}`}>{status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 rounded-lg bg-[#512BD4] px-3 py-2 text-center font-sans text-[12px] font-semibold text-white">
                      Save Attendance
                    </div>
                  </div>
                }
              />

              <FeatureCard
                title="Notice Board"
                description="School-wide and class-specific notices with publish control."
                icon={<span className="text-sm font-semibold">NB</span>}
                mockup={
                  <div className="grid gap-2">
                    {[
                      { title: 'Annual Sports Day — All Students', sub: 'Posted by Principal | School-wide' },
                      { title: 'Class 9B — Science Test Reminder',  sub: null },
                    ].map(({ title, sub }) => (
                      <div key={title} className="rounded-xl border border-[var(--th-border-subtle)] bg-[var(--th-bg-inner)] p-3">
                        <div className="font-sans text-[12px] font-semibold text-[var(--th-text)]">{title}</div>
                        {sub && <div className="mt-1 font-sans text-[11px] text-[var(--th-text-subtle)]">{sub}</div>}
                        <div className="mt-2 inline-flex rounded-full border border-[rgba(0,229,204,0.30)] bg-[rgba(0,229,204,0.12)] px-2 py-0.5 font-sans text-[11px] font-semibold text-[#00E5CC]">
                          Published
                        </div>
                      </div>
                    ))}
                  </div>
                }
              />

              <FeatureCard
                title="Parent Portal"
                description="A calm dashboard for parents — no WhatsApp chaos."
                icon={<span className="text-sm font-semibold">PP</span>}
                mockup={
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(81,43,212,0.25)] font-sans text-[11px] font-semibold text-[#A78BFA]">
                        P
                      </div>
                      <div>
                        <div className="font-sans text-[12px] font-semibold text-[var(--th-text)]">Welcome, Suresh K</div>
                        <div className="mt-0.5 inline-flex rounded-full border border-[var(--th-border)] bg-[var(--th-bg-card)] px-2 py-0.5 font-sans text-[11px] text-[var(--th-text-subtle)]">
                          Arjun — Class 8A
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {['Attendance', 'Homework', 'Notices'].map((t) => (
                        <div key={t} className="rounded-full border border-[rgba(81,43,212,0.40)] bg-[rgba(81,43,212,0.12)] px-3 py-1 font-sans text-[11px] font-semibold text-[#512BD4]">
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                }
              />

              <FeatureCard
                title="Student Management"
                description="Enroll and manage students with clean class lists."
                icon={<span className="text-sm font-semibold">SM</span>}
                mockup={
                  <div className="grid gap-2">
                    {['Arjun Kumar | 8A | Roll 01', 'Priya Menon | 8B | Roll 12'].map((s) => (
                      <div key={s} className="rounded-xl border border-[var(--th-border-subtle)] bg-[var(--th-bg-inner)] px-3 py-2 font-sans text-[12px] text-[var(--th-text)]">
                        {s} <span className="ml-2 font-semibold text-[#00E5CC]">[Active]</span>
                      </div>
                    ))}
                    <div className="mt-2 rounded-lg bg-[#512BD4] px-3 py-2 text-center font-sans text-[12px] font-semibold text-white">
                      + Enroll Student
                    </div>
                  </div>
                }
              />

              <FeatureCard
                title="Teacher Management"
                description="Assignments, classes, subjects, and class-teacher status."
                icon={<span className="text-sm font-semibold">TM</span>}
                mockup={
                  <div className="rounded-xl border border-[var(--th-border-subtle)] bg-[var(--th-bg-inner)] p-3">
                    <div className="font-sans text-[12px] font-semibold text-[var(--th-text)]">Mrs. Lakshmi R</div>
                    <div className="mt-1 font-sans text-[11px] text-[var(--th-text-subtle)]">Assigned: Class 8A — Mathematics</div>
                    <div className="mt-2 inline-flex rounded-full border border-[rgba(0,229,204,0.30)] bg-[rgba(0,229,204,0.12)] px-2 py-0.5 font-sans text-[11px] font-semibold text-[#00E5CC]">
                      Class Teacher: Yes
                    </div>
                  </div>
                }
              />

              <FeatureCard
                title="Classes & Subjects"
                description="Structured class sections and subject catalog."
                icon={<span className="text-sm font-semibold">CS</span>}
                mockup={
                  <div className="grid gap-3">
                    <div className="grid grid-cols-3 gap-2">
                      {['Class 8A', 'Class 8B', 'Class 9A'].map((t) => (
                        <div key={t} className="rounded-lg border border-[rgba(81,43,212,0.30)] bg-[rgba(81,43,212,0.10)] px-2 py-2 text-center font-sans text-[11px] font-semibold text-[#512BD4]">
                          {t}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['Maths', 'Science', 'English', 'History'].map((t) => (
                        <div key={t} className="rounded-full border border-[var(--th-border)] bg-[var(--th-bg-card)] px-3 py-1 font-sans text-[11px] font-semibold text-[var(--th-text-muted)]">
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                }
              />

              <FeatureCard
                title="Secure Multi-Role Access"
                description="Scope-limited access across roles and data."
                icon={<Lock className="h-4 w-4" />}
                mockup={
                  <div className="flex items-center justify-between gap-3">
                    <div className="grid w-full gap-2">
                      {[
                        ['Admin',   'Full access',         '#00E5CC'              ] as const,
                        ['Teacher', 'Classes + Homework',  'rgba(59,130,246,0.95)'] as const,
                        ['Parent',  'Own children only',   '#FFB020'              ] as const,
                      ].map(([r, d, dot]) => (
                        <div key={r} className="flex items-center justify-between gap-3 rounded-xl border border-[var(--th-border-subtle)] bg-[var(--th-bg-inner)] px-3 py-2">
                          <div className="font-sans text-[12px] font-semibold text-[var(--th-text)]">{r}</div>
                          <div className="font-sans text-[11px] text-[var(--th-text-subtle)]">{d}</div>
                          <div className="h-2 w-2 rounded-full" style={{ background: dot }} />
                        </div>
                      ))}
                    </div>
                    <Lock className="h-6 w-6 shrink-0 text-[var(--th-text-subtle)]" />
                  </div>
                }
              />

              <FeatureCard
                title="Works on Any Device (PWA)"
                description="Installable on any phone or tablet — no app store needed."
                icon={<Smartphone className="h-4 w-4" />}
                mockup={
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative mx-auto h-40 w-24 rounded-[20px] border border-[var(--th-border)] bg-[var(--th-bg-inner)] shadow-sm">
                      <div className="mx-auto mt-3 h-2 w-10 rounded-full bg-[rgba(81,43,212,0.20)]" />
                      <div className="mx-3 mt-4 h-3 rounded bg-[rgba(81,43,212,0.30)]" />
                      <div className="mx-3 mt-2 h-14 rounded-lg bg-[rgba(81,43,212,0.08)]" />
                      <div className="absolute bottom-3 left-3 right-3 rounded-lg border border-[rgba(0,229,204,0.30)] bg-[rgba(0,229,204,0.10)] p-2">
                        <div className="font-sans text-[10px] font-semibold text-[#00E5CC]">Add to Home Screen</div>
                        <div className="mt-1 h-2 w-full rounded bg-[rgba(0,229,204,0.25)]" />
                      </div>
                    </div>
                    <div className="mx-auto h-40 w-32 rounded-[18px] border border-[var(--th-border)] bg-[var(--th-bg-inner)] shadow-sm">
                      <div className="mx-4 mt-4 h-3 rounded bg-[rgba(81,43,212,0.30)]" />
                      <div className="mx-4 mt-2 h-24 rounded-lg bg-[rgba(81,43,212,0.08)]" />
                    </div>
                  </div>
                }
              />

              <FeatureCard
                title="File Attachments"
                description="Uploads with completed progress and check marks."
                icon={<span className="text-sm font-semibold">FA</span>}
                mockup={
                  <div className="grid gap-2">
                    {[
                      ['PDF', 'Chapter6_Notes.pdf',   '2.4 MB'],
                      ['DOC', 'Essay_Template.docx',  '1.1 MB'],
                    ].map(([t, name, size]) => (
                      <div key={name} className="flex items-center justify-between gap-3 rounded-xl border border-[var(--th-border-subtle)] bg-[var(--th-bg-inner)] px-3 py-2">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[rgba(81,43,212,0.15)] font-sans text-[10px] font-semibold text-[#512BD4]">
                            {t}
                          </div>
                          <div className="font-sans text-[12px] text-[var(--th-text)]">{name}</div>
                          <div className="font-sans text-[11px] text-[var(--th-text-subtle)]">{size}</div>
                        </div>
                        <div className="inline-flex items-center gap-1 font-sans text-[11px] font-semibold text-[#00E5CC]">
                          <CheckCircle2 className="h-4 w-4" /> ✓
                        </div>
                      </div>
                    ))}
                    <div className="mt-2 rounded-full bg-[rgba(81,43,212,0.12)] p-1">
                      <div className="h-2 w-full rounded-full bg-[#00E5CC]" />
                    </div>
                  </div>
                }
              />

            </motion.div>

            <motion.div variants={fadeUp} className="mt-12 rounded-2xl border border-dashed border-[rgba(81,43,212,0.35)] bg-[rgba(81,43,212,0.06)] p-5">
              <div className="font-sans text-[13px] font-semibold text-[var(--th-text-muted)]">
                On the roadmap — yours at no extra cost when ready
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {['🔔 In-app Notifications', '📥 Bulk Import', '📊 Analytics'].map((t) => (
                  <div key={t} className="rounded-full border border-[rgba(81,43,212,0.30)] bg-[rgba(81,43,212,0.10)] px-3 py-1 font-sans text-[12px] text-[#512BD4]">
                    {t}
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 4 — The Journey   (alt bg)
      ════════════════════════════════════════════════════ */}
      <section id="journey" className="scroll-mt-14" style={{ background: 'var(--th-bg-alt)' }}>
        <div className="mx-auto max-w-6xl px-4 py-24">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>

            <motion.div variants={fadeUp} className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[var(--th-text-subtle)]">
              How it all connects
            </motion.div>
            <motion.h2 variants={fadeUp} className="mt-4 font-serif text-3xl tracking-tight sm:text-[40px] text-[var(--th-text)]">
              One system. Every school role.
            </motion.h2>

            <motion.div variants={stagger} className="mt-10 grid gap-5 lg:grid-cols-4">
              {[
                { icon: <Settings   className="h-5 w-5" />, title: 'Admin sets up',        desc: 'Admin creates classes, subjects, teachers, and enrols students. Everything configured in one place.' },
                { icon: <BookOpen   className="h-5 w-5" />, title: 'Teacher delivers',      desc: 'Teachers mark attendance and assign homework with file attachments. Submit for approval. All tracked.' },
                { icon: <ShieldCheck className="h-5 w-5" />, title: 'System approves',     desc: 'Admin reviews and approves homework before it goes live. Audit trail on every action.' },
                { icon: <Smartphone className="h-5 w-5" />, title: 'Parent stays informed', desc: "Parents log in and see everything — no WhatsApp chaos. Child's attendance, homework, notices. All in one portal." },
              ].map((s, idx) => (
                <motion.div key={s.title} variants={fadeUp} className="relative rounded-2xl border border-[rgba(81,43,212,0.25)] bg-[var(--th-bg-card)] p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#512BD4] text-white">{s.icon}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#512BD4] font-sans text-xs font-bold text-white">
                        {idx + 1}
                      </div>
                      <div className="font-sans text-[15px] font-semibold text-[var(--th-text)]">{s.title}</div>
                    </div>
                  </div>
                  <div className="mt-4 font-sans text-[13px] leading-6 text-[var(--th-text-muted)]">{s.desc}</div>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 5 — Investment   (deep — stays dark both themes)
      ════════════════════════════════════════════════════ */}
      <section id="investment" className="scroll-mt-14 text-white" style={{ background: 'var(--th-bg-deep)' }}>
        <div className="mx-auto max-w-6xl px-4 py-24">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>

            <motion.div variants={fadeUp} className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#00E5CC]">
              The investment
            </motion.div>
            <motion.h2 variants={fadeUp} className="mt-4 font-serif text-4xl tracking-tight sm:text-[48px]">
              <span className="block">What this system is worth.</span>
              <span className="block italic bg-gradient-to-r from-[#A78BFA] to-[#00E5CC] bg-clip-text text-transparent">
                What you pay.
              </span>
            </motion.h2>

            <motion.div variants={stagger} className="mt-12 grid gap-6 lg:grid-cols-2">

              {/* Market rate */}
              <motion.div variants={fadeUp} className="rounded-3xl border border-white/12 bg-white/5 p-6">
                <div className="font-sans text-xs font-semibold tracking-[0.16em] uppercase text-white/70">Market rate breakdown</div>
                <div className="mt-2 font-sans text-[13px] leading-6 text-white/60">
                  What a Chennai software agency would quote for an identical system:
                </div>
                <div className="mt-6 grid gap-3 font-sans text-[13px]">
                  {(
                    [
                      ['Architecture & Database Design', 40000],
                      ['Backend API (11 feature slices)',  120000],
                      ['Frontend (69 components)',         80000],
                      ['Auth System (custom JWT)',         25000],
                      ['PWA + Offline Support',            15000],
                      ['File Storage (S3 integration)',    10000],
                      ['Testing & QA',                    20000],
                      ['Deployment & DevOps',              15000],
                    ] as ReadonlyArray<readonly [string, number]>
                  ).map(([label, amt]) => (
                    <div key={label} className="flex items-center justify-between gap-4 text-white/65">
                      <div>{label}</div>
                      <INRStrike value={amt} />
                    </div>
                  ))}
                  <div className="my-1 h-px bg-white/10" />
                  <div className="flex items-center justify-between gap-4">
                    <div className="font-sans font-semibold text-white/70">Market Total</div>
                    <div className="font-sans font-semibold"><INRStrike value={PROJECT.fees.marketRate} /></div>
                  </div>
                </div>
              </motion.div>

              {/* Your fee */}
              <motion.div
                variants={fadeUp}
                initial={{ scale: reduce ? 1 : 0.8, opacity: reduce ? 1 : 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={viewport}
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 100 }}
                className="rounded-3xl border border-[rgba(81,43,212,0.55)] bg-[rgba(81,43,212,0.10)] p-6 shadow-[0_0_60px_rgba(81,43,212,0.15)]"
              >
                <div className="font-sans text-xs font-semibold tracking-[0.16em] uppercase text-[rgba(200,190,255,0.85)]">
                  Your project investment
                </div>
                <div className="mt-6 font-serif text-[64px] leading-[1] tracking-[-0.02em] sm:text-[72px]">
                  {formatINR(PROJECT.fees.projectDelivery)}
                </div>
                <div className="mt-2 font-sans text-[13px] font-semibold text-[rgba(200,190,255,0.88)]">One-time project delivery fee</div>
                <div className="mt-6 grid gap-3 font-sans text-[14px] text-white/85">
                  {[
                    'Full system delivery (all 10 features)',
                    "Your school's data migrated and imported",
                    '2-hour training session for your staff',
                    '30-day go-live support included',
                    'All source code — yours forever',
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-2">
                      <div className="mt-0.5 text-[#00E5CC]">✓</div>
                      <div>{t}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-7 inline-flex items-center rounded-full border border-[rgba(0,229,204,0.40)] bg-[rgba(0,229,204,0.12)] px-4 py-2 font-sans text-[12px] font-semibold text-[#00E5CC]">
                  You save {formatINR(savings)} vs market rate
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-14 text-center font-serif text-[18px] italic text-white/75 sm:text-[22px]">
              We charge for delivery, not for years of engineering. The system is built. You pay to receive it.
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 6 — Delivery Terms   (main bg)
      ════════════════════════════════════════════════════ */}
      <section id="delivery" className="scroll-mt-14" style={{ background: 'var(--th-bg-main)' }}>
        <div className="mx-auto max-w-6xl px-4 py-24">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>

            <motion.div variants={fadeUp} className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[var(--th-text-subtle)]">
              What&apos;s being delivered
            </motion.div>
            <motion.h2 variants={fadeUp} className="mt-4 font-serif text-3xl tracking-tight sm:text-[40px] text-[var(--th-text)]">
              Everything you receive today.
            </motion.h2>

            <motion.div variants={stagger} className="mt-12 grid gap-6 lg:grid-cols-2">

              <motion.div variants={fadeUp} className="rounded-3xl border border-[var(--th-border)] bg-[var(--th-bg-card)] p-6">
                <div className="grid gap-4">
                  {[
                    "Live system on your school's subdomain",
                    'Admin account configured for your school',
                    'All 10 features active and tested',
                    'Student & teacher data imported',
                    'Parent accounts set up',
                    '2-hour staff training session (scheduled)',
                    '30-day direct support from FBT team',
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(81,43,212,0.15)] text-[#00E5CC]">✓</div>
                      <div className="font-sans text-[14px] text-[var(--th-text)]">{t}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-3xl border border-[rgba(255,176,32,0.35)] bg-[var(--th-bg-card)] p-6">
                <div className="border-l-4 border-[#FFB020] pl-4">
                  <div className="font-sans text-[15px] font-semibold text-[var(--th-text)]">What this fee doesn&apos;t cover</div>
                  <div className="mt-2 font-sans text-[13px] leading-6 text-[var(--th-text-muted)]">
                    — Custom features beyond what&apos;s built<br />
                    — Ongoing hosting after 30 days ({formatINR(PROJECT.fees.monthlyCarePlan)}/month or {formatINR(PROJECT.fees.annualCarePlan)}/year — see below)<br />
                    — Hardware or device support
                  </div>
                  <div className="mt-4 font-sans text-[13px] text-[var(--th-text-subtle)]">We believe in clarity. No surprises after you sign.</div>
                </div>
              </motion.div>

            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 7 — Ongoing Care   (alt bg)
      ════════════════════════════════════════════════════ */}
      <section id="care" className="scroll-mt-14" style={{ background: 'var(--th-bg-alt)' }}>
        <div className="mx-auto max-w-6xl px-4 py-24">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>

            <motion.div variants={fadeUp} className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[var(--th-text-subtle)]">
              After delivery
            </motion.div>
            <motion.h2 variants={fadeUp} className="mt-4 font-serif text-3xl tracking-tight sm:text-[40px] text-[var(--th-text)]">
              <span className="block">Keep it running.</span>
              <span className="block italic">Keep it improving.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-3xl font-sans text-[15px] leading-7 text-[var(--th-text-muted)]">
              The project fee covers delivery. The care plan keeps your system alive, secure, and growing.
            </motion.p>

            <motion.div variants={stagger} className="mt-12 grid gap-6 lg:grid-cols-2">

              {/* Month-to-Month */}
              <motion.div variants={fadeUp} className="rounded-3xl border border-[var(--th-border)] bg-[var(--th-bg-card)] p-6">
                <div className="font-sans text-[15px] font-semibold text-[var(--th-text)]">Month-to-Month</div>
                <div className="mt-3 font-serif text-4xl tracking-tight text-[var(--th-text)]">{formatINR(PROJECT.fees.monthlyCarePlan)}</div>
                <div className="mt-1 font-sans text-[13px] text-[var(--th-text-subtle)]">No contract. Cancel with 30 days notice.</div>
                <div className="mt-5 grid gap-2 font-sans text-[13px] text-[var(--th-text-muted)]">
                  {['Hosting & SSL', 'Daily backups', 'Bug fixes & security patches', 'WhatsApp support (24hr response)'].map((t) => (
                    <div key={t} className="flex items-start gap-2">
                      <div className="mt-0.5 text-[#00E5CC]">•</div>
                      <div>{t}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Annual */}
              <motion.div variants={fadeUp} className="rounded-3xl border border-[rgba(0,229,204,0.40)] bg-[rgba(0,229,204,0.05)] p-6">
                <div className="inline-flex rounded-full border border-[rgba(0,229,204,0.35)] bg-[rgba(0,229,204,0.12)] px-3 py-1 font-sans text-[12px] font-semibold text-[#00E5CC]">
                  Most schools choose this
                </div>
                <div className="mt-3 font-sans text-[15px] font-semibold text-[var(--th-text)]">Annual Partnership</div>
                <div className="mt-3 flex items-end gap-3">
                  <div className="font-sans text-[14px] text-[var(--th-text-subtle)] line-through">{formatINR(24000)}</div>
                  <div className="font-serif text-4xl tracking-tight text-[var(--th-text)]">{formatINR(PROJECT.fees.annualCarePlan)}</div>
                  <div className="mb-1 inline-flex rounded-full border border-[rgba(0,229,204,0.30)] bg-[rgba(0,229,204,0.12)] px-3 py-1 font-sans text-[12px] font-semibold text-[#00E5CC]">
                    Save {formatINR(PROJECT.fees.annualSaving)}
                  </div>
                </div>
                <div className="mt-1 font-sans text-[13px] text-[var(--th-text-subtle)]">Pay once for the year. Lock in your rate.</div>
                <div className="mt-5 grid gap-2 font-sans text-[13px] text-[var(--th-text-muted)]">
                  {[
                    'Hosting & SSL', 'Daily backups', 'Bug fixes & security patches',
                    'WhatsApp support (24hr response)', '4-hour priority support',
                    'Monthly 30-min strategy call', '1 free feature per year', 'Price lock for 12 months',
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-2">
                      <div className="mt-0.5 text-[#00E5CC]">•</div>
                      <div>{t}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 font-sans text-[13px] text-[var(--th-text-subtle)]">
              Care plan starts 30 days after delivery. Your first month is included in the project fee.
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 8 — The Team   (main bg)
      ════════════════════════════════════════════════════ */}
      <section id="team" className="scroll-mt-14" style={{ background: 'var(--th-bg-main)' }}>
        <div className="mx-auto max-w-6xl px-4 py-24">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>

            <motion.div variants={fadeUp} className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#00E5CC]">
              Who built this
            </motion.div>
            <motion.h2 variants={fadeUp} className="mt-4 font-serif text-3xl tracking-tight sm:text-[40px] text-[var(--th-text)]">
              <span className="block">FBT Engineering.</span>
              <span className="block italic">Not a freelancer.</span>
            </motion.h2>

            <motion.div variants={stagger} className="mt-12 grid gap-5 lg:grid-cols-3">
              {[
                {
                  title: 'Backed by FIROSE Enterprises',
                  desc: "FBT is the technology division of FIROSE Enterprises — an operational FMCG group with active businesses in Chennai. We're not a startup. We're not going anywhere.",
                },
                {
                  title: 'Full source code ownership',
                  desc: "Everything we build, you own. The entire codebase can be handed over at any time. No vendor lock-in, no hostage code.",
                },
                {
                  title: 'Built on enterprise standards',
                  desc: 'The same architecture used by companies 100x our size. .NET 8, PostgreSQL, Next.js 15, AWS S3. Not WordPress. Not no-code. Real engineering.',
                },
              ].map((c) => (
                <motion.div key={c.title} variants={fadeUp} className="rounded-3xl border border-[rgba(81,43,212,0.25)] bg-[rgba(81,43,212,0.07)] p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(81,43,212,0.20)] text-[#00E5CC]">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="mt-4 font-sans text-[15px] font-semibold text-[var(--th-text)]">{c.title}</div>
                  <div className="mt-2 font-sans text-[13px] leading-6 text-[var(--th-text-muted)]">{c.desc}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-2">
              {['.NET 8', 'PostgreSQL', 'Next.js 15', 'AWS S3', 'Railway', 'Sentry', 'JWT Auth', 'PWA'].map((t) => (
                <div key={t} className="rounded-full border border-[var(--th-border)] bg-[var(--th-bg-card)] px-4 py-2 font-sans text-xs font-semibold text-[var(--th-text-muted)]">
                  {t}
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 9 — FAQ   (main bg)
      ════════════════════════════════════════════════════ */}
      <section id="faq" className="scroll-mt-14" style={{ background: 'var(--th-bg-main)' }}>
        <div className="mx-auto max-w-4xl px-4 py-24">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>

            <motion.h2 variants={fadeUp} className="font-serif text-3xl tracking-tight sm:text-[40px] text-[var(--th-text)]">
              Before you accept
            </motion.h2>

            <motion.div variants={fadeUp} className="mt-10 rounded-3xl border border-[var(--th-border)] bg-[var(--th-bg-card)]">
              {[
                {
                  q: 'Is ₹20,000 the only cost to get started?',
                  a: `Yes. ${formatINR(PROJECT.fees.projectDelivery)} covers full delivery: setup, data import, training, and 30-day support. After 30 days, you choose a care plan (${formatINR(PROJECT.fees.monthlyCarePlan)}/month or ${formatINR(PROJECT.fees.annualCarePlan)}/year) to keep the system running. There are no hidden costs.`,
                },
                {
                  q: "What if we're not happy with what's built?",
                  a: "You have 30 days to request changes at no extra charge. If the system genuinely doesn't meet requirements, we will refund in full. We stand behind our work.",
                },
                {
                  q: 'Can we see the product before paying?',
                  a: "Yes — we offer a 7-day preview of the live system with your school's data. You see exactly what you're accepting before any payment is made.",
                },
                {
                  q: 'What happens if FBT shuts down?',
                  a: "Full source code export on request. All your data in standard PostgreSQL format. You can take the codebase to any developer and continue without us. We cannot hold your school's data hostage.",
                },
                {
                  q: "How long until we're live after accepting?",
                  a: '3 to 5 working days. We import your data, configure your school, train your staff, and hand you the keys.',
                },
              ].map((item, idx) => {
                const open = idx === faqOpenIdx
                return (
                  <div key={item.q} className={idx === 0 ? '' : 'border-t border-[var(--th-border-subtle)]'}>
                    <button
                      type="button"
                      onClick={() => setFaqOpenIdx(open ? -1 : idx)}
                      className="w-full px-6 py-5 text-left"
                      aria-expanded={open}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="font-sans text-[15px] sm:text-base font-semibold text-[var(--th-text)]">
                          {item.q}
                        </div>
                        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={reduce ? { duration: 0 } : { duration: 0.2 }}>
                          <ChevronDown className="h-5 w-5 text-[var(--th-text-subtle)]" />
                        </motion.div>
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={reduce ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 -mt-2 font-sans text-[14px] leading-7 text-[var(--th-text-muted)]">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 10 — Accept   (deep — stays dark both themes)
      ════════════════════════════════════════════════════ */}
      <section id="accept" className="scroll-mt-14 text-white" style={{ background: 'var(--th-bg-deep)' }}>
        <div className="mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-4 py-24 text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="w-full">

            <motion.div variants={fadeUp} className="inline-flex items-center rounded-full border border-[rgba(81,43,212,0.45)] bg-[rgba(81,43,212,0.14)] px-4 py-2 font-sans text-xs font-semibold tracking-wide text-[rgba(200,190,255,0.92)]">
              Ready to receive
            </motion.div>

            <motion.h2 variants={fadeUp} className="mx-auto mt-7 max-w-4xl font-serif text-[36px] leading-[1.06] tracking-[-0.02em] sm:text-[54px] lg:text-[60px]">
              <span className="block">Your school&apos;s system</span>
              <span className="block italic bg-gradient-to-r from-[#A78BFA] to-[#00E5CC] bg-clip-text text-transparent">
                is ready and waiting.
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl font-sans text-[15px] leading-7 text-white/65 sm:text-[18px]">
              Every feature tested. Every screen reviewed. Every teacher trained.
              Accept the project today and go live within 5 working days.
            </motion.p>

            {/* Summary card — stays dark since it's in a deep section */}
            <motion.div
              variants={fadeUp}
              initial={{ y: reduce ? 0 : 60, opacity: reduce ? 1 : 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={viewport}
              transition={reduce ? { duration: 0 } : { type: 'spring', damping: 20, stiffness: 80 }}
              className="mx-auto mt-12 w-full max-w-[520px] rounded-3xl border border-[rgba(81,43,212,0.55)] bg-[#0F1520] p-7 text-left shadow-[0_50px_140px_rgba(81,43,212,0.22)]"
            >
              <div className="font-sans text-[13px] font-semibold text-white/80">Project Summary</div>

              <div className="mt-5 grid gap-3">
                {[
                  ['System delivered', PROJECT.name],
                  ['Features live',    `${PROJECT.stats.liveFeatures} confirmed`],
                  ['Training included', '2-hour session'],
                  ['Go-live support',   '30 days'],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4">
                    <div className="font-sans text-[13px] text-white/55">{k}</div>
                    <div className="font-sans text-[13px] font-semibold text-white/90">{v}</div>
                  </div>
                ))}

                <div className="my-1 h-px bg-white/10" />

                <div className="flex items-center justify-between gap-4">
                  <div className="font-sans text-[13px] text-white/55">Project fee</div>
                  <div className="font-sans text-[13px] font-semibold text-white/90">{formatINR(PROJECT.fees.projectDelivery)} (one-time)</div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="font-sans text-[13px] text-white/55">Care plan ({carePlan})</div>
                  <div className="font-sans text-[13px] font-semibold text-white/90">
                    {carePlan === 'monthly'
                      ? `${formatINR(PROJECT.fees.monthlyCarePlan)}/month`
                      : `${formatINR(PROJECT.fees.annualCarePlan)}/year`}
                  </div>
                </div>

                {/* Care plan toggle */}
                <div className="mt-2">
                  <div className="inline-flex w-full items-center justify-between rounded-full border border-white/12 bg-white/5 p-1">
                    {(['monthly', 'yearly'] as const).map((plan) => (
                      <button
                        key={plan}
                        type="button"
                        onClick={() => setCarePlan(plan)}
                        className={[
                          'flex-1 rounded-full px-4 py-2 font-sans text-[12px] font-semibold transition capitalize',
                          carePlan === plan ? 'bg-[#512BD4] text-white' : 'text-white/55 hover:text-white/80',
                        ].join(' ')}
                        aria-pressed={carePlan === plan}
                      >
                        {plan}
                      </button>
                    ))}
                  </div>
                </div>

                <a
                  href={PROJECT.contact.whatsappLink}
                  className="mt-4 inline-flex h-14 w-full items-center justify-center rounded-2xl bg-[#512BD4] font-sans text-[15px] font-semibold text-white transition hover:brightness-110 hover:shadow-[0_0_40px_rgba(81,43,212,0.55)] active:brightness-90"
                >
                  Accept the Project →
                </a>
                <div className="-mt-1 font-sans text-[12px] text-white/50">7-day preview available before payment</div>

                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <a href={PROJECT.contact.whatsappLink} className="font-sans text-[13px] text-white/60 underline underline-offset-4 hover:text-white">
                    Request a 7-day preview first
                  </a>
                  <a href={PROJECT.contact.whatsappLink} className="font-sans text-[13px] text-white/60 underline underline-offset-4 hover:text-white">
                    Talk to us on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mx-auto mt-10 max-w-[520px] text-center font-sans text-[13px] text-white/45">
              📧 {PROJECT.contact.email} &nbsp;&nbsp;|&nbsp;&nbsp; 💬 {PROJECT.contact.whatsapp}
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 font-sans text-[12px] text-white/30">
              © 2026 Future Beyond Technology · FIROSE Enterprises Group
            </motion.div>

          </motion.div>
        </div>
      </section>

    </div>
  )
}
