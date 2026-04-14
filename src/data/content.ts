export type NavItem = { label: string; href: `#${string}` }

export type Content = {
  nav: {
    brand: { primary: string; secondary?: string }
    items: NavItem[]
    primaryCta: { label: string; href: `#${string}` }
    mobileMenuLabel: string
    closeMenuLabel: string
  }
  hero: {
    id: string
    badge: string
    headlineLines: [string, string]
    subtextLines: string[]
    primaryCta: { label: string; href: `#${string}` }
    secondaryCta: { label: string; href: `#${string}` }
    trustPills: string[]
    mockup: {
      title: string
      subtitle: string
      classChip: string
      attendance: { label: string; valuePct: number }
      homeworkLabel: string
      homeworkRows: { title: string; status: 'Draft' | 'Published' }[]
    }
  }
  problem: {
    id: string
    heading: string
    subheading: string
    headingLeft: string
    headingRight: string
    leftItems: string[]
    rightItems: string[]
  }
  platform: {
    id: string
    heading: string
    subheading: string
    livePill: string
    items: {
      title: string
      badge: string
      description: string
      icon:
        | 'ClipboardList'
        | 'BarChart3'
        | 'Megaphone'
        | 'Users'
        | 'GraduationCap'
        | 'UserCog'
        | 'School'
        | 'ShieldCheck'
        | 'Smartphone'
        | 'Paperclip'
    }[]
    comingSoon: {
      label: string
      tooltip: string
      pills: { label: string; icon: 'Bell' | 'Download' | 'PieChart' }[]
    }
  }
  pricing: {
    id: string
    heading: string
    subheading: string
    billingLabel: string
    toggleAriaLabel: string
    toggle: { monthly: string; yearly: string; savingsBanner: string; savingsPill: string }
    setupCard: { badge: string; badgeTone: 'amber'; title: string; price: number; subtext: string; bullets: string[] }
    monthlyCard: {
      badge: string
      badgeTone: 'blue'
      title: string
      priceMonthly: number
      priceSuffix: string
      subtext: string
      bullets: string[]
    }
    yearlyCard: {
      badge: string
      title: string
      priceYearlyRegular: number
      priceYearlyDiscounted: number
      savings: number
      savingsText: string
      plusHeading: string
      bullets: string[]
      cta: { label: string; href: `#${string}` }
    }
  }
  compare: {
    id: string
    heading: string
    subheading?: string
    columns: { feature: string; monthly: string; yearly: string }
    rows: { feature: string; monthly: string; yearly: string; highlightYearly?: boolean }[]
  }
  roi: {
    id: string
    heading: string
    sliders: {
      teachers: { label: string; min: number; max: number; defaultValue: number }
      salary: { label: string; min: number; max: number; defaultValue: number }
    }
    assumptions: { hoursPerTeacher: number; monthlyCost: number }
    metrics: { hoursSaved: string; staffValue: string; cost: string; roi: string }
    units: { hoursSuffix: string; roiSuffix: string }
    callout: { prefix: string; suffix: string; label: string; assumption: string }
  }
  support: {
    id: string
    heading: string
    subheading: string
    channels: { title: string; description: string; icon: 'MessageCircle' | 'Mail' | 'Video'; note?: string }[]
    slaHeading: string
    slaRows: { level: string; time: string; tone: 'green' | 'amber' | 'muted' | 'blue' }[]
    maintenanceHeading: string
    maintenanceItems: { title: string; description: string; icon: 'Shield' | 'Database' | 'Lock' | 'Gauge' | 'Monitor' | 'RefreshCcw' }[]
  }
  whyFbt: {
    id: string
    heading: string
    subheading: string
    cards: { title: string; description: string; icon: 'Building2' | 'Shield' | 'Calendar' }[]
    techStripLabel: string
    techBadges: string[]
  }
  faq: {
    id: string
    heading: string
    items: { q: string; a: string }[]
  }
  ctaFooter: {
    id: string
    heading: string
    subtext: string
    primaryCta: { label: string; href: `#${string}` }
    secondaryCta: { label: string; href: `#${string}` }
    contact: { email: string; whatsapp: string }
    fineprint: { copyright: string; links: string }
  }
}

