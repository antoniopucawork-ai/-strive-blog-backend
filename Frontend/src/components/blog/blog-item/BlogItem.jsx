import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

const BlogItem = (props) => {
  const { title, cover, _id, category, readTime, author } = props;

  return (
    <Link to={`/blog/${_id}`} className="blog-link">
      <Card className="blog-card">
        <div className="blog-cover-wrapper">
          <Card.Img variant="top" src={cover} className="blog-cover" />

          {category && <span className="blog-category">{category}</span>}
        </div>

        <Card.Body className="blog-card-body">
          <Card.Title className="blog-card-title">{title}</Card.Title>

          <p className="blog-card-description">
            Scopri l'articolo e continua a leggere.
          </p>
        </Card.Body>

        <Card.Footer className="blog-card-footer">
          <span>{author || "Antonio"}</span>

          {readTime && (
            <span>
              {readTime.value} {readTime.unit}
            </span>
          )}
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default BlogItem;
