// src/components/DetroitPromotionsForm.js
import React, { useState } from "react";

export default function DetroitPromotionsForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    reason: "",
  });

  const SERVICE_OPTIONS = [
    "Social Media and Management",
    "Content Creation",
    "Custom Projects",
    "Campaigns Events and Launches",
  ];

  const [selectedServices, setSelectedServices] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Sends JSON to your backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    const subject = `[${formData.firstName} ${formData.lastName} - ${formData.company || "No Company"}]`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          firstName: formData.firstName,
          lastName: formData.lastName,
          company: formData.company,
          reason: formData.reason,
          services: selectedServices,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to send.");
      }

      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const cardStyle = {
    background: "#f3f4f6",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    padding: "2rem",
  };

  if (submitted) {
    return (
      <div className="container" style={{ maxWidth: 900, margin: "0 auto", padding: "1.5rem" }}>
        <div style={cardStyle} className="text-center">
          <h2 className="mb-3" style={{ color: "#9181CC", marginTop: 0 }}>
            Thank you, {formData.firstName}!
          </h2>
          <p className="lead" style={{ marginBottom: "0.75rem" }}>
            We received your message and will be in touch shortly.
          </p>
          {formData.company && (
            <p style={{ marginBottom: "0.5rem" }}>
              We’re excited to learn more about <strong>{formData.company}</strong>!
            </p>
          )}
          {selectedServices.length > 0 && (
            <p style={{ marginBottom: "0.5rem" }}>
              <em>Services selected:</em> {selectedServices.join(", ")}
            </p>
          )}
          <p style={{ marginBottom: 0 }}>— The Detroit Promotions Team</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: 900, margin: "0 auto", padding: "1.5rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        <span>Contact</span> Us
      </h1>

      <div style={cardStyle}>
        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: 640 }}>
          {errorMsg && (
            <div
              style={{
                background: "#fde8e8",
                border: "1px solid #f9c0c0",
                color: "#7a1c1c",
                borderRadius: 8,
                padding: "10px 12px",
                marginBottom: 12,
              }}
            >
              {errorMsg}
            </div>
          )}

          <div className="mb-3">
            <div style={{ fontWeight: 600, marginBottom: "6px" }}>First Name</div>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <div style={{ fontWeight: 600, marginBottom: "6px" }}>Last Name</div>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <div style={{ fontWeight: 600, marginBottom: "6px" }}>Company</div>
            <input
              type="text"
              className="form-control"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4" style={{ textAlign: "center" }}>
            <div
              style={{
                fontWeight: 600,
                marginBottom: "10px",
                display: "inline-block",
                paddingBottom: "4px",
                borderBottom: "2px solid black",
              }}
            >
              Services Needed
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "14px",
                marginTop: "18px",
                padding: "0 6px",
              }}
            >
              {SERVICE_OPTIONS.map((service) => {
                const selected = selectedServices.includes(service);
                return (
                  <div
                    key={service}
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleService(service)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleService(service);
                      }
                    }}
                    style={{
                      background: selected ? "#9181CC" : "#f9f9f9",
                      color: selected ? "#fff" : "#000",
                      border: selected ? "1px solid #9181CC" : "1px solid #eee",
                      borderRadius: "14px",
                      padding: "12px 14px",
                      textAlign: "center",
                      cursor: "pointer",
                      userSelect: "none",
                      transition:
                        "background-color 160ms ease, transform 120ms ease, box-shadow 160ms ease",
                      boxShadow: selected ? "0 8px 18px rgba(145,129,204,0.25)" : "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                  >
                    {service}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-4">
            <div style={{ fontWeight: 600, marginBottom: "6px" }}>Reason for Reaching Out</div>
            <textarea
              className="form-control"
              name="reason"
              rows={4}
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              backgroundColor: "#9181CC",
              color: "#fff",
              fontWeight: 600,
              fontSize: "16px",
              borderRadius: "999px",
              padding: "12px 20px",
              width: "40%",
              border: "none",
              display: "block",
              margin: "1rem auto 0",
              transition: "transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease",
              cursor: submitting ? "not-allowed" : "pointer",
              opacity: submitting ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!submitting) e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {submitting ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
