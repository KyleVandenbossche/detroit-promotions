import React, { useRef, useState } from "react";

/* 🖼️ src/photos/... */
import kyrstynHeadshot from "../photos/kyrstyn-headshot.jpg";
import kikiHeadshot from "../photos/kiki-headshot.jpg";
import kyleHeadshot from "../photos/kyle-headshot.jpg";
import yasmineHeadshot from "../photos/yasmine-headshot.jpg";
import kaylaHeadshot from "../photos/kayla-headshot.png";

export default function MeetTheTeam() {
  const teamMembers = [
    {
      name: "Kyrstyn Dean",
      title: "Owner, Creative Director",
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
      bio:
        "Kyle Vandenbossche is a multidisciplinary creative and data engineer passionate about transforming ideas into digital experiences through analytics, design, and innovation.",
    },
//     {
//       name: "Morgan Ulin",
//       title: "Marketing & Content Strategist",
//       img: morganHeadshot,
//       bio:
//         `Morgan sees stories everywhere—within colors, captions, and the quiet details that make a brand feel human. A student at the University of Michigan–Dearborn studying Communications with a minor in Marketing, she’s drawn to the art of shaping ideas into something people can feel.

// Her background blends strategy with imagination. She’s guided social campaigns, built brand partnerships, and crafted visuals that give messages a heartbeat. For Morgan, good design isn’t just seen—it’s understood. It moves with intention, speaks with clarity, and always leaves something behind.

// When she’s not creating, she’s teaching movement as a STOTT Pilates instructor. On the mat, she’s learned the same lessons she brings into her creative work: patience, balance, precision, and presence. She approaches every project like a practice—grounded, purposeful, and always in motion.`,
//     },
    {
      name: "Yasmine El-Aroud",
      title: "Accounting & Billing Coordinator",
      img: yasmineHeadshot,
      bio: `Yasmine El-Aroud has a keen eye for detail and loves to see how numbers come together to shape business decision-making. As a finance student at the University of Michigan–Dearborn, she sees numbers as a way to support growth, build trust, and create a strong foundation for creative work to thrive in a business. In addition to serving as the accounts payable contact, Yasmine works to uncover insights by managing and analyzing financial data. She applies her background knowledge to ensure accuracy and consistency in telling stories with numbers and supporting behind-the-scenes operations.`,
    },
    {
      name: "Kayla Kornelson",
      title: "Digital and Physical Asset Strategist",
      img: kaylaHeadshot,
      bio: `Kayla Kornelson is a creative strategist who believes the strongest brands are built through cohesive storytelling across both digital and physical spaces. From the smallest design detail to the broader campaign identity, she values the role each touchpoint plays in creating assets that feel intentional, memorable, and authentic.

Kayla earned her Master’s degree in Integrated Marketing Communications from the University of North Carolina Wilmington as well as a Bachelor’s degree in Business Administration, Management and Leadership. Her experience spans professional sports, higher education, hospitality, and brand engagement - environments that reinforced her belief that clarity, creativity, and thoughtful details are essential to bringing a brand’s story to life.`,
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const panelRefs = useRef([]);

  const toggleBio = (index) => {
    const isClosingCurrent = openIndex === index;

    if (openIndex !== null) {
      const prev = panelRefs.current[openIndex];
      if (prev) {
        prev.style.height = `${prev.scrollHeight}px`;
        void prev.offsetHeight;
        prev.style.height = "0px";
        prev.classList.remove("opening");
        prev.classList.add("closing");
      }
    }

    if (isClosingCurrent) {
      setOpenIndex(null);
      return;
    }

    const el = panelRefs.current[index];
    if (el) {
      el.style.height = "0px";
      el.classList.remove("closing");
      el.classList.add("opening");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.height = `${el.scrollHeight}px`;
          setOpenIndex(index);
        });
      });
    }
  };

  const onTransitionEnd = (index) => (e) => {
    if (e.propertyName !== "height") return;
    const el = panelRefs.current[index];
    if (!el) return;

    if (openIndex === index) {
      el.style.height = "auto";
      el.classList.remove("opening");
    } else {
      el.classList.remove("closing");
    }
  };

  return (
    <>
      <div className="team-container">
        <h1 className="team-title">Meet the Team</h1>
        <p className="team-tagline">The people who make it happen</p>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <article key={index} className="team-item">
              <div className="card-stack">
                <div className="media">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="team-img"
                    loading="lazy"
                  />
                  <div className="overlay">
                    <div className="overlay-content">
                      <div>
                        <h3 className="member-name">{member.name}</h3>
                        <p className="member-title">{member.title}</p>
                      </div>
                      <button
                        className="bio-toggle"
                        onClick={() => toggleBio(index)}
                        aria-expanded={openIndex === index}
                        aria-controls={`bio-panel-${index}`}
                      >
                        {openIndex === index ? "Hide Bio ▲" : "Read Bio ▼"}
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  id={`bio-panel-${index}`}
                  className={`bio-panel ${openIndex === index ? "open" : ""}`}
                  ref={(el) => (panelRefs.current[index] = el)}
                  onTransitionEnd={onTransitionEnd(index)}
                  role="region"
                  aria-label={`${member.name} bio`}
                >
                  <div className="bio-content">{member.bio}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .team-container { max-width:1440px; margin:24px auto; padding:0 16px; }
        .team-title { text-align:center; font-weight:700; font-size:32px; margin-bottom:6px; }
        .team-tagline { text-align:center; font-size:18px; color:#666; margin-bottom:28px; }

        .team-grid {
          display:grid;
          grid-template-columns:1fr;
          gap:20px;
        }
        @media (min-width:768px){
          .team-grid { grid-template-columns: repeat(4, minmax(0,1fr)); gap:26px; }
        }

        .card-stack{
          background:#fff;
          border-radius:18px;
          overflow:hidden;
          box-shadow:0 10px 28px rgba(0,0,0,0.10);
          display:flex;
          flex-direction:column;
        }

        .media { position:relative; }
        .team-img{
          width:100%;
          display:block;
          aspect-ratio:3 / 4;
          object-fit:cover;
          transition: transform .3s ease;
        }
        .card-stack:hover .team-img{ transform: scale(1.02); }

        .overlay{
          position:absolute; inset:auto 0 0 0;
          padding:14px 16px 12px;
          background: linear-gradient(to top, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.05) 100%);
          color:#fff;
        }
        .overlay-content{
          display:flex; justify-content:space-between; align-items:center; gap:12px;
        }
        .member-name{ margin:0; font-size:20px; font-weight:800; letter-spacing:.2px; }
        .member-title{ margin:2px 0 0; font-size:15px; font-weight:500; opacity:.9; }
        .bio-toggle{
          background:none; border:none; color:#fff; font-weight:700; font-size:14px;
          cursor:pointer; transition: opacity .2s ease;
        }
        .bio-toggle:hover{ opacity:.85; }

        .bio-panel{
          height:0;
          overflow:hidden;
          background:#f8f8fb;
          border-top:1px solid rgba(0,0,0,0.06);
          border-radius:0 0 18px 18px;
          will-change: height, opacity, transform;
          opacity:0;
          transform: translateY(-4px);
          transition:
            height 420ms cubic-bezier(.22,.61,.36,1),
            opacity 360ms ease,
            transform 360ms ease;
        }
        .bio-panel.open {
          opacity:1;
          transform: translateY(0);
        }
        .bio-panel.opening { opacity:1; transform: translateY(0); }
        .bio-panel.closing { opacity:0; transform: translateY(-4px); }

        .bio-content{
          padding:12px 16px 14px;
          font-size:14px;
          line-height:1.55;
          color:#334155;
          white-space:pre-wrap;
        }

        @media (min-width:768px){
          .member-name{ font-size:21px; }
          .member-title{ font-size:17px; }
          .bio-content{ font-size:15px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bio-panel {
            transition: height 1ms linear;
          }
        }
      `}</style>
    </>
  );
}