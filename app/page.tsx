import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Scale,
  ShieldCheck,
  Landmark,
  BriefcaseBusiness,
  CarFront,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  MoveUpRight,
  Check,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import EnquiryForm from "@/components/EnquiryForm";
import SmoothScroll from "@/components/SmoothScroll";
import Reveal from "@/components/Reveal";
import SceneLoader from "@/components/SceneLoader";

const whatsappContactUrl = `https://wa.me/254701403467?text=${encodeURIComponent(
  "Hello, I would like to speak with Adoyo J & Company Advocates about a legal matter. Could you please assist me?"
)}`;

const services = [
  {
    n: "01",
    title: "Criminal law & defence",
    short: "A clear, prepared response when the stakes are high.",
    detail:
      "Representation and guidance through criminal investigations, bail and bond applications, court proceedings and related applications.",
    icon: ShieldCheck,
    tags: ["Bail & bond", "Court representation", "Criminal defence"],
  },
  {
    n: "02",
    title: "Conveyancing & property",
    short: "Careful legal work for decisions that carry lasting value.",
    detail:
      "Practical support with property transactions, title review, due diligence and conveyancing documentation.",
    icon: Landmark,
    tags: ["Property transfers", "Title review", "Due diligence"],
  },
  {
    n: "03",
    title: "Employment & labour",
    short: "Helping people and organisations navigate workplace disputes.",
    detail:
      "Advice and representation relating to employment relationships, workplace rights, contracts and labour disputes.",
    icon: BriefcaseBusiness,
    tags: ["Employment disputes", "Contracts", "Termination matters"],
  },
  {
    n: "04",
    title: "Road traffic claims",
    short: "Guidance through the legal steps after a road accident.",
    detail:
      "Assistance with accident-related claims, questions of liability, compensation and supporting documentation.",
    icon: CarFront,
    tags: ["Accident claims", "Compensation", "Claims documentation"],
  },
];

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adoyolaw.com";
  const legalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Adoyo J & Company Advocates",
    url: siteUrl,
    image: `${siteUrl}/adoyo-advocate.webp`,
    logo: `${siteUrl}/logo.png`,
    telephone: "+254701403467",
    email: "adoyoadvocate@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sea Breeze Plaza, Ground Floor, Door No. 5, off Vasco Da Gama Road",
      addressLocality: "Malindi",
      postOfficeBoxNumber: "5034",
      addressCountry: "KE",
    },
    areaServed: [{ "@type": "Country", name: "Kenya" }],
    availableLanguage: ["English"],
    description: "Legal practice based in Malindi, Kenya. Enquiries from abroad are welcome for matters connected to Kenyan law.",
  };
  return (
    <main id="home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalBusinessSchema).replace(/</g, "\\u003c") }} />
      <SmoothScroll />
      <div className="utility-bar">
        <span>
          ADOYO J & COMPANY <i /> ADVOCATES
        </span>
        <span className="utility-location">
          <MapPin size={13} /> MALINDI, KENYA <i />{" "}
          <a href="mailto:adoyoadvocate@gmail.com">
            EMAIL THE FIRM <ArrowUpRight size={12} />
          </a>
        </span>
      </div>
      <SiteHeader />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <Reveal>
            <p className="eyebrow">
              <span className="eyebrow-mark" /> INDEPENDENT LEGAL PRACTICE{" "}
              <span className="eyebrow-no">— 003 / KENYA</span>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 id="hero-title">
              The law,
              <br />
              <em>with clarity.</em>
              <br />
              Your voice,
              <br />
              <span>with purpose.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="hero-lede">
              Thoughtful legal counsel. Purposeful representation. Trusted guidance for the
              decisions that shape your life, work and future. Based in Malindi, Kenya,
              Adoyo Advocates welcomes enquiries from clients in Kenya and abroad seeking guidance on matters governed by Kenyan law.
            </p>
            <div className="hero-actions">
              <a data-magnetic className="button button-gold" href="#contact">
                Discuss your matter <ArrowUpRight size={17} />
              </a>
              <a className="hero-secondary" href="#services">
                Explore practice areas <ArrowDownRight size={16} />
              </a>
            </div>
          </Reveal>
          <div className="hero-footnote">
            <span>PREPARED. PERSONAL. PURPOSEFUL.</span>
            <span>
              01 <b /> 05
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-topline">
            <span>OUR PRINCIPLE</span>
            <span>EST. MALINDI</span>
          </div>
          <div className="visual-orbit orbit-a" />
          <div className="visual-orbit orbit-b" />
          <div className="visual-glow" />
          <SceneLoader />
          <div className="visual-quote">
            <span>“</span>
            <p>
              Justice begins
              <br />
              with being heard.
            </p>
          </div>
          <div className="visual-index">
            AJ<span>&</span>CO.
          </div>
          <div className="visual-bottomline">
            <span>INTEGRITY / PREPARATION / ADVOCACY</span>
            <span>↓ EXPLORE</span>
          </div>
        </div>
        {/* <a
          href="#approach"
          className="scroll-cue"
          aria-label="Scroll to our approach"
        >
          <span /> SCROLL & DISCOVER
        </a> */}
      </section>

      <section className="trust-strip" aria-label="Firm principles">
        <span>OUR PRACTICE IS GUIDED BY</span>
        <div>
          <Scale />
          <strong>Integrity</strong>
        </div>
        <div>
          <Check />
          <strong>Preparation</strong>
        </div>
        <div>
          <MessageCircle />
          <strong>Clear communication</strong>
        </div>
        <div>
          <ShieldCheck />
          <strong>Purposeful advocacy</strong>
        </div>
      </section>

      <section className="approach-section section-pad" id="approach">
        <Reveal className="section-kicker">
          <span>OUR APPROACH</span>
          <span className="kicker-line" />
          <span>THE CLIENT COMES FIRST</span>
        </Reveal>
        <div className="approach-layout">
          <Reveal>
            <h2>
              Good legal work
              <br />
              starts with <em>listening.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="approach-copy">
            <p className="large-copy">
              Every matter has its own weight. Every person deserves to
              understand where they stand.
            </p>
            <p>
              We take time to understand the circumstances, explain available
              options and prepare carefully for the work
              ahead. Our aim is to make the legal process feel more navigable,
              with direct communication and respect for each client's situation.
            </p>
            <a href="#firm" className="underlined-link">
              Get to know the firm <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
        <div className="approach-stamp">
          <Scale size={29} />
          <span>
            COUNSEL
            <br />
            WITH CONVICTION
          </span>
        </div>
      </section>

      <section className="services-section section-pad" id="services">
        <Reveal className="section-kicker">
          <span>PRACTICE AREAS</span>
          <span className="kicker-line" />
          <span>HOW WE CAN HELP</span>
        </Reveal>
        <div className="services-heading">
          <Reveal>
            <h2>
              Focused where
              <br />
              <em>it matters.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Legal services grounded in the details. Explore the areas of
              practice and start a conversation about the support you may need.
            </p>
          </Reveal>
        </div>
        <div className="service-list">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.n} className="service-row">
                <div className="service-count">{s.n}</div>
                <div className="service-icon">
                  <Icon size={24} strokeWidth={1.3} />
                </div>
                <div className="service-main">
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                  <div className="service-tags">
                    {s.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="service-detail">
                  <p>{s.detail}</p>
                  <a href={`#contact`} aria-label={`Enquire about ${s.title}`}>
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
        {/* <p className="legal-note">
          The practice areas above are a general overview, not legal advice. The
          appropriate approach depends on the specific facts of each matter.
        </p> */}
      </section>

      <section className="journey-section section-pad" id="how-we-work">
        <Reveal className="section-kicker">
          <span>THE PROCESS</span>
          <span className="kicker-line" />
          <span>A CLEARER NEXT STEP</span>
        </Reveal>
        <div className="journey-intro">
          <Reveal>
            <h2>
              A considered approach
              <br />
              to <em>your matter.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p>
              Legal questions are rarely one-size-fits-all. A useful first
              conversation helps clarify the issue, the information available
              and what may need to happen next.
            </p>
          </Reveal>
        </div>
        <div className="journey-grid">
          <Reveal className="journey-card">
            <span className="journey-number">01</span>
            <div className="journey-icon">
              <MessageCircle size={21} />
            </div>
            <h3>Start with a conversation</h3>
            <p>
              Tell us the broad outline of your concern and what outcome or
              guidance you are seeking. You do not need to share sensitive
              documents in an initial message.
            </p>
          </Reveal>
          <Reveal className="journey-card" delay={0.08}>
            <span className="journey-number">02</span>
            <div className="journey-icon">
              <Scale size={21} />
            </div>
            <h3>Understand the position</h3>
            <p>
              Relevant facts and documents can help establish the questions that
              need attention. The firm can then discuss the nature of the matter
              and possible next steps.
            </p>
          </Reveal>
          <Reveal className="journey-card" delay={0.16}>
            <span className="journey-number">03</span>
            <div className="journey-icon">
              <Check size={21} />
            </div>
            <h3>Agree on a way forward</h3>
            <p>
              Where the firm is able to assist, the next steps, required
              information and any applicable terms can be discussed before work
              proceeds.
            </p>
          </Reveal>
        </div>
        {/* <p className="journey-note">
          This is a general description of an initial enquiry, not a promise of
          representation or a legal assessment.
        </p> */}
      </section>

      <section className="manifesto">
        <div className="manifesto-no">
          <span>— THE COMMITMENT</span>
        </div>
        <Reveal className="manifesto-content">
          <p className="eyebrow">THE STANDARD WE SET</p>
          <h2>
            Not just answers.
            <br />
            <em>A way forward.</em>
          </h2>
          <p>
            Legal matters can feel uncertain. Our role is to bring structure to
            the questions, explain the choices in front of you and work with
            diligence toward the next step.
          </p>
          <a data-magnetic href="#contact" className="button button-outline">
            Start a conversation <ArrowUpRight size={16} />
          </a>
        </Reveal>
        <div className="manifesto-watermark" aria-hidden="true">
          AJ
        </div>
        <div className="manifesto-line" />
      </section>

      <section className="firm-section section-pad" id="firm">
        <Reveal className="section-kicker">
          <span>THE FIRM</span>
          <span className="kicker-line" />
          <span>ADOYO J & COMPANY ADVOCATES</span>
        </Reveal>
        <div className="firm-layout">
          <div className="firm-portrait">
            <Image
              src="/adoyo-advocate.webp"
              alt="Adoyo J, advocate, at work in her office"
              fill
              priority={false}
              sizes="(max-width: 760px) 100vw, 42vw"
              className="portrait-image"
            />
            <div className="portrait-shade" />
            <div className="portrait-label">
              <span>THE PERSON BEHIND THE PRACTICE</span>
              <span>ADVOCACY / KENYA</span>
            </div>
            <div className="portrait-corner">
              AJ<span>&</span>CO.
            </div>
          </div>
          <Reveal className="firm-copy" delay={0.1}>
            <p className="eyebrow">A GROWING PRACTICE IN MALINDI</p>
            <h2>
              Professional.
              <br />
              <em>Personal.</em>
              <br />
              Purposeful.
            </h2>
            <p>
              Adoyo J & Company Advocates is a growing legal practice serving
              clients who need clear guidance and committed representation. We
              believe strong professional relationships are built through
              preparation, straightforward communication and respect for the
              individual behind every matter.
            </p>
            <p>
              As the practice develops, our focus is to provide a considered,
              approachable legal service—one that helps clients understand their
              options and make informed decisions. The practice is based in
              Malindi, Kenya, and welcomes enquiries from clients in Kenya and
              abroad who need guidance on matters connected to Kenyan law.
            </p>
            <div className="firm-signature">
              <span />
              <div>
                <strong>Adoyo J & Company Advocates</strong>
                <small>LEGAL COUNSEL · ADVOCACY · REPRESENTATION</small>
              </div>
            </div>
            {/* <div className="profile-pending">
              ADVOCATE BIOGRAPHY & PROFESSIONAL DETAILS TO BE CONFIRMED
            </div> */}
          </Reveal>
        </div>
        <div className="office-gallery" aria-label="Inside the firm's office">
          <figure className="office-gallery-main">
            <Image
              src="/adoyo-office.webp"
              alt="Adoyo J working at her desk in the firm's office in Malindi"
              width={1600}
              height={2100}
              sizes="(max-width: 760px) 100vw, 48vw"
            />
            <figcaption><span>THE WORKSPACE</span><strong>A considered space for legal work.</strong></figcaption>
          </figure>
          <figure className="office-gallery-secondary">
            <Image
              src="/adoyo-client-meeting.webp"
              alt="Consultation taking place inside the law office"
              width={1600}
              height={1200}
              sizes="(max-width: 760px) 100vw, 42vw"
            />
            <figcaption><span>CLIENT CONSULTATIONS</span><strong>Conversations begin with listening.</strong></figcaption>
          </figure>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-left">
          <Reveal>
            <p className="eyebrow">
              <span className="eyebrow-mark" />GET IN TOUCH
            </p>
            <h2>
              Let's work out
              <br />
              <em>what comes next.</em>
            </h2>
            <p className="contact-lede">
              Start with a brief outline of what brings you here. We'll help you
              identify the next step for your enquiry.
            </p>
          </Reveal>
          <Reveal className="contact-links" delay={0.1}>
            <a href="tel:+254701403467">
              <span className="contact-link-icon">
                <Phone size={18} />
              </span>
              <span>
                <small>CALL THE FIRM</small>
                <strong>+254 701 403 467</strong>
              </span>
              <MoveUpRight size={17} />
            </a>
            <a
              href="https://wa.me/254701403467"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-link-icon">
                <MessageCircle size={18} />
              </span>
              <span>
                <small>WHATSAPP</small>
                <strong>Message the firm</strong>
              </span>
              <MoveUpRight size={17} />
            </a>
            <a href="mailto:adoyoadvocate@gmail.com">
              <span className="contact-link-icon">
                <Mail size={18} />
              </span>
              <span>
                <small>EMAIL</small>
                <strong>adoyoadvocate@gmail.com</strong>
              </span>
              <MoveUpRight size={17} />
            </a>
            <div className="contact-location">
              <span className="contact-link-icon">
                <MapPin size={18} />
              </span>
              <span>
                <small>LOCATION</small>
                <strong>Sea Breeze Plaza, Ground Floor, Door No. 5</strong>
                <em>
                  Opposite Ruby Plaza, off Vasco Da Gama Road.
                  <br />
                  P.O. Box 5034, Malindi
                </em>
              </span>
            </div>
          </Reveal>
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d940.118034338255!2d40.124040395021424!3d-3.223125312277043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2ske!4v1792047868521!5m2!1sen!2ske"
              title="Google Maps location for Adoyo J & Company Advocates, Sea Breeze Plaza, Malindi, Kenya"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <a
              href="https://maps.app.goo.gl/DRXyySy53Q5vJuqR9"
              target="_blank"
              rel="noreferrer"
            >
              Open location in Google Maps <ArrowUpRight size={14} />
            </a>
          </div>
          <p className="contact-privacy">
            Please avoid sending sensitive documents or confidential details
            before the firm confirms how they should be shared.
          </p>
        </div>
        <Reveal className="contact-form-card" delay={0.12}>
          <div data-magnetic-card className="form-card-inner">
            <div className="form-card-head">
              <span>INITIAL ENQUIRY</span>
              {/* <span>
                NO. 001 <i />
              </span> */}
            </div>
            <h3>
              Tell us a little
              <br />
              about your matter.
            </h3>
            <p>Complete the details below to prepare a message for the firm.</p>
            <EnquiryForm />
            <div className="form-card-bottom">
              <Scale size={17} />
              <span>Every matter begins with a conversation.</span>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Image
              src="/logo-landscape-trimmed.png"
              alt="Adoyo J & Company Advocates"
              width={235}
              height={52}
            />
            <p>
              Legal counsel. Clear direction. Purposeful representation.
              <br />
              

Providing thoughtful legal guidance in Kenya and assisting clients abroad with matters governed by Kenyan law.
            </p>
            <span className="footer-location">
              <MapPin size={14} /> MALINDI, KENYA
            </span>
          </div>
          <div className="footer-nav-group">
            <span>EXPLORE</span>
            <a href="#approach">Our approach</a>
            <a href="#services">Practice areas</a>
            <a href="#how-we-work">Our process</a>
            <a href="#firm">The firm</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-nav-group">
            <span>CONTACT</span>
            <a href="tel:+254701403467">+254 701 403 467</a>
            <a href="mailto:adoyoadvocate@gmail.com">adoyoadvocate@gmail.com</a>
            <a
              href="https://wa.me/254701403467"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp <ArrowUpRight size={13} />
            </a>
          </div>
          <a
            className="footer-cta"
            href="mailto:adoyoadvocate@gmail.com?subject=Legal%20enquiry&body=Hello%2C%0A%0AI%20would%20like%20to%20discuss%20a%20legal%20matter.%0A%0AMy%20name%3A%20%0AMy%20phone%3A%20%0ABrief%20outline%3A%20"
          >
            <span>HAVE A MATTER TO DISCUSS?</span>
            <strong>
              Let's talk <ArrowUpRight size={22} />
            </strong>
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ADOYO J & COMPANY ADVOCATES</span>
          <span>INTEGRITY / PREPARATION / ADVOCACY</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
        {/* <p className="footer-disclaimer">
          Website information is general in nature and does not create an
          advocate-client relationship. No outcome is guaranteed.
        </p> */}
        <div className="developer-credit">
          <span>Developed by </span>
          <a
            href="https://hempongroup.co.ke"
            target="_blank"
            rel="noreferrer"
            aria-label="Hempon Group — opens in a new tab"
          >
            Hempon Group <ArrowUpRight size={12} />
          </a>
        </div>
      </footer>
      <a
        data-magnetic
        className="floating-contact"
        href={whatsappContactUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Contact the firm on WhatsApp"
      >
        <MessageCircle size={18} />
        <span>Speak to the firm</span>
        <ArrowUpRight size={14} />
      </a>
    </main>
  );
}
