/**
 * Single source of truth for site-wide content: identity, navigation,
 * the service catalogue, industries and contact details. Pages and JSON-LD
 * builders read from here so metadata and copy never drift apart.
 */

export const SITE = {
  name: "Tasama Management Consultancy",
  shortName: "Tasama",
  blogName: "Tasama Insights",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "GCC advisory for businesses built to scale.",
  description:
    "Tasama Management Consultancy is a GCC advisory firm combining tax, finance, compliance, strategy, business setup and management consulting across the UAE and wider region.",
  locale: "en_AE",
  foundingLocation: "Dubai, United Arab Emirates",
  areaServed: ["United Arab Emirates", "GCC", "India"],
  phone: "+971505698473",
  phoneDisplay: "+971 50 569 8473",
  whatsapp: "https://wa.me/971505698473",
  email: "info@tasamaconsultancy.com",
  address: {
    street: "IFZA Business Park, Dubai Silicon Oasis",
    locality: "Dubai",
    region: "Dubai",
    country: "AE",
  },
  sameAs: ["https://www.linkedin.com/company/tasama-management-consultancy"],
} as const;

export type NavItem = { label: string; href: string };

export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Business Setup", href: "/business-setup" },
  { label: "Ledger.ae", href: "/ledger-ae" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export type SubService = { name: string; description: string };

export type ServiceCategory = {
  slug: string;
  index: string;
  name: string;
  navLabel: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  /** Short extractable answers for GEO / featured snippets. */
  keyTakeaways: string[];
  subServices: SubService[];
  faqs: { question: string; answer: string }[];
};

export const SERVICES: ServiceCategory[] = [
  {
    slug: "corporate-tax",
    index: "01",
    name: "Corporate Tax",
    navLabel: "Corporate Tax",
    eyebrow: "Corporate Tax",
    tagline: "UAE Corporate Tax, from registration to a return you can defend.",
    summary:
      "Corporate Tax impact assessment, Federal Tax Authority registration, return-preparation readiness, free zone qualifying-income review and deductibility analysis for UAE mainland and free zone entities under the 9% regime.",
    keyTakeaways: [
      "UAE Corporate Tax is charged at 9% on taxable profit above AED 375,000; profit below that is taxed at 0%.",
      "Registration with the Federal Tax Authority is mandatory for virtually all businesses, regardless of profit.",
      "A Qualifying Free Zone Person can access a 0% rate on qualifying income, but only with adequate substance and by staying within the de-minimis limits.",
      "Small Business Relief can remove the tax charge for businesses under AED 3m in revenue for tax periods up to end-2026.",
    ],
    subServices: [
      {
        name: "Corporate Tax Impact Assessment",
        description:
          "A structured review of how the law applies to your entity, group and transactions, with the exposures and decisions named.",
      },
      {
        name: "FTA Registration (EmaraTax)",
        description:
          "End-to-end registration, EmaraTax account setup and confirmation of your registration status and deadline.",
      },
      {
        name: "Return Preparation Readiness",
        description:
          "Getting the trial balance, adjustments and supporting schedules into a state where the first return can be filed with confidence.",
      },
      {
        name: "Free Zone Qualifying Income Review",
        description:
          "Assessment of whether free zone income qualifies for 0%, including substance, de-minimis and excluded-activity testing.",
      },
      {
        name: "Deductibility & Documentation Review",
        description:
          "Review of interest, entertainment, related-party and other sensitive costs, and the documentation needed to support them.",
      },
    ],
    faqs: [
      {
        question: "Does my business need to register for UAE Corporate Tax?",
        answer:
          "Almost all UAE businesses and commercial licence holders must register for Corporate Tax with the Federal Tax Authority, even where taxable profit is below the AED 375,000 threshold at which the 9% rate begins. Registration deadlines depend on your licence issue date.",
      },
      {
        question: "What is the 9% rate applied to?",
        answer:
          "It applies to taxable income — accounting profit adjusted for specific add-backs and reliefs under the Corporate Tax law — above AED 375,000. The first AED 375,000 of taxable income is taxed at 0%.",
      },
      {
        question: "Do free zone companies pay Corporate Tax?",
        answer:
          "Free zone companies are within the Corporate Tax system and must register and file. A Qualifying Free Zone Person can apply 0% to qualifying income, but non-qualifying income is taxed at 9% and failing the conditions removes the 0% benefit entirely.",
      },
    ],
  },
  {
    slug: "vat-services",
    index: "02",
    name: "VAT Services",
    navLabel: "VAT",
    eyebrow: "VAT Services",
    tagline: "VAT registration, filing and control — without the FTA surprises.",
    summary:
      "VAT registration and deregistration, return preparation and filing, input/output reconciliation, treatment reviews and FTA audit support for UAE businesses and their finance teams.",
    keyTakeaways: [
      "VAT registration is mandatory once taxable supplies and imports exceed AED 375,000 over 12 months; voluntary registration is available from AED 187,500.",
      "The standard VAT rate is 5%; some supplies are zero-rated and others are exempt — and the two are treated very differently.",
      "VAT returns are usually filed quarterly, within 28 days of the period end.",
      "Tax records must be kept for at least five years and reconciled to the filed returns.",
    ],
    subServices: [
      {
        name: "VAT Registration & Deregistration",
        description:
          "Assessment against the thresholds, registration or deregistration with the FTA, and tax group set-up where relevant.",
      },
      {
        name: "Return Preparation & Filing",
        description:
          "Preparation of the periodic VAT return from your ledgers, review of adjustments and on-time submission.",
      },
      {
        name: "Input/Output VAT Reconciliation",
        description:
          "Reconciliation of VAT control accounts to the returns, with recoverability and blocked-input testing.",
      },
      {
        name: "VAT Treatment Review",
        description:
          "Review of how your supplies, exports, real estate and intercompany charges are treated, and where risk sits.",
      },
      {
        name: "FTA Audit Support",
        description:
          "Preparation for and support through FTA reviews, clarifications and voluntary disclosures.",
      },
    ],
    faqs: [
      {
        question: "When must I register for VAT in the UAE?",
        answer:
          "Registration is mandatory once taxable supplies and imports exceed AED 375,000 over the previous 12 months, or are expected to in the next 30 days. Voluntary registration is available once supplies or taxable expenses exceed AED 187,500.",
      },
      {
        question: "How often are VAT returns filed?",
        answer:
          "Most businesses file quarterly, with the return and payment due within 28 days of the end of the tax period. The FTA assigns some larger businesses a monthly period.",
      },
      {
        question: "What is the difference between zero-rated and exempt supplies?",
        answer:
          "Zero-rated supplies are taxable at 0% and you can still recover related input VAT — for example qualifying exports. Exempt supplies carry no VAT and block input recovery on related costs. Misclassifying one as the other is a common and costly error.",
      },
    ],
  },
  {
    slug: "transfer-pricing",
    index: "03",
    name: "Transfer Pricing",
    navLabel: "Transfer Pricing",
    eyebrow: "Transfer Pricing",
    tagline: "Related-party pricing that stands up to disclosure.",
    summary:
      "Related-party transaction mapping, master file and local file preparation, benchmarking coordination, policy design and disclosure-form readiness aligned to the arm's length principle and OECD guidance.",
    keyTakeaways: [
      "Transfer pricing rules apply to transactions with related parties and connected persons, including cross-border intercompany charges, management fees and financing.",
      "All in-scope transactions must meet the arm's length principle — priced as they would be between independent parties.",
      "A master file and local file are required once revenue and transaction-size thresholds are met.",
      "A transfer pricing disclosure form is filed alongside the Corporate Tax return.",
    ],
    subServices: [
      {
        name: "Related-Party Transaction Mapping",
        description:
          "Identification of related parties and connected persons and a register of the intercompany flows in scope.",
      },
      {
        name: "Master File & Local File",
        description:
          "Preparation of OECD-aligned documentation covering the group, the local entity and its controlled transactions.",
      },
      {
        name: "Benchmarking Coordination",
        description:
          "Coordination of comparable searches and economic analysis to support the arm's length position.",
      },
      {
        name: "Transfer Pricing Policy Design",
        description:
          "A practical intercompany pricing policy for goods, services, IP and financing that finance can actually apply.",
      },
      {
        name: "Disclosure Form Readiness",
        description:
          "Preparation of the data needed for the transfer pricing disclosure form filed with the Corporate Tax return.",
      },
    ],
    faqs: [
      {
        question: "What triggers a transfer pricing requirement?",
        answer:
          "Any transaction with a related party or connected person — including cross-border intercompany charges, shareholder or management fees, and intra-group financing — brings the arm's length principle and disclosure obligations into play under the UAE Corporate Tax law.",
      },
      {
        question: "Do I need both a master file and a local file?",
        answer:
          "Full master file and local file documentation is required once the relevant revenue and transaction thresholds are met. Below those levels, businesses still need to price related-party dealings at arm's length and support the position, but the formal file set may not be mandatory.",
      },
      {
        question: "What is the arm's length principle?",
        answer:
          "It requires related parties to price transactions between them as unrelated parties would in comparable circumstances. Where they do not, taxable profit is adjusted to the arm's length outcome.",
      },
    ],
  },
  {
    slug: "finance-advisory",
    index: "04",
    name: "Finance Advisory",
    navLabel: "Finance",
    eyebrow: "Finance Advisory",
    tagline: "Virtual CFO, reporting and forecasting built for decisions.",
    summary:
      "Financial leadership for businesses that need stronger reporting, cash visibility and management insight — a Virtual CFO function, monthly management accounts, budgeting and forecasting, MIS and board-ready dashboards.",
    keyTakeaways: [
      "A Virtual CFO gives founder-led businesses senior finance leadership without a full-time hire.",
      "Reliable monthly management accounts are the foundation for every other financial decision.",
      "Rolling 13-week cash forecasts prevent liquidity surprises during growth.",
      "Board and investor reporting should tie operational KPIs to the P&L and cash position.",
    ],
    subServices: [
      {
        name: "Virtual CFO Services",
        description:
          "A part-time senior finance lead owning reporting cadence, cash management, and the numbers behind strategic decisions.",
      },
      {
        name: "Financial Reporting",
        description:
          "Monthly management accounts, variance analysis and a consistent close process management can rely on.",
      },
      {
        name: "Budgeting & Forecasting",
        description:
          "Annual budgets built bottom-up, rolling forecasts and 13-week cash-flow models tied to operational drivers.",
      },
      {
        name: "MIS Reporting",
        description:
          "Management information packs and KPI dashboards that turn ledger data into decisions.",
      },
      {
        name: "Board & Investor Reporting",
        description:
          "Board packs and investor updates that connect strategy, KPIs, P&L and cash in one narrative.",
      },
    ],
    faqs: [
      {
        question: "What does a Virtual CFO actually do?",
        answer:
          "A Virtual CFO provides senior financial leadership on a fractional basis: owning the reporting calendar, managing cash and working capital, preparing board and investor materials, supporting fundraising or lending, and advising the founder on pricing, margin and investment decisions.",
      },
      {
        question: "How is this different from bookkeeping or an accountant?",
        answer:
          "Bookkeeping records what happened. Finance Advisory interprets it and looks forward — forecasting cash, testing scenarios, and giving management the analysis needed to make decisions.",
      },
    ],
  },
  {
    slug: "management-consulting",
    index: "05",
    name: "Management Consulting",
    navLabel: "Consulting",
    eyebrow: "Management Consulting",
    tagline: "Strategy, feasibility and transformation for serious operators.",
    summary:
      "Business strategy, market entry advisory, feasibility studies and business transformation for companies preparing to scale, enter the UAE or expand across the GCC.",
    keyTakeaways: [
      "Market entry decisions should be grounded in a feasibility study, not a licence-cost comparison.",
      "Free zone vs. mainland is a commercial and tax question, not only a setup question.",
      "Transformation should target the operating model and the numbers behind it, not just the org chart.",
      "GCC expansion multiplies compliance obligations — model them before committing.",
    ],
    subServices: [
      {
        name: "Business Strategy",
        description:
          "Commercial strategy, operating priorities and financial direction for companies preparing to scale.",
      },
      {
        name: "Market Entry Advisory",
        description:
          "Guidance for investors and businesses entering the UAE or wider GCC — structure, licensing, tax and operating-model choices.",
      },
      {
        name: "Feasibility Studies",
        description:
          "Financial, operational and market feasibility for new ventures, branches and expansion decisions, ending in a clear go / no-go.",
      },
      {
        name: "Business Transformation",
        description:
          "Process improvement, finance operating-model redesign and performance-improvement initiatives.",
      },
      {
        name: "Advisory Implementation Support",
        description:
          "Practical execution support after strategy, setup or transformation recommendations are agreed.",
      },
    ],
    faqs: [
      {
        question: "What is in a Tasama feasibility study?",
        answer:
          "Market sizing and demand assessment, a competitor and pricing review, a full financial model with P&L, cash flow and break-even, the regulatory and tax picture, and a clear go / no-go recommendation with the key risks named.",
      },
      {
        question: "How long does a business transformation take?",
        answer:
          "A focused programme runs roughly 12 to 16 weeks from diagnosis to a hardwired operating model. Deeper redesigns that touch legal entities or core systems run two to three quarters.",
      },
    ],
  },
  {
    slug: "company-formation",
    index: "06",
    name: "Company Formation & GCC Expansion",
    navLabel: "Setup",
    eyebrow: "Company Formation & GCC Expansion",
    tagline: "UAE company formation and GCC expansion, structured for tax.",
    summary:
      "Company formation guidance, free zone vs. mainland structuring, business setup coordination, compliance orientation for new UAE entities, and advisory support for regional and India–UAE expansion.",
    keyTakeaways: [
      "Free zones can offer 0% Corporate Tax on qualifying income; mainland gives unrestricted onshore trading.",
      "Visa requirements and where your customers are usually drive the licence and package choice more than headline setup cost.",
      "A new entity still has to register for Corporate Tax, and often VAT, from day one.",
      "GCC expansion multiplies filing and substance obligations across each jurisdiction entered.",
    ],
    subServices: [
      {
        name: "UAE Company Formation",
        description:
          "Guidance and coordination for mainland, free zone and offshore setups, including activity and licence selection.",
      },
      {
        name: "Free Zone vs. Mainland Structuring",
        description:
          "A structured comparison against your actual customers, visa needs and Corporate Tax position before you commit.",
      },
      {
        name: "Business Setup Coordination",
        description:
          "Coordination with authorities, banks and PROs through incorporation, licensing and account opening.",
      },
      {
        name: "Compliance Orientation",
        description:
          "A first-90-days briefing on Corporate Tax, VAT, ESR, UBO and accounting obligations for the new entity.",
      },
      {
        name: "GCC Expansion Advisory",
        description:
          "Structure, controls and reporting design for businesses assessing entry into other GCC markets.",
      },
      {
        name: "India–UAE Structuring",
        description:
          "Cross-border guidance for Indian entrepreneurs, investors and groups operating into the UAE.",
      },
    ],
    faqs: [
      {
        question: "Should I set up in a free zone or on the mainland?",
        answer:
          "It depends on where your customers are, whether you need to invoice UAE government or mainland entities, your visa needs and your Corporate Tax position. Free zones can offer 0% Corporate Tax on qualifying income; mainland gives unrestricted onshore trading. We model both against your actual business before recommending.",
      },
      {
        question: "How long does UAE company formation take?",
        answer:
          "A straightforward free zone licence can be issued within days once documents are in order. Mainland setups, regulated activities and bank account opening typically take a few weeks.",
      },
      {
        question: "Does a new company have tax obligations immediately?",
        answer:
          "Yes. A new entity must register for Corporate Tax within the deadline tied to its licence date, keep proper accounting records, and register for VAT once it meets the threshold. We set this up as part of the formation.",
      },
    ],
  },
];

export function getService(slug: string): ServiceCategory | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export type Industry = { index: string; name: string; description: string };

export const INDUSTRIES: Industry[] = [
  {
    index: "01",
    name: "Real Estate",
    description:
      "Tax, feasibility, reporting and structure support for developers, investors and property-led businesses.",
  },
  {
    index: "02",
    name: "Trading",
    description:
      "VAT, customs-facing documentation, finance controls and margin visibility for trading operations.",
  },
  {
    index: "03",
    name: "Professional Services",
    description:
      "Corporate Tax, revenue recognition, MIS and advisory support for advisory and service businesses.",
  },
  {
    index: "04",
    name: "Family Businesses",
    description:
      "Governance, reporting discipline, restructuring support and succession-aware financial advisory.",
  },
  {
    index: "05",
    name: "Startups",
    description:
      "Setup, compliance, forecasting and investor-ready reporting for ambitious early-stage businesses.",
  },
  {
    index: "06",
    name: "Cross-border Groups",
    description:
      "India–UAE and GCC expansion support across tax, entity structure, controls and reporting.",
  },
];

/** Flat list of every service the contact form can reference. */
export const SERVICE_OPTIONS: string[] = [
  ...SERVICES.flatMap((s) => s.subServices.map((sub) => sub.name)),
  "Other / Not sure yet",
];
