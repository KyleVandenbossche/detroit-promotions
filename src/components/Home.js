import React from "react";
import { Link } from "react-router-dom";

import elevate from "../photos/clients/elevate.png";
import sparkling from "../photos/clients/sparkling-sundays.png";
import sloDown from "../photos/clients/slo-down-wines.png";
import diciccos from "../photos/clients/diciccos.png";
import bloom from "../photos/clients/bloom.png";
import destinations from "../photos/clients/destinations.png";
import forksFetes from "../photos/clients/forks-and-fetes.png";
import drKristine from "../photos/clients/dr-kristine.png";
import mckinley from "../photos/clients/mckinley-holloway.png";
import soulbris from "../photos/clients/soulbris.png";
import ashleyHarris from "../photos/clients/ashley-harris.png";
import berngoSafaris from "../photos/clients/berngo-safaris.png";
import cie from "../photos/clients/cie.png";
import lululemon from "../photos/clients/lululemon.png";
import walsh from "../photos/clients/walsh.png";
import stunningShots from "../photos/clients/stunning-shots.png";
import wags from "../photos/clients/wags.JPEG";

/* New imports from your folder */
import contractingRemodelers from "../photos/clients/contracting_remodelers.png";
import dearDarlinDetroit from "../photos/clients/dear_darlin_detroit.png";
import essentialNeuropsychology from "../photos/clients/essential_neuropsychology.jpg";
import primaryPink from "../photos/clients/Primary_Pink.png";
import silverShamrocks from "../photos/clients/the-silver-shamrocks-stacked-logo.png";

/* hero photos */
import rightImage from "../photos/157A7839 (1).jpg";
import leftImage from "../photos/157A7985.jpg";

