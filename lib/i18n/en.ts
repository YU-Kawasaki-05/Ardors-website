/** @file English messages and localized page content sources (BR-21). */
import type { LegalDoc } from '@/data/legal/privacy'
import type { ProductsData } from '@/data/products'
import type { ProfileData } from '@/data/profile'
import type { ServiceItem } from '@/data/services'
import type { Category } from '@/lib/schemas/contact'

import type { Messages } from './ja'

const contactCategoryLabels: Record<Category, string> = {
  相談: 'Consultation',
  協業: 'Collaboration',
  その他: 'Other',
}

const profileData: ProfileData = {
  name: 'Yu Kawasaki',
  nameEn: 'Yu Kawasaki',
  title: 'Building products and systems that create business value',
  bio: 'A developer focused on understanding customer problems and turning them into useful systems and products. I work across generative AI, web development, and business process improvement, with an emphasis on data, customer experience, and practical business value rather than technology for its own sake.',
  skills: [
    {
      category: 'Business Understanding',
      items: ['Process improvement', 'Customer interviews', 'PoC development', 'Data usage'],
    },
    {
      category: 'Development',
      items: ['TypeScript', 'React', 'Node.js', 'Python'],
    },
    {
      category: 'Platform / Integration',
      items: ['AWS', 'PostgreSQL', 'GitHub Actions', 'Stripe'],
    },
    {
      category: 'AI / Automation',
      items: ['Generative AI', 'Playwright', 'mabl', 'Test automation'],
    },
  ],
  career: [
    {
      period: '2026.3 – Present',
      role: 'Acceptance Test Automation Support',
      organization: 'Prime-listed company B, infrastructure industry',
      description:
        'Supporting acceptance test automation for a new application development project using Playwright, mabl, JavaScript, and APIs. The work focuses on reducing manual effort and dependency on individual know-how while coordinating with implementation teams and tool vendors.',
    },
    {
      period: '2025.7 – Present',
      role: 'marubo Development and Sales Preparation',
      organization: 'Personal product',
      description:
        'Developing marubo, an AI chat and student management system for cram schools. I handle interviews, design, development, and testing to make AI usage safer and more manageable in education settings.',
    },
    {
      period: '2024.4 – 2025.6',
      role: 'AI / IT Consultant',
      organization: 'Prime-listed company A, pharmaceutical industry',
      description:
        'Worked on AI adoption, process improvement, PoC development, internal communications, and consultation around business systems and operations. One PoC for process improvement was evaluated and moved into an internal system implementation.',
    },
  ],
  githubHref: 'https://github.com/YU-Kawasaki-05/Ardors-website',
  xHref: 'https://x.com/foooten_',
}

const serviceItems: ServiceItem[] = [
  {
    id: 'web-app-development',
    name: 'Web App / Business System Development',
    tagline: 'Admin tools and web applications shaped around real workflows',
    description:
      'I clarify user flows and business requirements, then build practical web apps and admin systems. Support can start from a small PoC and continue into iterative product improvement.',
    deliverables: [
      'Requirements, screen flow, and data design',
      'Implementation with Next.js / React / TypeScript',
      'API, database, and external service integration',
      'Post-release improvement discussion and light operations support',
    ],
    ctaLabel: 'Discuss development',
    ctaHref: '/contact',
  },
  {
    id: 'business-improvement',
    name: 'Business Process Improvement',
    tagline: 'Turning AI and automation into workflows people can actually use',
    description:
      'Rather than introducing AI tools in isolation, I organize workflows, data, and operations together. The focus is on PoCs, internal documentation, and processes that can take root in the team.',
    deliverables: [
      'Workflow interviews and improvement point mapping',
      'AI / automation PoC design and implementation',
      'Internal explanation and operation documents',
      'Effect review and next improvement planning',
    ],
    ctaLabel: 'Discuss process improvement',
    ctaHref: '/contact',
  },
  {
    id: 'saas-mvp-support',
    name: 'SaaS / MVP Development Support',
    tagline: 'Turning an idea into a product that can be validated',
    description:
      'I help narrow the value proposition and user experience into an MVP that can be tested. My own product work also helps me support business-side uncertainty, not just implementation tasks.',
    deliverables: [
      'Product hypothesis and feature scope organization',
      'MVP scope design',
      'Authentication, admin screens, and core feature implementation',
      'Post-release improvement and operations discussion',
    ],
    ctaLabel: 'Discuss MVP development',
    ctaHref: '/contact',
  },
  {
    id: 'stripe-consultation',
    name: 'Stripe / Payment Setup Consultation',
    tagline: 'Planning payment flows and subscriptions for small validation cycles',
    description:
      'I can discuss Stripe-based payment flows and subscription design. Implementation is handled carefully based on requirements, including terms, refund/cancellation flow, and operational processes around payment.',
    deliverables: [
      'Payment flow and pricing structure discussion',
      'Stripe Checkout and subscription setup consultation',
      'Refund, cancellation, and operation flow planning',
      'Step-by-step introduction into existing products',
    ],
    ctaLabel: 'Discuss payments',
    ctaHref: '/contact',
  },
  {
    id: 'technical-partner',
    name: 'Technical Consultation / Development Partnering',
    tagline: 'From technical sparring to hands-on implementation',
    description:
      'I help organize technology choices, implementation direction, development processes, and AI usage. Engagements can range from a single consultation to ongoing implementation support.',
    deliverables: [
      'Technology selection and implementation direction review',
      'Code and design review',
      'Development workflow setup such as GitHub Actions',
      'Ongoing improvement discussion and implementation support',
    ],
    ctaLabel: 'Discuss technical support',
    ctaHref: '/contact',
  },
]

