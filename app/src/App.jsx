import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import UpdateProducts from "./components/UpdateProducts";
import AddProduct from "./components/AddProduct";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import PrivateCompo from "./components/PrivateComp";
import Login from "./components/Login";

function App() {
  return (
    <div>
      <Navbar />
      <div
        style={{
          marginTop: "150px",
        }}
      >
        <Routes>
          <Route element={<PrivateCompo />}>
            <Route path="/" element={<Product />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProducts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<h3>Logout</h3>} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
