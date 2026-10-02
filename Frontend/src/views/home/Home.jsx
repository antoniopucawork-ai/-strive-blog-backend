import React from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";

const Home = () => {
  return (
    <main className="home-page">
      <Container fluid="sm">
        <section className="home-hero">
          <div className="home-hero-badge">
            WEB DEVELOPMENT • PROJECTS • LEARNING
          </div>

          <h1 className="home-hero-title">
            Codice, progetti e tutto quello che imparo <span>costruendo.</span>
          </h1>

          <p className="home-hero-description">
            Uno spazio dove raccolgo esperienze, appunti e progetti del mio
            percorso nel mondo dello sviluppo web.
          </p>

          <div className="home-hero-tags">
            <span>React</span>
            <span>JavaScript</span>
            <span>Node.js</span>
            <span>MongoDB</span>
          </div>
        </section>

        <section className="articles-section">
          <div className="articles-heading">
            <div>
              <span className="articles-eyebrow">DAL BLOG</span>
              <h2>Ultimi articoli</h2>
            </div>

            <p>Appunti, esperimenti e cose che sto imparando.</p>
          </div>

          <BlogList />
        </section>
      </Container>
    </main>
  );
};

export default Home;
