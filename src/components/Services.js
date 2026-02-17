// src/pages/Services.js
import React, { memo } from "react";

/**
 * ✅ All service images are served from /public/images for fastest discovery.
 * Folder: public/images/
 *
 * Make sure these files exist (spelling/case must match exactly on Netlify):
 * - services-hero.webp
 * - content-creation.webp
 * - brand-consulting.webp
 * - campaigns-events-launches.webp
 * - custom-projects.webp
 * - lifes-big-moments.webp
 * - ugc.webp
 * - creative-support.webp
 */

// ✅ First/LCP image served from /public for earlier discovery
const HERO_IMAGE_PUBLIC_URL = "/images/services-hero.webp";

// ✅ Non-hero images (also from /public/images)
const IMAGE_MAP = {
  "Content Creation": "/images/content-creation.webp",
  "Brand Consulting": "/images/brand-consulting.webp",
  "Campaigns, Events, & Launches": "/images/campaigns-events-launches.webp",
  "Custom Projects": "/images/custom-projects.webp",
  "Life’s Big Moments": "/images/lifes-big-moments.webp",
  UGC: "/images/ugc.webp",
  "Creative Support": "/images/creative-support.webp",
};

const services = [
  {
    // ✅ LCP card (hero)
    title: "Social Media Strategy & Management",
    description:
      "Build an intentional online presence with consistent, strategic content — from captions to campaigns.",
  },
  {
    title: "Content Creation",
    description:
      "Create scroll-stopping visuals and authentic storytelling tailored to your brand’s unique voice.",
  },
  {
    title: "Brand Consulting",
    description:
      "Gain clarity with a custom brand audit and alignment that turns ideas into impact.",
  },
  {
    title: "Campaigns, Events, & Launches",
    description:
      "Make sure your big moments get noticed and spark genuine engagement.",
  },
  {
    title: "Custom Projects",
    description:
      "Bring your unique creative ideas to life with bespoke content and campaigns — no cookie-cutter solutions.",
  },
  {
    title: "Life’s Big Moments",
    description:
      "Capturing the magic behind the moments – including bachelorette parties, engagement parties, bridal showers, dress fittings, glam sessions, birthday parties, retirement parties, corporate parties and behind-the-scenes of any big day.",
  },
  {
    title: "UGC",
    description:
      "Boost your brand with UGC-style content that blends authenticity with strategy — perfect for showcasing real results, product demos, or customer experiences.",
  },
  {
    title: "Creative Support",
    description:
      "Branding, logos, color palettes, and cohesive digital assets – everything you need, all in one place.",
  },
];

// ✅ Memoized card to reduce re-render work
const ServiceCard = memo(function ServiceCard({ service, index }) {
  const isFirst = index === 0;

  // ✅ First card uses hero URL, others use map (all from /public/images)
  const imgSrc = isFirst ? HERO_IMAGE_PUBLIC_URL : IMAGE_MAP[service.title];

  return (
    <article className="dp-card">
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={service.title}
          className="dp-cardImg"
          // ✅ LCP tuning
          loading={isFirst ? "eager" : "lazy"}
          fetchPriority={isFirst ? "high" : "auto"} // ✅ correct React prop casing
          decoding="async"
          // ✅ Prevent reflow (16:9)
          width="1200"
          height="675"
          // ✅ Never show broken image for hero—fallback to a gradient
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const parent = e.currentTarget.parentElement;
            if (parent) parent.setAttribute("data-img-failed", "true");
          }}
        />
      ) : null}

      {/* fallback block (also used if image fails) */}
      <div className="dp-cardFallback" aria-hidden="true">
        IMAGE COMING SOON
      </div>

      <div className="dp-cardBody">
        <h3 className="dp-cardTitle">{service.title}</h3>
        <p className="dp-cardText">{service.description}</p>
      </div>
    </article>
  );
});

export default function Services() {
  return (
    <div className="dp-wrap">
      <h1 className="dp-title">
        Our <span className="dp-accent">Services</span>
      </h1>

      <p className="dp-subtitle">
        Detroit Promotions offers bold, creative marketing that turns vision into results.
      </p>

      <div className="dp-grid">
        {services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </div>

      <style>{`
        .dp-wrap { padding: 1rem; }
        .dp-title { text-align: center; line-height: 1.2; margin: 0; }
        .dp-accent { color: #9181CC; }
        .dp-subtitle { text-align: center; margin: 0 0 3rem; }

        .dp-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
        }

        .dp-card {
          border: 1px solid #e6e6e6;
          border-radius: 14px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 6px 18px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          transform: translateZ(0);
          transition: transform .18s ease, box-shadow .18s ease;

          /* ✅ Helps long pages render faster */
          content-visibility: auto;
          contain-intrinsic-size: 600px;
          position: relative;
        }

        .dp-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(0,0,0,0.10);
        }

        .dp-cardImg {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          display: block;
        }

        /* fallback hidden by default if image loads successfully */
        .dp-cardFallback {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: linear-gradient(135deg,#F3F0FF, #EAE6FF 40%, #E6F0FF 100%);
          display: none;
          place-items: center;
          font-weight: 700;
          color: #7B6FCB;
          letter-spacing: 0.04em;
        }

        /* show fallback only if image is missing or failed */
        .dp-card[data-img-failed="true"] .dp-cardFallback {
          display: grid;
        }

        .dp-cardBody { padding: 1.25rem 1.25rem 1.5rem; }
        .dp-cardTitle {
          margin: 0 0 0.5rem;
          color: #9181CC;
          font-size: 1.05rem;
        }
        .dp-cardText { color: #444; margin: 0; line-height: 1.55; }

        @media (prefers-reduced-motion: reduce) {
          .dp-card { transition: none; }
          .dp-card:hover { transform: none; }
        }
      `}</style>
    </div>
  );
}
