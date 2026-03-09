import { currency } from '../utils/helpers';

function ProductCard({ product, onAdd, isAdmin = false, onEdit, onDelete, onStock, lowStockThreshold = 5 }) {
  const low = product.stock <= lowStockThreshold;
  return (
    <div className="card h-100 shadow-sm">
      <img src={product.image} className="card-img-top" style={{ height: 140, objectFit: 'cover' }} />
      <div className="card-body">
        <h6>{product.name}</h6>
        <p className="mb-1 small text-muted">{product.category}</p>
        <p className="mb-1">{currency(product.sellingPrice)}</p>
        <span className={`badge ${product.stock === 0 ? 'bg-danger' : low ? 'bg-warning text-dark' : 'bg-success'}`}>
          {product.stock === 0 ? 'Out of stock' : `Stock ${product.stock}`}
        </span>
      </div>
      <div className="card-footer d-grid gap-2">
        {!isAdmin && <button className="btn btn-primary btn-sm" onClick={() => onAdd(product)} disabled={product.stock === 0}>Add to Cart</button>}
        {isAdmin && (
          <>
            <button className="btn btn-outline-primary btn-sm" onClick={() => onEdit(product)}>Edit</button>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => onStock(product)}>Update Stock</button>
            <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(product.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
