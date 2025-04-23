import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  console.log(status);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Register</h2>
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error: {error}</p>}
      {status === "success" && <p>User register successfull.</p>}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>

      <p className="mt-3 text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
