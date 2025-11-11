import React, { useState, useRef, useEffect } from "react";

const slides = [
  { type: "video", src: require("../photos/1.mp4") }, // 0 -> lululemon
  { type: "video", src: require("../photos/2.mp4") }, // 1 -> Walsh College
  { type: "video", src: require("../photos/3.mp4") }, // 2 -> Flowerbar
  { type: "video", src: require("../photos/4.mp4") }, // 3 -> 429 x PERSPIRE
  { type: "video", src: require("../photos/5.mp4") }, // 4 -> SS
];

const captions = ["lululemon", "Walsh College", "FlowerBean", "429 x PERSPIRE", "Stunning Shots Photobooth"];

/**
 * CLIENT SUMMARIES
 * - For lululemon, `summary` is an object { description, problem, solution } to bold labels without HTML.
 * - Others can remain strings and render normally.
 */
const CLIENT_SUMMARIES = [
  {
    title: "Campaign: lululemon",
    summary: {
      description:
        "Lululemon partnered with Detroit Promotions to bring community-based events to life across Metro Detroit, which brought together movement, mindfulness, and the city’s creative energy. From local instructors to neighborhood spaces, every detail was designed to celebrate connection and culture beyond the storefront. ",
      problem:
        "The goal was to create experiences that felt rooted in the city, not just branded for it. Lululemon needed a way to strengthen its community presence beyond its retail stores.",
      solution:
        "Detroit Promotions helped bring the vision to life by capturing the events through dynamic photo and video storytelling — highlighting the people, the energy, and the heartbeat of the city. The result was content that carried the same authenticity and connection long after the events ended.",
    },
  },
  {
    title: "Campaign: Walsh College",
    summary: {
      description:
        "lorem ipsem",
      problem:
        "lorem ipsem",
      solution:
        "Detroit Promotions helped bring the vision to life by capturing the events through dynamic photo and video storytelling — highlighting the people, the energy, and the heartbeat of the city. The result was content that carried the same authenticity and connection long after the events ended.",
    },

  },
  {
    title: "Campaign: FlowerBean",
    summary: {
      description:
        "Flower Bean partnered with Detroit Promotions to create intentional, story-driven content that captured the beauty in small moments — from the care in every smoothie to the energy of the people behind them. Each piece was designed to feel personal, organic, and full of life, reflecting the heart of a growing local brand.",
      problem:
        "Flower Bean wanted to expand its audience while keeping its storytelling authentic — content that wasn’t just pretty, but purposeful.",
      solution:
        "Detroit Promotions helped translate that vision into a visual narrative that balanced artistry and strategy. Through thoughtful photography and storytelling, we created content that deepened connections, increased visibility, and shared Flower Bean's story in its most genuine form.",
    },
  },
  {
    title: "Campaign: 429 x PERSPIRE",
    summary: {
      description:
        "429 partnered with Detroit Promotions to highlight its mission to celebrate community in the workspace — capturing the collaboration, creativity, and connection happening every day in Rochester. Each piece of content focused on the people and purpose that make 429 stand out as a space where ideas and relationships thrive. ",
      problem:
        "429 wanted to showcase how their workspace reflects the spirit of the Rochester community, emphasizing authentic connection rather than just a place to work.",
      solution:
        "Detroit Promotions helped bring that vision forward by creating intentional, story-driven visuals that highlighted real people, real moments, and the culture of collaboration within 429 — turning their workspace into a symbol of community and creativity.",
    },
  },
  {
    title: "Campaign: Stunning Shots Photobooth",
    summary: {
      description:
        "Stunning Shots Photobooth partnered with Detroit Promotions to capture the energy, laughter, and behind-the-scenes moments that make every event unforgettable. The focus was on the fun, spontaneous moments that happen during a photoshoot, highlighting the joy and connection of each experience. ",
      problem:
        "Stunning Shots wanted to showcase the full event experience — the excitement, reactions, and playful energy between poses — to engage audiences and highlight their photobooth in action.",
      solution:
        "Detroit Promotions produced dynamic, hook-driven content with launch assets built for iteration and testing. By capturing authentic moments and pairing them with attention-grabbing edits, the campaign created shareable, high-impact visuals that resonated with audiences and amplified engagement.",
    },
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

  // Active client
  const client = CLIENT_SUMMARIES[currentIndex] ?? {
    title: captions[currentIndex] || "Project",
    summary: "",
    bullets: [],
  };

  // Render helper for summary: object {description, problem, solution} OR string
  const renderSummary = (summary) => {
    if (
      summary &&
      typeof summary === "object" &&
      ("description" in summary || "problem" in summary || "solution" in summary)
    ) {
      return (
        <div className="summary-block">
          {"description" in summary && summary.description && (
            <p>
              <strong>Description:</strong> {summary.description}
            </p>
          )}
          {"problem" in summary && summary.problem && (
            <p>
              <strong>Problem:</strong> {summary.problem}
            </p>
          )}
          {"solution" in summary && summary.solution && (
            <p>
              <strong>Solution:</strong> {summary.solution}
            </p>
          )}
        </div>
      );
    }
    // Fallback for plain string summaries (preserve line breaks)
    return <p style={{ whiteSpace: "pre-line", marginTop: "0.5rem" }}>{summary || ""}</p>;
  };

  return (
    <>
      <div className="portfolio-wrapper">
        {/* LEFT text panel — dynamic per client */}
        <div className="text-panel left">
          <h3>{client.title}</h3>
          {renderSummary(client.summary)}
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
          <div className="carousel-dots" role="group" aria-label="Slide selector">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`dot ${currentIndex === idx ? "active" : ""}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-pressed={currentIndex === idx}
                type="button"
              />
            ))}
          </div>
        </div>

        {/* RIGHT text section (placeholder) */}
        {/* <div className="text-panel right">
          <h3>Portfolio</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut
            lacus orci. Suspendisse potenti. Proin dignissim dolor ac ex
            hendrerit, sed fermentum libero facilisis. Curabitur at velit ut
            justo bibendum iaculis nec non lorem. Sed sit amet convallis ipsum.
            Nullam efficitur, nisi ac sodales ultrices, justo lectus suscipit
            magna, eget posuere erat lorem vitae felis.
          </p>
        </div> */}
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
    justify-content: flex-start; /* Align content to the top */
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

  /* Title spacing */
  .text-panel h3 {
    margin-bottom: 1rem; /* space between "Campaign" title and first paragraph */
    font-size: 22px;
    color: #555;
  }

  .text-panel p {
    font-size: 16px;
    line-height: 1.5;
  }

  /* Description / Problem / Solution spacing */
  .summary-block p {
    margin: 0;
  }
  /* adds space between each section: Description -> Problem -> Solution */
  .summary-block p + p {
    margin-top: 0.75rem;
  }

  /* If a spacer div exists in the DOM, neutralize it to avoid double gaps */
  .summary-spacer {
    display: none;
    height: 0;
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
