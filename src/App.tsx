import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import PlatformSection from './components/PlatformSection'
import PricingSection from './components/PricingSection'
import CompareTable from './components/CompareTable'
import ROICalculator from './components/ROICalculator'
import SupportSection from './components/SupportSection'
import WhyFBT from './components/WhyFBT'
import FAQSection from './components/FAQSection'
import CTAFooter from './components/CTAFooter'
import { content } from './data/content'

function App() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const sectionIds = useMemo(() => content.nav.items.map((i) => i.href.slice(1)), [])

  return (
    <div className="font-sans">
      <Navbar
        content={content.nav}
        sectionIds={sectionIds}
        primaryCtaHref={content.nav.primaryCta.href}
      />
      <main>
        <Hero content={content.hero} />
        <ProblemSection content={content.problem} />
        <PlatformSection content={content.platform} />
        <PricingSection content={content.pricing} billing={billing} onBillingChange={setBilling} />
        <CompareTable content={content.compare} />
        <ROICalculator content={content.roi} />
        <SupportSection content={content.support} />
        <WhyFBT content={content.whyFbt} />
        <FAQSection content={content.faq} />
        <CTAFooter content={content.ctaFooter} />
      </main>
    </div>
  )
}

export default App
