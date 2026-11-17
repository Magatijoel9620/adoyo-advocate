import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Mail, MessageCircle, Phone } from "lucide-react";
import ServiceEnquiryModal from "@/components/ServiceEnquiryModal";
import SiteHeader from "@/components/SiteHeader";
import { getLegalService, legalServices } from "@/lib/services";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://adoyolaw.com").replace(/\/$/, "");

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return legalServices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getLegalService(slug);
  if (!service) return { title: "Service not found" };
  const description = `${service.description} Contact Adoyo J & Company Advocates in Malindi, Kenya to make an enquiry.`;
  return {
    title: `${service.shortTitle} | Malindi, Kenya`,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${service.shortTitle} | Adoyo J & Company Advocates`, description, url: `/services/${service.slug}`, type: "article" },
  };
}

export default async function LegalServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getLegalService(slug);
  if (!service) notFound();
  const message = `Hello, I would like to make an enquiry about ${service.enquiryService}. Could you please guide me on the next step?`;
  const whatsapp = `https://wa.me/254701403467?text=${encodeURIComponent(message)}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.description,
    provider: { "@type": "LegalService", name: "Adoyo J & Company Advocates", url: siteUrl, telephone: "+254701403467", email: "info@adoyolaw.com", address: { "@type": "PostalAddress", streetAddress: "Sea Breeze Plaza, Ground Floor, Door No. 5, off Vasco Da Gama Road", addressLocality: "Malindi", addressRegion: "Kilifi County", addressCountry: "KE" } },
    areaServed: [{ "@type": "City", name: "Malindi" }, { "@type": "Country", name: "Kenya" }],
    url: `${siteUrl}/services/${service.slug}`,
  };

  return (
    <main className="service-detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <div className="utility-bar"><span>ADOYO J & COMPANY <i /> ADVOCATES</span><span className="utility-location">MALINDI, KENYA <i /> <a href="mailto:info@adoyolaw.com">EMAIL THE FIRM <ArrowUpRight size={12} /></a></span></div>
      <SiteHeader />
      <section className="service-detail-hero">
        <div className="service-detail-inner">
          <Link href="/#services" className="service-back-link"><ArrowLeft size={15} /> All practice areas</Link>
          <p className="eyebrow"><span className="eyebrow-mark" /> PRACTICE AREA</p>
          <h1>{service.title.split(" & ").length > 1 ? <>{service.title.split(" & ")[0]} <em>&amp; {service.title.split(" & ")[1]}</em></> : service.title}</h1>
          <p className="service-detail-lede">{service.summary}</p>
          <p className="service-detail-description">{service.description}</p>
          <div className="service-detail-actions">
            <a className="button button-gold" href={whatsapp} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp <ArrowUpRight size={17} /></a>
            <ServiceEnquiryModal service={service.enquiryService} />
          </div>
          <div className="service-detail-contact-row">
            <a href="tel:+254701403467"><Phone size={16} /> +254 701 403 467</a>
            <a href="mailto:info@adoyolaw.com"><Mail size={16} /> info@adoyolaw.com</a>
          </div>
        </div>
      </section>
      <section className="service-detail-content section-pad">
        <div className="service-detail-content-grid">
          <div><span className="finder-label">THE AREA OF PRACTICE</span><h2>How the firm may <em>assist.</em></h2><p>{service.description}</p></div>
          <div className="service-detail-list">{service.details.map((item) => <div key={item}><Check size={17} /><span>{item}</span></div>)}</div>
        </div>
        <div className="service-faq"><span className="finder-label">COMMON QUESTIONS</span><h2>A useful place to <em>start.</em></h2>{service.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        <div className="service-detail-bottom-cta"><div><span className="finder-label">START A CONVERSATION</span><h2>Have an enquiry about <em>{service.shortTitle.toLowerCase()}?</em></h2><p>Share a brief outline and the firm can review the appropriate next step.</p></div><a className="button button-gold" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> Contact the firm <ArrowUpRight size={16} /></a></div>
      </section>
      <footer className="service-detail-footer"><Link href="/">Adoyo J & Company Advocates</Link><span>Malindi, Kenya</span><Link href="/#contact">Contact the firm <ArrowUpRight size={14} /></Link></footer>
    </main>
  );
}
