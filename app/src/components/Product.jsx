import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/product/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        getProducts();
      } else {
        console.error("Error deleting product:", response.status);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const searchHandle = async (event) => {
    const key = event.target.value;
    if (key) {
      try {
        const response = await fetch(`http://localhost:5000/search/${key}`);
        const result = await response.json();
        if (response.ok) {
          setProducts(result);
        } else {
          console.error("Error searching product:", response.status);
        }
      } catch (error) {
        console.error("Error searching product:", error);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-15">
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h1 className="h4 mb-0">Product List</h1>
            </div>
            <div className="card-body">
              <input
                type="text"
                placeholder="Search Product"
                className="form-control mb-3"
                onChange={searchHandle}
              />
              {products.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Company</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={product._id}>
                          <th scope="row">{index + 1}</th>
                          <td>{product.name}</td>
                          <td>${product.price}</td>
                          <td>{product.category}</td>
                          <td>{product.company}</td>
                          <td>
                            <div className="btn-group">
                              <Link
                                className="btn btn-primary btn-sm"
                                to={`/update/${product._id}`}
                              >
                                Update
                              </Link>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteProduct(product._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center">
                  <h2>No Products Found</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
