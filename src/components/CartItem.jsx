import { currency } from '../utils/helpers';

function CartItem({ item, onQty, onRemove }) {
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom py-2">
      <div>
        <strong>{item.name}</strong>
        <div className="small text-muted">{currency(item.sellingPrice)} x {item.quantity}</div>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <button className="btn btn-sm btn-outline-secondary" onClick={() => onQty(item.id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => onQty(item.id, item.quantity + 1)}>+</button>
        <button className="btn btn-sm btn-outline-danger" onClick={() => onRemove(item.id)}>x</button>
      </div>
    </div>
  );
}

export default CartItem;
