import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        padding: "35px 0",
        borderTop: "1px solid #e5e7eb",
        color: "#9ca3af",
        fontSize: "13px",
      }}
    >
      <Container className="d-flex justify-content-between align-items-center">
        <span>© {new Date().getFullYear()} Antonio.dev</span>
        <span>Built while learning.</span>
      </Container>
    </footer>
  );
};

export default Footer;
