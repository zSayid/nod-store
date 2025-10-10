import { Link, useNavigate } from "react-router-dom";
import logo from "./constants/Copilot_20250912_191729.png";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../helpers/persistence-storage";
import { logoutUser } from "../slice/auth";
import { IoMdCart } from "react-icons/io";
import { resetCartState } from "../slice/cart.slice";
import Search from "./Search";
import { useState } from "react";

const Navbar = () => {
  const { loggedIn, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = () => {
    dispatch(logoutUser());
    dispatch(resetCartState());
    removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <header
        className="fixed-top shadow-sm"
        style={{ backgroundColor: "#fff", zIndex: 1030 }}
      >
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link
            to="/"
            className="d-flex align-items-center text-decoration-none"
          >
            <img
              src={logo}
              alt="Logo"
              width={55}
              style={{ borderRadius: "50%", marginRight: "10px" }}
            />
            <span className="fw-bold fs-5 text-dark d-none d-sm-inline">
              Nod Store
            </span>
          </Link>

          {/* Search - always visible on medium+ */}

          <div className="d-flex align-items-center gap-3">
            <Link
              to="/cart"
              className="d-flex align-items-center justify-content-center text-primary text-decoration-none border rounded-pill px-3 py-1 shadow-sm"
              style={{ transition: "background-color 0.2s ease" }}
            >
              <IoMdCart size={20} />

              {/* Desktop / Tablet view */}
              <span className="fw-medium d-none d-sm-inline ms-1">
                Cart {items.length}
              </span>

              {/* Mobile view */}
              <span className="fw-medium d-inline d-sm-none ms-1">
                {items.length}
              </span>
            </Link>

            <button
              className="btn btn-outline-secondary d-md-none"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Collapsible Menu */}
        <div
          className={`bg-light border-top d-md-none transition ${
            menuOpen ? "d-block" : "d-none"
          }`}
        >
          <div className="container py-3 d-flex flex-column gap-3">
            <div>
              <Search />
            </div>
            {loggedIn ? (
              <>
                <p className="mb-0 fw-medium text-dark">
                  Welcome, {user?.name}
                </p>
                <Link
                  to="/my-orders"
                  className="btn btn-outline-secondary w-100"
                  onClick={() => setMenuOpen(false)}
                >
                  My Orders
                </Link>
                <button
                  className="btn btn-outline-danger w-100"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-primary w-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-outline-primary w-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="d-none d-md-flex container justify-content-end align-items-center gap-3 pb-2">
          {loggedIn ? (
            <>
              <p className="mb-0 fw-medium text-dark fs-5">
                Welcome, {user?.name}
              </p>
              <Link to="/my-orders" className="btn btn-outline-secondary">
                My Orders
              </Link>
              <button
                className="btn btn-outline-danger"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
