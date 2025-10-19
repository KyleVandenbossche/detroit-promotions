import React from "react";

const services = [
  {
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
    title: "UGC (User Generated Content)",
    description:
      "Boost your brand with UGC-style content that blends authenticity with strategy — perfect for showcasing real results, product demos, or customer experiences.",
  },
  {
    title: "Creative Support",
    description:
      "Branding, logos, color palettes, and cohesive digital assets – everything you need, all in one place.",
  },
];

export default function Services() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ textAlign: "center" }}>
  Our <span style={{ color: "9181CC" }}>Services</span>
</h1>

      <p style={{ textAlign: "center", marginBottom: "3rem" }}>
        Detroit Promotions offers bold, creative marketing that turns vision into results.
      </p>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
        }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "2rem",
              backgroundColor: "#f9f9f9",
              textAlign: "left",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem", color: "9181CC" }}>{service.title}</h3>
            <p style={{ color: "#444" }}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
