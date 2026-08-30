/**
 * Single source of truth for all site copy.
 * Text is reproduced VERBATIM from the client's content document.
 * Do not rewrite, shorten, or invent copy here.
 */

export const company = {
  name: 'ULTA CX LTD',
  shortName: 'ULTA CX',
  tagline: 'Customer Experience Solutions',
  promise: 'Delivering Better Customer Experiences',
  copyright: '© 2026 ULTA CX Ltd. All Rights Reserved.',
}

export const hero = {
  eyebrow: 'Customer Experience Solutions',
  title: 'Delivering Better Customer Experiences',
  subtitle:
    'Reliable, scalable, and people-focused customer experience solutions designed to help businesses deliver exceptional service, strengthen customer relationships, and operate more efficiently.',
  primaryCta: 'Talk to Our Team',
  secondaryCta: 'Explore Our Services',
}

export const home = {
  heading: 'Exceptional Customer Experiences. Delivered.',
  paragraphs: [
    'At ULTA CX Ltd, we help businesses create stronger connections with their customers through professional, responsive, and scalable customer experience solutions.',
    'From our operations in Rwanda, we provide outsourced customer support and business process services designed for companies seeking a reliable international delivery partner.',
    'Whether you need a dedicated customer service team, overflow support, after-hours coverage, or assistance scaling your existing operations, ULTA CX provides flexible solutions tailored to your business.',
  ],
  whyHeading: 'Why ULTA CX?',
  closingLine: 'Your Brand. Our Team. One Customer Experience.',
  why: [
    {
      icon: 'Headset',
      title: 'Professional Customer Support',
      body: 'Trained representatives focused on delivering courteous, consistent, and customer-centered service.',
    },
    {
      icon: 'TrendingUp',
      title: 'Scalable Solutions',
      body: 'Flexible staffing models that allow your customer support operations to grow with your business.',
    },
    {
      icon: 'PiggyBank',
      title: 'Cost-Efficient Outsourcing',
      body: 'Access high-quality customer experience services while maintaining greater control over operating costs.',
    },
    {
      icon: 'Globe2',
      title: 'International Service Delivery',
      body: 'Strategically positioned to support businesses across different markets and time zones.',
    },
    {
      icon: 'BadgeCheck',
      title: 'Quality Focused',
      body: 'Structured quality assurance, performance monitoring, training, and continuous improvement.',
    },
  ],
}

export const about = {
  eyebrow: 'About Us',
  heading: 'Who We Are',
  paragraphs: [
    'ULTA CX Ltd is a customer experience and business process outsourcing company established to help organizations efficiently manage customer interactions while maintaining the quality and professionalism their customers expect.',
    'We recognize that every interaction between a company and its customers contributes to the reputation of that brand.',
    'Our role is simple: represent your business as professionally as you would.',
    'Through trained customer service professionals, technology-enabled operations, quality monitoring, and structured service delivery, we provide businesses with dependable outsourced customer experience solutions.',
  ],
  mission: {
    title: 'Our Mission',
    body: 'To deliver reliable, professional, and scalable customer experience solutions that enable our clients to strengthen customer relationships while improving operational efficiency.',
  },
  vision: {
    title: 'Our Vision',
    body: 'To become a trusted African customer experience and business process outsourcing partner serving businesses across the United States and international markets.',
  },
  valuesHeading: 'Our Core Values',
  values: [
    { icon: 'Sparkles', title: 'Service Excellence', body: 'Every customer interaction matters.' },
    { icon: 'ShieldCheck', title: 'Integrity', body: 'We operate transparently, responsibly, and professionally.' },
    { icon: 'Users', title: 'People', body: 'We invest in talented people who represent our clients with confidence.' },
    { icon: 'Gem', title: 'Quality', body: 'We continuously monitor and improve service delivery.' },
    { icon: 'Handshake', title: 'Partnership', body: 'We operate as an extension of our clients’ businesses.' },
    { icon: 'Lightbulb', title: 'Innovation', body: 'We embrace technology and better ways of serving customers.' },
  ],
}

