import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError, loginUser } from "../features/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(credentials));
  };

  useEffect(() => {
    if (status === "success" && user && Object.keys(user).length > 0) {
      setMessage("Login successful!");
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
      <h2 className="mb-4">Login</h2>
      {status === "loading" && <p>Loading...</p>}
      {message && (
        <p className={isError ? "alert alert-danger" : "alert alert-success"}>
          {message}
        </p>
      )}

      <form onSubmit={handleLogin}>
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
        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
      </form>

      <p className="mt-3 text-center">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
