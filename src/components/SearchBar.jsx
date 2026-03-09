function SearchBar({ value, onChange, placeholder = 'Search products...' }) {
  return <input className="form-control" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />;
}

export default SearchBar;
