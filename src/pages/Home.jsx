import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Home = ({ products, onDelete }) => {
    return (
        <div style={{ position: "relative", paddingBottom: "60px" }}>
            <h2 className="mb-4">Gadget / Tech Products</h2>
            <Row className="g-4">
                {products.map((product) => (
                    <Col key={product.id} md={6} lg={3}>
                        <Card
                            className="h-100 d-flex flex-column"
                            style={{
                                backgroundColor: "#2a2a2e",
                                color: "white",
                                border: "1px solid #444",
                                borderRadius: "10px",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                transition: "transform 0.2s",

                                height: "100%",
                                marginLeft: "15px",
                                marginRight: "15px",

                            
                            }}
                        >
                            <Card.Img
                                variant="top"
                                src={product.image}
                                alt={product.name}
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    
                                    objectFit: "contain",
                                    backgroundColor: "#1f1f23",
                                    padding: "10px",
                                    borderBottom: "1px solid #444",
                                    borderTopLeftRadius: "10px",
                                    borderTopRightRadius: "10px",
                                    

                                }}
                            />

                            <Card.Body className="d-flex flex-column justify-content-between mt-auto">
                                <div>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text className="product-brand">{product.brand}</Card.Text>
                                    <Card.Text className="product-price">₹{product.price}</Card.Text>
                                    <Card.Text>{product.specs}</Card.Text>
                                </div>

                                <div className="d-flex justify-content-between mt-3">
                                    <Button
                                        size="lg"
                                        style={{ flex: 1, marginRight: "5px" }}
                                        variant="primary"
                                        as={Link}
                                        to={`/view/${product.id}`}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        size="lg"
                                        style={{ flex: 1, marginLeft: "5px" }}
                                        variant="danger"
                                        onClick={() => onDelete(product.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Floating Add Button */}
            {/* Floating Add Button */}
            <Link to="/add">
                <Button
                    style={{
                        position: "fixed",
                        bottom: "30px",
                        right: "30px",
                        borderRadius: "50%",
                        width: "60px",
                        height: "60px",
                        fontSize: "24px",
                        backgroundColor: "#0ea5a4",
                        border: "none",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease-in-out", // smooth transition
                        cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.2)";
                        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
                    }}
                >
                    <FaPlus />
                </Button>
            </Link>

        </div>
    );
};

export default Home;
