/** @file English messages and localized page content sources (BR-21). */
import type { LegalDoc } from '@/data/legal/privacy'
import type { ProfileData } from '@/data/profile'
import type { SaasData } from '@/data/saas'
import type { ServiceItem } from '@/data/services'
import type { Category } from '@/lib/schemas/contact'
import type { WorkDetail } from '@/types/works'

import type { Messages } from './ja'

const contactCategoryLabels: Record<Category, string> = {
  相談: 'Consultation',
  協業: 'Collaboration',
  その他: 'Other',
}

const profileData: ProfileData = {
  name: 'Yuu Kawasaki',
  nameEn: 'Yuu Kawasaki',
  title: 'Freelance Web Engineer / UI Designer',
  bio: 'A freelance builder who works end-to-end from architecture to implementation. I help teams solve business problems through practical design and engineering decisions.',
  skills: [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML / CSS'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'PostgreSQL', 'Prisma', 'REST API'],
    },
    {
      category: 'Design',
      items: ['Figma', 'UI Design', 'Wireframing', 'Prototyping'],
    },
    {
      category: 'Infra / Tooling',
      items: ['Vercel', 'AWS', 'Docker', 'GitHub Actions'],
    },
  ],
  career: [
    {
      period: '2024 – Present',
      role: 'Freelance Web Engineer / Designer',
      organization: 'Ardors (Sole Proprietorship)',
      description:
        'Providing web development, UI design, and technical consulting for startups and SMBs.',
    },
    {
      period: '2020 – 2024',
      role: 'Web Engineer',
      organization: 'fouryou',
      description:
        'Delivered frontend architecture and implementation, covering planning, development, and iterative improvements.',
    },
  ],
  githubHref: 'https://github.com/YU-Kawasaki-05',
  noteHref: 'https://note.com/ardors',
}

const serviceItems: ServiceItem[] = [
  {
    id: 'web-development',
    name: 'Web Development',
    tagline: 'Websites and apps built with Next.js and TypeScript',
    description:
      'From marketing sites to authenticated web apps, I design and build production-ready systems with performance, accessibility, and maintainability as defaults.',
    deliverables: [
      'Frontend architecture and implementation (Next.js / React)',
      'API design and backend integration',
      'Responsive implementation and performance tuning',
      'Deployment and CI/CD setup on Vercel / AWS',
    ],
    priceNote: 'From JPY 500,000 (depends on scope and complexity)',
    ctaLabel: 'Discuss Web Development',
    ctaHref: '/contact',
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX Design',
    tagline: 'Design, prototyping, and implementation driven by Figma',
    description:
      'I design information structure, wireframes, and interface systems around user goals. Design intent stays intact because implementation is handled in the same workflow.',
    deliverables: [
      'Information architecture and wireframe design',
      'Visual and component design in Figma',
      'Interactive prototypes',
      'Design system and style guide setup',
    ],
    priceNote: 'From JPY 200,000 (depends on deliverable scope)',
    ctaLabel: 'Discuss UI/UX Design',
    ctaHref: '/contact',
  },
  {
    id: 'tech-consulting',
    name: 'Technical Consulting',
    tagline: 'Technology choices, architecture review, and process improvement',
    description:
      'I support high-impact technical decisions, from architecture and code quality to CI/CD practices and team enablement.',
    deliverables: [
      'Architecture and technology selection review',
      'Code review and quality criteria definition',
      'Development workflow and CI/CD optimization',
      'Technical workshops and documentation support',
    ],
    priceNote: 'Spot support from JPY 30,000 / Monthly advisory from JPY 100,000',
    ctaLabel: 'Discuss Consulting',
    ctaHref: '/contact',
  },
  {
    id: 'saas-development',
    name: 'SaaS Product Support',
    tagline: 'From product planning to MVP delivery',
    description:
      'I support SaaS launches end-to-end, including planning, implementation, and deployment foundations.',
    deliverables: [
      'Product requirement definition and planning support',
      'MVP implementation across frontend and backend',
      'Authentication and multitenancy architecture',
      'Post-release operations and iterative improvements',
    ],
    priceNote: 'Custom quote based on scope and schedule',
    ctaLabel: 'Discuss SaaS Development',
    ctaHref: '/contact',
  },
]

