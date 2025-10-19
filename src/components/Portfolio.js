import React, { useState, useRef, useEffect } from "react";

const slides = [
  { type: "video", src: require("../photos/1.mp4") },
  { type: "video", src: require("../photos/2.mp4") },
  { type: "video", src: require("../photos/3.mp4") },
  { type: "video", src: require("../photos/4.mp4") },
  { type: "video", src: require("../photos/5.mp4") },
];

const captions = ["Lululemon", "Walsh College", "Flowerbar", "429 x PERSPIRE", "SS"];

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

  return (
    <>
      <div className="portfolio-wrapper">
        {/* Video carousel */}
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
          <div className="carousel-dots">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${currentIndex === idx ? "active" : ""}`}
                onClick={() => goToSlide(idx)}
              />
            ))}
          </div>
        </div>

        {/* Text section */}
        <div className="text-panel">
          <h3>Lorem Ipsum</h3>
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

        .carousel-container {
          position: relative;
          overflow: hidden;
          flex: 0 0 75%;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Centered caption above video */
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
          padding-bottom: 12px; /* space between text and line */
          display: inline-block;
          text-align: center;
        }

        /* Fixed line size (same for all captions) */
        .caption-label::after {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          width: 100px; /* 👈 FIXED WIDTH */
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
        }

        .dot {
          height: 12px;
          width: 12px;
          margin: 0 6px;
          background-color: #ccc;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .dot.active {
          background-color: #333;
        }

        .text-panel {
          flex: 0 0 25%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #f9f9f9;
          border-radius: 12px;
          padding: 1.5rem;
          color: #333;
        }

        .text-panel h3 {
          margin-bottom: 0.5rem;
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
        }
      `}</style>
    </>
  );
}
