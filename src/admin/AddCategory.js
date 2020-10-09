import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Destrucutre user and token from localstorage

  const { user, token } = isAuthenticated();

  // Form input Handler
  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  // Form handler
  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // Make request to api to create category
  };

  // Category form

  const newCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="" className="text-muted">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={name}
            autoFocus
          />
        </div>
        <button className="btn btn-outline-primary">Create Category</button>
      </form>
    );
  };

  return (
    <Layout
      title="Add a new category"
      description={`Hello ${name}, Let's create a new category`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">{newCategoryForm()}</div>
      </div>
    </Layout>
  );
};

export default AddCategory;
