import { useEffect, useState } from 'react';

const empty = { name: '', category: '', price: '', stock: '', costPrice: '', sellingPrice: '', image: '' };

function ProductForm({ onSubmit, editing }) {
  const [form, setForm] = useState(empty);
  useEffect(() => setForm(editing || empty), [editing]);

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <form className="card card-body shadow-sm" onSubmit={(e) => { e.preventDefault(); onSubmit(form); setForm(empty); }}>
      <h6>{editing ? 'Edit Product' : 'Add Product'}</h6>
      <div className="row g-2">
        {Object.keys(empty).map((key) => (
          <div key={key} className="col-md-6"><input required name={key} value={form[key]} onChange={handle} className="form-control" placeholder={key} /></div>
        ))}
      </div>
      <button className="btn btn-primary mt-3">Save Product</button>
    </form>
  );
}

export default ProductForm;
