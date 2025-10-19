
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { getGadgetAPI, updateGadgetAPI } from '../service/allAPI';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', brand: '', price: '', specs: '', image: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await getGadgetAPI(id);
        if (response?.status >= 400 || response instanceof Error || response.name === 'AxiosError') {
          throw response;
        }
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name.trim() || !product.brand.trim() || product.price === '') {
      setError('Name, Brand, and Price are required');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await updateGadgetAPI(id, { ...product, price: Number(product.price) });
      if (response?.status >= 400 || response instanceof Error || response.name === 'AxiosError') {
        throw response;
      }
      navigate('/');
    } catch (err) {
      setError('Error updating product: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading product...</div>;
  if (error && !product.id) return <Alert variant="danger">{error}</Alert>;
  if (!product.id) return <h3>Product not found</h3>;

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
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {loading && <Alert variant="info">Updating product...</Alert>}
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
          disabled={loading}
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
          disabled={loading}
        >
          Update Product
        </Button>
      </div>
    </Form>
  );
}
