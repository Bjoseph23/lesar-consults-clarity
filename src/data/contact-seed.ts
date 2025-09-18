// Contact information and default data for Lesar Consults
// Based on company profile and existing contact details

export const CONTACT_INFO = {
  email: 'lesarconsults@gmail.com',
  phone: '+254 710 715 132',
  address: {
    box: 'P.O. Box 43239-80100',
    city: 'Mombasa',
    country: 'Kenya'
  },
  hours: {
    weekdays: 'Monday - Friday: 8:00 AM - 6:00 PM EAT',
    saturday: 'Saturday: 9:00 AM - 1:00 PM EAT',
    sunday: 'Sunday: Closed'
  },
  responseTime: '2 business days'
};

export const SERVICES = [
  'Health Systems Strengthening',
  'Financial Analysis and Economics', 
  'Customized Research, Analysis & Surveys',
  'Monitoring and Evaluation (M&E)',
  'Human Resource Management, Capacity Building & Training',
  'Policy & Advocacy Development',
  'Project Management',
  'Other'
];

export const BUDGET_RANGES = [
  '< KSh 500,000',
  'KSh 500,000 – 2,500,000', 
  'KSh 2,500,000 – 10,000,000',
  '> KSh 10,000,000',
  'Prefer not to say'
];

export const TIMEFRAMES = [
  'Within 1 month',
  '1–3 months',
  '3–6 months', 
  '6+ months',
  'TBD'
];

export const PARTNER_LOGOS = [
  {
    src: '/logos/ministry-of-health-logo.png',
    alt: 'Ministry of Health Kenya',
    name: 'Ministry of Health'
  },
  {
    src: '/logos/unicef-logo.png',
    alt: 'UNICEF',
    name: 'UNICEF'
  },
  {
    src: '/logos/usaid-logo.png',
    alt: 'USAID',
    name: 'USAID'
  },
  {
    src: '/logos/worldbank-logo.png',
    alt: 'World Bank',
    name: 'World Bank'
  },
  {
    src: '/logos/dfid-logo.png',
    alt: 'DFID',
    name: 'DFID'
  },
  {
    src: '/logos/redcross-logo.png',
    alt: 'Red Cross',
    name: 'Red Cross'
  },
  {
    src: '/logos/amref-logo.png',
    alt: 'Amref Health Africa',
    name: 'Amref Health Africa'
  },
  {
    src: '/logos/nairobi-county-logo.png',
    alt: 'Nairobi County',
    name: 'Nairobi County'
  }
];

export const CALENDLY_CONFIG = {
  // TODO: Replace with actual Calendly URL
  fallbackUrl: 'https://calendly.com/lesarconsults/consultation',
  embedId: 'calendly-inline-widget',
  minWidth: '320px',
  height: '630px'
};

export const SOCIAL_LINKS = {
  linkedin: '#',
  twitter: '#',
  facebook: '#'
};

export const LEGAL_LINKS = {
  privacy: '#',
  terms: '#'
};