const saasData: SaasData = {
  name: 'Ardors Flow',
  tagline: 'A timeboxing-first project management tool for freelancers',
  description:
    'Ardors Flow helps freelancers with multiple projects decide what to work on today with less friction. It combines timeboxing and cold-start planning to support execution from planning to review.',
  status: {
    label: 'In Development',
    intent: 'wip',
    note: 'A prototype is currently in progress. Early access registration is open.',
  },
  features: [
    {
      title: 'Timebox Planning',
      description:
        'Split your day into focused blocks and visualize commitment per project, so deep work survives interruptions.',
    },
    {
      title: 'Cold-Start Workflow',
      description:
        'Generate kickoff templates for new projects to reduce uncertainty about first actions.',
    },
    {
      title: 'Project Progress Dashboard',
      description:
        'Track progress, time usage, and next actions across multiple projects in one screen.',
    },
    {
      title: 'Weekly Review & Planning',
      description:
        'Run weekly reflection and planning as one workflow to keep improvement cycles consistent.',
    },
  ],
  targetUsers: [
    {
      persona: 'Freelance engineers and designers',
      description:
        'People juggling three or more projects who lose time deciding priorities every day.',
    },
    {
      persona: 'Directors in small production teams',
      description:
        'Teams that want simpler scheduling and assignment flow without enterprise-weight tooling.',
    },
    {
      persona: 'Solo business owners',
      description: 'People who need a lightweight project system instead of a complex PM suite.',
    },
  ],
  ctaHref: '/contact',
}

