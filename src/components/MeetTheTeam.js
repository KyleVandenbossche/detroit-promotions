import React, { useState } from "react";

/* 🖼️ These files live directly in src/ */
import kyrstynHeadshot from "../photos/kyrstyn-headshot.jpg";        // ← use the exact filename you have
import kikiHeadshot from "../photos/kiki-headshot.jpg";
import kyleHeadshot from "../photos/kyle-headshot.jpg";

export default function MeetTheTeam() {
  const teamMembers = [
    {
      name: "Kyrstyn Dean",
      title: "CEO, Owner",
      img: kyrstynHeadshot,
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non tristique felis. Integer faucibus ex vel mi mattis, vel porta mi aliquam. Suspendisse potenti. Sed eget justo ut libero convallis volutpat."
    },
    {
      name: "Kiki Pape",
      title: "Brand Voice Strategist, Account Manager",
      img: kikiHeadshot,
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor blandit velit, at ullamcorper nunc accumsan in. Nulla facilisi. Mauris sodales, eros at pulvinar condimentum, magna risus congue neque, ut gravida nunc elit nec nisl."
    },
    {
      name: "Kyle Vandenbossche",
      title: "Software/Data Management",
      img: kyleHeadshot,
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet luctus lorem, at sagittis tortor. Nunc sodales vehicula purus, ut euismod nisl ultrices sed. Proin vulputate luctus magna, a facilisis justo fermentum in."
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
          .team-members { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 26px; }
          .photo-card { border-radius: 18px; }
          .member-name { font-size: 21px; }
          .member-title { font-size: 17px; }
        }
      `}</style>
    </>
  );
}
