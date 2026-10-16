import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";

import "./styles.css";

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/blogPosts/${id}`,
          {
            signal: controller.signal,
          },
        );

        if (response.status === 404) {
          navigate("/404");
          return;
        }

        if (!response.ok) {
          throw new Error(
            `Errore durante il recupero del post: ${response.status}`,
          );
        }

        const data = await response.json();

        setBlog(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Errore nel recupero del post:", error);
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPost();

    return () => {
      controller.abort();
    };
  }, [id, navigate]);

  // Schermata di caricamento
  if (loading) {
    return <div>Caricamento del post...</div>;
  }

  // Gestione degli errori
  if (error) {
    return (
      <Container>
        <p>Si è verificato un errore: {error}</p>
      </Container>
    );
  }

  // Controllo dei dati
  if (!blog) {
    return (
      <Container>
        <p>Post non disponibile.</p>
      </Container>
    );
  }

  return (
    <div className="blog-details-root">
      <Container>
        {/* Copertina del post */}
        <Image className="blog-details-cover" src={blog.cover} fluid />

        {/* Titolo */}
        <h1 className="blog-details-title">{blog.title}</h1>

        <div className="blog-details-container">
          {/* Autore */}
          <div className="blog-details-author">
            {blog.author && <BlogAuthor {...blog.author} />}
          </div>

          {/* Informazioni del post */}
          <div className="blog-details-info">
            <div>{blog.createdAt}</div>

            <div>
              {blog.readTime
                ? `Lettura da ${blog.readTime.value} ${blog.readTime.unit}`
                : "Tempo di lettura non disponibile"}
            </div>

            {/* Like */}
            <div style={{ marginTop: 20 }}>
              <BlogLike defaultLikes={["123"]} onChange={console.log} />
            </div>
          </div>
        </div>

        {/* Contenuto del post */}
        <div
          dangerouslySetInnerHTML={{
            __html: blog.content || "",
          }}
        />
      </Container>
    </div>
  );
};

export default Blog;