const productsData: ProductsData = {
  title: 'Products',
  description:
    'Alongside client work, I continue to identify problems and turn them into products. Starting with marubo, I practice the full cycle from customer understanding to design, development, and operations.',
  philosophy: [
    'Start from customer problems and implement systems people can actually use',
    'Design around data accumulation and usage so each product can keep improving',
    'Validate in small steps and build products that can grow over time',
  ],
  products: [
    {
      id: 'marubo',
      name: 'marubo',
      tagline: 'AI chat and student management system for cram schools',
      description:
        'marubo helps students at cram schools use AI safely and effectively for learning, while enabling schools to understand and monitor students’ learning progress and AI usage. It started from development in a real education setting, and I handle interviews, design, development, and testing.',
      status: { label: 'In development / sales preparation', intent: 'wip' },
      highlights: [
        'AI chat for learning support',
        'Student management and usage visibility',
        'Learning analysis and report generation',
        'Administrative design for safer AI usage in education',
      ],
      techStack: ['Next.js', 'TypeScript', 'Supabase', 'Resend', 'AI API', 'Stripe (planned)'],
      ctaLabel: 'Discuss usage',
      ctaHref: '/contact',
    },
  ],
  plans: [
    {
      label: 'Unnamed product concept',
      description:
        'I am exploring small products connected to process improvement, data usage, and customer experience. The name and detailed specification are intentionally not fixed yet; the next step is to validate needs against real operational problems.',
      status: { label: 'Concept stage', intent: 'planned' },
      themes: ['Process improvement', 'Data usage', 'Customer experience', 'AI usage'],
    },
  ],
}

const privacyDoc: LegalDoc = {
  title: 'Privacy Policy',
  updatedAt: '2026-04-15',
  sections: [
    {
      heading: 'Introduction',
      body: 'Ardors ("the Service") values the protection of personal information and handles such data under the following policy.',
    },
    {
      heading: 'Information We Collect',
      body: [
        'Contact form data: name, email address, message content',
        'Analytics data: anonymous usage information via Google Analytics 4',
        'Information voluntarily shared during communication',
      ],
    },
    {
      heading: 'Purpose of Use',
      body: [
        'Responding to inquiries',
        'Service improvement and quality analysis',
        'Compliance with legal obligations',
      ],
    },
    {
      heading: 'Sharing with Third Parties',
      body: 'We do not provide personal information to third parties without consent, except when required by law. Data may be shared with service providers such as email delivery vendors under proper control.',
    },
    {
      heading: 'Cookies and Analytics',
      body: 'We use Google Analytics 4 for traffic analysis. Cookies may collect anonymous usage data that does not directly identify individuals. You can disable cookies in your browser settings.',
    },
    {
      heading: 'Data Management',
      body: 'Collected information is handled with appropriate security controls. Data is retained only as long as operationally necessary and disposed of appropriately when no longer required.',
    },
    {
      heading: 'Contact',
      body: 'For requests regarding personal information handling or disclosure, please use the contact form.',
    },
  ],
  cta: { label: 'Go to Contact', href: '/contact' },
}

