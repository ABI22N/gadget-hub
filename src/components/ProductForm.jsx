import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Row, Col, Image, Alert } from 'react-bootstrap';
import { TextField } from '@mui/material';


const FALLBACK = (q='technology,gadget') => `https://source.unsplash.com/800x600/?${encodeURIComponent(q)}`;


export default function ProductForm({ initial = null, onSubmit }){
const [form, setForm] = useState({ name:'', brand:'', price:'', specs:'', image:'' });
const [preview, setPreview] = useState(FALLBACK('gadget'));
const [error, setError] = useState('');


useEffect(()=>{
if (initial) { setForm(initial); setPreview(initial.image || FALLBACK(initial.name || initial.brand || 'gadget')); }
},[initial]);


useEffect(()=>{
setPreview(form.image || FALLBACK(form.name || form.brand || 'gadget'));
},[form.image, form.name, form.brand]);


const handle = (field) => (e) => setForm(prev=> ({ ...prev, [field]: e.target.value }));


const submit = (e)=>{
e.preventDefault();
if (!form.name.trim() || !form.brand.trim() || !String(form.price).trim()){
setError('Name, Brand and Price are required');
return;
}
setError('');
onSubmit && onSubmit({ ...form, price: String(form.price), image: form.image || preview });
};


return (
<Card className="p-3 shadow-sm">
<Form onSubmit={submit}>
{error && <Alert variant="danger">{error}</Alert>}
<Row>
<Col lg={8}>
<Form.Group className="mb-3">
<Form.Label>Product Name</Form.Label>
<Form.Control value={form.name} onChange={handle('name')} placeholder="Falcon X1" required />
</Form.Group>


<Form.Group className="mb-3">
<Form.Label>Brand</Form.Label>
<Form.Control value={form.brand} onChange={handle('brand')} placeholder="ApexTech" required />
</Form.Group>


<Form.Group className="mb-3">
<Form.Label>Price (USD)</Form.Label>
<Form.Control type="number" min="0" value={form.price} onChange={handle('price')} required />
</Form.Group>


<Form.Group className="mb-3">
<Form.Label>Specifications</Form.Label>
<Form.Control as="textarea" rows={3} value={form.specs} onChange={handle('specs')} />
</Form.Group>
</Col>
<Col lg={4} className="d-flex flex-column align-items-center">
<Image src={preview} rounded fluid style={{ maxHeight: 200, objectFit: 'cover' }} className="mb-3" />
<Form.Group className="mb-3 w-100">
<Form.Label>Image URL</Form.Label>
<TextField
	fullWidth
	value={form.image}
	onChange={handle('image')}
	placeholder="https://..."
	variant="outlined"
/>
</Form.Group>
</Col>
</Row>
<Button type="submit" variant="primary">Save Product</Button>
</Form>
</Card>
);
}