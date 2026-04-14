export const PROJECT = {
  name: 'EduConnect v1.0',
  stats: {
    backendFiles: 261,
    dbTables: 15,
    liveFeatures: 10,
    frontendComponents: 69,
    migrations: 14,
    apiSlices: 11,
    roles: 4,
  },
  fees: {
    projectDelivery: 20000,
    monthlyCarePlan: 2000,
    annualCarePlan: 18000,
    annualSaving: 6000,
    marketRate: 325000,
  },
  contact: {
    email: 'hello@futurebeyondtech.in',
    whatsapp: '+91 XXXXX XXXXX',
    whatsappLink: 'https://wa.me/91XXXXXXXXXX',
  },
} as const

export type Project = typeof PROJECT

export function formatINR(value: number) {
  return value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
}

