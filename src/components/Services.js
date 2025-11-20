// import React from "react";

// const services = [
//   {
//     title: "Social Media Strategy & Management",
//     description:
//       "Build an intentional online presence with consistent, strategic content — from captions to campaigns.",
//   },
//   {
//     title: "Content Creation",
//     description:
//       "Create scroll-stopping visuals and authentic storytelling tailored to your brand’s unique voice.",
//   },
//   {
//     title: "Brand Consulting",
//     description:
//       "Gain clarity with a custom brand audit and alignment that turns ideas into impact.",
//   },
//   {
//     title: "Campaigns, Events, & Launches",
//     description:
//       "Make sure your big moments get noticed and spark genuine engagement.",
//   },
//   {
//     title: "Custom Projects",
//     description:
//       "Bring your unique creative ideas to life with bespoke content and campaigns — no cookie-cutter solutions.",
//   },
//   {
//     title: "Life’s Big Moments",
//     description:
//       "Capturing the magic behind the moments – including bachelorette parties, engagement parties, bridal showers, dress fittings, glam sessions, birthday parties, retirement parties, corporate parties and behind-the-scenes of any big day.",
//   },
//   {
//     title: "UGC (User Generated Content)",
//     description:
//       "Boost your brand with UGC-style content that blends authenticity with strategy — perfect for showcasing real results, product demos, or customer experiences.",
//   },
//   {
//     title: "Creative Support",
//     description:
//       "Branding, logos, color palettes, and cohesive digital assets – everything you need, all in one place.",
//   },
// ];

// export default function Services() {
//   return (
//     <div style={{ padding: "1rem" }}>
//       <h1 style={{ textAlign: "center" }}>
//   Our <span style={{ color: "9181CC" }}>Services</span>
// </h1>

//       <p style={{ textAlign: "center", marginBottom: "3rem" }}>
//         Detroit Promotions offers bold, creative marketing that turns vision into results.
//       </p>

//       <div
//         style={{
//           maxWidth: "1200px",
//           margin: "0 auto",
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//           gap: "2rem",
//         }}
//       >
//         {services.map((service, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//               padding: "2rem",
//               backgroundColor: "#f9f9f9",
//               textAlign: "left",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
//             }}
//           >
//             <h3 style={{ marginBottom: "0.5rem", color: "9181CC" }}>{service.title}</h3>
//             <p style={{ color: "#444" }}>{service.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }








import React from "react";

// --- map service titles to their images ---
const IMAGE_MAP = {
  "Social Media Strategy & Management": require("../photos/social_media_strategy.jpg"),
  "Content Creation": require("../photos/content_creation.jpg"),
  "Brand Consulting": require("../photos/brand_consulting.jpg"),
  "Campaigns, Events, & Launches": require("../photos/campaigns_events_launches.jpg"),
  "Custom Projects": require("../photos/custom_projects.jpg"),
  "Life’s Big Moments": require("../photos/lifes_big_moments.PNG"),
  "UGC": require("../photos/user-generated-content.PNG"),
  "Creative Support": require("../photos/creative-support.PNG"),
  // "UGC (User Generated Content)"  // no image provided
  // "Creative Support"              // no image provided
};

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

export default function Services() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ textAlign: "center", lineHeight: 1.2 }}>
        Our <span style={{ color: "#9181CC" }}>Services</span>
      </h1>

      <p style={{ textAlign: "center", marginBottom: "3rem" }}>
        Detroit Promotions offers bold, creative marketing that turns vision into results.
      </p>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "2rem",
        }}
      >
        {services.map((service) => {
          const img = IMAGE_MAP[service.title];
          return (
            <article
              key={service.title}
              style={{
                border: "1px solid #e6e6e6",
                borderRadius: "14px",
                overflow: "hidden",
                backgroundColor: "#fff",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* image (or fallback) */}
              {img ? (
                <img
                  src={img}
                  alt={service.title}
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <div
                  aria-hidden="true"
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    background:
                      "linear-gradient(135deg,#F3F0FF, #EAE6FF 40%, #E6F0FF 100%)",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 700,
                    color: "#7B6FCB",
                    letterSpacing: "0.04em",
                  }}
                >
                  IMAGE COMING SOON
                </div>
              )}

              {/* copy */}
              <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
                <h3
                  style={{
                    margin: "0 0 0.5rem",
                    color: "#9181CC",
                    fontSize: "1.05rem",
                  }}
                >
                  {service.title}
                </h3>
                <p style={{ color: "#444", margin: 0, lineHeight: 1.55 }}>
                  {service.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* small hover polish */}
      <style>{`
        article:hover { transform: translateY(-2px); box-shadow: 0 10px 22px rgba(0,0,0,0.10); transition: .2s ease; }
      `}</style>
    </div>
  );
}
