import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';


export default function FilterBar({ products = [], onFilter }){
const [search, setSearch] = useState('');
const [brand, setBrand] = useState('');


useEffect(()=>{
if (onFilter) onFilter({ search, brand });
}, [search, brand]);


const brands = Array.from(new Set(products.map(p=>p.brand).filter(Boolean)));


return (
<Form>
<Row className="g-2 align-items-center">
<Col xs={12} md={6} lg={5}>
<InputGroup>
<InputGroup.Text><FaSearch /></InputGroup.Text>
<Form.Control placeholder="Search by name" value={search} onChange={e=>setSearch(e.target.value)} />
{search && (
<Button variant="outline-secondary" onClick={()=>setSearch('')}><FaTimes /></Button>
)}
</InputGroup>
</Col>
<Col xs={8} md={4} lg={4}>
<Form.Select value={brand} onChange={e=>setBrand(e.target.value)}>
<option value="">All Brands</option>
{brands.map(b=> <option key={b} value={b}>{b}</option>)}
</Form.Select>
</Col>
<Col xs={4} md={2} lg={3}>
<div className="d-flex gap-2">
<Button onClick={()=> onFilter && onFilter({ search, brand }) }>Apply</Button>
<Button variant="outline-secondary" onClick={()=>{ setSearch(''); setBrand(''); onFilter && onFilter({ search: '', brand: '' }) }}>Clear</Button>
</div>
</Col>
</Row>
</Form>
);
}