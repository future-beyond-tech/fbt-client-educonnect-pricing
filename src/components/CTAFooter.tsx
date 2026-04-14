import { motion } from 'framer-motion'
import { Mail, MessageCircle } from 'lucide-react'
import type { Content } from '../data/content'
import { useSectionMotion } from './motion'

type Props = { content: Content['ctaFooter'] }

export default function CTAFooter({ content }: Props) {
  const { fadeUp, stagger, viewport } = useSectionMotion()
  return (
    <footer id={content.id} className="bg-dark text-[var(--text-on-dark)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger} className="text-center">
          <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl tracking-tight text-white">
            {content.heading}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 font-sans text-[15px] sm:text-[16px] text-white/70">
            {content.subtext}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById(content.id)
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="inline-flex items-center justify-center rounded-2xl bg-accent px-7 py-3 text-[15px] font-semibold text-white hover:brightness-95 active:brightness-90 transition"
            >
              {content.primaryCta.label}
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.30)] bg-transparent px-7 py-3 text-[15px] font-semibold text-white/90 hover:bg-white/5 transition"
            >
              {content.secondaryCta.label}
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-3 text-white/70">
            <div className="flex items-center gap-2 font-sans text-sm">
              <Mail className="h-4 w-4" />
              <span>{content.contact.email}</span>
            </div>
            <div className="flex items-center gap-2 font-sans text-sm">
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp: {content.contact.whatsapp}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-sans text-xs text-white/50">{content.fineprint.copyright}</div>
          <div className="font-sans text-xs text-white/40">{content.fineprint.links}</div>
        </div>
      </div>
    </footer>
  )
}

