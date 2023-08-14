import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Product
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/add" className="nav-link">
            Add Product
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/update" className="nav-link">
            Update Product
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
        <li className="nav-item"></li>
        <li className="nav-item">
          {auth ? (
            <Link
              to="/signup"
              className="nav-link"
              style={{ position: "absolute", right: 0 }}
              onClick={logout}
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/signup"
              className="nav-link"
              style={{ position: "absolute", right: 0 }}
            >
              Sign Up
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
