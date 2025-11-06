import React from "react";

export default function OurStory() {
  const cardStyle = {
    background: "#f3f4f6",            // grey card
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    padding: "2rem",
  };

  return (
    <div className="container" style={{ maxWidth: 900, margin: "0 auto", padding: "1.5rem" }}>
      <h1 className="text-center mb-4" style={{ padding: ".25rem", marginTop: 0 }}>
        Our <span>Story</span>
      </h1>

      {/* Grey card wrapper (like other components) */}
      <div style={cardStyle}>
        <section className="mb-5" style={{ marginBottom: "1.75rem" }}>
          <h3 className="fw-bold mb-3" style={{ marginBottom: "0.75rem" }}>Where It All Started</h3>
          <p>
            It all started in a high school business class—taught not by a teacher but by a local dentist
            with a knack for entrepreneurship. One summer, he called Kyrstyn and asked what she was doing
            over break. “Nothing,” she said. So he invited her to his office. That same day, she met the
            team, got a crash course in small business, and walked out with her very first job offer.
          </p>
          <p>
            When she nervously admitted she didn’t know anything about dentistry — and hadn’t even graduated
            high school yet — he said something that stuck:
          </p>
          <blockquote
            className="blockquote text-center"
            style={{
              color: "#9181CC",                 // fixed missing '#'
              margin: "1rem auto",
              borderLeft: "4px solid #9181CC",
              paddingLeft: "0.75rem",
              maxWidth: 700,
            }}
          >
            “You’ve got character. I can teach you the rest.”
          </blockquote>
          <p>
            That moment changed everything. He taught her to lead with empathy, stay curious, and never
            underestimate the power of showing up with heart. That experience didn’t just shape her career —
            it shaped her purpose.
          </p>
        </section>

        <section className="mb-5" style={{ marginBottom: "1.75rem" }}>
          <h3 className="fw-bold mb-3" style={{ marginBottom: "0.75rem" }}>
            Creating Content with Purpose — and Investing in the Next Generation
          </h3>
          <p>
            At Detroit Promotions, mentorship and education aren’t just buzzwords — they’re part of who
            we are. We know real-world skills like critical thinking and workforce readiness don’t always
            get enough spotlight in traditional classrooms. That’s why we’re committed to filling that gap.
          </p>
          <p>
            We’re proud to share our experience and knowledge through meaningful partnerships that make a
            difference, including:
          </p>
          <ul style={{ paddingLeft: "1.25rem", marginBottom: 0 }}>
            <li>Serving on the Macomb Community College Business Advisory Board</li>
            <li>Partnering with Walsh College’s Center for Innovation & Entrepreneurship (CIE)</li>
            <li>Being the first business to pilot Walsh College’s Emerging Leader Program</li>
            <li>We also proudly, warmly and regularly welcome interns from Metro Detroit colleges to learn, create, and gain real-world experience alongside our team</li>
          </ul>
          <p style={{ marginTop: "0.75rem" }}>
            These programs aren’t just resume lines—they’re part of our mission to give back, pay it forward,
            and help others earn a seat at the table.
          </p>
        </section>

                <section>
          <h3 className="fw-bold mb-3" style={{ marginBottom: "1rem" }}>Our Philosophy</h3>
          <p>
            Now, that same spirit guides everything we do here. We believe growth is a team sport, mentorship
            matters, and marketing should feel more like a friendship than a formula.
          </p>
          <p style={{ marginBottom: 0 }}>
            We’re your friend in marketing — here to share stories, strategies, and a little real talk to help
            you build a brand (and life) that feels like you.
          </p>
        </section>



      </div>
    </div>
  );
}
