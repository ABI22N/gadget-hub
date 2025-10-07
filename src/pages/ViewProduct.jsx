import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export default function ViewProduct({ products, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <h3>Product not found</h3>;

  return (
    <Card
      style={{
        backgroundColor: "#1f2933",
        color: "white",
        border: "1px solid #3e4c59",
        borderRadius: "10px",
        padding: "20px",


      }}
    >
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "50vh",
          objectFit: "contain", // keeps aspect ratio without cropping
          backgroundColor: "#31455969",
          padding: "10px",
          borderRadius: "10px",
            borderBottom: "1px solid #070707ff",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            marginBottom: "20px",
            marginLeft: "auto",

        }}
      />

      <Card.Body>
        
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {product.brand}
        </Card.Subtitle>
        <Card.Text className="fw-bold">${product.price}</Card.Text>

        <div className="d-flex justify-content-between align-items-center">
          <Button as={Link} to={`/edit/${product.id}`} variant="warning">
            Edit
          </Button>

          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              variant="danger"
              onClick={() => {
                onDelete(product.id);
                navigate("/");
              }}
            >
              Delete
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/")}
            >
              Back
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}