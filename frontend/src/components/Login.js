import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setUserRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      const { role } = response.data;
      setUserRole(role); 
      localStorage.setItem("role", response.data.role);
      navigate("/users"); 

    } catch (error) {
      alert("Login failed. Please check your credentials.");
      console.error(error);
    }
    
  };

  const handleRegister = () => {
    navigate("/add")
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <button className="btn btn-primary" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
}

export default Login;