/* ===========================
   Inline Counters component
   (now uses section > shell > impact-card)
=========================== */
function CountersSection() {
  const sectionRef = React.useRef(null);
  const hasRunRef = React.useRef(false);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const counters = Array.from(el.querySelectorAll("[data-end]"));

    function animateCounter(node) {
      const end = parseInt(node.getAttribute("data-end"), 10) || 0;
      const duration = parseInt(node.getAttribute("data-duration"), 10) || 1200;
      let startTs = null;

      function tick(ts) {
        if (!startTs) startTs = ts;
        const progress = Math.min((ts - startTs) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(end * eased);
        node.textContent = current.toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
        else {
  const plus = node.getAttribute("data-end") === "30" ? "+" : "";
  node.textContent = end.toLocaleString() + plus;
}


      }
      requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRunRef.current) {
            hasRunRef.current = true;
            counters.forEach(animateCounter);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section">
      <div className="shell">
        <div className="impact-card">
          <h3 className="impact-title">
            Solving Big Problems.
          </h3>
          <p className="impact-sub">
          </p>

          <div className="count-grid" ref={sectionRef}>
            <article className="count-card">
              <div className="count-number" data-end="184" data-duration="1200">0</div>
              <div className="count-label">PROJECTS</div>
            </article>
            <article className="count-card">
              <div className="count-number" data-end="30" data-duration="1000">0+</div>
              <div className="count-label">SATISFIED CLIENTS</div>
            </article>
            <article className="count-card">
              <div className="count-number" data-end="204" data-duration="900">0</div>
              <div className="count-label">ONGOING PROJECTS</div>
            </article>
            <article className="count-card">
              <div className="count-number" data-end="906" data-duration="1400">0</div>
              <div className="count-label">CUPS OF COFFEE</div>
            </article>
          </div>
        </div>
      </div>

      {/* Integrated CSS just for the counters/card */}
      <style>{`
        /* Purple card sits inside the same shell as other sections */
        .impact-card{
          background:#9181CC;
          color:#fff;
          border-radius:20px;
          padding: clamp(28px, 5vw, 56px);
          box-shadow:0 6px 20px rgba(0,0,0,0.08);
        }

        /* Match other section title sizing */
        .impact-title{
          text-align:center;
          font-weight:800;
          letter-spacing:-0.3px;
          line-height:1.15;
          font-size: clamp(57px, 3vw, 40px);
          margin:0 0 12px 0;
        }

        .impact-sub{
          text-align:center;
          max-width:760px;
          margin:0 auto clamp(16px, 3vw, 28px);
          font-size: clamp(15px, 1.05vw, 18px);
          color: rgba(255,255,255,0.9);
        }

        .count-grid{
          padding: 45px;
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(16px, 2vw, 28px);
          width:100%;
          margin:0 auto;
        }

        .count-card{ text-align:center; }

        .count-number{
          font-weight:800;
          font-size: clamp(36px, 6vw, 60px);
          line-height:1;
          color:#fff;
          text-shadow:0 2px 0 rgba(0,0,0,0.06);
        }

        .count-label{
          margin-top:8px;
          font-size: clamp(12px, 1.1vw, 15px);
          letter-spacing:0.12em;
          text-transform:uppercase;
          color:rgba(255,255,255,0.9);
        }

        @media (max-width:640px){
          .count-grid{ grid-template-columns:1fr; }
          .hide-sm{ display:none; }
        }
      `}</style>
    </section>
  );
}

export default function DetroitPromotionsLanding() {
  const logos = [
    elevate, sparkling, sloDown, diciccos, bloom,
    destinations, forksFetes, drKristine, mckinley, soulbris,
    ashleyHarris, berngoSafaris, cie, wags, walsh, stunningShots, lululemon,
    contractingRemodelers, dearDarlinDetroit, essentialNeuropsychology, primaryPink, silverShamrocks,
  ];

  const doubled = [...logos, ...logos];

  return (
    <div
      className="container-fluid bg-white text-dark px-0"
      style={{ "--shell-max": "1410px", "--shell-gutter": "clamp(16px, 4vw, 40px)" }}
    >
      <style>{`
        .shell{
          width:min(var(--shell-max), 100% - (var(--shell-gutter) * 2));
          margin-inline:auto;
        }
        .section{
          width:100%;
          padding-block: clamp(24px, 5vw, 56px) 48px;
          background:#fff;
        }
        .pull-up{ margin-top: clamp(-24px, -4vw, -56px); }

        .wwd-wrap{
          display:grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap:clamp(40px, 3vw, 60px);
          align-items:stretch;
        }

        .text-panel{
          background:#f9f9f9;
          border-radius:16px;
          padding:2.25rem;
          box-shadow:0 8px 24px rgba(0,0,0,0.04);
          display:flex;
          flex-direction:column;
          justify-content:space-between;
        }
        .text-panel h3{
          margin:0 0 1rem 0;
          font-size:clamp(32px,3vw,40px);
          color:#111;
          font-weight:900;
          letter-spacing:-0.3px;
        }
        .text-panel p{
          font-size:clamp(16px,1.05vw,18px);
          line-height:1.5;
          margin:0.5rem 0;
          max-width:90%;
        }
        .cta-wrap{ display:flex; justify-content:center; margin-top:1.5rem; }
        .cta{
          display:inline-block;
          padding:12px 20px;
          border-radius:999px;
          font-weight:600;
          font-size:16px;
          background-color:#9181CC;
          color:#fff;
          border:1px solid rgba(0,0,0,0.06);
          text-decoration:none;
          transition:transform 160ms ease, box-shadow 160ms ease;
        }
        .cta:hover{ transform:translateY(-1px); box-shadow:0 10px 22px rgba(162,89,255,0.45); }

        .img-right-wrap{ display:flex; justify-content:flex-end; align-items:center; }
        .img-right{
          width:100%;
          border-radius:16px;
          object-fit:cover;
          box-shadow:0 10px 30px rgba(0,0,0,0.08);
        }

        .logos-section{
          background:#fff;
          padding-block: clamp(28px, 5vw, 64px);
          text-align:center;
          position:relative;
          overflow:hidden;
        }
        .logos-section h3{
          font-size: clamp(28px, 2.5vw, 34px);
          font-weight:800;
          color:#6c757d;
          letter-spacing:-0.3px;
          margin-bottom: clamp(20px, 3vw, 36px);
          display:inline-block;
          position:relative;
          padding-bottom: 12px;
        }
        .dp-logo-scroller{ width:100%; overflow:hidden; }
        .dp-logo-track{
          display:inline-flex;
          align-items:center;
          white-space:nowrap;
          will-change:transform;
          animation: dp-scroll 35s linear infinite;
        }
        .dp-logo{
          height:110px;
          margin:0 40px;
          object-fit:contain;
          opacity:.9;
          flex:0 0 auto;
          transition: opacity .25s ease, transform .25s ease, height .25s ease;
        }
        .dp-logo:hover{ opacity:1; transform:translateY(-2px); }
        @keyframes dp-scroll{
          0%{transform:translateX(0)}
          100%{transform:translateX(-50%)}
        }
        @media(max-width:992px){
          .wwd-wrap{ grid-template-columns:1fr; }
          .text-panel{ max-width:600px; margin:auto; }
          .img-right-wrap{ justify-content:center; }
        }
      `}</style>

      {/* ===== Section 1: What We Do ===== */}
      <section className="section pull-up">
        <div className="shell">
          <div className="wwd-wrap">
            <div className="text-panel">
              <div>
                <h3>What <span className="we-black">We</span> Do</h3>
                <p>
                  Detroit Promotions is a creative agency helping companies grow through marketing,
                  strategy, and compelling content. From startups to established brands, we bring
                  business-minded creativity that connects, converts, and scales.
                </p>
                <p>We help brands show up bigger—online and off.</p>
              </div>
              <div className="cta-wrap">
                <Link
                  to="/services"
                  className="cta"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Start a project
                </Link>
              </div>
            </div>

            <div className="img-right-wrap">
              <img src={rightImage} alt="Detroit Promotions example" className="img-right" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 2: Brands We've Worked With ===== */}
      <section className="logos-section">
        <div className="shell">
          <h3><span style={{ color: "#9181CC" }}>Brands </span>We've Worked With</h3>

          <div className="dp-logo-scroller" aria-label="Client logos">
            <div className="dp-logo-track">
              {doubled.map((src, i) => {
                let customHeight = 130;
                if (src === cie || src === walsh || src === wags || src === primaryPink || src === silverShamrocks) customHeight = 85;
                if (src === lululemon || src === stunningShots || src === contractingRemodelers) customHeight = 250;
                if (src === mckinley || src === soulbris) customHeight = 160;
                if (src === contractingRemodelers || src === essentialNeuropsychology || src === dearDarlinDetroit) customHeight = 300;

                return (
                  <img
                    key={i}
                    src={src}
                    alt={`Client logo ${i + 1}`}
                    className="dp-logo"
                    style={{ height: `${customHeight}px`, "--i": i }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 3: How We Do It + photo ===== */}
      <section className="section pull-up">
        <div className="shell">
          <div className="wwd-wrap how-wrap">
            {/* <-- added how-wrap */}
            <div className="img-right-wrap">
              <img src={leftImage} alt="Detroit Promotions example" className="img-right" loading="lazy" />
            </div>
            <div className="text-panel">
              <div className="inner">
                {/* <-- added inner wrapper */}
                <h3>How We Do It</h3>

                <p>
                  We move fast when the moment calls for it, slow when care is needed, and always with intention.
                  Every collaboration is an opportunity to elevate not just the work, but the people involved.
                </p>
                <br />
                <p>
                  We don’t just deliver projects—we make them matter. We build real connections, foster lasting
                  relationships, and make sure every project doesn’t just get done—it gets remembered.
                </p>

                <p>We make every collaboration an opportunity to elevate not just the work, but the people involved.</p>
                <br />
                <p>
                  We cut through the noise of "marketing" where everyone’s “building their brand” and posting without purpose—
                  that’s when Detroit Promotions stands apart.
                </p>
                <br />
                <br />
                <p className="fancy-quote">Your work isn’t just your work—it becomes part of ours.</p>
              </div>
              <div className="cta-wrap">{/* optional CTA */}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 4: Reviews ===== */}
      <section className="reviews-section">
        <div className="shell">
          <h3 className="reviews-title">What Our Clients Say</h3>

          <div className="reviews-grid">
            {[
              { name: "lululemon", text: "“You never miss a detail. So well planned and such a fun event!”", stars: 5 },
              { name: "Jo Malone London", text: "“Obsessed, this video is so awesome. We love you.”", stars: 5 },
              { name: "SLO Down Wines", text: "“The posts look great so far. Thank you very much for all your efforts with the content push!”", stars: 5 },
              { name: "Dear Darlin Detroit", text: "“Working with you and your team is a dream. Having an expert in your space will really help me build out Dear Darlin’ Detroit’s identity.”", stars: 5 },
              { name: "The Silver Shamrocks", text: "“Hey there! I love all of my videos so much!”", stars: 5 },
              { name: "Lock Lending Group", text: "“Thank you so much! Looking forward to everything, I felt really inspired after meeting with you girls today!.”", stars: 5 },
            ].map((r, i) => (
              <article key={i} className="review-card" aria-label={`Review by ${r.name}`}>
                <div className="stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <svg
                      key={idx}
                      className="star"
                      viewBox="0 0 24 24"
                      fill={idx < r.stars ? "#FBBF24" : "none"}
                      stroke={idx < r.stars ? "#FBBF24" : "#94A3B8"}
                      strokeWidth="1.5"
                    >
                      <path d="M12 3.6l2.76 5.6 6.18.9-4.47 4.36 1.06 6.18L12 17.9 6.47 20.7l1.06-6.18L3.06 10.1l6.18-.9L12 3.6z" />
                    </svg>
                  ))}
                </div>
                <p className="review-quote">{r.text}</p>
                <div className="reviewer">{r.name}</div>
              </article>
            ))}
          </div>
        </div>

        <style>{`
          .reviews-section { background:#fff; padding-block: clamp(28px, 5vw, 64px); }
          .reviews-title { text-align:center; font-size: clamp(28px, 3vw, 40px); font-weight:800; letter-spacing:-0.3px; margin:0 0 clamp(20px, 3vw, 32px) 0; color:#111; }
          .reviews-grid { display:grid; grid-template-columns:1fr; gap: clamp(16px, 2.5vw, 24px); }
          .review-card { border:1px solid rgba(0,0,0,0.08); border-radius:14px; background:#fff; padding: clamp(16px, 2.5vw, 24px); box-shadow:0 4px 18px rgba(0,0,0,0.06); transition: transform .2s ease, box-shadow .2s ease; }
          .review-card:hover { transform:translateY(-4px); box-shadow:0 6px 20px rgba(0,0,0,0.08); }
          .review-quote { margin:10px 0 12px 0; font-size:clamp(16px, 1.05vw, 18px); line-height:1.6; color:#334155; text-align:center; }
          .reviewer { text-align:center; font-weight:700; margin-top:6px; }
          .stars { display:flex; justify-content:center; gap:4px; margin-bottom:8px; }
          .star { width:22px; height:22px; flex:0 0 auto; }

          @media (min-width: 768px) { .reviews-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
          @media (min-width: 1100px) { .reviews-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }

          /* Center the text column vertically only in the How We Do It section */
          .how-wrap .text-panel{
            display:flex; /* repeat for safety */
            justify-content:center; /* centers content vertically inside this column */
          }

          /* Keep content width tidy while centered */
          .how-wrap .text-panel .inner{
            width:100%;
            max-width:90%;
            margin-inline:auto;
          }

          /* Subtle, elegant treatment for the line */
          .fancy-quote{
            font-style: italic; /* fancier feel, same size */
            font-weight: 700;   /* adds presence without resizing */
            letter-spacing: 0.01em;
            position: relative;
            display:inline-block;
            padding-bottom: 4px;
            /* soft gradient underline that matches your brand purple */
            background-image: linear-gradient(90deg, #9181CC 0%, rgba(145,129,204,0.15) 100%);
            background-size: 100% 2px;
            background-repeat: no-repeat;
            background-position: 0 100%;
          }

          /* Optional: tiny quote mark accents without changing layout */
          .fancy-quote::before,
          .fancy-quote::after{
            content: "“";
            opacity: 0.35;
            font-weight: 800;
          }
          .fancy-quote::after{
            content: "”";
            margin-left: 2px;
          }
        `}</style>
      </section>

      {/* ===== Section 5: Impact Counters (now aligned via shell) ===== */}
      <CountersSection />
    </div>
  );
}