const worksData: WorkDetail[] = [
  {
    slug: 'corporate-site-renewal',
    title: 'Corporate Website Renewal',
    category: 'Web Development',
    summary:
      'Rebuilt an aging corporate site with Next.js and improved both performance and conversion rate.',
    outcomes: ['Conversion Improvement', 'Performance Improvement'],
    publishedAt: '2024-09',
    published: true,
    problem:
      'A WordPress site built years ago had become slow and difficult to maintain. Poor mobile experience was also reducing conversion over time.',
    solution:
      'Rebuilt the entire site using Next.js and Tailwind CSS. Applied SSG-first rendering, image optimization, and code splitting, and moved content editing to a headless CMS workflow.',
    result:
      'Improved LCP from 5.2s to 1.4s and raised conversion from 1.2% to 2.1% within two months after release.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Headless CMS'],
    nextWorks: ['ec-ux-improvement', 'internal-ops-system'],
  },
  {
    slug: 'ec-ux-improvement',
    title: 'E-commerce UX Improvement',
    category: 'UI/UX Design',
    summary:
      'Simplified checkout and refreshed key UI flows to improve purchase completion and reduce bounce.',
    outcomes: ['Purchase Rate Improvement', 'Bounce Rate Reduction'],
    publishedAt: '2024-06',
    published: true,
    problem:
      'Mobile users were dropping during checkout. Interviews and behavior analysis pointed to unnecessary friction in the purchase flow.',
    solution:
      'Reduced the checkout flow from five steps to three, then redesigned mobile-first UI and delivered implementation in collaboration with engineering.',
    result:
      'Purchase completion improved from 2.3% to 3.8%, and mobile bounce rate decreased from 68% to 45%.',
    techStack: ['Figma', 'React', 'Tailwind CSS'],
    nextWorks: ['corporate-site-renewal', 'saas-mvp'],
  },
  {
    slug: 'internal-ops-system',
    title: 'Internal Operations System Development',
    category: 'Web Development',
    summary:
      'Replaced spreadsheet-driven operations with a dedicated internal system from frontend to database design.',
    outcomes: ['Operational Efficiency', 'Error Reduction'],
    publishedAt: '2024-03',
    published: true,
    problem:
      'A 30-person production team relied on spreadsheets and ad-hoc communication, which reduced visibility and caused frequent rework.',
    solution:
      'Built a dedicated operations app with project, member, and progress management. Implemented with Next.js, PostgreSQL, and Prisma, plus notification and role-based access control.',
    result:
      'Weekly progress-management effort dropped from about three hours to one, and human-error-related rework decreased by over 90%.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Vercel'],
    nextWorks: ['saas-mvp', 'corporate-site-renewal'],
  },
  {
    slug: 'saas-mvp',
    title: 'SaaS MVP Delivery Support',
    category: 'SaaS Development',
    summary:
      'Supported a startup team from scope definition to release and delivered an MVP in three months.',
    outcomes: ['MVP Launch', 'Early User Acquisition'],
    publishedAt: '2023-12',
    published: true,
    problem:
      'The team needed to validate the market quickly without an in-house engineering setup, and MVP scope had to be defined carefully.',
    solution:
      'Narrowed requirements to five critical user flows, then ran weekly demos and feedback loops while handling implementation and infrastructure.',
    result:
      'Released within three months, acquired 100 active users in the first month, and recorded a 60% retention rate.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'AWS'],
    nextWorks: ['internal-ops-system', 'ec-ux-improvement'],
  },
  {
    slug: 'tech-consulting-nda',
    title: 'Technical Consulting (NDA)',
    category: 'Technical Consulting',
    summary: 'Confidential project under NDA.',
    outcomes: ['Process Improvement'],
    publishedAt: '2023-09',
    published: false,
    problem: 'NDA',
    solution: 'NDA',
    result: 'NDA',
    techStack: [],
    nextWorks: [],
  },
]

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
    { heading: 'Business Name', body: 'Ardors (Sole Proprietorship)' },
    { heading: 'Representative', body: 'Yuu Kawasaki' },
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
      body: 'Please refer to each service page for indicative pricing. Formal quotations are provided individually.',
    },
    {
      heading: 'Payment Method',
      body: 'Bank transfer (invoice-based). Detailed terms are provided at contract signing.',
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
    outcomes: 'Outcomes',
    github: 'GitHub',
  },
  home: {
    hero: {
      target: 'Freelance Delivery / Technical Consulting',
      title: 'Design and engineering,\nworking together for business growth.',
      description:
        'From planning to implementation and iteration, Ardors supports product and website execution end to end.',
      primaryCTA: 'Talk to Us',
      secondaryCTA: 'View Works',
    },
    entryBranches: [
      {
        label: 'Need Consultation',
        description: 'Share your challenge and we will define practical next steps together.',
        href: '/contact',
      },
      {
        label: 'View Case Studies',
        description: 'Review projects organized by problem, solution, and measurable outcomes.',
        href: '/works',
      },
      {
        label: 'See the Profile',
        description: 'Check background, strengths, and technical focus areas.',
        href: '/profile',
      },
    ],
    trust: {
      domains: ['Web Development', 'UI/UX Design', 'Technical Consulting'],
      techStack: ['Next.js', 'TypeScript', 'React', 'Figma'],
      outcomes: '12 delivered projects / 80% retention',
      githubHref: 'https://github.com/YU-Kawasaki-05',
    },
    nextPagesHeading: 'Related Pages',
    nextPages: [
      {
        label: 'Services',
        description: 'See delivery scope, workflows, and support options.',
        href: '/services',
      },
      {
        label: 'SaaS Vision',
        description: 'Read the product concept and current progress.',
        href: '/saas',
      },
    ],
    cta: {
      heading: 'Let’s start with a quick discussion',
      description: 'Consultation and estimates are free. Feel free to reach out with any question.',
      primaryCTA: 'Talk to Us',
      secondaryCTA: 'View Works',
    },
  },
  services: {
    eyebrow: 'Services',
    title: 'What We Offer',
    description:
      'A practical combination of web development, design, and technical consulting. Support ranges from focused engagements to ongoing collaboration.',
    nextPagesHeading: 'Related Pages',
    nextPages: [
      { label: 'Case Studies', description: 'Browse past projects and outcomes.', href: '/works' },
      {
        label: 'Profile',
        description: 'See background, skills, and working style.',
        href: '/profile',
      },
    ],
    cta: {
      heading: 'Not sure which service fits your needs?',
      description: 'After understanding your context, we will propose the most effective approach.',
      primaryCTA: 'Talk to Us',
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
      heading: 'Let’s work together',
      description: 'If the portfolio matches your needs, feel free to get in touch.',
      primaryCTA: 'Talk to Us',
      secondaryCTA: 'View Works',
    },
    data: profileData,
  },
  works: {
    eyebrow: 'Works',
    title: 'Case Studies',
    description: 'Explore completed projects and filter by outcome tags to find relevant examples.',
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
        description: 'Share your current context and we will suggest the next practical steps.',
        primaryCTA: 'Talk to Us',
        secondaryCTA: 'Back to Works',
      },
    },
    cta: {
      heading: 'Facing a similar challenge?',
      description: 'If one of these projects looks close to your case, feel free to reach out.',
      primaryCTA: 'Talk to Us',
      secondaryCTA: 'View Services',
    },
    items: worksData,
  },
  saas: {
    eyebrow: 'SaaS',
    featuresHeading: 'Core Features',
    targetUsersHeading: 'Who It Is For',
    cta: {
      heading: 'Interested in joining early?',
      description:
        'We welcome early access requests and product feedback while the prototype is evolving.',
      primaryCTA: 'Contact / Join Waitlist',
      secondaryCTA: 'View Services',
    },
    data: saasData,
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
      { label: 'Case Studies', href: '/works' },
      { label: 'SaaS Vision', href: '/saas' },
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
      { label: 'Case Studies', href: '/works' },
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
