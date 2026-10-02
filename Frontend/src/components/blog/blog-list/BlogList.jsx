import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    try {
      const result = await fetch("http://localhost:9097/blogPosts");
      const data = await result.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <Row className="g-4">
      {posts.map((post, i) => (
        <Col key={`item-${i}`} md={6} lg={4}>
          <BlogItem {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
