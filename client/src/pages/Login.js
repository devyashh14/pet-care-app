import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Import the new styles

function Login() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    axios.post(`http://${window.location.hostname}:8000/api/auth/login`, user)

      .then(res => {

        // SAVE TOKEN
        localStorage.setItem("token", res.data.token);

        alert("Login successful");

        // REDIRECT TO HOME
        navigate("/");

        // refresh app to update routes
        window.location.reload();

      })

      .catch(err => {

        console.log(err);

        const errorMessage = err.response?.data?.message || "Invalid login";
        alert(errorMessage);

      });

  };

  return (
    <div className="login-page-container">
      {/* Top Left Logo */}
      <div style={{ position: 'absolute', top: '20px', left: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="/logo.png" alt="CareMyPet Logo" style={{ width: '50px', height: '50px', borderRadius: '50%', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
        <h1 style={{ color: 'white', margin: 0, fontSize: '24px', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>CareMyPet</h1>
      </div>

      <div className="login-card">
        <h2>Welcome Back</h2>
        <p style={{ color: '#666', marginTop: '-20px', marginBottom: '25px', fontSize: '14px' }}>Smart pet care sharing</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              className="input-field"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="input-field"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
        <Link to="/register" className="register-link">
          Don't have an account? <span>Register</span>
        </Link>
      </div>
    </div>
  );
}

export default Login;