export const services = {
  eyebrow: 'Our Services',
  heading: 'Customer experience services, built around your operation',
  items: [
    {
      id: 'inbound',
      icon: 'PhoneIncoming',
      title: 'Inbound Customer Support',
      intro:
        'Professional inbound customer service designed to manage customer inquiries efficiently and courteously.',
      listLabel: 'Services may include:',
      items: [
        'General customer inquiries',
        'Product and service information',
        'Order assistance',
        'Account-related support',
        'Customer requests for assistance',
        'Complaint handling and escalation',
        'Appointment scheduling',
        'Customer retention support',
      ],
      image:
        'https://images.unsplash.com/photo-1766066014237-00645c74e9c6?auto=format&fit=crop&w=1400&q=80',
      alt: 'Customer support representative wearing a headset assisting a customer at her workstation',
    },
    {
      id: 'outbound',
      icon: 'PhoneOutgoing',
      title: 'Outbound Customer Engagement',
      intro: 'Our outbound services help businesses proactively connect with customers and prospects.',
      listLabel: 'Services may include:',
      items: [
        'Customer follow-up',
        'Lead qualification',
        'Appointment setting',
        'Customer satisfaction calls',
        'Market research',
        'Customer surveys',
        'Product and service outreach',
        'Sales support',
      ],
      image:
        'https://images.unsplash.com/photo-1712159018726-4564d92f3ec2?auto=format&fit=crop&w=1400&q=80',
      alt: 'Customer engagement representative wearing a headset making an outbound call',
    },
    {
      id: 'email-chat',
      icon: 'MessagesSquare',
      title: 'Email & Chat Support',
      intro: 'Give customers the flexibility to communicate through the channels they prefer.',
      listLabel: 'ULTA CX representatives can support:',
      items: [
        'Customer emails',
        'Website live chat',
        'Customer inquiries',
        'Order inquiries',
        'Service requests',
        'Complaint resolution',
        'Ticket management and escalation',
      ],
      image:
        'https://images.unsplash.com/photo-1714079761488-e0c9b9ac4138?auto=format&fit=crop&w=1400&q=80',
      alt: 'Support agent wearing a headset responding to customer emails and live chat on a laptop',
    },
    {
      id: 'back-office',
      icon: 'FolderKanban',
      title: 'Back-Office Support',
      intro:
        'Allow your internal teams to concentrate on core business priorities while ULTA CX supports routine operational processes.',
      listLabel: 'Services may include:',
      items: [
        'Data entry',
        'CRM administration',
        'Order processing',
        'Document processing',
        'Customer record maintenance',
        'Administrative support',
        'Reporting',
        'Case and ticket management',
      ],
      image:
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80',
      alt: 'Back-office support team processing customer records and administrative work at their desks',
    },
    {
      id: 'after-hours',
      icon: 'Clock4',
      title: 'After-Hours & Overflow Support',
      intro: 'Customer demand does not always follow regular business hours.',
      introSecondary:
        'ULTA CX can provide supplemental support when your internal customer service team is unavailable or experiencing unusually high call volumes.',
      listLabel: 'Solutions can include:',
      items: [
        'After-Hours Support',
        'Weekend Support',
        'Overflow Calls',
        'Seasonal Support',
        'Dedicated Teams',
      ],
      image:
        'https://images.unsplash.com/photo-1560264357-8d9202250f21?auto=format&fit=crop&w=1400&q=80',
      alt: 'Customer experience representatives staffing an extended-hours shift on the support floor',
    },
  ],
}

