import React from "react";

export default function Press() {
  const features = [
    {
      outlet: "Rochester City Lifestyle",
      quote: "“The future isn’t something we wait for. It’s something we invest in.”",
      author: "Kyrstyn Dean CEO & Founder, Detroit Promotions",
    },
    {
      outlet: "Pretty Girls Playbook: Girls Who Golf",
      quote:
        "In Metro Detroit, Girls Who Golf — founded by sisters: Kyrstyn Dean, Chandra Dean, and Jordyn Dean — is part of this quiet cultural shift. Started in 2025, growing more and more.",
      author: "Kiki Pape, Brand Voice Strategist, Detroit Promotions",
    },
    {
      outlet: "Michigan Voyage",
      quote:
        "“We move fast when the moment calls for it, slow when care is needed, and always with intention.”",
      author: "Kyrstyn Dean CEO & Founder, Detroit Promotions",
    },
    {
      outlet: "The List Detroit",
      quote:
        '"Kyrstyn and her team help companies show up bigger, online and off."',
      author: "The List Detroit",
    },
  ];

  return (
    <div style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>

          <h1 style={styles.title}>
            Media features, recognition, and stories that spotlight Detroit Promotions.
          </h1>

          <p style={styles.subtitle}>
            A dedicated space for interviews, features, and press moments so the home
            page stays clean while this side of the brand has room to grow.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <div className="press-grid" style={styles.grid}>
            {features.map((item, index) => (
              <div key={index} style={styles.card}>
                <p style={styles.outlet}>{item.outlet}</p>
                <p style={styles.quote}>{item.quote}</p>
                <p style={styles.author}>— {item.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE FIX */}
      <style>{`
        @media (max-width: 900px) {
          .press-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#fff",
    minHeight: "100vh",
  },

  hero: {
    padding: "120px 24px 60px",
    background:
      "linear-gradient(180deg, rgba(145,129,204,0.16) 0%, rgba(255,255,255,1) 100%)",
  },

  heroInner: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  label: {
    display: "inline-block",
    backgroundColor: "#111",
    color: "#fff",
    fontSize: "0.78rem",
    fontWeight: "700",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "8px 14px",
    borderRadius: "999px",
    marginBottom: "20px",
  },

  title: {
    fontSize: "clamp(2.3rem, 5vw, 4.4rem)",
    lineHeight: "1.05",
    fontWeight: "800",
    color: "#111",
    maxWidth: "900px",
    margin: "0 0 20px",
  },

  subtitle: {
    fontSize: "1.08rem",
    lineHeight: "1.8",
    color: "#555",
    maxWidth: "720px",
    margin: 0,
  },

  section: {
    padding: "30px 24px 90px",
  },

  sectionInner: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "28px",
  },

  card: {
    backgroundColor: "#fff",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },

  outlet: {
    fontSize: "0.95rem",
    fontWeight: "700",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: "#9181CC",
    marginBottom: "18px",
  },

  quote: {
    fontSize: "1.16rem",
    lineHeight: "1.8",
    color: "#111",
    margin: "0 0 20px",
  },

  author: {
    fontSize: "0.98rem",
    lineHeight: "1.6",
    color: "#666",
    margin: 0,
    fontWeight: "500",
  },
};