const termsDoc: LegalDoc = {
  title: 'Terms of Use',
  updatedAt: '2026-04-15',
  sections: [
    {
      heading: 'Scope',
      body: 'These terms apply to the use of this website operated by Ardors. By using this site, users are deemed to agree to these terms.',
    },
    {
      heading: 'Prohibited Conduct',
      body: [
        'Unauthorized reproduction, redistribution, or reuse of site content',
        'Actions that interfere with site operation',
        'Submitting false information through forms',
        'Defamation or abusive behavior toward third parties via this site',
        'Any act violating laws or public order',
      ],
    },
    {
      heading: 'Disclaimer',
      body: 'We strive for accuracy, but do not guarantee completeness or usefulness of site information. Ardors is not liable for damages resulting from site use.',
    },
    {
      heading: 'External Links',
      body: 'This site may contain links to third-party websites. Ardors is not responsible for content or services provided on linked sites.',
    },
    {
      heading: 'Amendments',
      body: 'These terms may be revised without prior notice. Updated terms become effective once published on this page.',
    },
    {
      heading: 'Governing Law and Jurisdiction',
      body: 'These terms are governed by Japanese law. Any disputes shall be subject to the exclusive jurisdiction of the court with authority over Ardors location.',
    },
  ],
  cta: { label: 'Back to Home', href: '/' },
}

const tokushohoDoc: LegalDoc = {
  title: 'Legal Notice (Specified Commercial Transactions Act)',
  updatedAt: '2026-04-15',
  sections: [
    { heading: 'Business Name', body: 'Ardors' },
    { heading: 'Representative', body: 'Yu Kawasaki' },
    {
      heading: 'Address',
      body: 'Disclosed without delay upon valid request under applicable law.',
    },
    {
      heading: 'Phone Number',
      body: 'Disclosed without delay upon valid request under applicable law.',
    },
    { heading: 'Email', body: 'Please contact us through the inquiry form.' },
    {
      heading: 'Service Fees',
      body: 'Fees are quoted individually after confirming the project scope and requirements.',
    },
    {
      heading: 'Payment Method',
      body: 'Bank transfer or other method agreed upon separately. Detailed terms are provided at contract signing.',
    },
    {
      heading: 'Payment Timing',
      body: 'Please pay by the due date stated on the invoice after contract execution.',
    },
    {
      heading: 'Delivery Timing',
      body: 'Delivery schedule is agreed upon separately after contract execution.',
    },
    {
      heading: 'Cancellation and Refunds',
      body: 'Due to the nature of services, cancellation and refunds after delivery starts are generally not accepted unless otherwise stated in contract terms.',
    },
  ],
  cta: { label: 'Back to Home', href: '/' },
}

