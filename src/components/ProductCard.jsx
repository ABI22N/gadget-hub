
import React, { useState } from 'react';
import { Card, Button, Modal, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { deleteGadgetAPI } from '../service/allAPI';

const FALLBACK = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...';

export default function ProductCard({ product, onDelete }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      const response = await deleteGadgetAPI(product.id);
      if (response?.status >= 400 || response instanceof Error || response.name === 'AxiosError') {
        throw response;
      }
      setShow(false);
      setError('');
      onDelete && onDelete(product.id);
    } catch (err) {
      setError('Error deleting: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <style>
        {`
          .product-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .product-card:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            border-color: #0ea5a4 !important;
            z-index: 1;
          }
        `}
      </style>
      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}
      <Card className="h-100 shadow-sm product-card" style={{ border: '1px solid #dee2e6' }}>
        <div style={{ height: 200, overflow: 'hidden' }}>
          <Card.Img
            src={product.image || FALLBACK}
            alt={product.name}
            className="card-img-top"
            onError={(e) => (e.currentTarget.src = FALLBACK)}
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{product.brand}</Card.Subtitle>
          <div className="mb-2">
            <strong>₹{product.price}</strong>
          </div>
          <Card.Text className="text-muted small" style={{ flex: 1 }}>
            {product.specs}
          </Card.Text>
          <div className="d-flex gap-2">
            <Button as={Link} to={`/view/${product.id}`} variant="info" size="sm" className="flex-fill">
              <FaEye /> View
            </Button>
            <Button as={Link} to={`/edit/${product.id}`} variant="warning" size="sm" className="flex-fill">
              <FaEdit /> Edit
            </Button>
            <Button variant="danger" size="sm" onClick={() => setShow(true)} className="flex-fill">
              <FaTrash /> Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{product.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
