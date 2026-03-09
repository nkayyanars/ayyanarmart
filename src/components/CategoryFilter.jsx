function CategoryFilter({ categories, value, onChange }) {
  return (
    <select className="form-select" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="all">All Categories</option>
      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
    </select>
  );
}

export default CategoryFilter;
