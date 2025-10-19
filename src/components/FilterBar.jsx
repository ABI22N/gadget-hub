import React, { useEffect, useState } from 'react';

// Props:
// - brands: array of strings
// - initialFilters: the currently active filters (used to seed the draft)
// - onApply: (filters) => void   // called when user clicks Apply
// - onReset: () => void          // called when user clicks Reset
export default function FilterBar({ brands = [], initialFilters = {}, onApply, onReset }) {
  const [draft, setDraft] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    sortBy: '',
    ...initialFilters,
  });

  // If parent active filters change externally, update the draft to match.
  useEffect(() => {
    setDraft(prev => ({ ...prev, ...initialFilters }));
  }, [initialFilters]);

  const handlePatch = (patch) => setDraft(prev => ({ ...prev, ...patch }));

  const handleApply = () => {
    if (onApply) onApply({ ...draft });
  };

  const handleReset = () => {
    const empty = { brand: '', minPrice: '', maxPrice: '', sortBy: '' };
    setDraft(empty);
    if (onReset) onReset();
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label className="filter-label">Brand</label>
        <select
          className="filter-select"
          value={draft.brand || ''}
          onChange={(e) => handlePatch({ brand: e.target.value })}
        >
          <option value="">All brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Min price</label>
        <input
          className="filter-input"
          type="number"
          min="0"
          value={draft.minPrice ?? ''}
          onChange={(e) => handlePatch({ minPrice: e.target.value === '' ? '' : Number(e.target.value) })}
          placeholder="0"
        />
      </div>

      <div className="filter-group">
        <label className="filter-label">Max price</label>
        <input
          className="filter-input"
          type="number"
          min="0"
          value={draft.maxPrice ?? ''}
          onChange={(e) => handlePatch({ maxPrice: e.target.value === '' ? '' : Number(e.target.value) })}
          placeholder="no limit"
        />
      </div>

      <div className="filter-group">
        <label className="filter-label">Sort</label>
        <select
          className="filter-select"
          value={draft.sortBy || ''}
          onChange={(e) => handlePatch({ sortBy: e.target.value })}
        >
          <option value="">Default</option>
          <option value="priceAsc">Price: Low → High</option>
          <option value="priceDesc">Price: High → Low</option>
          <option value="brandAsc">Brand: A → Z</option>
          <option value="brandDesc">Brand: Z → A</option>
        </select>
      </div>

      <div className="filter-actions">
        <button type="button" className="btn btn-primary" onClick={handleApply}>
          Apply
        </button>

        <button type="button" className="btn btn-reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
