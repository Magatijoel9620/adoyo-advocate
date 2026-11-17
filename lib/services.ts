export const legalServices = [
  {
    slug: "criminal-law-defence",
    title: "Criminal law & defence",
    shortTitle: "Criminal law and defence",
    summary: "A clear, prepared response when the stakes are high.",
    description: "Adoyo J & Company Advocates handles enquiries relating to criminal investigations, bail and bond applications, defence and court representation, and related applications.",
    details: ["Criminal investigations", "Bail and bond applications", "Defence and court representation", "Related court applications"],
    enquiryService: "Criminal law & defence",
    faq: [
      { question: "Can I contact the firm about an ongoing criminal matter?", answer: "Yes. You can contact the firm to make an initial enquiry about an investigation, bail or bond application, or court matter. The firm will need to review the circumstances before advising on possible next steps." },
      { question: "What should I include in my first enquiry?", answer: "A brief description of the type of matter and a reliable way to contact you is enough to start. Avoid sending confidential documents or sensitive details before the firm confirms how they should be shared." },
    ],
  },
  {
    slug: "conveyancing-property",
    title: "Conveyancing & property",
    shortTitle: "Conveyancing and property",
    summary: "Careful legal work for decisions that carry lasting value.",
    description: "The firm's conveyancing and property practice covers enquiries about property transactions, title review, due diligence and conveyancing documentation.",
    details: ["Property transactions", "Title review", "Due diligence", "Conveyancing documentation"],
    enquiryService: "Conveyancing & property",
    faq: [
      { question: "Can I enquire before buying or selling property?", answer: "Yes. You can contact the firm about a proposed property transaction, title review or due diligence. The appropriate work will depend on the property and transaction details." },
      { question: "Should I send title documents with my first message?", answer: "No. Start with a brief description of your enquiry. The firm can confirm the appropriate and secure way to share documents if they are needed." },
    ],
  },
  {
    slug: "employment-labour",
    title: "Employment & labour",
    shortTitle: "Employment and labour",
    summary: "Helping people and organisations navigate workplace disputes.",
    description: "The firm handles enquiries relating to employment relationships, workplace rights, employment contracts and labour disputes.",
    details: ["Employment relationships", "Workplace rights", "Employment contracts", "Labour disputes"],
    enquiryService: "Employment & labour",
    faq: [
      { question: "Can I enquire about an employment dispute?", answer: "Yes. The firm accepts enquiries relating to workplace disputes, employment relationships and contracts. A first enquiry helps the firm understand the general nature of the issue." },
      { question: "What information is useful for an initial enquiry?", answer: "A short description of the workplace issue and a reliable contact number is a useful starting point. Avoid including confidential or sensitive information in the initial message." },
    ],
  },
  {
    slug: "road-traffic-claims",
    title: "Road traffic accident claims",
    shortTitle: "Road traffic accident claims",
    summary: "Guidance through the legal steps after a road accident.",
    description: "The firm's road traffic claims practice covers enquiries about accident-related claims, questions of liability, compensation and supporting documentation.",
    details: ["Accident-related claims", "Questions of liability", "Compensation enquiries", "Claims documentation"],
    enquiryService: "Road traffic accident claims",
    faq: [
      { question: "Can I contact the firm about a road accident claim?", answer: "Yes. You can make an initial enquiry about an accident-related claim, liability or compensation. The firm will need to review the circumstances before discussing possible next steps." },
      { question: "Do I need to send accident documents immediately?", answer: "No. Begin with a brief outline and your contact details. The firm can advise how relevant documents should be shared if required." },
    ],
  },
] as const;

export type LegalService = (typeof legalServices)[number];
export function getLegalService(slug: string) {
  return legalServices.find((service) => service.slug === slug);
}
