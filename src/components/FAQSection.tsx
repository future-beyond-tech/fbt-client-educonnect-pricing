import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { Content } from '../data/content'
import { useSectionMotion } from './motion'

type Props = { content: Content['faq'] }

export default function FAQSection({ content }: Props) {
  const [openIdx, setOpenIdx] = useState<number>(0)
  const { fadeUp, stagger, viewport, reduce } = useSectionMotion()

  return (
    <section id={content.id} className="bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]">
            {content.heading}
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-10 rounded-3xl border border-[var(--border)] bg-white">
            {content.items.map((item, idx) => {
              const open = idx === openIdx
              return (
                <div key={item.q} className={idx === 0 ? '' : 'border-t border-[var(--border)]'}>
                  <button
                    type="button"
                    onClick={() => setOpenIdx(open ? -1 : idx)}
                    className="w-full px-6 py-5 text-left"
                    aria-expanded={open}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="font-sans text-[15px] sm:text-base font-semibold text-[var(--text-primary)]">
                        {item.q}
                      </div>
                      <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="h-5 w-5 text-[var(--text-secondary)]" />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={reduce ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 -mt-2 font-sans text-[14px] leading-7 text-[var(--text-secondary)]">
                          {item.a}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

