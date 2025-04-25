import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearError, registerUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (status === "success" && user && Object.keys(user).length > 0) {
      setMessage("Registration successful!");
      setIsError(false);
      setTimeout(() => {
        setMessage("");
        navigate("/");
      }, 2000);
    } else if (status === "error" && error) {
      setMessage(`Error: ${error}`);
      setIsError(true);
      setTimeout(() => {
        setMessage("");
        dispatch(clearError());
      }, 3000);
    }
  }, [status, user, error, navigate, dispatch]);

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Register</h2>
      {status === "loading" && <p>Loading...</p>}
      {message && (
        <p className={isError ? "alert alert-danger" : "alert alert-success"}>
          {message}
        </p>
      )}

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
