/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = async () => {
    let result = await fetch(
      `https://e-commerce-backend-u0r1.onrender.com/product/${params.id}`,
      {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async () => {
    let result = await fetch(
      `https://e-commerce-backend-u0r1.onrender.com/product/${params.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ name, price, category, company }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h1 className="h4 mb-0">Update Product</h1>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    error && !name ? "is-invalid" : ""
                  }`}
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className={`form-control ${
                    error && !price ? "is-invalid" : ""
                  }`}
                  placeholder="Product Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    error && !category ? "is-invalid" : ""
                  }`}
                  placeholder="Product Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    error && !company ? "is-invalid" : ""
                  }`}
                  placeholder="Product Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn btn-dark btn-lg btn-block"
              onClick={updateProduct}
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
