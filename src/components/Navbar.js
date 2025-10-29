import React, { useEffect, useRef, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "Meet the Team", path: "/meet-the-team" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Our Story", path: "/our-story" },
  { name: "Services", path: "/services" },
  // { name: "FAQ", path: "/faqs" },
  { name: "Contact Us", path: "/contact" },
];

export default function NavbarComponent() {
  const [expanded, setExpanded] = useState(false);

  // Track last scroll and when the menu was opened (to ignore immediate close)
  const lastY = useRef(0);
  const openedAt = useRef(0);

  // Close the mobile menu when scrolling (UP or DOWN) after a small grace period
  useEffect(() => {
    lastY.current = typeof window !== "undefined" ? window.scrollY : 0;

    const onScroll = () => {
      const y = window.scrollY || 0;

      const GRACE_MS = 300;      // ignore tiny layout shifts right after opening
      const DELTA_TO_CLOSE = 30; // pixels scrolled in either direction to close

      if (
        expanded &&
        performance.now() - openedAt.current > GRACE_MS &&
        Math.abs(y - lastY.current) > DELTA_TO_CLOSE
      ) {
        setExpanded(false);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [expanded]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (expanded && e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  // Explicitly control the toggle so it opens reliably anywhere on the page
  const handleToggleClick = () => {
    setExpanded((prev) => {
      const next = !prev;
      if (next) openedAt.current = performance.now();
      return next;
    });
  };

  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        className="shadow-sm dp-navbar"
        data-bs-theme="dark"
        style={{ backgroundColor: "#9181CC" }}
        expanded={expanded}
      >
        <Container>
          {/* Brand */}
          <Navbar.Brand
            as={NavLink}
            to="/"
            className="fw-semibold text-white"
            style={{ fontSize: "1.25rem" }}
            onClick={() => setExpanded(false)}
          >
            Detroit Promotions
          </Navbar.Brand>

          {/* Use our own click handler so it opens reliably anywhere */}
          <Navbar.Toggle aria-controls="main-nav" onClick={handleToggleClick} />

          {/* Links */}
          <Navbar.Collapse id="main-nav" className="justify-content-center">
            <Nav
              as="nav"
              className="dp-nav mx-auto"
              style={{ fontWeight: 600, letterSpacing: "0.2px" }}
            >
              {links.map(({ name, path }) => (
<Nav.Link
  key={name}
  as={NavLink}
  to={path}
  end={path === "/"}
  className="dp-link"
  onClick={() => {
    setExpanded(false);        // close the mobile menu
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
  }}
>
  {name}
</Nav.Link>

              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Inline CSS */}
      <style>{`
        .dp-nav .dp-link {
          color: #fff;
          padding: 0.65rem 0.9rem;
          margin: 0 0.15rem;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          height: 100%;
        }
        .dp-nav .dp-link:hover { color: #fff; opacity: 0.9; }

        .dp-nav .dp-link.active {
          color: #fff;
          position: relative;
        }
        .dp-nav .dp-link.active::after {
          content: "";
          position: absolute;
          left: 10%;
          right: 10%;
          bottom: -0.35rem;
          height: 2px;
          background: #fff;
          opacity: 0.9;
          border-radius: 2px;
        }

        @media (max-width: 991.98px) {
          .dp-nav { width: 100%; text-align: center; }
          .dp-nav .dp-link {
            display: block;
            padding: 0.75rem 0;
            margin: 0;
          }
          .dp-nav .dp-link.active::after {
            left: 38%;
            right: 38%;
            bottom: 0;
          }
        }
      `}</style>
    </>
  );
}
