import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#f8f9fa",
        padding: "2rem 1rem",
        textAlign: "center",
        fontSize: "0.9rem",
        color: "#6c757d",
        marginTop: 0,         // no forced top margin
        position: "static",   // ensure it's not fixed/absolute
        width: "100%",
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <Link to="/" style={{ margin: "0 0.75rem", color: "#6c757d", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/meet-the-team" style={{ margin: "0 0.75rem", color: "#6c757d", textDecoration: "none" }}>
          Meet the Team
        </Link>
        <Link to="/services" style={{ margin: "0 0.75rem", color: "#6c757d", textDecoration: "none" }}>
          Services
        </Link>
        <Link to="/contact" style={{ margin: "0 0.75rem", color: "#6c757d", textDecoration: "none" }}>
          Contact
        </Link>
      </div>
      <div>&copy; {new Date().getFullYear()} Detroit Promotions. All rights reserved.</div>
    </footer>
  );
}
