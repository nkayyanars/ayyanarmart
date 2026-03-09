import { useMemo, useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import SortFilter from '../components/SortFilter';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

function Products() {
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  const { products, deleteProduct, updateProduct, updateStock, lowStockThreshold } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('name-asc');

  const categories = [...new Set(products.map((p) => p.category))];
  const filtered = useMemo(() => {
    let items = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'all') items = items.filter((p) => p.category === category);
    const [field, dir] = sort.split('-');
    items.sort((a, b) => {
      const aVal = field === 'name' ? a.name : Number(a[field]);
      const bVal = field === 'name' ? b.name : Number(b[field]);
      return dir === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });
    return items;
  }, [products, search, category, sort]);

  return (
    <>
      <div className="row g-2 mb-3">
        <div className="col-md-4"><SearchBar value={search} onChange={setSearch} /></div>
        <div className="col-md-4"><CategoryFilter categories={categories} value={category} onChange={setCategory} /></div>
        <div className="col-md-4"><SortFilter value={sort} onChange={setSort} /></div>
      </div>
      <div className="row g-3">
        {filtered.map((p) => (
          <div className="col-md-4 col-lg-3" key={p.id}>
            <ProductCard
              product={p}
              onAdd={addToCart}
              isAdmin={currentUser.role === 'admin'}
              onDelete={deleteProduct}
              onEdit={(product) => {
                const name = window.prompt('Edit name', product.name);
                if (name) updateProduct(product.id, { name });
              }}
              onStock={(product) => {
                const delta = Number(window.prompt('Stock change (+/-):', 1));
                if (!Number.isNaN(delta)) updateStock(product.id, delta);
              }}
              lowStockThreshold={lowStockThreshold}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
