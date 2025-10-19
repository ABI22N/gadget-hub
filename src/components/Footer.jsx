// Footer.jsx
import React from "react";
import { FcBusinessContact } from "react-icons/fc";
import { PiMailboxDuotone } from "react-icons/pi";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#4f8ac5ff",
        color: "#f8fafc",
        padding: "20px 0",
        textAlign: "center",
        marginTop: "auto",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div style={{ fontSize: "14px" }}>
        &copy; {new Date().getFullYear()} <b>GadgetHub. All rights reserved.2025</b>
      </div>

      <FcBusinessContact className="me-2 fs-5" /> <span className="small">910-555-1234</span> | <PiMailboxDuotone className="me-2 fs-5" /> <span className="small">info@gadgethub.com</span >
    </footer>
  );
}
