import { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const handleAddProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userId);

    const result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({
        name,
        price,
        category,
        company,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    const response = await result.json();
    console.log(response);

    // Clear form fields after successful submission
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");
    setError(false);
  };

  return (
    <div className="container">
      <div className="card mx-auto mt-5" style={{ maxWidth: "400px" }}>
        <div className="card-header bg-dark text-white">
          <h1 className="h4 mb-0">Add Product</h1>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${error && !name ? "is-invalid" : ""}`}
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && !name && (
              <div className="invalid-feedback">
                Please enter a valid product name.
              </div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="number"
              className={`form-control ${error && !price ? "is-invalid" : ""}`}
              placeholder="Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {error && !price && (
              <div className="invalid-feedback">
                Please enter a valid product price.
              </div>
            )}
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
            {error && !category && (
              <div className="invalid-feedback">
                Please enter a valid product category.
              </div>
            )}
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
            {error && !company && (
              <div className="invalid-feedback">
                Please enter a valid product company.
              </div>
            )}
          </div>
        </div>
        <button
          className="btn btn-dark btn-lg btn-block"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
