import React, { useState, useRef, useEffect } from "react";

const slides = [
  { type: "video", src: require("../photos/1.mp4") }, // 0 -> lululemon
  { type: "video", src: require("../photos/2.mp4") }, // 1 -> Walsh College
  { type: "video", src: require("../photos/3.mp4") }, // 2 -> Flowerbar
  { type: "video", src: require("../photos/4.mp4") }, // 3 -> 429 x PERSPIRE
  { type: "video", src: require("../photos/5.mp4") }, // 4 -> SS
];

const captions = ["lululemon", "Walsh College", "Flowerbar", "429 x PERSPIRE", "SS"];

/**
 * 🔧 EDIT THIS ARRAY with your client summaries.
 * - Keep the order matched to slides/captions by index.
 * - title: short heading for the panel
 * - summary: 1–3 sentence overview (use backticks for multi-line)
 * - bullets (optional): 2–4 short highlights
 */
const CLIENT_SUMMARIES = [
  {
    title: "Campaign: lululemon",
    summary: `High-energy social cuts and storefront loops optimized for silent autoplay.
Delivered multiple aspect ratios to increase in-store visibility and social reach.`,
    bullets: [
      "Delivered: 5 MP4 spots",
      "Goal: In-store engagement & socials",
      "Outcome: Higher dwell time near storefront",
    ],
  },
  {
    title: "Campaign: Walsh College",
    summary: `Narrative-led spot highlighting career outcomes and community.
We aligned visuals to program pillars and alumni success.`,
    bullets: ["Faculty/Alumni features", "Program pillars embedded", "Multi-platform delivery"],
  },
  {
    title: "Campaign: Flowerbar",
    summary: `Short-form reels focused on texture, color, and motion to drive conversions.
Emphasis on seasonal SKUs and event bundles.`,
    bullets: ["UGC-style angles", "CTA overlays", "Shop link end-cards"],
  },
  {
    title: "Campaign: 429 x PERSPIRE",
    summary: `Dynamic edit to spotlight cross-brand activation and on-site experience.
Balanced logo presence with lifestyle moments.`,
    bullets: ["Event recap", "Sponsor callouts", "Loop-ready cut"],
  },
  {
    title: "Campaign: SS",
    summary: `Launch assets built for fast iteration and A/B testing on hooks.
Hook-first editing to lift 3-sec hold and completion rate.`,
    bullets: ["Hook variants", "Caption testing", "Paid-ready masters"],
  },
];

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const videoRefs = useRef([]);
  const isInViewRef = useRef(false);

  const goToSlide = (i) => setCurrentIndex(i);

  // Touch swipe
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 50) setCurrentIndex((p) => (p > 0 ? p - 1 : slides.length - 1));
    if (dx < -50) setCurrentIndex((p) => (p < slides.length - 1 ? p + 1 : 0));
  };

  useEffect(() => {
    const node = carouselRef.current;
    if (!node) return;
    node.addEventListener("touchstart", handleTouchStart, { passive: true });
    node.addEventListener("touchend", handleTouchEnd);
    return () => {
      node.removeEventListener("touchstart", handleTouchStart);
      node.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setCurrentIndex((p) => (p < slides.length - 1 ? p + 1 : 0));
      if (e.key === "ArrowLeft") setCurrentIndex((p) => (p > 0 ? p - 1 : slides.length - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Play/pause videos
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === currentIndex && isInViewRef.current) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex]);

  // Pause when off-screen
  useEffect(() => {
    const node = carouselRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        const active = videoRefs.current[currentIndex];
        if (!active) return;
        if (entry.isIntersecting) active.play().catch(() => {});
        else active.pause();
      },
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [currentIndex]);

  // Safe access to current client summary
  const client = CLIENT_SUMMARIES[currentIndex] ?? {
    title: captions[currentIndex] || "Project",
    summary: "",
    bullets: [],
  };

  return (
    <>
      <div className="portfolio-wrapper">
        {/* LEFT text panel — now dynamic per client */}
        <div className="text-panel left">
          <h3>{client.title}</h3>
          <p style={{ whiteSpace: "pre-line", marginTop: "0.5rem" }}>{client.summary}</p>
          {Array.isArray(client.bullets) && client.bullets.length > 0 && (
            <ul style={{ marginTop: "0.75rem", paddingLeft: "1.1rem" }}>
              {client.bullets.map((b, i) => (
                <li key={i} style={{ lineHeight: 1.5 }}>{b}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Video carousel (center) */}
        <div className="carousel-container" ref={carouselRef}>
          <div className="caption">
            <span className="caption-label">{captions[currentIndex]}</span>
          </div>

          <div
            className="carousel-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, idx) => (
              <div key={idx} className="carousel-slide">
                <video
                  ref={(el) => (videoRefs.current[idx] = el)}
                  src={slide.src}
                  className="carousel-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="carousel-dots" role="tablist" aria-label="Slide selector">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`dot ${currentIndex === idx ? "active" : ""}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-selected={currentIndex === idx}
              />
            ))}
          </div>
        </div>

        {/* RIGHT text section (unchanged placeholder) */}
        <div className="text-panel right">
          <h3>Portfolio</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut
            lacus orci. Suspendisse potenti. Proin dignissim dolor ac ex
            hendrerit, sed fermentum libero facilisis. Curabitur at velit ut
            justo bibendum iaculis nec non lorem. Sed sit amet convallis ipsum.
            Nullam efficitur, nisi ac sodales ultrices, justo lectus suscipit
            magna, eget posuere erat lorem vitae felis.
          </p>
        </div>
      </div>

      {/* Inline CSS */}
      <style>{`
        .portfolio-wrapper {
          display: flex;
          justify-content: center;
          align-items: stretch;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          gap: 2rem;
          padding: 3rem;
        }

        /* 25% | 50% | 25% layout */
        .text-panel {
          flex: 0 0 25%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #f9f9f9;
          border-radius: 12px;
          padding: 1.5rem;
          color: #333;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }

        .carousel-container {
          position: relative;
          overflow: hidden;
          flex: 0 0 50%;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .caption {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .caption-label {
          font-weight: 600;
          font-size: 1.15rem;
          color: #111;
          position: relative;
          padding-bottom: 12px;
          display: inline-block;
          text-align: center;
        }

        .caption-label::after {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          width: 100px;
          height: 2px;
          background-color: #000;
          border-radius: 1px;
        }

        .carousel-track {
          display: flex;
          transition: transform 0.4s ease-in-out;
          width: 100%;
        }

        .carousel-slide {
          flex: 0 0 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-video {
          width: 100%;
          max-height: 600px;
          object-fit: contain;
          border-radius: 12px;
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          margin-top: 12px;
          gap: 10px;
        }

        .carousel-dots .dot {
          height: 12px;
          width: 12px;
          border: none;
          background-color: #ccc;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.15s;
        }

        .carousel-dots .dot.active {
          background-color: #333;
          transform: scale(1.05);
        }

        .text-panel h3 {
          margin-bottom: 0.25rem;
          font-size: 22px;
          color: #555;
        }

        .text-panel p {
          font-size: 16px;
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .portfolio-wrapper {
            flex-direction: column;
            padding: 1.5rem;
          }
          .carousel-container, .text-panel {
            flex: 0 0 100%;
            max-width: 100%;
          }
          .carousel-container { order: 1; }
          .text-panel.left { order: 2; }
          .text-panel.right { order: 3; }
        }
      `}</style>
    </>
  );
}
