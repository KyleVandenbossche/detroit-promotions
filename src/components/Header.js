import React from "react";
import headerImage from "../photos/new-headline.PNG"; // change to .png if you rename the file

export default function Header() {
  const styles = {
    wrapper: {
      maxWidth: "1440px",   // cap image width for large monitors
      margin: "0 auto",
      padding: "0 16px",
      display: "flex",
      justifyContent: "center",
    },
    img: {
      width: "100%",
      height: "auto",       // ensures full image height shows
      objectFit: "contain", // show full image (no cropping)
      borderRadius: "8px",
      display: "block",
    },
  };

  return (
    <>
      <div style={styles.wrapper}>
        <img
          src={headerImage}
          alt="Header"
          style={styles.img}
          loading="eager"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1440px"
        />
      </div>

      {/* Responsive tweaks */}
      <style>
        {`
          @media (max-width: 640px) {
            img[alt="Header"] {
              max-height: none; /* don't restrict on mobile */
            }
          }

          @media (min-width: 641px) and (max-width: 1024px) {
            img[alt="Header"] {
              max-height: none; /* allow full image height */
            }
          }

          @media (min-width: 1025px) {
            img[alt="Header"] {
              max-height: none; /* show full image even on large screens */
            }
          }
        `}
      </style>
    </>
  );
}
