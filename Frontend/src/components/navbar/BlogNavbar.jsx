import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

const NavBar = () => {
  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="blog-brand">
          <div className="blog-brand-logo">
            Antonio<span>.dev</span>
          </div>
          <div className="blog-brand-subtitle">DEV BLOG</div>
        </Navbar.Brand>

        <Button as={Link} to="/new" className="blog-navbar-add-button">
          <span className="add-icon">+</span>
          Nuovo articolo
        </Button>
      </Container>
    </Navbar>
  );
};

export default NavBar;
