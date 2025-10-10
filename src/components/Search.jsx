// src/components/Search.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProducts, fetchProducts } from "../slice/product.slice";

const Search = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchProducts(query));
    } else {
      dispatch(fetchProducts()); // agar bo'sh bo'lsa, hamma productni ko‘rsatish
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex me-3">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search..."
        style={{ width: "250px" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-outline-primary" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
