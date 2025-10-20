
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addGadgetAPI } from '../service/allAPI';

export default function AddProduct() {
  const [product, setProduct] = useState({ name: "", brand: "", price: "", specs: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, brand, price } = product;
    if (!name?.trim() || !brand?.trim() || price === '' || isNaN(price)) {
      setError('Name, Brand, and a valid Price are required');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = { ...product, price: Number(product.price) };
      console.log('Sending POST request with data:', data);
      const response = await addGadgetAPI(data);
      console.log('API response:', response);
      if (response?.status >= 400 || response instanceof Error || response.name === 'AxiosError') {
        throw new Error(response.response?.data?.message || response.message || 'Unknown error');
      }
      navigate("/");
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Error adding product: ' + (err.message || 'Failed to connect to the server'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#1f2933",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "400px"
      }}
    >
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {loading && <Alert variant="info">Adding product...</Alert>}
      <div>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price (₹)</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Specifications</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="specs"
            value={product.specs}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
        </Form.Group>
      </div>
      <div className="d-flex justify-content-end mt-3" style={{ gap: "10px" }}>
        <Button
          variant="secondary"
          style={{ padding: "5px 12px", fontSize: "0.8rem", width: "auto" }}
          onClick={() => navigate("/")}
          disabled={loading}
        >
          Back
        </Button>
        <Button
          variant="primary"
          type="submit"
          style={{ padding: "5px 12px", fontSize: "0.8rem", width: "auto" }}
          disabled={loading}
        >
          Add Product
        </Button>
      </div>
    </Form>
  );
}
