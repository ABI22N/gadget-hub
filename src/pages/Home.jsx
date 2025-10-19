import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';

export default function Home({ products = [], onDelete = () => {} }) {
  // committed/active filters used for actual filtering & sorting
  const [activeFilters, setActiveFilters] = useState({ brand: '', minPrice: '', maxPrice: '', sortBy: '' });

  // helper to robustly parse price-like values
  const parsePrice = (val) => {
    if (val == null || val === '') return 0;
    if (typeof val === 'number' && isFinite(val)) return val;
    if (typeof val === 'string') {
      const cleaned = val.replace(/[^\d.\-]/g, '').replace(/,/g, '');
      const n = parseFloat(cleaned);
      return Number.isFinite(n) ? n : 0;
    }
    return 0;
  };

  // unique brand list for FilterBar
  const brands = useMemo(() => {
    const s = new Set();
    products.forEach(p => p.brand && s.add(p.brand));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [products]);

  // apply activeFilters to products
  const filtered = useMemo(() => {
    let list = products.slice();

    // brand
    if (activeFilters.brand) {
      list = list.filter(p => (p.brand || '').toLowerCase() === (activeFilters.brand || '').toLowerCase());
    }

    const min = (activeFilters.minPrice === '' || activeFilters.minPrice == null) ? null : parsePrice(activeFilters.minPrice);
    const max = (activeFilters.maxPrice === '' || activeFilters.maxPrice == null) ? null : parsePrice(activeFilters.maxPrice);

    if (min !== null) list = list.filter(p => parsePrice(p.price) >= min);
    if (max !== null) list = list.filter(p => parsePrice(p.price) <= max);

    switch (activeFilters.sortBy) {
      case 'priceAsc':
        list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case 'priceDesc':
        list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case 'brandAsc':
        list.sort((a, b) => (a.brand || '').toLowerCase().localeCompare((b.brand || '').toLowerCase()));
        break;
      case 'brandDesc':
        list.sort((a, b) => (b.brand || '').toLowerCase().localeCompare((a.brand || '').toLowerCase()));
        break;
      default:
        break;
    }

    return list;
  }, [products, activeFilters]);

  return (
    <div className="home-page" style={{ padding: '1rem 2rem', backgroundColor: 'var(--bg-dark)' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2>Products</h2>
        <Link to="/add"><button className="btn btn-primary">Add product</button></Link>
      </div>

      {/* Pass activeFilters as initialFilters. Apply/Reset events update activeFilters. */}
      <FilterBar
        brands={brands}
        initialFilters={activeFilters}
        onApply={(newFilters) => setActiveFilters(newFilters)}
        onReset={() => setActiveFilters({ brand: '', minPrice: '', maxPrice: '', sortBy: '' })}
      />

      <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 20 }}>No products match the current filters.</div>
        ) : (
          filtered.map((p) => (
            <ProductCard key={p.id} product={p} onDelete={() => onDelete(p.id)} />
          ))
        )}
      </div>
    </div>
  );
}
