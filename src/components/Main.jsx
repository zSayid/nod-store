import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../slice/cart.slice";
import Skeleton from "./Skeleton";
import Search from "./Search";


const Main = () => {
  const { products, isloading } = useSelector((state) => state.product);
  const [visibleCount, setVisibleCount] = useState(50);
  const dispatch = useDispatch();

  const handleLoadMore = () => setVisibleCount((prev) => prev + 50);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
    
    <div className="container my-5 pt-5" style={{ paddingTop: "140px" }}>
      
      <div className="row g-4 justify-content-center mt-4">
        
        {isloading
          ? [...Array(16)].map((_, i) => <Skeleton key={i} />)
          : products.slice(0, visibleCount).map((item) => (
              <div className="col-md-4 col-lg-3" key={item._id}>
                <div
                  className="card h-100 border-0 shadow-sm mt-5"
                  style={{ borderRadius: "16px", overflow: "hidden" }}
                >
                  {/* Image */}
                  <div className="position-relative">
                    <span
                      className="badge bg-danger position-absolute"
                      style={{
                        top: "10px",
                        left: "10px",
                        borderRadius: "12px",
                      }}
                    >
                      New
                    </span>
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="card-img-top"
                      style={{
                        height: "350px",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  {/* Body */}
                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title fw-bold text-dark">
                      {item.title}
                    </h5>
                    <h6 className="text-muted mb-3">{item.brand}</h6>
                    <p className="card-text flex-grow-1 text-secondary small">
                      Discover high-quality products designed to bring comfort,
                      performance, and style to your everyday life.
                    </p>

                    {/* Rating */}
                    <span className="text-warning me-2">
                      {"★".repeat(Math.floor(item.rating))}
                      {"☆".repeat(5 - Math.floor(item.rating))}
                    </span>
                    <span className="text-muted small">({item.rating})</span>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <h4 className="text-primary fw-bold mb-0">
                        ${item.price}
                      </h4>
                      <button
                        className="btn d-flex align-items-center px-3 py-1"
                        style={{
                          backgroundColor: "#007bff",
                          color: "#fff",
                          borderRadius: "30px",
                          fontWeight: "500",
                          transition: "0.3s ease",
                        }}
                        onClick={() => handleAddToCart(item)}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#0056b3")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = "#007bff")
                        }
                      >
                        <FaShoppingCart className="me-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Load More */}
      {!isloading && visibleCount < products.length && (
        <div className="d-flex justify-content-center mt-5 mb-4 w-100">
          <button
            className="btn btn-outline-primary px-4 py-2"
            style={{
              minWidth: "160px",
              fontSize: "1rem",
              whiteSpace: "nowrap",
            }}
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
{/* left section for the search on top left corner */}
<section
  className="search-bar fixed-top bg-white"
  style={{
    top: "90px",           
    left: 0,
    width: "100%",
    zIndex: 1020,
    padding: "0.9rem 1rem",
  }}
>
  <div className="container d-flex justify-content-start">
    <Search />
  </div>
</section>

    </>
  );
};

export default Main;
