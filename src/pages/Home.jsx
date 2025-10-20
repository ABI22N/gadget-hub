
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';
import { getAllGadgetAPI, deleteGadgetAPI } from '../service/allAPI';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    sortBy: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load products from API
  const loadProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllGadgetAPI();
      const data = res && res.data ? res.data : [];
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load products: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    // if (!window.confirm('Are you sure you want to delete this product?')) return;
    setError('');
    try {
      const res = await deleteGadgetAPI(id);
      if (res?.status >= 200 || res instanceof Error || res.name === 'AxiosError') {
        throw res;
      }
      setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));
    } catch (err) {
      setError('Failed to delete product: ' + (err.response?.data?.message || err.message));
    }
    loadProducts();
  };

  // Parse price
  const parsePrice = (val) => {
    if (val == null || val === '') return 0;
    if (typeof val === 'number' && isFinite(val)) return val;
    if (typeof val === 'string') {
      const cleaned = val.replace(/[^\d.\-]/g, '').replace(/,/g, '');
      const n = parseFloat(cleaned);
      return isNaN(n) ? 0 : n;
    }
    return 0;
  };

  // Derive brand list
  const brands = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return Array.from(set);
  }, [products]);

  // Filtered + sorted products
  const filtered = useMemo(() => {
    let arr = [...products];
    const { brand, minPrice, maxPrice, sortBy } = activeFilters;

    if (brand) {
      arr = arr.filter((p) => String(p.brand || '').toLowerCase() === String(brand).toLowerCase());
    }

    const min = parsePrice(minPrice);
    const max = parsePrice(maxPrice);
    if (min) arr = arr.filter((p) => parsePrice(p.price) >= min);
    if (max) arr = arr.filter((p) => parsePrice(p.price) <= max);

    if (sortBy === 'priceAsc') {
      arr.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === 'priceDesc') {
      arr.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortBy === 'brandAsc') {
      arr.sort((a, b) => String(a.brand || '').localeCompare(String(b.brand || '')));
    } else if (sortBy === 'brandDesc') {
      arr.sort((a, b) => String(b.brand || '').localeCompare(String(a.brand || '')));
    } else if (sortBy) {
      console.warn(`Unrecognized sortBy value: ${sortBy}`);
    }

    return arr;
  }, [products, activeFilters]);

  return (
    <div style={{ padding: 12 }}>
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <h2>Gadget Catalog</h2>
        <Link to="/add">
          <button className="btn btn-primary">Add Product</button>
        </Link>
      </div>
      <FilterBar
        brands={brands}
        initialFilters={activeFilters}
        onApply={(filters) => setActiveFilters(filters)}
        onReset={() => setActiveFilters({ brand: '', minPrice: '', maxPrice: '', sortBy: '' })}
      />
      {loading && <div style={{ padding: 12 }}>Loading products...</div>}
      <div
        className="product-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px', marginTop: '16px' }}
      >
        {filtered.length === 0 && !loading ? (
          <div style={{ padding: 20 }}>No products match the current filters.</div>
        ) : (
          filtered.map((p) => <ProductCard key={p.id} product={p} onDelete={handleDelete} />)
        )}
      </div>
    </div>
  );
}