export const industries = {
  eyebrow: 'Industries We Support',
  heading: 'Flexible Solutions Across Industries',
  intro:
    'Our customer experience model can be adapted to businesses across multiple industries, including:',
  items: [
    {
      icon: 'ShoppingBag',
      title: 'E-Commerce & Retail',
      body: 'Order support, returns, product inquiries and customer care.',
    },
    {
      icon: 'MonitorSmartphone',
      title: 'Technology & SaaS',
      body: 'Customer onboarding, general product support and ticket management.',
    },
    {
      icon: 'Truck',
      title: 'Transportation & Logistics',
      body: 'Customer inquiries, scheduling, delivery updates and administrative support.',
    },
    {
      icon: 'Building2',
      title: 'Property Management & Real Estate',
      body: 'Tenant inquiries, appointment scheduling, maintenance request intake and administrative support.',
    },
    {
      icon: 'Wrench',
      title: 'Home & Professional Services',
      body: 'Call answering, appointment scheduling, lead qualification and customer follow-up.',
    },
    {
      icon: 'Plane',
      title: 'Travel & Hospitality',
      body: 'Reservation assistance, customer inquiries and guest support.',
    },
    {
      icon: 'HeartPulse',
      title: 'Healthcare Administration',
      body: 'Appointment scheduling and non-clinical administrative customer support, subject to applicable regulatory and contractual requirements.',
    },
    {
      icon: 'Landmark',
      title: 'Financial & Professional Services',
      body: 'Administrative and customer support services subject to applicable compliance and information-security requirements.',
    },
  ],
}

export const whyRwanda = {
  eyebrow: 'Why Rwanda?',
  heading: 'A Strategic African Customer Experience Hub',
  paragraphs: [
    'Rwanda provides an emerging environment for technology-enabled services and international business operations.',
    'ULTA CX combines Rwanda’s growing professional workforce with structured customer experience operations to provide international businesses with an alternative outsourcing destination.',
  ],
  advantageHeading: 'The ULTA CX Advantage',
  // TODO: sourced from Unsplash's Kigali collection. Confirm the location before
  // launch, or replace with a photograph of ULTA CX's own Kigali operation.
  image:
    'https://images.unsplash.com/photo-1687986261123-b17f08f2796c?auto=format&fit=crop&w=1400&q=80',
  imageAlt: 'City skyline at dusk in Kigali, Rwanda',
  advantages: [
    {
      icon: 'GraduationCap',
      title: 'Skilled Talent',
      body: 'Access to educated and trainable customer service professionals.',
    },
    {
      icon: 'Languages',
      title: 'English-Language Service',
      body: 'Customer support capabilities suitable for international markets.',
    },
    {
      icon: 'Scale',
      title: 'Competitive Operating Model',
      body: 'An outsourcing environment that can provide businesses with attractive operational efficiencies.',
    },
    {
      icon: 'Clock',
      title: 'Time-Zone Flexibility',
      body: 'A delivery model capable of supporting extended-hour and international customer service operations.',
    },
    {
      icon: 'Cpu',
      title: 'Technology-Enabled Operations',
      body: 'Modern communication and customer-management technologies supporting efficient service delivery.',
    },
  ],
}

export const howItWorks = {
  eyebrow: 'How It Works',
  heading: 'Outsourcing Made Simple',
  steps: [
    {
      number: '01',
      icon: 'Search',
      title: 'Understand',
      body: 'We learn about your business, customers, processes, service expectations, and objectives.',
    },
    {
      number: '02',
      icon: 'PencilRuler',
      title: 'Design',
      body: 'We develop a customer support model tailored to your required channels, staffing levels, operating hours, workflows, and performance expectations.',
    },
    {
      number: '03',
      icon: 'GraduationCap',
      title: 'Train',
      body: 'Your dedicated representatives are trained on your products, services, systems, policies, and customer experience standards.',
    },
    {
      number: '04',
      icon: 'Rocket',
      title: 'Launch',
      body: 'Your ULTA CX team begins supporting your customers under an agreed implementation and service framework.',
    },
    {
      number: '05',
      icon: 'LineChart',
      title: 'Measure & Improve',
      body: 'Performance is monitored using agreed service levels and key performance indicators.',
    },
  ],
  metricsLabel: 'Potential measurements include:',
  metrics: [
    'CSAT',
    'First Contact Resolution',
    'Average Handle Time',
    'Response Time',
    'Quality Scores',
    'SLA Performance',
  ],
}

