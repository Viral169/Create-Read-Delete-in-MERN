import React, { useState } from "react";
import "./Signup.css"; // Link CSS file
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleinput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      // console.log(data);
      if (response.ok) {
        alert("User Signup Succefully");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("signup error is", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Signup</h2>
        <form className="signup-form" onSubmit={onsubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={handleinput}
              value={form.name}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={handleinput}
              value={form.email}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="text"
              name="password"
              onChange={handleinput}
              value={form.password}
              className="form-input"
            />
          </div>
          <button type="submit" className="signup-btn">
            Signup
          </button>
          <h3>
            Already Have An Account ? <NavLink to="/login">Login</NavLink>
          </h3>
        </form>
      </div>
    </div>
  );
};

export default Signup;
