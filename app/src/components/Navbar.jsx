import { Link, useNavigate } from "react-router-dom";
// import Logo from "../images/logo.png";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      {auth ? (
        <ul className="navbar-nav">
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
          {/* <li className="nav-item">
            <Link to="/update" className="nav-link">
              Update Product
            </Link>
          </li> */}
          {/* <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to="/signup" className="nav-link" onClick={logout}>
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
