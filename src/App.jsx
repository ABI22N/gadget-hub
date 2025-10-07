import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Footer from './components/Footer';
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ViewProduct from "./pages/ViewProduct";
import About from './pages/About';

// Sample products with your images
const SAMPLE = [
    {
        id: 1,
        name: "Victus Laptop",
        brand: "HP",
        price: "82,999",
        image: "https://static.independent.co.uk/2025/08/27/16/02/Best-laptops-Indybest-review.png",
    },
    {
        id: 2,
        name: "Iphone 17",
        brand: "Apple",
        price: "72,999",
        image: "https://m.media-amazon.com/images/I/61eYPkT2zZL._UF1000,1000_QL80_.jpg",
    },
    {
        id: 3,
        name: "Nothing headphones",
        brand: "Nothing",
        price: "19,000",
        image: "https://cdn.sanity.io/images/gtd4w1cq/production/f3406ca7f5d3ceda9277280020ba2c471d08e1e6-4096x2305.jpg?auto=format",
    },
    {
        id: 4,
        name: "Galaxy Tab",
        brand: "Samsung",
        price: "29,999",
        image: "https://img.global.news.samsung.com/global/wp-content/uploads/2024/09/Samsung-Mobile-Galaxy-Tab-S10-Series-Samsungs-First-Galaxy-AI-Tablet_main1_F.jpg",
    },
];

export default function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("products")) || [];
        if (saved.length) setProducts(saved);
        else setProducts(SAMPLE);
    }, []);

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    const addProduct = (p) => setProducts((prev) => [...prev, { ...p, id: Date.now() }]);
    const updateProduct = (updated) =>
        setProducts((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
    const deleteProduct = (id) => setProducts((prev) => prev.filter((x) => x.id !== id));

    const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand).filter(Boolean))), [products]);

    return (
        <Router>
            <AppNavbar />
            <Container className="mt-4 mb-5 container-lg">
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/" element={<Home products={products} onDelete={deleteProduct} brands={brands} />} />
                    <Route path="/add" element={<AddProduct onAdd={addProduct} />} />
                    <Route path="/edit/:id" element={<EditProduct products={products} onUpdate={updateProduct} />} />
                    <Route path="/view/:id" element={<ViewProduct products={products} onDelete={deleteProduct} />} />
                </Routes>
            </Container>
            <Footer />
        </Router>
    );
}
