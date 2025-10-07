import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function EditProduct({ products, onUpdate }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [updated, setUpdated] = useState(product || {});
  const navigate = useNavigate();

  if (!product) return <h3>Product not found</h3>;

  const handleChange = (e) =>
    setUpdated({ ...updated, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updated);
    navigate("/");
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#1c4268bf",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "500px"

      }}
    >
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={updated.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Brand</Form.Label>
        <Form.Control
          type="text"
          name="brand"
          value={updated.brand}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={updated.price}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          name="image"
          value={updated.image}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-end" style={{ gap: "10px" }}>
        <Button
          variant="secondary"
          onClick={() => navigate("/")}
          style={{
            padding: "5px 12px",
            fontSize: "0.85rem",
            width: "auto",
            borderRadius: "5px",
            backgroundColor: "#685454c0",
          }}
        >
           Back
        </Button>

        <Button
          type="submit"
          variant="warning"
          style={{
            padding: "5px 12px",
            fontSize: "0.85rem",
            width: "auto",
            borderRadius: "5px",
            backgroundColor: "#f0ad4e",
            border: "none",
          }}
        >
          Update Product
        </Button>
      </div>
    </Form>
  );
}