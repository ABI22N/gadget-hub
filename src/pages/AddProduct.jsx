import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AddProduct({ onAdd }) {
    const [product, setProduct] = useState({ name: "", brand: "", price: "", image: "" });
    const navigate = useNavigate();

    const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(product);
        navigate("/");
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
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
            </div>

            <div className="d-flex justify-content-end mt-3" style={{ gap: "10px" }}>
                <Button
                    variant="secondary"
                    style={{
                        padding: "5px 12px",
                        fontSize: "0.8rem",
                        width: "auto",
                    }}
                    onClick={() => navigate("/")}
                >
                    Back
                </Button>

                <Button
                    variant="primary"
                    type="submit"
                    style={{
                        padding: "5px 12px",
                        fontSize: "0.8rem",
                        width: "auto",
                    }}
                >
                    Add Product
                </Button>
            </div>
        </Form>
    );
}
