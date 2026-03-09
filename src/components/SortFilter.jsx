function SortFilter({ value, onChange }) {
  return (
    <select className="form-select" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="name-asc">Name A-Z</option>
      <option value="price-asc">Price Low to High</option>
      <option value="price-desc">Price High to Low</option>
      <option value="stock-asc">Stock Low to High</option>
      <option value="stock-desc">Stock High to Low</option>
    </select>
  );
}

export default SortFilter;
