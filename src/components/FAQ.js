import React, { useState, useRef, useEffect } from "react";

const faqs = [
  {
    question: "Do you handle engagement and DMs?",
    answer:
      "Yes! With our full Instagram management service, we handle everything — including DMs and engagement. We’ll like and comment on followers’ stories, interact with your audience, and respond to DMs. For common questions like location, booking, pricing, etc., we respond on your behalf. If input is needed, we’ll notify the contact and follow up with you — ensuring responses within 24 hours.",
  },
  {
    question: "What does the process look like?",
    answer:
      "Strategy & Planning: We define the scope and strategy.\nContent Creation: Based on your needs, we schedule shoots and design media.\nReview & Adjustments: You can stay hands-on — or we can take the reins.\nLaunch & Management: We post, manage engagement, and help your brand grow.",
  },
  {
    question: "What’s included in a content day?",
    answer:
      "Planning: We discuss your vision, shot list, and creative ideas.\nExecution: We capture 10–20 high-quality assets like reels, product photos, and office tours. The goal is a robust content library to keep your brand consistent and fresh!",
  },
  {
    question: "Do you offer one-time or ongoing support?",
    answer:
      "Both! Whether you need full Instagram management or light backend help — we’ve got you. Full service includes strategy, content, posting, engagement, and analytics. Prefer DIY posting? We can still shoot and deliver custom content to keep your feed strong.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      if (openIndex === idx) {
        ref.style.maxHeight = ref.scrollHeight + "px";
      } else {
        ref.style.maxHeight = "0px";
      }
    });
  }, [openIndex]);

  // Helper to bold text before colon + "Yes!" and "Both!"
  const formatAnswer = (text) => {
    return text
      // Bold any phrase before a colon
      .replace(/(^|\n)([^:\n]+):/g, (match, p1, p2) => {
        return `${p1}<strong>${p2}:</strong>`;
      })
      // Bold standalone "Yes!" and "Both!"
      .replace(/\b(Yes!|Both!)\b/g, "<strong>$1</strong>");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ textAlign: "center" }}>
        Frequently Asked <span style={{ color: "#9181CC" }}>Questions</span>
      </h1>

      <p style={{ textAlign: "center", marginBottom: "3rem" }}>
        Here’s everything you might want to know about working with us.
      </p>

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {faqs.map((faq, index) => (
          <div
            key={index}
            onClick={() => toggle(index)}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "2rem",
              backgroundColor: "#f9f9f9",
              textAlign: "left",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            <h3 style={{ marginBottom: "0", color: "#9181CC" }}>{faq.question}</h3>
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              style={{
                overflow: "hidden",
                transition: "max-height 0.4s ease",
                maxHeight: openIndex === index ? "1000px" : "0",
                marginTop: openIndex === index ? "1rem" : "0",
                whiteSpace: "pre-line",
                color: "#444",
              }}
              dangerouslySetInnerHTML={{
                __html: formatAnswer(faq.answer),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
