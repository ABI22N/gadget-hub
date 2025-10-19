
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";
import { getGadgetAPI, deleteGadgetAPI } from '../service/allAPI';

const FALLBACK = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...';

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
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

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const response = await deleteGadgetAPI(id);
      if (response?.status >= 400 || response instanceof Error || response.name === 'AxiosError') {
        throw response;
      }
      navigate('/');
    } catch (err) {
      setError('Error deleting: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading product...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;
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
        src={product.image || FALLBACK}
        alt={product.name}
        style={{
          width: "100%",
          height: "50vh",
          objectFit: "contain",
          backgroundColor: "#31455969",
          padding: "10px",
          borderRadius: "10px",
          borderBottom: "1px solid #070707ff",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          marginBottom: "20px",
          marginLeft: "auto",
        }}
        onError={(e) => (e.currentTarget.src = FALLBACK)}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{product.brand}</Card.Subtitle>
        <Card.Text className="fw-bold">₹{product.price}</Card.Text>
        <Card.Text className="text-muted">{product.specs}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <Button as={Link} to={`/edit/${product.id}`} variant="warning">
            Edit
          </Button>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Back
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
