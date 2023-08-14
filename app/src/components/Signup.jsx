/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async () => {
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    result = await result.json();

    localStorage.setItem("user", JSON.stringify(result));

    if (result) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "50px 0",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          fontSize: "2rem",
          color: "#333",
          textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
        }}
      >
        Register
      </h1>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        style={{
          marginBottom: "10px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <input
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        style={{
          marginBottom: "10px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        style={{
          marginBottom: "20px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={collectData}
        type="submit"
        style={{
          backgroundColor: "#455d7a",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s ease",
        }}
      >
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
