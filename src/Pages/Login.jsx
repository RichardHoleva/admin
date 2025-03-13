import React, { useState } from "react";
import { auth, signInWithEmailAndPassword, signOut } from "../firebase"; // firebase.js is one folder up
import "../login.css";

const ADMIN_EMAIL = "aspilcafen@gmail.com"; // Set the admin email here

const Login = ({ login, setLogin = () => {} }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.email !== ADMIN_EMAIL) {
          setError("Access denied. This account is not authorized as admin.");
          signOut(auth);
        } else {
          console.log("Admin signed in:", user.email);
          setLogin(user);
        }
      })
      .catch((error) => {
        setError(error.message || "Authentication failed. Please try again.");
      });
  };

  return (
    <div className="login-page">
        <div className="login-wrapper">
            <div className="illustration">
                <img
                    src="https://i.pinimg.com/736x/64/16/fa/6416fa82c92a77e3882690f4ffc52ff4.jpg"
                    alt="Boarding Game"
                />
            </div>
            <div className="login-card">
                <div className="login-form-container">
                    {login ? (
                        <>
                            <h1>
                                <span className="welcome-email">Welcome,</span>
                                <span className="welcome-email">Admin!</span>
                            </h1>
                            <button
                                onClick={() => {
                                    signOut(auth);
                                    setLogin(null);
                                }}
                                className="signin-btn" // changed from "logout-btn"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <h1>
                                <span>Hello</span> <span>Again!</span>
                            </h1>
                            <p>Welcome back, please sign in to continue.</p>
                            {error && (
                                <p style={{ color: "red", marginBottom: "1rem" }}>
                                    {error}
                                </p>
                            )}
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                    required
                                />
                                <button type="submit" className="signin-btn">
                                    Sign In
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
);
};

Login.defaultProps = {
  setLogin: () => {},
};

export default Login;