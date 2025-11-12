// src/components/DetroitPromotionsForm.js
import React, { useState } from "react";

export default function DetroitPromotionsForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    reason: "",
  });
  const SERVICE_OPTIONS = [
    "Social Media and Management",
    "Content Creation",
    "Custom Projects",
    "Campaigns Events and Launches",
  ];
  const [selectedServices, setSelectedServices] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };
  const toggleService = (service) =>
    setSelectedServices((p) =>
      p.includes(service) ? p.filter((s) => s !== service) : [...p, service]
    );

  const cardStyle = {
    background: "#f7f7fb",
    border: "1px solid #ecebf5",
    borderRadius: 16,
    boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
    padding: "2rem",
  };

  return (
    <div className="container" style={{ maxWidth: 900, margin: "0 auto", padding: "1.5rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem", lineHeight: 1.15 }}>
      <span style={{ color: "#9181CC" }}>Contact</span> Us
      </h1>

      <div style={cardStyle}>
        {/* ✅ Paste your Formspree endpoint in the action below */}
        <form
          action="https://formspree.io/f/mldaezvv"
          method="POST"
          className="mx-auto"
          style={{ maxWidth: 640 }}
        >
          {/* Formspree controls */}
          <input type="hidden" name="_subject" value="New inquiry from Detroit Promotions" />
          <input
            type="hidden"
            name="_next"
            value="https://detroitpromotions.netlify.app/thanks"
          />
          <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} />

          <div className="mb-3">
            <div style={{ fontWeight: 600, marginBottom: 6 }}>First Name</div>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Last Name</div>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Email</div>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Company</div>
            <input
              type="text"
              name="company"
              className="form-control"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4" style={{ textAlign: "center" }}>
            <div
              style={{
                fontWeight: 600,
                marginBottom: 10,
                display: "inline-block",
                paddingBottom: 4,
                borderBottom: "2px solid black",
              }}
            >
              Services Needed
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 14,
                marginTop: 18,
                padding: "0 6px",
              }}
            >
              {SERVICE_OPTIONS.map((service) => {
                const selected = selectedServices.includes(service);
                return (
                  <label
                    key={service}
                    style={{
                      background: selected ? "#9181CC" : "#f9f9f9",
                      color: selected ? "#fff" : "#000",
                      border: selected ? "1px solid #9181CC" : "1px solid #eee",
                      borderRadius: 14,
                      padding: "12px 14px",
                      textAlign: "center",
                      cursor: "pointer",
                      userSelect: "none",
                      transition:
                        "background-color 160ms ease, transform 120ms ease, box-shadow 160ms ease",
                      boxShadow: selected ? "0 8px 18px rgba(145,129,204,0.25)" : "none",
                    }}
                    onClick={(ev) => {
                      ev.preventDefault();
                      toggleService(service);
                    }}
                    onKeyDown={(ev) => {
                      if (ev.key === "Enter" || ev.key === " ") {
                        ev.preventDefault();
                        toggleService(service);
                      }
                    }}
                    tabIndex={0}
                  >
                    <input
                      type="checkbox"
                      name="services"
                      value={service}
                      checked={selected}
                      readOnly
                      style={{ display: "none" }}
                    />
                    {service}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Send combined list too */}
          <input type="hidden" name="servicesSelected" value={selectedServices.join(", ")} />

          <div className="mb-4">
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Reason for Reaching Out</div>
            <textarea
              name="reason"
              className="form-control"
              rows={4}
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#9181CC",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              borderRadius: 999,
              padding: "12px 20px",
              width: "40%",
              border: "none",
              display: "block",
              margin: "1rem auto 0",
              transition: "transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
