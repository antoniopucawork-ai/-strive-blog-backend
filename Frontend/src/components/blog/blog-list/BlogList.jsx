import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import { AuthContext } from "../../../AuthContext/AuthContext";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/blogPosts`,
          {
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Errore HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log("Risposta del backend:", data);

        // Verifica il formato dei dati ricevuti
        if (Array.isArray(data)) {
          setPosts(data);
        } else if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          throw new Error("Il backend non ha restituito un array di post");
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Errore nel recupero dei post:", error);
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <p>Caricamento degli articoli...</p>;
  }

  if (error) {
    return <p>Errore: {error}</p>;
  }

  if (posts.length === 0) {
    return <p>Nessun articolo disponibile.</p>;
  }

  return (
    <Row className="g-4">
      {posts.map((post) => (
        <Col key={post._id} md={6} lg={4}>
          <BlogItem {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
