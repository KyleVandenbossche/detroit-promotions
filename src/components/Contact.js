// src/components/DetroitPromotionsForm.js
import React, { useMemo, useState } from "react";

export default function DetroitPromotionsForm() {
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mldaezvv";

  const SERVICE_OPTIONS = useMemo(
    () => [
      "Social Media and Management",
      "Content Creation",
      "Custom Projects",
      "Campaigns Events and Launches",
    ],
    []
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    reason: "",
  });

  const [selectedServices, setSelectedServices] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const toggleService = (service) => {
    setSelectedServices((p) =>
      p.includes(service) ? p.filter((s) => s !== service) : [...p, service]
    );
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      reason: "",
    });
    setSelectedServices([]);
    setStatus("idle");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("submitting");
    setErrorMsg("");

    try {
      // Build payload
      const payload = {
        ...formData,
        services: selectedServices, // array
        servicesSelected: selectedServices.join(", "), // string
        _subject: "New inquiry from Detroit Promotions",
      };

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const msg =
          data?.errors?.[0]?.message ||
          "Something went wrong submitting the form. Please try again.";
        throw new Error(msg);
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.message || "Submission failed. Please try again.");
    }
  };

  const cardStyle = {
    background: "#f7f7fb",
    border: "1px solid #ecebf5",
    borderRadius: 16,
    boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
    padding: "2rem",
  };

  // ✅ Custom Detroit Promotions Thank You (no Formspree branding)
  if (status === "success") {
    return (
      <div
        className="container"
        style={{ maxWidth: 900, margin: "0 auto", padding: "1.5rem" }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1rem", lineHeight: 1.15 }}>
          <span style={{ color: "#9181CC" }}>Thank</span> You
        </h1>

        <div style={cardStyle}>
          <h2 style={{ textAlign: "center", marginBottom: 8 }}>
            We’ve received your message.
          </h2>
          <p style={{ textAlign: "center", margin: 0 }}>
            A Detroit Promotions team member will reach out shortly.
          </p>

          <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
            <button
              type="button"
              onClick={resetForm}
              style={{
                backgroundColor: "#9181CC",
                color: "#fff",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 999,
                padding: "10px 18px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{ maxWidth: 900, margin: "0 auto", padding: "1.5rem" }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "1rem", lineHeight: 1.15 }}>
        <span style={{ color: "#9181CC" }}>Contact</span> Us
      </h1>

      <div style={cardStyle}>
        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: 640 }}>
          {/* Honeypot */}
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
              disabled={status === "submitting"}
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
              disabled={status === "submitting"}
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
              disabled={status === "submitting"}
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
              disabled={status === "submitting"}
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
                      cursor: status === "submitting" ? "not-allowed" : "pointer",
                      userSelect: "none",
                      transition:
                        "background-color 160ms ease, transform 120ms ease, box-shadow 160ms ease",
                      boxShadow: selected ? "0 8px 18px rgba(145,129,204,0.25)" : "none",
                      opacity: status === "submitting" ? 0.7 : 1,
                    }}
                    onClick={(ev) => {
                      ev.preventDefault();
                      if (status !== "submitting") toggleService(service);
                    }}
                    onKeyDown={(ev) => {
                      if ((ev.key === "Enter" || ev.key === " ") && status !== "submitting") {
                        ev.preventDefault();
                        toggleService(service);
                      }
                    }}
                    tabIndex={0}
                  >
                    {/* Keep actual checkbox input so Formspree receives a clear set */}
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

          <div className="mb-4">
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Reason for Reaching Out</div>
            <textarea
              name="reason"
              className="form-control"
              rows={4}
              value={formData.reason}
              onChange={handleChange}
              required
              disabled={status === "submitting"}
            />
          </div>

          {/* Error UI */}
          {status === "error" && (
            <div
              style={{
                marginTop: 10,
                marginBottom: 10,
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(220, 53, 69, 0.35)",
                background: "rgba(220, 53, 69, 0.08)",
                fontWeight: 600,
              }}
            >
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
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
              cursor: status === "submitting" ? "not-allowed" : "pointer",
              opacity: status === "submitting" ? 0.85 : 1,
              transition: "transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease",
            }}
          >
            {status === "submitting" ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