export const deliveryModels = {
  eyebrow: 'Our Delivery Models',
  heading: 'Flexible Engagement Options',
  items: [
    {
      icon: 'UsersRound',
      title: 'Dedicated Team',
      body: 'A dedicated group of representatives trained specifically to support your organization.',
    },
    {
      icon: 'Share2',
      title: 'Shared Support',
      body: 'A flexible model suitable for businesses with lower or fluctuating customer interaction volumes.',
    },
    {
      icon: 'Waves',
      title: 'Overflow Support',
      body: 'Additional representatives supplement your existing customer service operation during periods of increased demand.',
    },
    {
      icon: 'CalendarRange',
      title: 'Project-Based Support',
      body: 'Temporary customer service resources for product launches, campaigns, seasonal demand, or specific business initiatives.',
    },
  ],
}

export const qualitySecurity = {
  eyebrow: 'Quality & Security',
  heading: 'Protecting Your Customers and Your Brand',
  intro: 'ULTA CX understands that outsourcing requires trust.',
  body: 'Our operating framework is designed around controlled access, employee training, quality monitoring, confidentiality, data protection, and continuous performance improvement.',
  listLabel: 'Our approach includes:',
  items: [
    { icon: 'FileLock2', label: 'Employee confidentiality requirements' },
    { icon: 'KeyRound', label: 'Role-based access principles' },
    { icon: 'ClipboardCheck', label: 'Quality assurance monitoring' },
    { icon: 'GraduationCap', label: 'Customer service training' },
    { icon: 'Gauge', label: 'Performance management' },
    { icon: 'TriangleAlert', label: 'Incident escalation procedures' },
    { icon: 'RefreshCw', label: 'Business continuity planning' },
    { icon: 'ServerCog', label: 'Secure technology practices' },
    { icon: 'FileCog', label: 'Client-specific operating procedures' },
  ],
  footnote:
    'Where specialized regulatory requirements apply, we work with clients to determine the appropriate contractual, operational, security, and compliance requirements before service implementation.',
}

export const partner = {
  eyebrow: 'Partner With ULTA CX',
  heading: 'Your Customers Deserve Exceptional Support.',
  paragraphs: [
    'Your customer service operation should strengthen your brand—not become an operational burden.',
    'Whether you need 5 representatives or a larger dedicated customer experience team, ULTA CX can develop a solution aligned with your business requirements.',
  ],
  closing: 'Let’s Build Your Customer Experience Team.',
  ctas: ['Request a Consultation', 'Request a Proposal', 'Become a Partner'],
}

export const contact = {
  eyebrow: 'Contact Us',
  heading: 'Let’s Talk',
  intro: 'Looking for a reliable customer experience outsourcing partner?',
  body: 'Tell us about your customer support requirements and our team will contact you to discuss an appropriate solution.',
  formTitle: 'Contact Form',
  submitLabel: 'Submit Request',
  // Field labels are verbatim from the client's content document.
  // Required fields are the four the client confirmed in chat; the rest
  // qualify the lead but must never block a submission.
  fields: {
    fullName: 'Full Name',
    company: 'Company',
    email: 'Business Email',
    phone: 'Phone Number',
    country: 'Country',
    representatives: 'Number of Customer Service Representatives Required',
    servicesNeeded: 'Services Needed',
    message: 'Tell Us About Your Requirements',
  },
  required: ['fullName', 'email', 'phone', 'message'],
  serviceOptions: [
    'Inbound Customer Support',
    'Outbound Customer Engagement',
    'Email & Chat Support',
    'Back-Office Support',
    'After-Hours Support',
    'Dedicated Customer Service Team',
    'Other',
  ],
}

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Why Rwanda', href: '#why-rwanda' },
  { label: 'Quality & Security', href: '#quality-security' },
  { label: 'Partner With Us', href: '#partner' },
  { label: 'Contact', href: '#contact' },
]

export const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Use', href: '/terms-of-use' },
  { label: 'Data Protection', href: '/data-protection' },
]
