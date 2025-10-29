import React, { useState } from "react";

/* 🖼️ These files live directly in src/ */
import kyrstynHeadshot from "../photos/kyrstyn-headshot.jpg";
import kikiHeadshot from "../photos/kiki-headshot.jpg";
import kyleHeadshot from "../photos/kyle-headshot.jpg";
import blankHeadshot from "../photos/blank-headshot.png"; // ← new filler photo

export default function MeetTheTeam() {
  const teamMembers = [
    {
      name: "Kyrstyn Dean",
      title: "CEO, Owner",
      img: kyrstynHeadshot,
      bio: `I’m Kyrstyn Dean, a marketing strategist and business consultant passionate about helping brands grow and stand out. With an MBA from Walsh College and 10+ years of experience in the corporate business world focused on various verticals such as Business Development, Account Management, Sales, Project Management, and Customer Success, I combine strategic thinking with creative execution to build strong brand identities and engaging marketing campaigns.

I specialize in creative direction, branding, social media strategy, content creation, digital marketing, and event management. I help businesses transform by crafting compelling campaigns, designing high-performing content, and developing cohesive marketing strategies that drive real results.

I work with clients across a variety of industries—from fitness and healthcare to retail and hospitality. I understand how to align marketing efforts with business goals. I don’t just focus on aesthetics; I create data-driven strategies that enhance engagement, boost revenue, and build long-term brand loyalty.

Whether curating digital marketing assets, managing large-scale client events, or consulting on brand direction, I thrive at the intersection of business and creativity.

I’m not just a marketer—I’m a strategist, problem solver, and brand architect, dedicated to helping companies make a lasting impact.

Your Friend in Marketing.`,
    },
    {
      name: "Kiki Pape",
      title: "Brand Voice Strategist, Account Manager",
      img: kikiHeadshot,
      bio: `Kiersten (Kiki) Pape — known to most as Kiki — is a storyteller and strategist who blends creativity with purpose.
As a Brand Story Strategist, Kiki has an intuitive sense for uncovering what makes a brand special—often knowing what it wants to say before it does. She helps brands break through the noise of digital storytelling with authenticity and inspiring content that truly connects.
A graduate of the University of Colorado Boulder with a degree in English, Kiki brings a deep understanding of language and narrative craft to every project. She is also the author of *The Worry Wags*, her debut children’s book that helps kids explore big feelings through imagination and heart. Beyond her own work, she has shared her writing with organizations like Front Porch Nonprofit and others across the creative community.
Utilizing the power of storytelling, Kiki captures the heart of a brand and transforms it into something memorable—and often, viral. In a world increasingly shaped by automation, she stands out through her originality, human insight, and timeless approach to storytelling—proving that genuine creativity will always cut through.`,
    },
    {
      name: "Kyle Vandenbossche",
      title: "Software/Data Management",
      img: kyleHeadshot,
      bio: "Kyle Vandenbossche is a multidisciplinary creative and data engineer passionate about transforming ideas into digital experiences through analytics, design, and innovation."
    },
    {
      name: "Morgan Ulin",
      title: "Marketing & Content Strategist Intern",
      img: blankHeadshot,
      bio: "This is a placeholder bio for our newest team member. They bring fresh ideas, creativity, and energy to every project — helping bring our clients’ visions to life."
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);
  const toggleBio = (index) => setExpandedIndex(expandedIndex === index ? null : index);

  return (
    <>
      <div className="team-container">
        <h1 className="team-title">Meet the Team</h1>
        <p className="team-tagline">The people who make it happen</p>

        <div className="team-members">
          {teamMembers.map((member, index) => (
            <article key={index} className={`team-member ${index % 2 !== 0 ? "reverse" : ""}`}>
              <div className="photo-card">
                <img src={member.img} alt={member.name} className="team-img" loading="lazy" />
                <div className="overlay">
                  <div className="overlay-content">
                    <div>
                      <h3 className="member-name">{member.name}</h3>
                      <p className="member-title">{member.title}</p>
                    </div>
                    <button className="bio-inline" onClick={() => toggleBio(index)}>
                      {expandedIndex === index ? "Hide Bio ▲" : "Read Bio ▼"}
                    </button>
                  </div>
                  {expandedIndex === index && <p className="bio-overlay">{member.bio}</p>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ---------- Integrated CSS ---------- */}
      <style>{`
        .team-container { max-width: 1440px; margin: 24px auto; padding: 0 16px; }
        .team-title { text-align: center; font-weight: 700; font-size: 32px; margin-bottom: 6px; }
        .team-tagline { text-align: center; font-size: 18px; color: #666; margin-bottom: 28px; }

        .team-members { display: grid; grid-template-columns: 1fr; gap: 20px; }

        .photo-card { position: relative; overflow: hidden; border-radius: 14px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1); }

        .team-img { width: 100%; height: auto; display: block; aspect-ratio: 3 / 4;
          object-fit: cover; transition: transform 0.3s ease; }

        .photo-card:hover .team-img { transform: scale(1.03); }

        .overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 14px 16px;
          background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 100%); color: white; }

        .overlay-content { display: flex; justify-content: space-between; align-items: center; }

        .member-name { margin: 0; font-size: 20px; font-weight: 700; }
        .member-title { margin: 2px 0; font-size: 15px; font-weight: 500; opacity: 0.9; }

        .bio-inline { background: none; border: none; color: white; font-size: 14px; font-weight: 500;
          cursor: pointer; transition: opacity 0.2s ease; }
        .bio-inline:hover { opacity: 0.85; }

        .bio-overlay { margin-top: 8px; font-size: 14px; color: #f5f5f5; line-height: 1.4;
          animation: fadeIn 0.3s ease; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); }
                            to   { opacity: 1; transform: translateY(0); } }

        @media (min-width: 768px) {
          .team-members { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 26px; }
          .photo-card { border-radius: 18px; }
          .member-name { font-size: 21px; }
          .member-title { font-size: 17px; }
        }
      `}</style>
    </>
  );
}
