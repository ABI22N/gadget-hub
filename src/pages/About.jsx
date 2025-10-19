
import React from "react";
import { Card } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function About() {
  return (
    <div
      style={{
        backgroundColor: "#f3f5f7",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <Card
        style={{
          backgroundColor: "#ffffff",
          color: "#111827",
          borderRadius: "12px",
          boxShadow: "0 6px 18px rgba(15,23,42,0.06)",
          maxWidth: "800px",
          width: "100%",
          padding: "30px",
        }}
      >
        <h2
          style={{
            color: "#0ea5a4",
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          About Gadget Catalog
        </h2>
        <p style={{ fontSize: "16px", lineHeight: "1.8", textAlign: "center" }}>
          Welcome to <strong>GadgetHub</strong> — your all-in-one destination to explore, manage, 
          and keep track of the latest tech gadgets. From powerful laptops and flagship smartphones
          to high-quality headphones, GadgetHub helps you organize and discover your favorite
          technology with ease.
        </p>
        <hr style={{ margin: "30px 0", opacity: 0.3 }} />
        <div style={{ textAlign: "center" }}>
          <h5 style={{ color: "#0ea5a4", marginBottom: "15px" }}>📞 Contact & Support</h5>
          <p style={{ margin: "6px 0" }}>
            <FaPhoneAlt style={{ color: "#0ea5a4", marginRight: "8px" }} />
            <strong>Helpline:</strong> 910-555-1234
          </p>
          <p style={{ margin: "6px 0" }}>
            <FaEnvelope style={{ color: "#0ea5a4", marginRight: "8px" }} />
            <strong>Email:</strong> info@gadgethub.com
          </p>
          <p style={{ margin: "6px 0" }}>
            <FaMapMarkerAlt style={{ color: "#0ea5a4", marginRight: "8px" }} />
            <strong>Address:</strong> 42, Info Park Road, Kochi, India
          </p>
        </div>
        <hr style={{ margin: "30px 0", opacity: 0.3 }} />
        <p style={{ textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
          © {new Date().getFullYear()} GadgetHub. All Rights Reserved.
        </p>
      </Card>
    </div>
  );
}