export const content: Content = {
  nav: {
    brand: { primary: 'Future Beyond Technology' },
    items: [
      { label: 'Platform', href: '#platform' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'ROI', href: '#roi' },
      { label: 'Support', href: '#support' },
      { label: 'FAQ', href: '#faq' },
    ],
    primaryCta: { label: 'Get a Free Trial', href: '#cta' },
    mobileMenuLabel: 'Menu',
    closeMenuLabel: 'Close menu',
  },
  hero: {
    id: 'hero',
    badge: '🏫 School Communication Platform',
    headlineLines: ['The smartest ₹2,000', 'your school will ever spend.'],
    subtextLines: [
      'EduConnect brings homework, attendance, notices,',
      'and parent communication into one platform — built for Indian schools, ready from day one.',
    ],
    primaryCta: { label: 'Start Free 30-Day Trial', href: '#cta' },
    secondaryCta: { label: 'See Pricing', href: '#pricing' },
    trustPills: ['✓ No credit card', '✓ Cancel anytime', '✓ Your data, always yours'],
    mockup: {
      title: 'EduConnect Dashboard',
      subtitle: 'Today',
      classChip: 'Class 8A',
      attendance: { label: 'Attendance', valuePct: 92 },
      homeworkLabel: 'Homework',
      homeworkRows: [
        { title: 'Maths — Chapter 6', status: 'Draft' },
        { title: 'English — Essay', status: 'Published' },
        { title: 'Science — Worksheet', status: 'Published' },
      ],
    },
  },
  problem: {
    id: 'problem',
    heading: 'Problem vs solution',
    subheading:
      'School administration becomes effortless when every action is structured, recorded, and visible.',
    headingLeft: 'What school admin looks like today',
    headingRight: 'What EduConnect makes it',
    leftItems: [
      'Attendance register filled by hand every morning',
      'WhatsApp groups with hundreds of unread messages',
      'Homework written in notebooks — lost by Tuesday',
      'Printed notice circulars that never reach parents',
      'No record of who was told what, or when',
    ],
    rightItems: [
      'Attendance marked in 30 seconds per class',
      'Structured parent portal — no WhatsApp noise',
      'Homework tracked digitally, PDF/Word attached',
      'Notices published instantly, parents see them live',
      'Every action timestamped and auditable forever',
    ],
  },
  platform: {
    id: 'platform',
    heading: 'Built to work from day one.',
    subheading: 'Every feature below is live in the product today.',
    livePill: '● Live',
    items: [
      {
        title: 'Homework Management',
        badge: 'Live',
        description:
          'Create homework with a full approval workflow — Draft → Submit → Approve → Publish. Attach PDF, Word documents, and images up to 10 MB.',
        icon: 'ClipboardList',
      },
      {
        title: 'Attendance Tracking',
        badge: 'Live',
        description:
          'Teachers mark absent or late per class in seconds. Parents can apply for leave with a reason. Admin can override any record. Full history per student.',
        icon: 'BarChart3',
      },
      {
        title: 'Notice Board',
        badge: 'Live',
        description:
          "Post school-wide or class-specific announcements. Notices stay in draft until published. Expiry dates supported. Parents see notices relevant to their child.",
        icon: 'Megaphone',
      },
      {
        title: 'Parent Portal',
        badge: 'Live',
        description:
          'Parents log in with their phone number and a PIN. They see their child’s attendance, homework, and notices in one place — no app installation needed.',
        icon: 'Users',
      },
      {
        title: 'Student Management',
        badge: 'Live',
        description:
          'Enroll students, build class lists, link parents to children. Full profiles with deactivation support. Admin and teacher views included.',
        icon: 'GraduationCap',
      },
      {
        title: 'Teacher Management',
        badge: 'Live',
        description:
          'Create teacher accounts, assign them to classes and subjects, and promote class teachers. Full admin control panel with assignment management.',
        icon: 'UserCog',
      },
      {
        title: 'Classes & Subjects',
        badge: 'Live',
        description:
          'Create and manage class sections and subject catalogs. Subjects are used when assigning teachers, keeping your timetable structured from day one.',
        icon: 'School',
      },
      {
        title: 'Secure Multi-Role Access',
        badge: 'Live',
        description:
          'Three roles — Admin, Teacher, Parent — each with their own portal, navigation, and access scope. School data is fully isolated between tenants.',
        icon: 'ShieldCheck',
      },
      {
        title: 'Works on Any Device (PWA)',
        badge: 'Live',
        description:
          'EduConnect is installable on any phone or tablet — no app store needed. Works offline. Teachers can mark attendance even with a poor connection.',
        icon: 'Smartphone',
      },
      {
        title: 'File Attachments',
        badge: 'Live',
        description:
          'Teachers can attach PDF and Word documents to homework. Files are stored securely on cloud storage. Students and parents download with one tap.',
        icon: 'Paperclip',
      },
    ],
    comingSoon: {
      label: 'On the roadmap — included in your plan at no extra cost',
      tooltip: 'Available to all subscribers when released.',
      pills: [
        { label: 'Push Notifications', icon: 'Bell' },
        { label: 'Bulk Import', icon: 'Download' },
        { label: 'Analytics Dashboard', icon: 'PieChart' },
      ],
    },
  },
  pricing: {
    id: 'pricing',
    heading: 'Simple, honest pricing.',
    subheading: 'One school. Unlimited students. No per-user fees.',
    billingLabel: 'Billing',
    toggleAriaLabel: 'Toggle monthly or yearly billing',
    toggle: {
      monthly: 'Monthly',
      yearly: 'Yearly',
      savingsBanner: 'Pay for 9 months — get 12 free. Save ₹6,000.',
      savingsPill: 'Save ₹6,000',
    },
    setupCard: {
      badge: 'One-time only',
      badgeTone: 'amber',
      title: 'Project Setup & Onboarding',
      price: 20000,
      subtext: 'Paid once. Never again.',
      bullets: [
        "Full system setup on your school's domain",
        'Student, teacher & parent data import',
        '2-hour staff training session (online)',
        '30-day go-live support at no extra charge',
      ],
    },
    monthlyCard: {
      badge: 'Most popular',
      badgeTone: 'blue',
      title: 'Monthly Maintenance',
      priceMonthly: 2000,
      priceSuffix: '/month',
      subtext: 'Cancel with 30 days notice.',
      bullets: [
        'All live features + new ones as released',
        'Bug fixes & security patches',
        'WhatsApp + Email support (24hr response)',
        'Daily backups, 30-day retention',
        'SSL certificate, Railway hosting',
        'Uptime monitoring',
      ],
    },
    yearlyCard: {
      badge: 'BEST VALUE',
      title: 'Annual Maintenance Plan',
      priceYearlyRegular: 24000,
      priceYearlyDiscounted: 18000,
      savings: 6000,
      savingsText: 'Save ₹6,000 (25% off)',
      plusHeading: 'Everything in Monthly, plus:',
      bullets: [
        'Priority support — 4hr response',
        'Monthly 30-min strategy call',
        '1 free feature request per year',
        'Price lock — no increase for 12 months',
        'Early access to new features',
      ],
      cta: { label: 'Start Annual Plan →', href: '#cta' },
    },
  },
  compare: {
    id: 'compare',
    heading: 'Plan comparison',
    columns: { feature: 'Feature', monthly: 'Monthly ₹2,000/mo', yearly: 'Yearly ₹18,000/yr' },
    rows: [
      { feature: 'All live features (+ future releases)', monthly: '✓', yearly: '✓', highlightYearly: true },
      { feature: 'Unlimited students & teachers', monthly: '✓', yearly: '✓', highlightYearly: true },
      { feature: 'Bug fixes & security patches', monthly: '✓', yearly: '✓', highlightYearly: true },
      { feature: 'WhatsApp & email support', monthly: '✓', yearly: '✓', highlightYearly: true },
      { feature: 'Daily backups (30-day retention)', monthly: '✓', yearly: '✓', highlightYearly: true },
      { feature: 'Uptime monitoring & hosting', monthly: '✓', yearly: '✓', highlightYearly: true },
      { feature: 'Support response time', monthly: '24hrs', yearly: '4hrs ⚡', highlightYearly: true },
      { feature: 'Monthly strategy call (30 min)', monthly: '—', yearly: '✓', highlightYearly: true },
      { feature: 'Free feature request / year', monthly: '—', yearly: '✓', highlightYearly: true },
      { feature: 'Price lock for 12 months', monthly: '—', yearly: '✓', highlightYearly: true },
      { feature: 'Early feature access', monthly: '—', yearly: '✓', highlightYearly: true },
      { feature: 'Annual cost', monthly: '₹24,000', yearly: '₹18,000 ✅', highlightYearly: true },
      { feature: 'You save', monthly: '—', yearly: '₹6,000 🎉', highlightYearly: true },
    ],
  },
  roi: {
    id: 'roi',
    heading: "See your school's return.",
    sliders: {
      teachers: { label: 'Number of teachers', min: 5, max: 100, defaultValue: 20 },
      salary: { label: 'Staff salary (₹/month)', min: 10000, max: 50000, defaultValue: 20000 },
    },
    assumptions: { hoursPerTeacher: 1.15, monthlyCost: 2000 },
    metrics: {
      hoursSaved: 'Hours saved/month',
      staffValue: 'Staff time value',
      cost: 'EduConnect cost',
      roi: 'Monthly ROI',
    },
    units: { hoursSuffix: ' hrs', roiSuffix: 'x return' },
    callout: {
      label: 'Result',
      prefix: 'For every ₹1 you spend, you save ₹',
      suffix: ' in staff time.',
      assumption: 'Assumption: each teacher saves ~1.15 hours/month across attendance, homework, and communication.',
    },
  },
  support: {
    id: 'support',
    heading: "We don't disappear after you pay.",
    subheading: 'Clear channels. Clear timelines. No guessing.',
    channels: [
      {
        title: 'WhatsApp',
        description:
          'Direct line to the FBT team. Best for urgent issues, screenshots, and quick queries.',
        icon: 'MessageCircle',
      },
      {
        title: 'Email',
        description:
          'For formal requests, feature asks, and billing. Everything is tracked and documented.',
        icon: 'Mail',
      },
      {
        title: 'Video Call',
        description:
          "Monthly 30-minute check-in. We review your usage, answer questions, and share what's coming.",
        note: 'Yearly plan only',
        icon: 'Video',
      },
    ],
    slaHeading: 'SLA response times',
    slaRows: [
      { level: 'Critical Bug', time: '4 hours', tone: 'green' },
      { level: 'Major Issue', time: '8 hours', tone: 'amber' },
      { level: 'Minor Issue', time: '72 hours', tone: 'muted' },
      { level: 'Feature Request', time: 'Roadmap', tone: 'blue' },
    ],
    maintenanceHeading: 'What maintenance includes',
    maintenanceItems: [
      { title: 'Security patches within 48 hrs', description: 'Continuous updates to keep your system safe.', icon: 'Shield' },
      { title: 'Daily backups, 30-day retention', description: 'Predictable backup retention with recovery support.', icon: 'Database' },
      { title: 'SSL auto-renewal', description: 'Secure connections across devices and browsers.', icon: 'Lock' },
      { title: 'Uptime monitoring', description: 'We watch uptime and speed proactively.', icon: 'Gauge' },
      { title: 'Browser compatibility updates', description: 'Compatibility updates as browsers change.', icon: 'Monitor' },
      { title: 'Monthly platform improvements', description: 'Improvements shipped steadily without downtime drama.', icon: 'RefreshCcw' },
    ],
  },
  whyFbt: {
    id: 'why-fbt',
    heading: 'Built by engineers. Backed by enterprise.',
    subheading: 'Long-term partnership, not a “project delivery”.',
    cards: [
      {
        title: 'Not a solo freelancer',
        description:
          'FBT is the technology division of FIROSE Enterprises, an operational FMCG group based in Chennai. We have the infrastructure and stability to support you long-term.',
        icon: 'Building2',
      },
      {
        title: 'Your data is yours. Always.',
        description:
          'You can export your full database at any time — students, attendance, homework, everything. Three-month exit clause with full handover. No lock-in.',
        icon: 'Shield',
      },
      {
        title: 'Try before you commit.',
        description:
          "30-day free trial on a live system with your real data. No credit card. No contracts. If you don't see value in 30 days, walk away — no questions asked.",
        icon: 'Calendar',
      },
    ],
    techStripLabel: 'Credibility signals',
    techBadges: ['.NET 8', 'PostgreSQL', 'Next.js 15', 'AWS S3', 'Railway', 'Sentry', 'PWA', 'JWT Auth'],
  },
  faq: {
    id: 'faq',
    heading: 'Questions we hear from every school',
    items: [
      {
        q: 'Why does setup cost ₹20,000 if monthly is only ₹2,000?',
        a: 'The ₹20,000 covers real work — importing your student and teacher data, configuring your school, training your staff, and supporting you through go-live. You pay it once. It is never charged again. The ₹2,000/month is purely to keep the platform running, maintained, and improving for you.',
      },
      {
        q: 'What does the monthly fee actually cover?',
        a: 'Hosting on Railway, daily database backups, security patches, bug fixes, SSL renewal, uptime monitoring, and WhatsApp/email support. You are not just paying for software — you are paying for a maintained, secure, always-on system that someone is watching.',
      },
      {
        q: 'Why pay yearly instead of monthly?',
        a: 'Yearly costs ₹18,000 instead of ₹24,000 — you save ₹6,000 (3 months free). You also get 4-hour priority support instead of 24-hour, a monthly strategy call, one free custom feature per year, and a price-lock guarantee. If you plan to use EduConnect for more than 9 months, yearly is simply the smarter choice.',
      },
      {
        q: 'We already use WhatsApp groups for parents. Why switch?',
        a: 'WhatsApp is a messaging app. EduConnect is a school record system. Every notice, homework assignment, and attendance record is timestamped, searchable, and permanent. Parents cannot delete your records. You can prove that a notice was sent and seen. WhatsApp cannot do any of that.',
      },
      {
        q: 'What happens to our data if we cancel?',
        a: 'You receive a full export of all data — students, attendance, homework, notices — within 48 hours of requesting it. We retain nothing after 30 days. There is no ransom, no migration fee, and no negotiation.',
      },
      {
        q: 'What if we need a feature that EduConnect does not have?',
        a: 'Standard feature requests go on the public roadmap and are built at no extra cost if they benefit all schools. Yearly plan clients get one custom feature per year at no charge. Additional custom features are quoted transparently — you know the price before we start.',
      },
      {
        q: 'How long does setup take?',
        a: 'Typically 3 to 5 working days from payment to go-live. We handle everything. You send us the student list, teacher list, and class structure — we do the rest.',
      },
      {
        q: 'Can parents use it without downloading an app?',
        a: 'Yes. EduConnect is a Progressive Web App — it works in any mobile browser and can be added to the home screen without going through an app store. It also works offline for viewing recent records.',
      },
    ],
  },
  ctaFooter: {
    id: 'cta',
    heading: 'Ready to run your school smarter?',
    subtext: '30-day free trial. No credit card. Your data stays yours.',
    primaryCta: { label: 'Start Free Trial', href: '#cta' },
    secondaryCta: { label: 'Talk to us on WhatsApp →', href: '#cta' },
    contact: { email: 'hello@futurebeyondtech.in', whatsapp: '+91 XXXXX XXXXX' },
    fineprint: {
      copyright: '© 2026 Future Beyond Technology · FIROSE Enterprises Group',
      links: 'Privacy Policy · Terms of Service',
    },
  },
}

