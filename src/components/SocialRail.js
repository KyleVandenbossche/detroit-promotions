import React from "react";

const PURPLE = "#9181CC";

export default function SocialRail({
  instagram = "https://www.instagram.com/detroit_promotions/?hl=en",
  facebook  = "https://facebook.com/yourpage",
  linkedin  = "https://www.linkedin.com/in/kyrstyndean/",
}) {
  const linkStyle = {
    width: 64,
    height: 64,
    display: "grid",
    placeItems: "center",
    background: "#fff",
    borderRadius: 999,
    boxShadow: "0 8px 24px rgba(0,0,0,.18)",
    transition: "transform .15s ease, box-shadow .15s ease, background .15s",
  };

  const railStyle = {
    position: "fixed",
    left: 14,                  // left side of the screen
    top: "66%",                // moved down from 50% to 66% of viewport height
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    zIndex: 9999,
  };

  const iconProps = { width: 30, height: 30, fill: PURPLE, "aria-hidden": true };

  return (
    <nav aria-label="Social links" style={railStyle}>
      {/* Instagram */}
      <a
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Instagram"
        title="Instagram"
        style={linkStyle}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(2px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
      >
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zm5.25-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25z"/>
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open LinkedIn"
        title="LinkedIn"
        style={linkStyle}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(2px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
      >
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM14.5 9c-2.17 0-3.5 1.19-3.5 3.03V21h-4V9h4v1.73C11.59 9.63 12.93 9 14.77 9 18 9 20 10.88 20 14.8V21h-4v-5.34c0-2.17-1.05-3.31-2.73-3.31z"/>
        </svg>
      </a>
    </nav>
  );
}