export const enMessages: Messages = {
  common: {
    brand: 'ARDORS',
    menu: 'Menu',
    language: {
      label: 'Language',
      ja: 'JA',
      en: 'EN',
      switchAria: 'Switch language',
    },
    github: 'GitHub',
  },
  header: {
    navAria: 'Global navigation',
    menuButtonAria: 'Toggle navigation menu',
  },
  footer: {
    navigationHeading: 'Navigation',
    legalHeading: 'Legal',
    linksHeading: 'Links',
    copyright: (year: number) => `© ${year} Ardors. All rights reserved.`,
  },
  legalLayout: {
    updatedAt: 'Last updated',
    dateLocale: 'en-US',
  },
  trustBlock: {
    ariaLabel: 'Trust block',
    domains: 'Domains',
    techStack: 'Tech Stack',
    outcomes: 'Working Focus',
    github: 'GitHub',
  },
  home: {
    hero: {
      target: 'Client development / process improvement / product building',
      title: 'Turning the next business move\ninto working systems.',
      description:
        'I combine web development, AI usage, and process improvement to turn customer problems into useful products and systems. The focus is not just technology, but how the work is used and how it creates value.',
      primaryCTA: 'View Works',
      primaryHref: '/works',
      secondaryCTA: 'Contact',
      secondaryHref: '/contact',
    },
    entryBranches: [
      {
        label: 'View Works',
        description:
          'See marubo, the Ardors website, AI/IT consulting, and acceptance test automation work.',
        href: '/works',
      },
      {
        label: 'Start a Conversation',
        description:
          'For development, process improvement, payments, or technical partnering, share your current situation first.',
        href: '/contact',
      },
      {
        label: 'Explore Products',
        description:
          'Read about marubo, an AI chat and student management system for cram schools, and future product concepts.',
        href: '/products',
      },
    ],
    trust: {
      domains: ['Web app development', 'Process improvement / AI', 'SaaS / MVP development'],
      techStack: ['TypeScript', 'React', 'Node.js', 'AWS', 'Stripe'],
      outcomes: 'Focused on customer understanding, data usage, and continuous improvement',
      githubHref: 'https://github.com/YU-Kawasaki-05/Ardors-website',
    },
    nextPagesHeading: 'Related Pages',
    nextPages: [
      {
        label: 'Services',
        description: 'See support options for development, process improvement, and partnering.',
        href: '/services',
      },
      {
        label: 'Products',
        description: 'Read about marubo and future product directions.',
        href: '/products',
      },
    ],
    cta: {
      heading: 'Start by sharing your situation',
      description:
        'Scope, budget, and process can be adjusted based on the project. A first conversation is enough to begin.',
      primaryCTA: 'Contact',
      secondaryCTA: 'View Works',
    },
  },
  services: {
    eyebrow: 'Services',
    title: 'Services',
    description:
      'Flexible support for client development, business process improvement, SaaS / MVP development, payment setup consultation, and technical partnering. Pricing is intentionally not fixed on the site; the right scope is discussed after understanding the situation.',
    nextPagesHeading: 'Related Pages',
    nextPages: [
      { label: 'Works', description: 'Browse projects and activities.', href: '/works' },
      {
        label: 'Profile',
        description: 'See background, working style, and skills.',
        href: '/profile',
      },
    ],
    cta: {
      heading: 'Not sure what kind of support fits?',
      description:
        'From a one-off discussion to ongoing implementation support, we can define a realistic path based on your context.',
      primaryCTA: 'Contact',
      secondaryCTA: 'View Works',
    },
    items: serviceItems,
  },
  profile: {
    eyebrow: 'Profile',
    skillsHeading: 'Skills',
    careerHeading: 'Career',
    linksHeading: 'External Links',
    cta: {
      heading: 'Let’s build toward business value',
      description:
        'If you want to discuss client development, process improvement, or product building, feel free to reach out.',
      primaryCTA: 'Contact',
      secondaryCTA: 'View Works',
    },
    data: profileData,
  },
  works: {
    eyebrow: 'Works',
    title: 'Works',
    description:
      'A mix of public product work and anonymized support cases. Each case is organized around the problem, approach, and result rather than only headline numbers.',
    detailLink: 'View Details',
    countLabel: 'items',
    empty: 'No case studies match the selected filter.',
    filter: {
      ariaLabel: 'Outcome filter',
      all: 'All',
    },
    detail: {
      backToList: 'Back to Works',
      problem: 'Problem',
      solution: 'Approach',
      result: 'Result',
      nextHeading: 'Read Next',
      cta: {
        heading: 'Facing a similar challenge?',
        description:
          'Share your current context and we can organize the next practical step together.',
        primaryCTA: 'Contact',
        secondaryCTA: 'Back to Works',
      },
    },
    cta: {
      heading: 'Facing a similar challenge?',
      description: 'If one of these cases looks close to your situation, feel free to reach out.',
      primaryCTA: 'Contact',
      secondaryCTA: 'View Services',
    },
  },
  products: {
    eyebrow: 'Products',
    philosophyHeading: 'Product Philosophy',
    productsHeading: 'Published / In-Progress Products',
    plannedHeading: 'In Planning',
    highlightsLabel: 'Main Features / Value',
    techStackLabel: 'Tech / Integrations',
    cta: {
      heading: 'Discuss products or product development',
      description:
        'Reach out if you want to discuss marubo usage, product development, or MVP planning.',
      primaryCTA: 'Discuss usage',
      secondaryCTA: 'View Works',
    },
    data: productsData,
  },
  contact: {
    title: 'Contact',
    intro: 'Consultation-only inquiries are welcome. We usually reply within two business days.',
    fields: {
      name: 'Name',
      email: 'Email',
      category: 'Inquiry Type',
      body: 'Message',
    },
    required: 'Required',
    placeholders: {
      name: 'John Doe',
      email: 'john@example.com',
      body: 'Tell us about your project (up to 3000 characters).',
      category: 'Select an option',
    },
    categories: contactCategoryLabels,
    privacyLead: 'Your submission is handled under our',
    privacyLink: 'Privacy Policy',
    privacyTail: '.',
    submit: 'Send Message',
    submitting: 'Sending...',
    errors: {
      rateLimit: 'Rate limit exceeded. Please wait a moment and try again.',
      generic: 'An error occurred while sending. Please try again later.',
      network: 'A network error occurred. Please check your connection.',
    },
  },
  contactComplete: {
    title: 'Thank You for Your Inquiry',
    description: 'We will review your message and reply within two business days.',
    nextHeading: 'Recommended Next Pages',
    nextLinks: [
      { label: 'Home', href: '/' },
      { label: 'View Works', href: '/works' },
      { label: 'View Products', href: '/products' },
    ],
  },
  notFound: {
    title: 'Page Not Found',
    description:
      'The page may have been moved or removed. Please check the URL or continue from the links below.',
    backToTop: 'Back to Home',
    quickLinksHeading: 'Popular Pages',
    quickLinksAria: 'Quick links',
    quickLinks: [
      { label: 'Services', href: '/services' },
      { label: 'Works', href: '/works' },
      { label: 'Profile', href: '/profile' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  legal: {
    privacy: privacyDoc,
    terms: termsDoc,
    tokushoho: tokushohoDoc,
  },
}
