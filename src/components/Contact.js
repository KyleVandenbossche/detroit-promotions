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

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const TO_EMAIL = "detroitpromotions@example.com"; // replace with your email
    const subject = `New inquiry from ${formData.firstName} ${formData.lastName}`;
    const bodyLines = [
      `First Name: ${formData.firstName}`,
      `Last Name: ${formData.lastName}`,
      `Company: ${formData.company || "—"}`,
      `Services Needed: ${selectedServices.length ? selectedServices.join(", ") : "—"}`,
      "",
      "Reason for Reaching Out:",
      formData.reason || "—",
    ];
    const body = bodyLines.join("\n");
    const mailtoHref = `mailto:${encodeURIComponent(
      TO_EMAIL
    )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoHref;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-3" style={{ color: "#9181CC" }}>
          Thank you, {formData.firstName}!
        </h2>
        <p className="lead">
          We appreciate you reaching out. We'll be in touch shortly to talk more about your{" "}
          <strong>{formData.reason.toLowerCase()}</strong>.
        </p>
        {formData.company && (
          <p>
            We’re excited to learn more about what’s happening at <strong>{formData.company}</strong>!
          </p>
        )}
        {selectedServices.length > 0 && (
          <p>
            <em>Services selected:</em> {selectedServices.join(", ")}
          </p>
        )}
        <p>— The Detroit Promotions Team</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ textAlign: "center" }}>
        <span style={{ color: "#9181CC" }}>Contact</span> Us
      </h1>

      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
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

        <div className="mb-5">
          <div style={{ fontWeight: 600, marginBottom: "6px" }}>Company</div>
          <input
            type="text"
            className="form-control"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        {/* ===== Services Needed ===== */}
        <div className="mb-5" style={{ textAlign: "center" }}>
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
              gap: "16px",
              marginTop: "24px",
              padding: "0 10px",
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
                    borderRadius: "16px",
                    padding: "14px 16px",
                    textAlign: "center",
                    cursor: "pointer",
                    userSelect: "none",
                    transition: "background-color 160ms ease, transform 120ms ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
                  {service}
                </div>
              );
            })}
          </div>
        </div>
        {/* ===== End Services Needed ===== */}

        <div className="mb-5">
          <div style={{ fontWeight: 600, marginBottom: "6px" }}>Reason for Reaching Out</div>
          <textarea
            className="form-control"
            name="reason"
            rows="4"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            backgroundColor: "#9181CC",
            color: "#fff",
            fontWeight: "600",
            fontSize: "16px",
            borderRadius: "999px",
            padding: "12px 20px",
            width: "30%",
            border: "none",
            display: "block",
            margin: "1.5rem auto",
            transition: "transform 160ms ease, box-shadow 160ms ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-1px)";
            e.target.style.boxShadow = "0 10px 22px rgba(162, 89, 255, 0.45)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 6px 16px rgba(162, 89, 255, 0.35)";
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
