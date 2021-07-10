import React from "react";
import "./landing.css";

export const landing = () => {
  return (
    <div className="landing-body">
      <div className="landing-container">
        <div className="landing-header">
          <nav className="landing-topmenu d-flex justify-content-center">
            <a href="/">Home</a>
            <div className="line align-self-center" />
            <a href="/login">Login</a>
            <div className="line align-self-center" />
            <a href="/register">Register</a>
          </nav>
          <div className="landing-server-info d-flex align-items-center flex-column text-center">
            <h1>INFERNO</h1>
            <a
              className="landing-links-suppressor join-btn landing-btn-pill white"
              href="/register"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default landing;
